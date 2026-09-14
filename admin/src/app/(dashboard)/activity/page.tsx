'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';
import { roleDef } from '@/lib/roles';
import { SkeletonRows } from '@/components/ui/Skeleton';
import {
  History, Search, Loader2, Plus, Pencil, Trash2, ArrowLeft,
  ShoppingBag, ShoppingCart, FolderTree, Ticket, Tags, Settings,
  LayoutGrid, CreditCard, Users, TriangleAlert
} from 'lucide-react';

interface ActivityRow {
  id: number;
  actor_id: string | null;
  actor_name: string | null;
  actor_role: string | null;
  action: 'insert' | 'update' | 'delete' | string;
  entity_type: string;
  entity_id: string | null;
  entity_label: string | null;
  changes: Record<string, { from: unknown; to: unknown }> | null;
  created_at: string;
}

const PAGE_SIZE = 40;

/** أسماء الجداول بالعربي + أيقوناتها */
const ENTITIES: Record<string, { label: string; icon: typeof ShoppingBag; tone: string }> = {
  products: { label: 'منتج', icon: ShoppingBag, tone: 'bg-blue-50 text-blue-600' },
  categories: { label: 'قسم', icon: FolderTree, tone: 'bg-violet-50 text-violet-600' },
  orders: { label: 'طلب', icon: ShoppingCart, tone: 'bg-amber-50 text-amber-600' },
  coupons: { label: 'كوبون', icon: Ticket, tone: 'bg-cyan-50 text-cyan-600' },
  offers: { label: 'عرض', icon: Tags, tone: 'bg-rose-50 text-rose-600' },
  profiles: { label: 'مستخدم', icon: Users, tone: 'bg-indigo-50 text-indigo-600' },
  app_settings: { label: 'إعداد', icon: Settings, tone: 'bg-slate-50 text-slate-600' },
  banners: { label: 'بنر', icon: LayoutGrid, tone: 'bg-teal-50 text-teal-600' },
  home_sections: { label: 'قسم رئيسية', icon: LayoutGrid, tone: 'bg-teal-50 text-teal-600' },
  payment_gateway_settings: { label: 'إعداد دفع', icon: CreditCard, tone: 'bg-green-50 text-green-600' },
};

/** أسماء الحقول بالعربي */
const FIELDS: Record<string, string> = {
  price_iqd: 'السعر', price_usd: 'السعر بالدولار', original_price: 'السعر قبل الخصم',
  stock_quantity: 'المخزون', is_active: 'الحالة', active: 'الحالة',
  name_ar: 'الاسم', name: 'الاسم بالإنجليزي', description_ar: 'الوصف',
  category_id: 'القسم', image_url: 'الصورة', sort_order: 'الترتيب',
  status: 'حالة الطلب', payment_status: 'حالة الدفع', payment_method: 'طريقة الدفع',
  total_iqd: 'المبلغ', delivery_address: 'العنوان', delivery_phone: 'الهاتف',
  role: 'الصلاحية', full_name: 'الاسم', phone: 'الهاتف',
  discount_value: 'قيمة الخصم', usage_limit: 'حد الاستخدام', expires_at: 'تاريخ الانتهاء',
  code: 'الكود', value: 'القيمة', enabled: 'التفعيل', api_token: 'التوكن',
  parent_id: 'القسم الرئيسي', sales_count: 'عدد المبيعات', title: 'العنوان',
  branch_id: 'الفرع', name_en: 'الاسم بالإنجليزي', address_ar: 'العنوان',
  latitude: 'خط العرض', longitude: 'خط الطول', sort_order_branch: 'الترتيب',
};

const ORDER_STATUS: Record<string, string> = {
  pending: 'قيد الانتظار', confirmed: 'مؤكد', preparing: 'جاري التحضير',
  ready: 'جاهز', delivered: 'تم التوصيل', cancelled: 'ملغي',
  paid: 'مدفوع', failed: 'فشل', awaiting_payment: 'بانتظار الدفع',
  cash: 'نقداً', card: 'بطاقة', cod: 'عند الاستلام', wallet: 'محفظة',
};

const SENSITIVE = new Set(['api_token', 'webhook_secret']);

