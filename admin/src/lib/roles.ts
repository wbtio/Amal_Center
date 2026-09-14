/**
 * نظام الأدوار والصلاحيات — مصدر واحد للحقيقة.
 * تستخدمه: middleware (حماية المسارات)، Sidebar (إخفاء القوائم)، صفحة الفريق.
 *
 * ملاحظة: هذا حاجز واجهة فقط. الحماية الحقيقية في سياسات RLS بقاعدة البيانات
 * (is_admin / is_staff) — انظر scripts/phase1_roles_and_audit.sql
 */

export type Role =
  | 'admin'
  | 'super_admin'
  | 'branch_manager'
  | 'products_manager'
  | 'orders_staff'
  | 'accountant'
  | 'viewer'
  | 'customer';

export interface RoleDefinition {
  label: string;
  description: string;
  /** '*' يعني كل المسارات */
  paths: string[] | '*';
  /** الصفحة التي يهبط عليها بعد الدخول */
  home: string;
  /** ألوان الشارة — أصناف Tailwind كاملة حتى لا يحذفها الـ purge */
  badge: string;
  /** هل يظهر ضمن "فريق العمل" في صفحة المستخدمين */
  isStaff: boolean;
}

export const ROLES: Record<Role, RoleDefinition> = {
  admin: {
    label: 'مدير عام',
    description: 'صلاحية كاملة على كل الصفحات والإعدادات',
    paths: '*',
    home: '/',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    isStaff: true,
  },
  super_admin: {
    label: 'مدير عام',
    description: 'صلاحية كاملة على كل الصفحات والإعدادات',
    paths: '*',
    home: '/',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    isStaff: true,
  },
  branch_manager: {
    label: 'مدير فرع',
    description: 'يدير منتجات وطلبات وعروض فرعه',
    paths: ['/', '/products', '/categories', '/orders', '/offers', '/coupons', '/favorites', '/branches'],
    home: '/',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    isStaff: true,
  },
  products_manager: {
    label: 'موظف منتجات',
    description: 'يضيف ويعدّل المنتجات والأقسام فقط',
    paths: ['/products', '/categories'],
    home: '/products',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    isStaff: true,
  },
  orders_staff: {
    label: 'موظف طلبات',
    description: 'يتابع الطلبات ويغيّر حالاتها — لا يرى الإيرادات',
    paths: ['/orders'],
    home: '/orders',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    isStaff: true,
  },
  accountant: {
    label: 'محاسب',
    description: 'يرى المبيعات والطلبات — بلا تعديل',
    paths: ['/', '/orders'],
    home: '/',
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    isStaff: true,
  },
  viewer: {
    label: 'مشاهد فقط',
    description: 'اطّلاع بلا أي تعديل',
    paths: ['/', '/products', '/orders'],
    home: '/',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    isStaff: true,
  },
  customer: {
    label: 'زبون',
    description: 'مستخدم التطبيق — لا يدخل لوحة التحكم',
    paths: [],
    home: '/login',
    badge: 'bg-gray-100 text-gray-600 border-gray-200',
    isStaff: false,
  },
};

/** الأدوار التي تُعرض في قائمة تغيير الصلاحية */
export const ASSIGNABLE_ROLES: Role[] = [
  'admin',
  'branch_manager',
  'products_manager',
  'orders_staff',
  'accountant',
  'viewer',
  'customer',
];

export function roleDef(role?: string | null): RoleDefinition {
  return ROLES[(role as Role)] ?? ROLES.customer;
}

export function roleLabel(role?: string | null): string {
  return roleDef(role).label;
}

export function isAdminRole(role?: string | null): boolean {
  return role === 'admin' || role === 'super_admin';
}

/** هل يسمح هذا الدور بفتح هذا المسار؟ */
export function canAccess(role: string | null | undefined, pathname: string): boolean {
  const { paths } = roleDef(role);
  if (paths === '*') return true;
  if (paths.length === 0) return false;
  if (pathname === '/') return paths.includes('/');
  return paths.some((p) => p !== '/' && pathname.startsWith(p));
}

/** أول صفحة مسموحة لهذا الدور — يُعاد التوجيه إليها عند المنع */
export function homePathFor(role: string | null | undefined): string {
  return roleDef(role).home;
}
