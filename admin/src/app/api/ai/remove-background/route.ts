import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Replicate from 'replicate';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// استخدام Replicate API - سريع ورخيص ($0.00053 لكل صورة)
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || '';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Starting Background Removal ===');
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'يرجى إرسال الصورة' },
        { status: 400 }
      );
    }

    console.log('Image size:', image.length, 'chars');

    let processedImageBase64 = image;
    let backgroundRemoved = false;

    // محاولة إزالة الخلفية باستخدام Replicate API
    try {
      console.log('Attempting to remove background with Replicate...');
      console.log('API Token:', REPLICATE_API_TOKEN.substring(0, 10) + '...');
      
      const replicate = new Replicate({
        auth: REPLICATE_API_TOKEN,
      });

      // تحويل base64 إلى data URL
      const imageDataUrl = `data:image/jpeg;base64,${image}`;
      console.log('Image data URL length:', imageDataUrl.length);

      console.log('Calling Replicate API...');
      const output = await replicate.run(
        "851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc",
        {
          input: {
            image: imageDataUrl,
            format: "png"
          }
        }
      );

      console.log('Replicate output type:', typeof output);
      console.log('Replicate output:', output);

      // Replicate يرجع FileOutput object مع url() method
      let outputUrl: string;
      if (typeof output === 'string') {
        outputUrl = output;
      } else if (output && typeof output === 'object' && 'url' in output) {
        // @ts-ignore
        outputUrl = typeof output.url === 'function' ? output.url() : output.url;
      } else {
        outputUrl = output.toString();
      }
      
      console.log('Output URL:', outputUrl);
      
      // تحميل الصورة من URL وتحويلها إلى base64
      console.log('Fetching image from URL...');
      const imageResponse = await fetch(outputUrl);
      console.log('Image response status:', imageResponse.status);
      
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
      }
      
      const imageBuffer = await imageResponse.arrayBuffer();
      console.log('Image buffer size:', imageBuffer.byteLength);
      
      processedImageBase64 = Buffer.from(imageBuffer).toString('base64');
      console.log('Processed image base64 length:', processedImageBase64.length);
      
      backgroundRemoved = true;
      console.log('✅ Background removed successfully with Replicate');
    } catch (bgError: any) {
      console.error('=== Background Removal Error ===');
      console.error('Error name:', bgError.name);
      console.error('Error message:', bgError.message);
      console.error('Error stack:', bgError.stack);
      
      // محاولة استخدام Python API المحلي كبديل
      console.log('Trying local Python API as fallback...');
      try {
        const pythonResponse = await fetch('http://localhost:5000/remove-background', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image })
        });
        
        if (pythonResponse.ok) {
          const result = await pythonResponse.json();
          if (result.success && result.image) {
            processedImageBase64 = result.image;
            backgroundRemoved = true;
            console.log('✅ Background removed with Python API');
          }
        }
      } catch (pythonError) {
        console.log('Python API also failed');
      }
      
      if (!backgroundRemoved) {
        console.log('⚠️ Uploading original image without background removal');
      }
    }

    // تحويل base64 إلى buffer للرفع
    const imageBuffer = Buffer.from(processedImageBase64, 'base64');

    // رفع الصورة إلى Supabase Storage
    console.log('Uploading to Supabase...');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    const filePath = fileName; // المسار فقط اسم الملف، لأن bucket اسمه 'products'

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    console.log('Image uploaded successfully:', publicUrl);
    return NextResponse.json({ imageUrl: publicUrl });

  } catch (error: any) {
    console.error('=== ERROR ===');
    console.error('Error message:', error.message);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الصورة: ' + error.message },
      { status: 500 }
    );
  }
}
