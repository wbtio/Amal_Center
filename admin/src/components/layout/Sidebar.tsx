'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    Bell,
    X,
    Store,
    Settings,
    CreditCard,
    History,
    MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useSidebar } from '@/contexts/SidebarContext';
import { canAccess, roleDef } from '@/lib/roles';

type UserRole = string | null;

const sidebarItems = [
    { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/products', label: 'المنتجات', icon: ShoppingBag },
    { href: '/orders', label: 'الطلبات', icon: ShoppingCart, badge: 'orders' },
    { href: '/categories', label: 'الأقسام', icon: FolderTree },
    { href: '/branches', label: 'الفروع', icon: MapPin },
    { href: '/offers', label: 'العروض', icon: Tags },
    { href: '/coupons', label: 'الكوبونات', icon: Ticket },
    { href: '/homepage', label: 'الصفحة الرئيسية', icon: LayoutGrid },
    { href: '/notifications', label: 'الإشعارات', icon: Bell },
    { href: '/favorites', label: 'المفضلة', icon: Heart },
    { href: '/users', label: 'الفريق والصلاحيات', icon: Users },
    { href: '/activity', label: 'سجل النشاط', icon: History },
    { href: '/payment', label: 'الدفع الإلكتروني', icon: CreditCard },
    { href: '/content', label: 'المحتوى والإعدادات', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, closeSidebar } = useSidebar();
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [userName, setUserName] = useState<string>('');
    const [pendingOrders, setPendingOrders] = useState(0);

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('role, full_name')
                .eq('id', session.user.id)
                .single();

            setUserRole((profile?.role as UserRole) ?? null);
            setUserName(profile?.full_name || session.user.email?.split('@')[0] || 'مستخدم');
        };

        loadProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            loadProfile();
        });

        return () => subscription.unsubscribe();
    }, []);

    // شارة الطلبات التي تنتظر تحرّكاً — تتحدّث لحظياً
    useEffect(() => {
        const loadPending = async () => {
            const { count } = await supabase
                .from('orders')
                .select('id', { count: 'exact', head: true })
                .in('status', ['pending', 'confirmed', 'preparing']);
            setPendingOrders(count ?? 0);
        };

        loadPending();

        const channel = supabase
            .channel('sidebar-orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, loadPending)
            .subscribe();

        return () => { void supabase.removeChannel(channel); };
    }, []);

    // لا نعرض إلا ما يسمح به دور المستخدم — نفس منطق الـ middleware
    const filteredItems = sidebarItems.filter(item =>
        userRole ? canAccess(userRole, item.href) : false
    );

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            <aside className={cn(
                'fixed md:sticky top-0 right-0 z-50 md:z-auto h-screen w-[248px] bg-[#0E1613] flex flex-col transition-transform duration-300 ease-in-out',
                isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
            )}>
                {/* الهوية */}
                <div className="h-16 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-primary rounded-[10px] flex items-center justify-center flex-shrink-0">
                            <Store className="text-white" size={18} />
                        </div>
                        <div className="leading-tight">
                            <h1 className="font-bold text-[#F1F5F4] text-[13px]">الأمل سنتر</h1>
                            <p className="text-[10px] text-[#6B7C74]">لوحة التحكم</p>
                        </div>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="md:hidden p-1.5 rounded-lg hover:bg-white/5 text-[#8FA398] transition-colors"
                        aria-label="إغلاق القائمة"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* التنقل */}
                <nav className="flex-1 overflow-y-auto px-2.5 pb-3">
                    <div className="space-y-0.5">
                        {filteredItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            const showBadge = item.badge === 'orders' && pendingOrders > 0;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 768) closeSidebar();
                                    }}
                                    className={cn(
                                        'group relative flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-[13px] transition-colors duration-150',
                                        isActive
                                            ? 'bg-primary/15 text-[#ECFDF5]'
                                            : 'text-[#A9B8B0] hover:bg-white/[0.04] hover:text-[#E2E8E5]'
                                    )}
                                >
                                    <Icon
                                        size={17}
                                        className={cn('flex-shrink-0 transition-colors', isActive ? 'text-[#4ADE80]' : 'text-[#7A8C83] group-hover:text-[#A9B8B0]')}
                                    />
                                    <span className="flex-1 truncate">{item.label}</span>

                                    {showBadge && (
                                        <span className="min-w-[20px] h-[18px] px-1.5 bg-primary text-white rounded-full text-[10px] font-medium flex items-center justify-center flex-shrink-0">
                                            {pendingOrders > 99 ? '99+' : pendingOrders}
                                        </span>
                                    )}

                                    {isActive && (
                                        <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4ADE80] rounded-l-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* المستخدم والخروج */}
                <div className="border-t border-white/[0.06] p-2.5">
                    <div className="flex items-center gap-2.5 px-1.5 pb-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] text-[#4ADE80] text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                            {(userName || '؟').trim().charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 leading-tight">
                            <p className="text-[11px] text-[#E2E8E5] truncate">{userName || '...'}</p>
                            <p className="text-[10px] text-[#6B7C74]">{userRole ? roleDef(userRole).label : ''}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-[12px] text-[#8FA398] hover:bg-red-500/10 hover:text-red-300 w-full transition-colors"
                    >
                        <LogOut size={16} className="flex-shrink-0" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
