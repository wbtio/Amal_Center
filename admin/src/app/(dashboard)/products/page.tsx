'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Search, FileDown, ChevronRight, ChevronLeft, Filter, X } from 'lucide-react';
import ExcelUploadModal from '@/components/products/ExcelUploadModal';
import Link from 'next/link';
import { formatIQD } from '@/lib/utils';
import { Image } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 20;
  
  const [filters, setFilters] = useState({
    category_id: '',
    is_active: 'all',
    stock_status: 'all'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, debouncedSearch, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('is_active', true);
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from('products')
      .select('*, categories(name_ar)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (debouncedSearch) {
      query = query.or(`name_ar.ilike.%${debouncedSearch}%,name.ilike.%${debouncedSearch}%`);
    }

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters.is_active !== 'all') {
      query = query.eq('is_active', filters.is_active === 'active');
    }

    if (filters.stock_status === 'low') {
      query = query.lt('stock_quantity', 10);
    } else if (filters.stock_status === 'out') {
      query = query.eq('stock_quantity', 0);
    } else if (filters.stock_status === 'in_stock') {
      query = query.gt('stock_quantity', 0);
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (!error) {
      setProducts(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (!error) {
        fetchProducts();
        alert('تم حذف المنتج بنجاح');
      } else {
        alert('حدث خطأ أثناء حذف المنتج: ' + error.message);
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      category_id: '',
      is_active: 'all',
      stock_status: 'all'
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.category_id || filters.is_active !== 'all' || filters.stock_status !== 'all' || searchTerm;

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowExcelModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors text-base font-bold shadow-md"
          >
            <FileDown size={22} />
            <span>رفع من Excel</span>
          </button>
          <Link 
            href="/products/new" 
            className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors text-base font-bold shadow-md"
          >
            <Plus size={22} />
            <span>إضافة منتج</span>
          </Link>
        </div>
      </div>

      {showExcelModal && (
        <ExcelUploadModal 
          onClose={() => setShowExcelModal(false)}
          onSuccess={() => {
            fetchProducts();
            setShowExcelModal(false);
          }}
          categories={categories}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="بحث عن منتج..."
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              <span>فلاتر</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <X size={18} />
                <span>مسح</span>
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={filters.category_id}
                  onChange={(e) => {
                    setFilters({...filters, category_id: e.target.value});
                    setCurrentPage(1);
                  }}
                >
                  <option value="">جميع الأقسام</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={filters.is_active}
                  onChange={(e) => {
                    setFilters({...filters, is_active: e.target.value});
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">الكل</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المخزون</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={filters.stock_status}
                  onChange={(e) => {
                    setFilters({...filters, stock_status: e.target.value});
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">الكل</option>
                  <option value="in_stock">متوفر</option>
                  <option value="low">منخفض (&lt;10)</option>
                  <option value="out">نفذ</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
            <span>إجمالي المنتجات: <strong className="text-primary">{totalCount.toLocaleString()}</strong></span>
            {loading && <span className="text-primary">جاري التحميل...</span>}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">المنتج</th>
                <th className="px-6 py-4">القسم</th>
                <th className="px-6 py-4">السعر</th>
                <th className="px-6 py-4">المخزون</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name_ar} className="w-full h-full object-cover" />
                      ) : (
                        <Image className="text-gray-400" size={24} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{product.name_ar}</p>
                      <p className="text-xs text-gray-500">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.categories?.name_ar}</td>
                  <td className="px-6 py-4 font-bold text-primary">{formatIQD(product.price_iqd)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock_quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 rounded-full inline-block ml-2 ${product.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {product.is_active ? 'نشط' : 'غير نشط'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/products/${product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {!loading && products.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              {hasActiveFilters ? 'لا توجد منتجات مطابقة للفلاتر' : 'لا توجد منتجات'}
            </div>
          )}
          
          {loading && (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2">جاري تحميل المنتجات...</p>
            </div>
          )}
        </div>

        {totalCount > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {startIndex + 1} - {endIndex} من {totalCount.toLocaleString()} منتج
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
