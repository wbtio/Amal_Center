import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyAo0aQdHC1qYaYcK-HTtaPl3MS0CL1zTR4';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Starting AI Analysis ===');
    const { frontImage, backImage, categories } = await request.json();
    console.log('Categories count:', categories?.length);

    if (!frontImage || !backImage) {
      console.log('Missing images');
      return NextResponse.json(
        { error: 'يرجى إرسال صورتي المنتج' },
        { status: 400 }
      );
    }

    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // استخدام gemini-pro-vision الذي يدعم تحليل الصور
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3-flash-preview',
      generationConfig: {
        maxOutputTokens: 2048,
      }
    });
    console.log('Gemini API initialized with gemini-3-flash-preview');

    const categoriesList = categories.map((c: any, index: number) => 
      `${index + 1}. ${c.name_ar} (${c.name})`
    ).join('\n');

    const prompt = `أنت خبير في تحليل المنتجات الاستهلاكية. قم بتحليل صور هذا المنتج واستخرج المعلومات التالية بدقة عالية.

**الأقسام المتاحة:**
${categoriesList}

**تعليمات مهمة لاختيار القسم:**
- الورقيات و مستلزمات الاطفال: مناديل، حفاضات، مستلزمات الأطفال
- المنظفات وملحقات التنظيف: منظفات الأطباق، الأرضيات، الملابس، إسفنج، فرش
- العناية الشخصية: صابون، مزيلات عرق، كريمات
- عناية بالاسنان: معجون أسنان، فرش أسنان، غسول فم
- الحفاضات: حفاضات الأطفال والكبار
- عناية بالشعر: شامبو، بلسم، صبغات، جل
- عناية بالجسم: لوشن، كريمات الجسم، زيوت
- الشاي و القهوة: شاي، قهوة، نسكافيه
- المعلبات و الصلصات: تونة، صلصة طماطم، مخللات، معلبات
- الكورن فلكس والغذاء الصحي: كورن فلكس، شوفان، حبوب الإفطار
- اجبان والبان: جبن، لبن، زبادي، حليب سائل
- العصائر والمشروبات الغازية: عصائر، مشروبات غازية، مشروبات طاقة
- مياه معدنية: مياه شرب
- المخبوزات: خبز، كيك، معجنات
- الحلويات والشيبس: شوكولاتة، حلويات، شيبس، سناكات
- الحليب المجفف: حليب بودرة للأطفال والكبار
- السمن والزيوت: زيت طبخ، سمن، زبدة
- الرز والمقطعات: أرز، معكرونة، شعيرية
- المواد المجمدة: دجاج مجمد، خضار مجمدة، آيس كريم
- البيض واللحوم الطازجة: بيض، لحوم طازجة، دجاج طازج
- قسم الخضار: خضروات طازجة، فواكه
- قسم الكوزمتك: مكياج، عطور، مستحضرات تجميل

**المطلوب:**
1. اسم المنتج بالعربية (واضح ومختصر من العبوة)
2. اسم المنتج بالإنجليزية (من العبوة أو ترجمة دقيقة)
3. وصف تفصيلي بالعربية (المكونات، الحجم، الفوائد، طريقة الاستخدام إن وجدت)
4. وصف تفصيلي بالإنجليزية
5. اختر القسم الأنسب من القائمة أعلاه بدقة (يجب أن يكون الاسم مطابق تماماً)

**مهم جداً:** اكتب اسم القسم بالعربية بالضبط كما هو في القائمة أعلاه.

أرجع النتيجة بصيغة JSON فقط بدون أي نص إضافي:
{
  "name_ar": "اسم المنتج بالعربية",
  "name_en": "Product Name in English",
  "description_ar": "وصف تفصيلي بالعربية يتضمن الحجم والمكونات والفوائد",
  "description_en": "Detailed description in English including size, ingredients and benefits",
  "category_name": "اسم القسم المناسب بالعربية بالضبط"
}`;

    console.log('Calling Gemini API...');
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: frontImage
        }
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: backImage
        }
      }
    ]);

    console.log('Getting response...');
    const response = await result.response;
    const text = response.text();
    console.log('AI Response:', text);
    
    // استخراج JSON من النص
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', text);
      throw new Error('فشل استخراج البيانات من الذكاء الاصطناعي');
    }

    console.log('Parsing JSON...');
    const productData = JSON.parse(jsonMatch[0]);
    console.log('Product data:', productData);

    // البحث عن القسم المناسب بدقة عالية
    console.log('Searching for category:', productData.category_name);
    
    // تنظيف اسم القسم من المسافات الزائدة
    const cleanCategoryName = productData.category_name?.trim();
    
    // البحث بالمطابقة الدقيقة أولاً
    let category = categories.find((c: any) => 
      c.name_ar === cleanCategoryName || 
      c.name === cleanCategoryName
    );
    
    // إذا لم نجد مطابقة دقيقة، نبحث بالتضمين
    if (!category) {
      category = categories.find((c: any) => 
        c.name_ar.includes(cleanCategoryName) ||
        cleanCategoryName.includes(c.name_ar) ||
        c.name.toLowerCase().includes(cleanCategoryName.toLowerCase()) ||
        cleanCategoryName.toLowerCase().includes(c.name.toLowerCase())
      );
    }
    
    // إذا لم نجد أي مطابقة، نستخدم أول قسم كقيمة افتراضية
    const category_id = category?.id || categories[0]?.id;
    
    console.log('Selected category:', category?.name_ar || 'Default (first category)', 'ID:', category_id);

    return NextResponse.json({
      name_ar: productData.name_ar,
      name_en: productData.name_en,
      description_ar: productData.description_ar,
      description_en: productData.description_en,
      category_id: category_id
    });

  } catch (error: any) {
    console.error('=== ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    return NextResponse.json(
      { 
        error: 'حدث خطأ أثناء تحليل المنتج: ' + error.message,
        details: error.stack
      },
      { status: 500 }
    );
  }
}
