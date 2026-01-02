'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Loader2, Save, Trash2, ImageIcon, X } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name_ar: '',
    name: '',
    description_ar: '',
    description: '',
    price_iqd: '',
    price_usd: '',
    category_id: '',
    stock_quantity: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      alert('المنتج غير موجود');
      router.push('/products');
      return;
    }

    if (data) {
      setFormData({
        name_ar: data.name_ar || '',
        name: data.name || '',
        description_ar: data.description_ar || '',
        description: data.description || '',
        price_iqd: data.price_iqd?.toString() || '',
        price_usd: data.price_usd?.toString() || '',
        category_id: data.category_id || '',
        stock_quantity: data.stock_quantity?.toString() || '',
        image_url: data.image_url || '',
        is_active: data.is_active ?? true
      });
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('is_active', true);
    setCategories(data || []);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

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
    setSaving(true);

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name_ar: formData.name_ar,
          name: formData.name,
          description_ar: formData.description_ar,
          description: formData.description,
          price_iqd: parseFloat(formData.price_iqd),
          price_usd: parseFloat(formData.price_usd) || parseFloat(formData.price_iqd) / 1500,
          category_id: formData.category_id,
          stock_quantity: parseInt(formData.stock_quantity),
          image_url: formData.image_url || null,
          is_active: formData.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      alert('تم تحديث المنتج بنجاح');
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      alert('خطأ: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.')) {
      return;
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      alert('خطأ في الحذف: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="mr-2 text-gray-600">جاري التحميل...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowRight size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">تعديل المنتج</h1>
        </div>
        
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 size={18} />
          <span>حذف المنتج</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arabic Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (بالعربية) *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.name_ar}
                onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
              />
            </div>

            {/* English Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (بالإنجليزية) *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Price IQD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر (د.ع) *</label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.price_iqd}
                onChange={(e) => setFormData({...formData, price_iqd: e.target.value})}
              />
            </div>

            {/* Price USD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر ($) - اختياري</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="سيتم حسابه تلقائياً"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.price_usd}
                onChange={(e) => setFormData({...formData, price_usd: e.target.value})}
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الكمية المتوفرة *</label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">القسم *</label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">اختر القسم...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                ))}
              </select>
            </div>

            {/* Description Arabic */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف (بالعربية)</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.description_ar}
                onChange={(e) => setFormData({...formData, description_ar: e.target.value})}
              />
            </div>

            {/* Description English */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف (بالإنجليزية)</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة المنتج</label>
              
              {imagePreview ? (
                <div className="relative w-48 h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG حتى 5MB</span>
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Active Status */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">المنتج نشط (يظهر في التطبيق)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link
              href="/products"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              <span>حفظ التغييرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
