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
    <div className="w-64 bg-white border-l border-gray-200 min-h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">الأمل ماركت</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              )}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
