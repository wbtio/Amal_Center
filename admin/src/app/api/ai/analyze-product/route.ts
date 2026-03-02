import { NextRequest, NextResponse } from 'next/server';

// ===== OpenRouter API =====
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// النموذج المستخدم
const MODELS = [
  'google/gemini-2.5-flash-lite-preview-09-2025',
];

// استدعاء OpenRouter API
async function tryWithModel(
  modelName: string,
  prompt: string,
  frontImage: string,
  backImage: string
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://amal-center.vercel.app',
      'X-Title': 'Amal Center Admin',
    },
    body: JSON.stringify({
      model: modelName,
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${frontImage}` } },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${backImage}` } },
        ]
      }],
    })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMsg = errorBody?.error?.message || `HTTP ${response.status}`;
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No text in response');
  return text;
}

// دالة لاستخراج JSON من الرد
function parseAIResponse(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('لم يُرجع الذكاء الاصطناعي JSON صالح');
      return JSON.parse(jsonMatch[0]);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Starting AI Analysis (OpenRouter) ===');

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'مفتاح OpenRouter API غير موجود. أضف OPENROUTER_API_KEY في Environment Variables.' },
        { status: 500 }
      );
    }

    const { frontImage, backImage, categories } = await request.json();
    console.log('Categories count:', categories?.length);

    if (!frontImage || !backImage) {
      return NextResponse.json(
        { error: 'يرجى إرسال صورتي المنتج' },
        { status: 400 }
      );
    }

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

    // ===== نظام التناوب: جرب النماذج بالترتيب =====
    let rawText: string | null = null;
    let usedModel = '';
    const allErrors: string[] = [];

    for (const modelName of MODELS) {
      try {
        console.log(`🤖 ${modelName} — trying...`);
        rawText = await tryWithModel(modelName, prompt, frontImage, backImage);
        usedModel = modelName;
        console.log(`✅ SUCCESS with ${modelName}`);
        break;
      } catch (err: any) {
        const msg = (err.message || '').substring(0, 150);
        console.warn(`⚠️ ${modelName} failed: ${msg}`);
        allErrors.push(`${modelName}: ${msg}`);
        continue;
      }
    }

    // إذا فشلت كل المحاولات
    if (!rawText) {
      console.error('❌ All models failed:', allErrors.length, 'attempts');

      return NextResponse.json(
        {
          error: 'فشلت جميع نماذج الذكاء الاصطناعي. يرجى المحاولة لاحقاً.',
          details: allErrors.join('\n'),
        },
        { status: 503 }
      );
    }

    // استخراج JSON
    let productData: any;
    try {
      productData = parseAIResponse(rawText);
    } catch {
      return NextResponse.json(
        { error: 'فشل تحليل رد الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.' },
        { status: 500 }
      );
    }

    // البحث عن القسم
    const cleanCategoryName = productData.category_name?.trim();
    let category = categories.find((c: any) =>
      c.name_ar === cleanCategoryName || c.name === cleanCategoryName
    );
    if (!category && cleanCategoryName) {
      category = categories.find((c: any) =>
        c.name_ar?.includes(cleanCategoryName) ||
        cleanCategoryName.includes(c.name_ar) ||
        c.name?.toLowerCase().includes(cleanCategoryName.toLowerCase()) ||
        cleanCategoryName.toLowerCase().includes(c.name?.toLowerCase())
      );
    }
    const category_id = category?.id || categories[0]?.id;

    console.log(`🎯 Done | Model: ${usedModel} | Category: ${category?.name_ar || 'Default'}`);

    return NextResponse.json({
      name_ar: productData.name_ar,
      name_en: productData.name_en,
      description_ar: productData.description_ar,
      description_en: productData.description_en,
      category_id,
      _debug: { model: usedModel },
    });

  } catch (error: any) {
    console.error('=== UNEXPECTED ERROR ===', error.message);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع: ' + error.message },
      { status: 500 }
    );
  }
}
