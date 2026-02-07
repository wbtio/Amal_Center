'use client';

import { Bell, Search, X, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useSidebar } from '@/contexts/SidebarContext';

type SearchResult = {
  id: string;
  type: 'product' | 'order' | 'category';
  title: string;
  subtitle?: string;
};

export function Header({ title }: { title: string }) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      const results: SearchResult[] = [];

      // Search Products
      const { data: products } = await supabase
        .from('products')
        .select('id, name_ar, name')
        .or(`name_ar.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`)
        .limit(5);

      if (products) {
        products.forEach(p => results.push({
          id: p.id,
          type: 'product',
          title: p.name_ar,
          subtitle: p.name
        }));
      }

      // Search Orders by ID
      if (searchQuery.length >= 4) {
        const { data: orders } = await supabase
          .from('orders')
          .select('id, delivery_address, total_iqd')
          .ilike('id', `%${searchQuery}%`)
          .limit(3);

        if (orders) {
          orders.forEach(o => results.push({
            id: o.id,
            type: 'order',
            title: `طلب #${o.id.slice(0, 8)}`,
            subtitle: o.delivery_address?.slice(0, 30)
          }));
        }
      }

      // Search Categories
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name_ar, name')
        .or(`name_ar.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`)
        .limit(3);

      if (categories) {
        categories.forEach(c => results.push({
          id: c.id,
          type: 'category',
          title: c.name_ar,
          subtitle: c.name
        }));
      }

      setSearchResults(results);
      setIsSearching(false);
      setShowResults(true);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery('');
    setShowMobileSearch(false);

    switch (result.type) {
      case 'product':
        router.push(`/products/${result.id}`);
        break;
      case 'order':
        router.push(`/orders/${result.id}`);
        break;
      case 'category':
        router.push('/categories');
        break;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product': return 'منتج';
      case 'order': return 'طلب';
      case 'category': return 'قسم';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-blue-100 text-blue-700';
      case 'order': return 'bg-green-100 text-green-700';
      case 'category': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const SearchDropdown = () => (
    <>
      {showResults && (searchResults.length > 0 || isSearching) && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500 text-sm">جاري البحث...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-right border-b border-gray-100 last:border-0"
              >
                <span className={`text-xs px-2 py-1 rounded ${getTypeColor(result.type)}`}>
                  {getTypeLabel(result.type)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{result.title}</p>
                  {result.subtitle && (
                    <p className="text-xs text-gray-500">{result.subtitle}</p>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">لا توجد نتائج</div>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <header className="h-14 md:h-16 bg-white border-b border-gray-200 px-3 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
        {/* Right side: Menu button + Title */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 flex-shrink-0"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-base md:text-xl font-bold text-gray-800 truncate">{title}</h2>
        </div>

        {/* Left side: Search + Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <input
              type="text"
              placeholder="بحث في المنتجات، الطلبات..."
              className="pr-10 pl-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
            <SearchDropdown />
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Search size={20} />
          </button>

          <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="hidden sm:flex items-center gap-3 border-r border-gray-200 pr-4 mr-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex items-center gap-2 p-3 border-b border-gray-200">
            <button
              onClick={() => { setShowMobileSearch(false); setSearchQuery(''); setSearchResults([]); }}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <X size={22} />
            </button>
            <div className="relative flex-1" ref={searchRef}>
              <input
                type="text"
                placeholder="بحث في المنتجات، الطلبات..."
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                autoFocus
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-60px)]">
            {isSearching ? (
              <div className="p-6 text-center text-gray-500">جاري البحث...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-right border-b border-gray-100"
                >
                  <span className={`text-xs px-2 py-1 rounded ${getTypeColor(result.type)}`}>
                    {getTypeLabel(result.type)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{result.title}</p>
                    {result.subtitle && (
                      <p className="text-xs text-gray-500">{result.subtitle}</p>
                    )}
                  </div>
                </button>
              ))
            ) : searchQuery.length >= 2 ? (
              <div className="p-6 text-center text-gray-500">لا توجد نتائج</div>
            ) : (
              <div className="p-6 text-center text-gray-400 text-sm">اكتب للبحث...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
