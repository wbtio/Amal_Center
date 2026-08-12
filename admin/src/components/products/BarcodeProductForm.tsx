'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  createStorageImageName,
  optimizeImageForStorage,
  PRODUCT_IMAGE_OPTIONS,
  STORAGE_IMAGE_CACHE_CONTROL,
} from '@/lib/image-optimizer';
import { uploadProductThumbnail } from '@/lib/product-image-upload';
import { ArrowRight, Loader2, Save, ImageIcon, X, ScanBarcode, Search, AlertTriangle } from 'lucide-react';

interface BarcodeProductFormProps {
  onBack: () => void;
}

export default function BarcodeProductForm({ onBack }: BarcodeProductFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'scan' | 'edit'>('scan');
  const [barcode, setBarcode] = useState('');
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');

  const [formData, setFormData] = useState({
    name_ar: '',
    name: '',
    description_ar: '',
    description: '',
    price_iqd: '',
    category_id: '',
    stock_quantity: '',
    image_url: '',
  });

  useEffect(() => {
    fetchCategories();
    inputRef.current?.focus();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('id, name_ar, name, is_active').eq('is_active', true);
    setCategories(data || []);
  };

  const handleLookup = async () => {
    if (!barcode.trim()) return;
    setLooking(true);
    setLookupError('');
    setNotFound(false);

    try {
      const response = await fetch('/api/barcode/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: barcode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل البحث عن الباركود');
      }

      if (!data.found) {
        setNotFound(true);
        setFormData((f) => ({ ...f, name_ar: '', name: '' }));
        setStep('edit');
        return;
      }

      setBrand(data.brand || '');
      setQuantity(data.quantity || '');
      setFormData((f) => ({
        ...f,
        name_ar: data.name_ar || '',
        name: data.name_en || '',
      }));

      // نجلب صورة المنتج من الباركود عبر البروكسي الحالي ونرفعها إلى التخزين الخاص بنا
      if (data.image_url) {
        await downloadAndUploadImage(data.image_url);
      }

      setStep('edit');
    } catch (error: any) {
      setLookupError(error.message);
    } finally {
      setLooking(false);
    }
  };

  const downloadAndUploadImage = async (remoteUrl: string) => {
    setUploading(true);
    try {
      const proxyRes = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: remoteUrl }),
      });

      if (!proxyRes.ok) return;

      const blob = await proxyRes.blob();
      const optimizedImage = await optimizeImageForStorage(blob, PRODUCT_IMAGE_OPTIONS);
      const fileName = createStorageImageName(optimizedImage.extension);
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, optimizedImage.file, {
          cacheControl: STORAGE_IMAGE_CACHE_CONTROL,
          contentType: optimizedImage.contentType,
        });

      if (uploadError) throw uploadError;

      await uploadProductThumbnail(filePath, optimizedImage.file);

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);

      setFormData((f) => ({ ...f, image_url: publicUrl }));
      setImagePreview(publicUrl);
    } catch (error: any) {
      console.error('Error downloading/uploading barcode image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 12 ميجابايت');
      return;
    }

    setUploading(true);

    try {
      const optimizedImage = await optimizeImageForStorage(file, PRODUCT_IMAGE_OPTIONS);
      const fileName = createStorageImageName(optimizedImage.extension);
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, optimizedImage.file, {
          cacheControl: STORAGE_IMAGE_CACHE_CONTROL,
          contentType: optimizedImage.contentType,
        });

      if (uploadError) throw uploadError;

      await uploadProductThumbnail(filePath, optimizedImage.file);

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image_url: '' });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert({
        name_ar: formData.name_ar,
        name: formData.name,
        description_ar: formData.description_ar,
        description: formData.description,
        price_iqd: parseFloat(formData.price_iqd),
        price_usd: parseFloat(formData.price_iqd) / 1500,
        category_id: formData.category_id,
        stock_quantity: parseInt(formData.stock_quantity),
        image_url: formData.image_url || null,
        is_active: true,
      });

      if (error) throw error;
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'scan') {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowRight size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">إضافة عبر الباركود</h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <ScanBarcode className="mx-auto text-primary mb-3" size={48} />
            <h2 className="text-xl font-bold text-gray-800 mb-2">امسح أو أدخل الباركود</h2>
            <p className="text-gray-600 text-sm">
              سنبحث عن المنتج في قاعدة بيانات باركود عامة ومجانية (Open Food Facts) ونعبّئ الاسم والصورة تلقائياً
            </p>
          </div>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-lg tracking-widest"
              placeholder="مثال: 6291041500213"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value.replace(/[^\d]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            />
            <button
              onClick={handleLookup}
              disabled={!barcode.trim() || looking}
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {looking ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              <span>بحث</span>
            </button>
          </div>

          {lookupError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-sm text-red-700">
              <AlertTriangle size={16} />
              <span>{lookupError}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep('scan')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowRight size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">إضافة عبر الباركود</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {notFound && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 text-sm text-amber-800">
            <AlertTriangle size={16} />
            <span>لم يتم العثور على هذا الباركود ({barcode}) في قاعدة البيانات. يمكنك إدخال بيانات المنتج يدوياً وسيتم حفظ الباركود ضمن معلوماتك الخاصة لاحقاً.</span>
          </div>
        )}

        {(brand || quantity) && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            {brand && <span className="font-bold ml-2">{brand}</span>}
            {quantity && <span>{quantity}</span>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (بالعربية)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (بالإنجليزية)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر (د.ع)</label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.price_iqd}
                onChange={(e) => setFormData({ ...formData, price_iqd: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الكمية المتوفرة</label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">اختر القسم...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف (بالعربية)</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة المنتج</label>

              {imagePreview ? (
                <div className="relative w-48 h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img src={imagePreview} alt="Preview" loading="lazy" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 hover:border-primary transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin text-primary mb-2" size={32} />
                      <span className="text-sm text-gray-500">جاري الرفع...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="text-gray-400 mb-2" size={40} />
                      <span className="text-sm font-medium text-gray-600">اختر صورة</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG حتى 12MB</span>
                    </>
                  )}
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              <span>حفظ المنتج</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
