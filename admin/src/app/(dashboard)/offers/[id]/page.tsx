'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight, Save, Tag, Calendar, Percent, Package, Search, X, Plus } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';

interface Product {
  id: string;
  name: string;
  name_ar: string;
  image_url: string;
  price_iqd: number;
}

export default function EditOfferPage() {
  const router = useRouter();
  const params = useParams();
  const offerId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductSearch, setShowProductSearch] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
    start_date: '',
    end_date: '',
    is_active: true,
    image_url: '',
  });

  useEffect(() => {
    fetchOffer();
    fetchProducts();
  }, [offerId]);

  const fetchOffer = async () => {
    try {
      // Fetch offer
      const { data: offer, error: offerError } = await supabase
        .from('offers')
        .select('*')
        .eq('id', offerId)
        .single();

      if (offerError) throw offerError;

      // Format dates for datetime-local input
      const formatDateForInput = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16);
      };

      setFormData({
        name: offer.name || '',
        name_ar: offer.name_ar || '',
        description: offer.description || '',
        description_ar: offer.description_ar || '',
        discount_type: offer.discount_type,
        discount_value: offer.discount_value.toString(),
        start_date: formatDateForInput(offer.start_date),
        end_date: formatDateForInput(offer.end_date),
        is_active: offer.is_active,
        image_url: offer.image_url || '',
      });

      // Fetch offer products
      const { data: offerProducts, error: productsError } = await supabase
        .from('offer_products')
        .select(`
          product_id,
          products (
            id,
            name,
            name_ar,
            image_url,
            price_iqd
          )
        `)
        .eq('offer_id', offerId);

      if (!productsError && offerProducts) {
        const prods = offerProducts
          .map((op: any) => op.products)
          .filter(Boolean);
        setSelectedProducts(prods);
      }
    } catch (error) {
      console.error('Error fetching offer:', error);
      alert('حدث خطأ أثناء جلب بيانات العرض');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, name_ar, image_url, price_iqd')
      .eq('is_active', true)
      .order('name_ar');

    if (!error && data) {
      setProducts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name_ar || !formData.discount_value || !formData.start_date || !formData.end_date) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('يرجى اختيار منتج واحد على الأقل');
      return;
    }

    setSaving(true);

    try {
      // Update offer
      const { error: offerError } = await supabase
        .from('offers')
        .update({
          name: formData.name || formData.name_ar,
          name_ar: formData.name_ar,
          description: formData.description,
          description_ar: formData.description_ar,
          discount_type: formData.discount_type,
          discount_value: parseFloat(formData.discount_value),
          start_date: new Date(formData.start_date).toISOString(),
          end_date: new Date(formData.end_date).toISOString(),
          is_active: formData.is_active,
          image_url: formData.image_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', offerId);

      if (offerError) throw offerError;

      // Delete existing offer products
      await supabase
        .from('offer_products')
        .delete()
        .eq('offer_id', offerId);

      // Add new products to offer
      const offerProducts = selectedProducts.map(product => ({
        offer_id: offerId,
        product_id: product.id,
      }));

      const { error: productsError } = await supabase
        .from('offer_products')
        .insert(offerProducts);

      if (productsError) throw productsError;

      router.push('/offers');
    } catch (error) {
      console.error('Error updating offer:', error);
      alert('حدث خطأ أثناء تحديث العرض');
    } finally {
      setSaving(false);
    }
  };

  const addProduct = (product: Product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    setSearchTerm('');
    setShowProductSearch(false);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const filteredProducts = products.filter(product =>
    !selectedProducts.find(p => p.id === product.id) &&
    (product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatIQD = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' د.ع';
  };

  const calculateDiscountedPrice = (price: number) => {
    if (!formData.discount_value) return price;
    const discountValue = parseFloat(formData.discount_value);
    if (formData.discount_type === 'percentage') {
      return price - (price * discountValue / 100);
    }
    return Math.max(0, price - discountValue);
  };

  if (loading) {
    return (
      <>
      <Header title="تعديل العرض" />
      <div className="p-3 sm:p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Header title="تعديل العرض" />
    <div className="p-3 sm:p-4 md:p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
        <Link
          href="/offers"
          className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        >
          <ArrowRight size={20} />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">تعديل العرض</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">{formData.name_ar}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Tag size={20} className="text-primary" />
                معلومات العرض
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم العرض (عربي) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم العرض (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وصف العرض (عربي)
                  </label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Discount Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Percent size={20} className="text-primary" />
                إعدادات الخصم
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع الخصم <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.discount_type}
                    onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="percentage">نسبة مئوية (%)</option>
                    <option value="fixed">مبلغ ثابت (د.ع)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    قيمة الخصم <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.discount_value}
                      onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      min="0"
                      max={formData.discount_type === 'percentage' ? '100' : undefined}
                      required
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {formData.discount_type === 'percentage' ? '%' : 'د.ع'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                مدة العرض
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ البدء <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الانتهاء <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Products Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={20} className="text-primary" />
                المنتجات المشمولة
                <span className="text-sm font-normal text-gray-500">({selectedProducts.length} منتج)</span>
              </h2>

              {/* Search Products */}
              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowProductSearch(true);
                  }}
                  onFocus={() => setShowProductSearch(true)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="ابحث عن منتج لإضافته..."
                />

                {/* Search Results Dropdown */}
                {showProductSearch && searchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">لا توجد نتائج</div>
                    ) : (
                      filteredProducts.slice(0, 10).map(product => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProduct(product)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-right"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.image_url ? (
                              <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-full h-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{product.name_ar}</p>
                            <p className="text-sm text-gray-500">{formatIQD(product.price_iqd)}</p>
                          </div>
                          <Plus size={20} className="text-primary" />
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Selected Products */}
              {selectedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Package size={40} className="mx-auto mb-2 opacity-50" />
                  <p>لم يتم اختيار أي منتج بعد</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-full h-full p-2 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{product.name_ar}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400 line-through">{formatIQD(product.price_iqd)}</span>
                          <span className="text-primary font-bold">{formatIQD(calculateDiscountedPrice(product.price_iqd))}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">الحالة</h2>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700">العرض مفعل</span>
              </label>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">معاينة</h2>
              
              <div className="bg-gradient-to-br from-primary/80 to-primary rounded-xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">
                  {formData.discount_value ? (
                    formData.discount_type === 'percentage' 
                      ? `${formData.discount_value}%`
                      : formatIQD(parseFloat(formData.discount_value))
                  ) : '0%'}
                </div>
                <div className="text-white/80 text-sm">خصم</div>
                <div className="mt-3 text-lg font-bold">
                  {formData.name_ar || 'اسم العرض'}
                </div>
                <div className="text-white/80 text-sm mt-1">
                  {selectedProducts.length} منتج مشمول
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save size={20} />
                  حفظ التغييرات
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Click outside to close search */}
      {showProductSearch && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowProductSearch(false)}
        />
      )}
    </div>
    </>
  );
}
