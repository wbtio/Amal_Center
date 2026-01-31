'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Upload, Loader2, Save, Sparkles, Camera, CheckCircle2 } from 'lucide-react';

interface AIProductFormProps {
  onBack: () => void;
}

export default function AIProductForm({ onBack }: AIProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'upload' | 'input' | 'review'>('upload');
  const [categories, setCategories] = useState<any[]>([]);
  
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  
  const [aiData, setAiData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    category_id: '',
    image_url: ''
  });

  const [userInput, setUserInput] = useState({
    price_iqd: '',
    stock_quantity: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('is_active', true);
    setCategories(data || []);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 10 ميجابايت');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'front') {
        setFrontImage(file);
        setFrontImagePreview(reader.result as string);
      } else {
        setBackImage(file);
        setBackImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const processWithAI = async () => {
    if (!frontImage || !backImage) {
      alert('يرجى رفع صورتي المنتج (الأمامية والخلفية)');
      return;
    }

    setLoading(true);

    try {
      console.log('Converting images to base64...');
      // تحويل الصور إلى base64
      const frontBase64 = await fileToBase64(frontImage);
      const backBase64 = await fileToBase64(backImage);
      
      console.log('Front image size:', frontBase64.length, 'chars');
      console.log('Back image size:', backBase64.length, 'chars');
      console.log('Categories:', categories.length);

      // استدعاء Gemini API لتحليل الصور
      console.log('Calling API...');
      const response = await fetch('/api/ai/analyze-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frontImage: frontBase64,
          backImage: backBase64,
          categories: categories.map(c => ({ id: c.id, name_ar: c.name_ar, name: c.name }))
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'فشل تحليل الصورة');
      }

      const data = await response.json();
      console.log('AI analysis completed:', data);

      // إزالة خلفية الصورة الأمامية
      console.log('Starting background removal...');
      const removeBgResponse = await fetch('/api/ai/remove-background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: frontBase64 })
      });

      console.log('Background removal response status:', removeBgResponse.status);

      if (!removeBgResponse.ok) {
        const errorData = await removeBgResponse.json();
        console.error('Background removal failed:', errorData);
        throw new Error(errorData.error || 'فشل إزالة الخلفية');
      }

      const bgResult = await removeBgResponse.json();
      console.log('Background removal result:', bgResult);
      
      const { imageUrl } = bgResult;

      setAiData({
        name_ar: data.name_ar,
        name_en: data.name_en,
        description_ar: data.description_ar,
        description_en: data.description_en,
        category_id: data.category_id,
        image_url: imageUrl
      });

      setStep('input');
    } catch (error: any) {
      console.error('Error processing with AI:', error);
      alert('حدث خطأ أثناء معالجة الصور: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const compressImage = (file: File, maxWidth: number = 800): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // تصغير الصورة إذا كانت كبيرة
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // تحويل إلى base64 بجودة 0.8
          const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
          resolve(base64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return compressImage(file, 800);
  };

  const handleSubmit = async () => {
    if (!userInput.price_iqd || !userInput.stock_quantity) {
      alert('يرجى إدخال السعر والكمية');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert({
        name_ar: aiData.name_ar,
        name: aiData.name_en,
        description_ar: aiData.description_ar,
        description: aiData.description_en,
        price_iqd: parseFloat(userInput.price_iqd),
        price_usd: parseFloat(userInput.price_iqd) / 1500,
        category_id: aiData.category_id,
        stock_quantity: parseInt(userInput.stock_quantity),
        image_url: aiData.image_url,
        is_active: true
      });

      if (error) throw error;
      
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      alert('حدث خطأ: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name_ar || 'غير محدد';
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowRight size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">إضافة منتج بالذكاء الاصطناعي</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-purple-600' : step === 'input' || step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'upload' ? 'bg-purple-600 text-white' : step === 'input' || step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
              {step === 'input' || step === 'review' ? <CheckCircle2 size={18} /> : '1'}
            </div>
            <span className="font-medium">رفع الصور</span>
          </div>
          
          <div className="w-12 h-0.5 bg-gray-300"></div>
          
          <div className={`flex items-center gap-2 ${step === 'input' ? 'text-purple-600' : step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'input' ? 'bg-purple-600 text-white' : step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
              {step === 'review' ? <CheckCircle2 size={18} /> : '2'}
            </div>
            <span className="font-medium">إدخال البيانات</span>
          </div>
          
          <div className="w-12 h-0.5 bg-gray-300"></div>
          
          <div className={`flex items-center gap-2 ${step === 'review' ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="font-medium">المراجعة</span>
          </div>
        </div>

        {/* Step 1: Upload Images */}
        {step === 'upload' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <Sparkles className="mx-auto text-purple-600 mb-3" size={48} />
              <h2 className="text-xl font-bold text-gray-800 mb-2">صور المنتج من جميع الجوانب</h2>
              <p className="text-gray-600">سيقوم الذكاء الاصطناعي باستخراج جميع المعلومات تلقائياً</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Front Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الأمامية</label>
                {frontImagePreview ? (
                  <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-purple-200">
                    <img src={frontImagePreview} alt="Front" className="w-full h-full object-contain" />
                    <button
                      onClick={() => { setFrontImage(null); setFrontImagePreview(null); }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:bg-purple-100 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e, 'front')}
                      className="hidden"
                    />
                    <Camera className="text-purple-400 mb-2" size={40} />
                    <span className="text-sm font-medium text-purple-600">اختر الصورة الأمامية</span>
                    <span className="text-xs text-purple-400 mt-1">PNG, JPG حتى 10MB</span>
                  </label>
                )}
              </div>

              {/* Back Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الخلفية</label>
                {backImagePreview ? (
                  <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-purple-200">
                    <img src={backImagePreview} alt="Back" className="w-full h-full object-contain" />
                    <button
                      onClick={() => { setBackImage(null); setBackImagePreview(null); }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:bg-purple-100 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e, 'back')}
                      className="hidden"
                    />
                    <Camera className="text-purple-400 mb-2" size={40} />
                    <span className="text-sm font-medium text-purple-600">اختر الصورة الخلفية</span>
                    <span className="text-xs text-purple-400 mt-1">PNG, JPG حتى 10MB</span>
                  </label>
                )}
              </div>
            </div>

            <button
              onClick={processWithAI}
              disabled={!frontImage || !backImage || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>جاري المعالجة بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span>معالجة بالذكاء الاصطناعي</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: User Input */}
        {step === 'input' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">أدخل السعر والكمية</h2>
              <p className="text-gray-600">تم استخراج باقي المعلومات تلقائياً</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعر (د.ع)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-lg"
                  value={userInput.price_iqd}
                  onChange={(e) => setUserInput({...userInput, price_iqd: e.target.value})}
                  placeholder="مثال: 25000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الكمية المتوفرة</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-lg"
                  value={userInput.stock_quantity}
                  onChange={(e) => setUserInput({...userInput, stock_quantity: e.target.value})}
                  placeholder="مثال: 100"
                />
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-purple-900 mb-3">المعلومات المستخرجة تلقائياً:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الاسم بالعربي:</span>
                  <span className="font-medium text-gray-800">{aiData.name_ar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الاسم بالإنجليزي:</span>
                  <span className="font-medium text-gray-800">{aiData.name_en}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">القسم:</span>
                  <span className="font-medium text-gray-800">{getCategoryName(aiData.category_id)}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">الوصف:</span>
                  <span className="font-medium text-gray-800 text-left max-w-xs">{aiData.description_ar.substring(0, 100)}...</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('review')}
              disabled={!userInput.price_iqd || !userInput.stock_quantity}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>التالي: المراجعة</span>
            </button>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 'review' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">مراجعة المنتج</h2>
              <p className="text-gray-600">تأكد من صحة المعلومات قبل الحفظ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">الاسم بالعربي</label>
                  <p className="font-bold text-gray-800">{aiData.name_ar}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">الاسم بالإنجليزي</label>
                  <p className="font-bold text-gray-800">{aiData.name_en}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">السعر</label>
                  <p className="font-bold text-primary text-xl">{parseFloat(userInput.price_iqd).toLocaleString()} د.ع</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">الكمية</label>
                  <p className="font-bold text-gray-800">{userInput.stock_quantity}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">القسم</label>
                  <p className="font-bold text-gray-800">{getCategoryName(aiData.category_id)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">صورة المنتج</label>
                <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img src={aiData.image_url} alt="Product" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">الوصف</label>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{aiData.description_ar}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('input')}
                className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                رجوع
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>حفظ المنتج</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
