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
    Tags,
    Heart,
    LayoutGrid,
    Ticket,
    X,
    ChevronLeft,
    Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useSidebar } from '@/contexts/SidebarContext';

const sidebarItems = [
    { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard, color: 'text-emerald-600', activeBg: 'bg-emerald-50' },
    { href: '/products', label: 'المنتجات', icon: ShoppingBag, color: 'text-blue-600', activeBg: 'bg-blue-50' },
    { href: '/orders', label: 'الطلبات', icon: ShoppingCart, color: 'text-amber-600', activeBg: 'bg-amber-50' },
    { href: '/categories', label: 'الأقسام', icon: FolderTree, color: 'text-violet-600', activeBg: 'bg-violet-50' },
    { href: '/offers', label: 'العروض', icon: Tags, color: 'text-rose-600', activeBg: 'bg-rose-50' },
    { href: '/coupons', label: 'الكوبونات', icon: Ticket, color: 'text-cyan-600', activeBg: 'bg-cyan-50' },
    { href: '/homepage', label: 'الصفحة الرئيسية', icon: LayoutGrid, color: 'text-teal-600', activeBg: 'bg-teal-50' },
    { href: '/favorites', label: 'المفضلة', icon: Heart, color: 'text-pink-600', activeBg: 'bg-pink-50' },
    { href: '/users', label: 'المستخدمين', icon: Users, color: 'text-indigo-600', activeBg: 'bg-indigo-50' },
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
                "fixed md:sticky top-0 right-0 z-50 md:z-auto h-screen w-[270px] bg-white border-l border-gray-100 flex flex-col transition-transform duration-300 ease-in-out shadow-sm",
                isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                {/* Logo & Close button */}
                <div className="h-[72px] flex items-center justify-between px-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <Store className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-800 text-sm">الأمل هايبرماركت</h1>
                            <p className="text-[10px] text-gray-400 font-medium">لوحة التحكم</p>
                        </div>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">القائمة الرئيسية</p>
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
                                        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? `${item.activeBg} ${item.color} shadow-sm`
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                    )}
                                >
                                    <div className={cn(
                                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                                        isActive
                                            ? `bg-white shadow-sm ${item.color}`
                                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                                    )}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="flex-1">{item.label}</span>
                                    {isActive && (
                                        <ChevronLeft size={16} className="opacity-60" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-all duration-200">
                            <LogOut size={18} />
                        </div>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
