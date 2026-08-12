'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  createStorageImageName,
  optimizeImageForStorage,
  PRODUCT_IMAGE_OPTIONS,
  STORAGE_IMAGE_CACHE_CONTROL,
} from '@/lib/image-optimizer';
import { uploadProductThumbnail } from '@/lib/product-image-upload';
import { ArrowRight, Search, Loader2, ImageIcon, Check, PackagePlus } from 'lucide-react';

interface BulkImportFormProps {
  onBack: () => void;
}

interface SearchResult {
  barcode: string;
  name_ar: string;
  name_en: string;
  image_url: string;
  brand: string;
  quantity: string;
}

export default function BulkImportForm({ onBack }: BulkImportFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<'food' | 'beauty'>('food');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    supabase.from('categories').select('id, name_ar, name, is_active').eq('is_active', true).order('name_ar')
      .then(({ data }) => setCategories(data || []));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setSearchError('');

    try {
      const response = await fetch('/api/barcode/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, source }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'فشل البحث');

      setResults(data.products || []);
      setSelected({});
      setPrices({});
    } catch (error: any) {
      setSearchError(error.message);
    } finally {
      setSearching(false);
    }
  };

  const toggleSelect = (barcode: string) => {
    setSelected((prev) => ({ ...prev, [barcode]: !prev[barcode] }));
  };

  const selectedItems = results.filter((r) => selected[r.barcode]);

  const uploadRemoteImage = async (remoteUrl: string): Promise<string | null> => {
    try {
      const proxyRes = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: remoteUrl }),
      });
      if (!proxyRes.ok) return null;

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
      if (uploadError) return null;

      await uploadProductThumbnail(filePath, optimizedImage.file);

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);
      return publicUrl;
    } catch {
      return null;
    }
  };

  const handleImport = async () => {
    if (!categoryId || selectedItems.length === 0) return;

    setImporting(true);
    setImportProgress({ done: 0, total: selectedItems.length });

    for (const item of selectedItems) {
      const price = parseFloat(prices[item.barcode] || '0');

      let imageUrl = '';
      if (item.image_url) {
        imageUrl = (await uploadRemoteImage(item.image_url)) || '';
      }

      await supabase.from('products').insert({
        name_ar: item.name_ar,
        name: item.name_en,
        description_ar: item.brand,
        description: item.brand,
        price_iqd: price,
        price_usd: price / 1500,
        category_id: categoryId,
        stock_quantity: 100,
        image_url: imageUrl || null,
        is_active: true,
      });

      setImportProgress((prev) => ({ ...prev, done: prev.done + 1 }));
    }

    setImporting(false);
    router.push('/products');
    router.refresh();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowRight size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">استيراد منتجات بالجملة</h1>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSource('food')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${source === 'food' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              مواد غذائية
            </button>
            <button
              type="button"
              onClick={() => setSource('beauty')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${source === 'beauty' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              عطور ومستحضرات تجميل
            </button>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {source === 'beauty' ? 'ابحث عن عطور أو مستحضرات (مثال: perfume, shampoo)' : 'ابحث عن منتجات (اسم أو قسم، مثال: شاي، بسكويت، عصير)'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: tea"
            />
            <button
              type="submit"
              disabled={!query.trim() || searching}
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {searching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              <span>بحث</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">البحث يفضّل الكلمات الإنجليزية (قاعدة بيانات عالمية عامة)</p>
          {searchError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{searchError}</div>
          )}
        </form>

        {results.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 flex flex-wrap items-center gap-4 sticky top-2 z-10">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">القسم لكل المنتجات المختارة</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">اختر القسم...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                محدد: <strong className="text-primary">{selectedItems.length}</strong>
              </div>
              <button
                onClick={handleImport}
                disabled={!categoryId || selectedItems.length === 0 || importing}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {importing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>جاري الاستيراد {importProgress.done}/{importProgress.total}</span>
                  </>
                ) : (
                  <>
                    <PackagePlus size={18} />
                    <span>استيراد المحدد</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((item) => {
                const isSelected = !!selected[item.barcode];
                return (
                  <div
                    key={item.barcode}
                    className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${isSelected ? 'border-primary' : 'border-gray-200'}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSelect(item.barcode)}
                      className="w-full text-right"
                    >
                      <div className="relative w-full h-32 bg-gray-100">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name_ar} loading="lazy" className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon size={32} />
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-bold text-gray-800 line-clamp-2 min-h-[32px]">{item.name_ar || item.name_en}</p>
                        {item.brand && <p className="text-[10px] text-gray-400 mt-0.5 truncate">{item.brand}</p>}
                      </div>
                    </button>
                    {isSelected && (
                      <div className="px-2.5 pb-2.5">
                        <input
                          type="number"
                          min="0"
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs"
                          placeholder="السعر (د.ع)"
                          value={prices[item.barcode] || ''}
                          onChange={(e) => setPrices((prev) => ({ ...prev, [item.barcode]: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
