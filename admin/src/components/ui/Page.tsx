'use client';

/**
 * عناصر الواجهة المشتركة — مصدر واحد للشكل حتى لا تختلف صفحة عن أخرى.
 * القاعدة: أسطح بيضاء، حدود رفيعة، بلا تدرّجات ولا ظلال ثقيلة.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** عنوان الصفحة + وصف + أزرار الإجراءات */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
      <div className="min-w-0">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

/** بطاقة بيضاء بحد رفيع — الوعاء الافتراضي لكل محتوى */
export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-200',
      padded && 'p-4 md:p-5',
      className,
    )}>
      {children}
    </div>
  );
}

/** ترويسة داخل البطاقة */
export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
      <h2 className="text-sm md:text-base font-bold text-gray-800">{title}</h2>
      {action}
    </div>
  );
}

/** رقم مؤشر — مسطّح، بلا تدرّج */
export function StatCard({
  label,
  value,
  note,
  icon,
  tone = 'gray',
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: ReactNode;
  tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red' | 'violet';
}) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-50 text-gray-600',
    green: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    violet: 'bg-violet-50 text-violet-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] md:text-xs text-gray-500 mb-1 truncate">{label}</p>
          <p className="text-lg md:text-2xl font-bold text-gray-800 truncate">{value}</p>
          {note && <div className="mt-1 text-[10px] md:text-xs text-gray-500 truncate">{note}</div>}
        </div>
        {icon && (
          <div className={cn('w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0', tones[tone])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/** حالة فارغة موحّدة */
export function EmptyState({
  icon,
  title,
  hint,
  action,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 py-12 md:py-14 text-center px-4">
      {icon && <div className="text-gray-300 mb-3 flex justify-center">{icon}</div>}
      <p className="text-gray-700 font-medium text-sm">{title}</p>
      {hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** شارة حالة */
export function Badge({
  children,
  tone = 'gray',
}: {
  children: ReactNode;
  tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red' | 'violet' | 'lime';
}) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    lime: 'bg-lime-50 text-lime-700 border-lime-200',
  };

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border', tones[tone])}>
      {children}
    </span>
  );
}

/** أنماط الأزرار — تُستخدم كـ className على button أو Link */
export const btn = {
  primary: 'inline-flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 bg-primary text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60',
  ghost: 'inline-flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 border border-gray-200 text-gray-700 bg-white rounded-xl text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60',
  danger: 'inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 bg-white rounded-xl text-xs md:text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors',
};

/** حقل إدخال موحّد */
export const field = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors';
