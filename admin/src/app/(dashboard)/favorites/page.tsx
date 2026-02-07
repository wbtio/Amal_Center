'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Search, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { formatIQD } from '@/lib/utils';
import { Header } from '@/components/layout/Header';

interface FavoriteProduct {
  id: string;
  name: string;
  name_ar: string;
  image_url: string;
  price_iqd: number;
  stock_quantity: number;
  is_active: boolean;
  favorite_count: number;
  categories?: {
    name_ar: string;
  }[] | null;
}

export default function FavoritesPage() {
  const [products, setProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      console.log('Fetching wishlist data...');
      
      // First, get all wishlist items grouped by product_id with count
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlist')
        .select('product_id');

      console.log('Wishlist data:', wishlistData);
      console.log('Wishlist error:', wishlistError);

      if (wishlistError) {
        console.error('Error fetching wishlist:', wishlistError);
        setLoading(false);
        return;
      }

      // Count favorites per product
      const favoriteCountMap: Record<string, number> = {};
      let total = 0;
      
      wishlistData?.forEach((item) => {
        favoriteCountMap[item.product_id] = (favoriteCountMap[item.product_id] || 0) + 1;
        total++;
      });

      setTotalFavorites(total);

      // Get unique product IDs that have favorites
      const productIds = Object.keys(favoriteCountMap);

      if (productIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // Fetch product details for favorited products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, name_ar, image_url, price_iqd, stock_quantity, is_active, categories(name_ar)')
        .in('id', productIds);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        setLoading(false);
        return;
      }

      // Combine product data with favorite counts and sort by count
      const productsWithFavorites: FavoriteProduct[] = (productsData || [])
        .map((product) => ({
          ...product,
          favorite_count: favoriteCountMap[product.id] || 0,
        }))
        .sort((a, b) => b.favorite_count - a.favorite_count);

      setProducts(productsWithFavorites);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name_ar.includes(searchTerm) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <>
      <Header title="المنتجات المفضلة" />
      <div className="p-8 text-center">جاري التحميل...</div>
    </>
  );

  return (
    <>
    <Header title="المنتجات المفضلة" />
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex justify-between items-center gap-3 mb-4 md:mb-6">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">المنتجات المفضلة</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">المنتجات الأكثر إضافة للمفضلة من قبل العملاء</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Heart className="text-red-500" size={20} />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-gray-800">{totalFavorites}</p>
              <p className="text-[10px] md:text-sm text-gray-500">إجمالي التفضيلات</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-gray-800">{products.length}</p>
              <p className="text-[10px] md:text-sm text-gray-500">منتجات مفضلة</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-gray-800">
                {products.length > 0 ? Math.round(totalFavorites / products.length) : 0}
              </p>
              <p className="text-[10px] md:text-sm text-gray-500">متوسط/منتج</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="بحث عن منتج..."
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">المنتج</th>
                <th className="px-6 py-4">القسم</th>
                <th className="px-6 py-4">السعر</th>
                <th className="px-6 py-4">المخزون</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    <Heart size={14} className="text-red-500" />
                    <span>عدد التفضيلات</span>
                  </div>
                </th>
                <th className="px-6 py-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/products/${product.id}`} className="flex items-center gap-3">
                      <div className="relative">
                        {index < 3 && (
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                          }`}>
                            {index + 1}
                          </div>
                        )}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name_ar} className="w-full h-full object-cover" />
                          ) : (
                            <Heart className="text-gray-400" size={24} />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 hover:text-primary transition-colors">{product.name_ar}</p>
                        <p className="text-xs text-gray-500">{product.name}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.categories?.[0]?.name_ar || '-'}</td>
                  <td className="px-6 py-4 font-bold text-primary">{formatIQD(product.price_iqd)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock_quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Heart size={16} className="text-red-500 fill-red-500" />
                      <span className="font-bold text-red-600">{product.favorite_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 rounded-full inline-block ml-2 ${product.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {product.is_active ? 'نشط' : 'غير نشط'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredProducts.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    {index < 3 && (
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10 ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                    )}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name_ar} className="w-full h-full object-cover" />
                      ) : (
                        <Heart className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-800 text-sm truncate">{product.name_ar}</p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span className="font-bold text-red-600 text-xs">{product.favorite_count}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{product.categories?.[0]?.name_ar || '-'}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-bold text-primary text-sm">{formatIQD(product.price_iqd)}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${product.stock_quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        مخزون: {product.stock_quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 md:p-12 text-center">
            <Heart className="mx-auto mb-3 text-gray-300" size={48} />
            <p className="text-gray-500 text-sm md:text-base">لا توجد منتجات مفضلة حالياً</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
