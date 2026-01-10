'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  LogOut,
  List,
  Heart,
  Tag,
  Smartphone,
  Ticket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  {
    title: 'لوحة التحكم',
    href: '/',
    icon: LayoutDashboard
  },
  {
    title: 'المنتجات',
    href: '/products',
    icon: ShoppingBag
  },
  {
    title: 'المفضلة',
    href: '/favorites',
    icon: Heart
  },
  {
    title: 'العروض',
    href: '/offers',
    icon: Tag
  },
  {
    title: 'الأقسام',
    href: '/categories',
    icon: List
  },
  {
    title: 'الطلبات',
    href: '/orders',
    icon: ShoppingCart
  },
  {
    title: 'المستخدمين',
    href: '/users',
    icon: Users
  },
  {
    title: 'الصفحة الرئيسية',
    href: '/homepage',
    icon: Smartphone
  },
  {
    title: 'الكوبونات',
    href: '/coupons',
    icon: Ticket
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="sticky top-0 h-screen w-64 bg-white border-l border-gray-200 flex flex-col shadow-sm">
      <div className="p-5 border-b border-gray-100 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center text-lg font-bold">
          أ
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-900">الأمل ماركت</h1>
          <span className="text-xs text-gray-500">لوحة التحكم</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