function fieldLabel(key: string) {
  return FIELDS[key] ?? key;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function formatValue(key: string, value: unknown, names: Record<string, string> = {}): string {
  if (SENSITIVE.has(key)) return '••••••';
  if (value === null || value === undefined || value === '') return 'فارغ';
  if (typeof value === 'boolean') return value ? 'نشط' : 'معطل';
  if (key === 'role') return roleDef(String(value)).label;
  // المعرّفات تُعرض بأسمائها — فرع أو قسم، لا UUID خام
  if (UUID_RE.test(String(value))) return names[String(value)] ?? String(value).slice(0, 8);
  if (ORDER_STATUS[String(value)]) return ORDER_STATUS[String(value)];
  if (typeof value === 'number') return value.toLocaleString('en-US');
  const str = String(value);
  if (/^\d+(\.\d+)?$/.test(str)) return Number(str).toLocaleString('en-US');
  if (str.startsWith('http')) return 'رابط';
  return str.length > 60 ? str.slice(0, 60) + '…' : str;
}

const ACTIONS: Record<string, { label: string; icon: typeof Plus; tone: string }> = {
  insert: { label: 'أضاف', icon: Plus, tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  update: { label: 'عدّل', icon: Pencil, tone: 'bg-blue-50 text-blue-700 border-blue-200' },
  delete: { label: 'حذف', icon: Trash2, tone: 'bg-red-50 text-red-700 border-red-200' },
};

function dayLabel(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (same(d, today)) return 'اليوم';
  if (same(d, yesterday)) return 'أمس';
  return d.toLocaleDateString('ar-IQ', { day: 'numeric', month: 'long', year: 'numeric' });
}

function timeLabel(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
}

export default function ActivityPage() {
  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [names, setNames] = useState<Record<string, string>>({});

  // خريطة المعرّفات إلى أسماء مقروءة (فروع وأقسام)
  useEffect(() => {
    void (async () => {
      const map: Record<string, string> = {};
      const [branchRes, categoryRes] = await Promise.all([
        supabase.from('branches').select('id, name_ar'),
        supabase.from('categories').select('id, name_ar'),
      ]);
      for (const row of [...(branchRes.data ?? []), ...(categoryRes.data ?? [])]) {
        if (row?.id) map[row.id] = row.name_ar ?? '';
      }
      setNames(map);
    })();
  }, []);

  const load = useCallback(async (offset: number, replace: boolean) => {
    let q = supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (actionFilter !== 'all') q = q.eq('action', actionFilter);
    if (entityFilter !== 'all') q = q.eq('entity_type', entityFilter);
    if (query.trim()) q = q.or(`entity_label.ilike.%${query.trim()}%,actor_name.ilike.%${query.trim()}%`);

    const { data, error: err } = await q;

    if (err) {
      setError(
        err.message.includes('does not exist')
          ? 'جدول السجل غير موجود بعد — شغّل ملف scripts/phase1_roles_and_audit.sql في Supabase.'
          : 'تعذّر تحميل السجل. السجل متاح للمدير العام فقط.'
      );
      setRows([]);
      setDone(true);
    } else {
      setError(null);
      const batch = (data ?? []) as ActivityRow[];
      setRows((prev) => (replace ? batch : [...prev, ...batch]));
      setDone(batch.length < PAGE_SIZE);
    }

    setLoading(false);
    setLoadingMore(false);
  }, [actionFilter, entityFilter, query]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => void load(0, true), 300);
    return () => clearTimeout(t);
  }, [load]);

  const groups = rows.reduce<Record<string, ActivityRow[]>>((acc, row) => {
    const key = dayLabel(row.created_at);
    (acc[key] ??= []).push(row);
    return acc;
  }, {});

  return (
    <>
      <Header title="سجل النشاط" />
      <div className="p-3 sm:p-4 md:p-6">

        <div className="mb-4 md:mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">سجل النشاط</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            كل تعديل على المنتجات والطلبات والإعدادات — باسم صاحبه ووقته
          </p>
        </div>

        {/* الفلاتر */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم منتج أو موظف..."
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">كل العمليات</option>
            <option value="insert">إضافة</option>
            <option value="update">تعديل</option>
            <option value="delete">حذف</option>
          </select>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">كل الأنواع</option>
            {Object.entries(ENTITIES).map(([key, def]) => (
              <option key={key} value={key}>{def.label}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
            <TriangleAlert size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <SkeletonRows rows={6} />
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
            <History size={44} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium text-sm">لا يوجد نشاط مسجّل بعد</p>
            <p className="text-gray-400 text-xs mt-1">
              أي تعديل من الآن فصاعداً راح ينحفظ هنا تلقائياً
            </p>
          </div>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <div key={day} className="mb-5">
            <div className="flex items-center gap-3 mb-2.5">
              <h2 className="text-xs font-bold text-gray-500">{day}</h2>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[11px] text-gray-400">{items.length} عملية</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {items.map((row) => {
                const entity = ENTITIES[row.entity_type] ?? {
                  label: row.entity_type, icon: History, tone: 'bg-gray-50 text-gray-500',
                };
                const action = ACTIONS[row.action] ?? {
                  label: row.action, icon: Pencil, tone: 'bg-gray-50 text-gray-600 border-gray-200',
                };
                const EntityIcon = entity.icon;
                const ActionIcon = action.icon;
                const changes = row.changes ? Object.entries(row.changes) : [];

                return (
                  <div key={row.id} className="p-3 md:px-4 md:py-3.5 hover:bg-gray-50/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${entity.tone}`}>
                        <EntityIcon size={17} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                          <span className="font-bold text-gray-800">{row.actor_name || 'مستخدم محذوف'}</span>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium border ${action.tone}`}>
                            <ActionIcon size={11} /> {action.label}
                          </span>
                          <span className="text-gray-500">{entity.label}</span>
                          <span className="font-medium text-gray-800 truncate max-w-[220px]">
                            «{row.entity_label || '—'}»
                          </span>
                        </div>

                        {changes.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {changes.slice(0, 4).map(([key, diff]) => (
                              <span key={key}
                                className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px]">
                                <span className="text-gray-500">{fieldLabel(key)}</span>
                                <span className="text-gray-400 line-through">{formatValue(key, diff.from, names)}</span>
                                <ArrowLeft size={11} className="text-gray-400" />
                                <span className="text-gray-800 font-medium">{formatValue(key, diff.to, names)}</span>
                              </span>
                            ))}
                            {changes.length > 4 && (
                              <span className="text-[11px] text-gray-400 self-center">
                                +{changes.length - 4} حقل آخر
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-gray-400">
                          <span>{timeLabel(row.created_at)}</span>
                          {row.actor_role && (
                            <>
                              <span>·</span>
                              <span>{roleDef(row.actor_role).label}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {!loading && !error && !done && rows.length > 0 && (
          <button
            onClick={() => { setLoadingMore(true); void load(rows.length, false); }}
            disabled={loadingMore}
            className="w-full py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {loadingMore ? 'جاري التحميل...' : 'عرض المزيد'}
          </button>
        )}
      </div>
    </>
  );
}
