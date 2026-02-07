'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    FolderTree,
    Users,
    LogOut,
    Tag,
    Heart,
    Home,
    Ticket,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useSidebar } from '@/contexts/SidebarContext';

const sidebarItems = [
    { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/products', label: 'المنتجات', icon: ShoppingBag },
    { href: '/orders', label: 'الطلبات', icon: ShoppingCart },
    { href: '/categories', label: 'الأقسام', icon: FolderTree },
    { href: '/offers', label: 'العروض', icon: Tag },
    { href: '/coupons', label: 'الكوبونات', icon: Ticket },
    { href: '/homepage', label: 'الصفحة الرئيسية', icon: Home },
    { href: '/favorites', label: 'المفضلة', icon: Heart },
    { href: '/users', label: 'المستخدمين', icon: Users },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, closeSidebar } = useSidebar();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed md:sticky top-0 right-0 z-50 md:z-auto h-screen w-64 bg-white border-l border-gray-200 flex flex-col transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                {/* Logo & Close button */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">أ</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-primary text-sm">الأمل هايبرماركت</h1>
                            <p className="text-[10px] text-gray-400">لوحة التحكم</p>
                        </div>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="md:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                            closeSidebar();
                                        }
                                    }}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                    )}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
