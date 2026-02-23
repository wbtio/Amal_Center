import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ===== مفاتيح API - أضف مفاتيح جديدة هنا =====
// كل مفتاح له حصة مستقلة، عند نفاد الأول ينتقل للثاني تلقائياً
const ALL_API_KEYS = [
  process.env.GEMINI_API_KEY_1 || process.env.GEMINI_API_KEY || 'AIzaSyAo0aQdHC1qYaYcK-HTtaPl3MS0CL1zTR4',
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
].filter(Boolean) as string[]; // يحذف المفاتيح الفارغة تلقائياً

// قائمة النماذج مرتبة حسب الأفضلية
const MODELS = [
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-1.5-flash',
];

// دالة لاستدعاء نموذج بمفتاح معين
async function tryWithKeyAndModel(
  apiKey: string,
  modelName: string,
  prompt: string,
  frontImage: string,
  backImage: string
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    }
  });

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: 'image/jpeg', data: frontImage } },
    { inlineData: { mimeType: 'image/jpeg', data: backImage } },
  ]);

  return result.response.text();
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
    console.log('=== Starting AI Analysis ===');
    console.log(`Available API keys: ${ALL_API_KEYS.length}`);

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

    // ===== نظام التناوب التلقائي: كل مفتاح × كل نموذج =====
    let rawText: string | null = null;
    let usedModel = '';
    let usedKeyIndex = -1;
    const allErrors: string[] = [];

    outer:
    for (let ki = 0; ki < ALL_API_KEYS.length; ki++) {
      const key = ALL_API_KEYS[ki];
      const keyLabel = `Key#${ki + 1}`;

      for (const modelName of MODELS) {
        try {
          console.log(`🔑 ${keyLabel} × 🤖 ${modelName} — trying...`);
          rawText = await tryWithKeyAndModel(key, modelName, prompt, frontImage, backImage);
          usedModel = modelName;
          usedKeyIndex = ki + 1;
          console.log(`✅ SUCCESS with ${keyLabel} × ${modelName}`);
          break outer; // نجح — توقف عن المحاولة
        } catch (err: any) {
          const msg = (err.message || '').substring(0, 100);
          const is429 = err.status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('Too Many');
          console.warn(`⚠️ ${keyLabel} × ${modelName} failed${is429 ? ' [QUOTA]' : ''}: ${msg}`);
          allErrors.push(`${keyLabel}×${modelName}: ${msg}`);

          // إذا كان 429 على هذا المفتاح → جرب النموذج التالي (ثم انتقل للمفتاح التالي)
          // إذا كان خطأ آخر → جرب النموذج التالي أيضاً
          continue;
        }
      }
    }

    // إذا فشلت كل المحاولات
    if (!rawText) {
      const isAllQuota = allErrors.every(e => e.includes('quota') || e.includes('429') || e.includes('Too Many'));
      console.error('❌ All combinations failed:', allErrors.length, 'attempts');

      return NextResponse.json(
        {
          error: isAllQuota
            ? 'تجاوزت الحصة اليومية لجميع مفاتيح API. يرجى الانتظار حتى تتجدد الحصة أو إضافة مفتاح جديد.'
            : 'فشلت جميع نماذج الذكاء الاصطناعي. يرجى المحاولة لاحقاً.',
          details: allErrors.slice(0, 4).join('\n'),
          quota_exceeded: isAllQuota,
          keys_count: ALL_API_KEYS.length,
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

    console.log(`🎯 Done | Model: ${usedModel} | Key: #${usedKeyIndex} | Category: ${category?.name_ar || 'Default'}`);

    return NextResponse.json({
      name_ar: productData.name_ar,
      name_en: productData.name_en,
      description_ar: productData.description_ar,
      description_en: productData.description_en,
      category_id,
      _debug: { model: usedModel, key_index: usedKeyIndex },
    });

  } catch (error: any) {
    console.error('=== UNEXPECTED ERROR ===', error.message);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع: ' + error.message },
      { status: 500 }
    );
  }
}
