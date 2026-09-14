'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Eye, CircleDot, BadgeCheck, ChefHat, PackageCheck, Truck, Ban,
  SlidersHorizontal, Inbox, LayoutGrid, Table2, Download, Volume2, VolumeX, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { formatIQD } from '@/lib/utils';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';

type Order = {
  id: string;
  status: string;
  total_iqd: number;
  customer_name: string | null;
  delivery_phone: string | null;
  created_at: string;
  payment_method: string | null;
  payment_status: string | null;
  branch_id?: string | null;
  branches?: { name_ar: string } | null;
};

const COLUMNS = [
  { id: 'pending', label: 'قيد الانتظار', icon: CircleDot, tone: 'amber' },
  { id: 'confirmed', label: 'مؤكد', icon: BadgeCheck, tone: 'blue' },
  { id: 'preparing', label: 'جاري التحضير', icon: ChefHat, tone: 'violet' },
  { id: 'ready', label: 'جاهز للتوصيل', icon: PackageCheck, tone: 'cyan' },
  { id: 'delivered', label: 'تم التوصيل', icon: Truck, tone: 'emerald' },
] as const;

const TONES: Record<string, { head: string; dot: string; card: string }> = {
  amber: { head: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500', card: 'hover:border-amber-300' },
  blue: { head: 'text-blue-700 bg-blue-50 border-blue-200', dot: 'bg-blue-500', card: 'hover:border-blue-300' },
  violet: { head: 'text-violet-700 bg-violet-50 border-violet-200', dot: 'bg-violet-500', card: 'hover:border-violet-300' },
  cyan: { head: 'text-cyan-700 bg-cyan-50 border-cyan-200', dot: 'bg-cyan-500', card: 'hover:border-cyan-300' },
  emerald: { head: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', card: 'hover:border-emerald-300' },
};

const STATUS_BADGE: Record<string, { label: string; cls: string; icon: typeof CircleDot }> = {
  pending: { label: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: CircleDot },
  confirmed: { label: 'مؤكد', cls: 'bg-blue-50 text-blue-700 border-blue-200', icon: BadgeCheck },
  preparing: { label: 'جاري التحضير', cls: 'bg-violet-50 text-violet-700 border-violet-200', icon: ChefHat },
  ready: { label: 'جاهز للتوصيل', cls: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: PackageCheck },
  delivered: { label: 'تم التوصيل', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Truck },
  cancelled: { label: 'ملغي', cls: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
};

const fmtDate = (v: string) => {
  const d = new Date(v);
  return isNaN(d.getTime()) ? '—' : format(d, 'yyyy/MM/dd HH:mm');
};

/** نغمة تنبيه قصيرة — بلا ملف صوت */
function beep() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
    setTimeout(() => void ctx.close(), 700);
  } catch {
    /* المتصفح قد يمنع الصوت قبل أول نقرة — نتجاهل بهدوء */
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [branches, setBranches] = useState<{ id: string; name_ar: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [view, setView] = useState<'board' | 'table'>('board');
  const [soundOn, setSoundOn] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const knownIds = useRef<Set<string>>(new Set());

  const columnsSelect = 'id, status, total_iqd, customer_name, delivery_phone, created_at, payment_method, payment_status';

  const fetchOrders = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);

    const withBranch = await supabase
      .from('orders')
      .select(`${columnsSelect}, branch_id, branches(name_ar)`)
      .order('created_at', { ascending: false })
      .limit(200);

    let rows: Order[] = [];

    if (withBranch.error) {
      const fallback = await supabase
        .from('orders').select(columnsSelect)
        .order('created_at', { ascending: false }).limit(200);
      rows = (fallback.data ?? []) as Order[];
    } else {
      rows = (withBranch.data ?? []) as unknown as Order[];
      const { data: branchData } = await supabase
        .from('branches').select('id, name_ar').eq('is_active', true).order('sort_order');
      setBranches(branchData ?? []);
    }

    // طلب جديد وصل بعد أول تحميل → نغمة + تنبيه
    if (knownIds.current.size > 0) {
      const fresh = rows.filter((o) => !knownIds.current.has(o.id));
      if (fresh.length > 0) {
        if (soundOn) beep();
        setToast(`وصل ${fresh.length} طلب جديد`);
        setTimeout(() => setToast(null), 6000);
      }
    }
    knownIds.current = new Set(rows.map((o) => o.id));

    setOrders(rows);
    setLoading(false);
  }, [soundOn]);

  useEffect(() => { void fetchOrders(); }, [fetchOrders]);

  // متابعة لحظية — بلا تحديث يدوي
  useEffect(() => {
    const channel = supabase
      .channel('orders-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        void fetchOrders(true);
      })
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, [fetchOrders]);

  const moveOrder = async (orderId: string, nextStatus: string) => {
    const current = orders.find((o) => o.id === orderId);
    if (!current || current.status === nextStatus) return;

    setSavingId(orderId);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));

    const { error } = await supabase
      .from('orders')
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    setSavingId(null);

    if (error) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: current.status } : o)));
      setToast('تعذّر تغيير الحالة — تأكد من صلاحيتك');
      setTimeout(() => setToast(null), 5000);
      return;
    }

    setToast(`الطلب #${orderId.slice(0, 6).toUpperCase()} → ${STATUS_BADGE[nextStatus]?.label ?? nextStatus}`);
    setTimeout(() => setToast(null), 3000);
  };

  const exportExcel = async () => {
    setExporting(true);
    try {
      const XLSX = await import('xlsx');
      const rows = visible.map((o) => ({
        'رقم الطلب': `#${o.id.slice(0, 8).toUpperCase()}`,
        'العميل': o.customer_name || 'عميل',
        'الهاتف': o.delivery_phone || '',
        'المبلغ (د.ع)': o.total_iqd ?? 0,
        'الحالة': STATUS_BADGE[o.status]?.label ?? o.status,
        'الفرع': o.branches?.name_ar || 'غير محدد',
        'طريقة الدفع': o.payment_method === 'cash' ? 'نقداً' : o.payment_method || '',
        'التاريخ': fmtDate(o.created_at),
      }));

      const sheet = XLSX.utils.json_to_sheet(rows);
      const book = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, sheet, 'الطلبات');
      XLSX.writeFile(book, `طلبات-الأمل-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    } finally {
      setExporting(false);
    }
  };

  const visible = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (filterBranch === 'all') return true;
    if (filterBranch === 'none') return !o.branch_id;
    return o.branch_id === filterBranch;
  });

  const totalValue = visible.reduce((sum, o) => sum + (o.total_iqd || 0), 0);

  const toggle = 'px-2.5 py-1.5 text-xs md:text-sm rounded-lg transition-colors flex items-center gap-1.5';

  return (
    <>
      <Header title="إدارة الطلبات" />
      <div className="p-3 sm:p-4 md:p-6">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">إدارة الطلبات</h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {visible.length} طلب · بقيمة {formatIQD(totalValue)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setView('board')}
                className={`${toggle} ${view === 'board' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid size={15} /> أعمدة
              </button>
              <button
                onClick={() => setView('table')}
                className={`${toggle} ${view === 'table' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Table2 size={15} /> جدول
              </button>
            </div>

            <button
              onClick={() => setSoundOn((s) => !s)}
              title={soundOn ? 'التنبيه الصوتي مفعّل' : 'التنبيه الصوتي مطفأ'}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={exportExcel}
              disabled={exporting || visible.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs md:text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              تصدير Excel
            </button>

            <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-gray-200">
              <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
              <select
                className="bg-transparent text-xs md:text-sm outline-none cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">كل الحالات</option>
                {Object.entries(STATUS_BADGE).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>

              {branches.length > 0 && (
                <select
                  className="bg-transparent text-xs md:text-sm outline-none cursor-pointer border-r border-gray-200 pr-2"
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                >
                  <option value="all">كل الفروع</option>
                  {branches.map((b) => <option key={b.id} value={b.id}>{b.name_ar}</option>)}
                  <option value="none">بلا فرع</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {COLUMNS.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="h-9 bg-gray-100 rounded-xl animate-pulse" />
                {[0, 1].map((i) => (
                  <div key={i} className="h-24 bg-gray-50 border border-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        ) : view === 'board' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {COLUMNS.map((col) => {
              const items = visible.filter((o) => o.status === col.id);
              const tone = TONES[col.tone];
              const ColIcon = col.icon;

              return (
                <div
                  key={col.id}
                  onDragOver={(e) => { e.preventDefault(); setDropTarget(col.id); }}
                  onDragLeave={() => setDropTarget((t) => (t === col.id ? null : t))}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDropTarget(null);
                    if (dragId) void moveOrder(dragId, col.id);
                    setDragId(null);
                  }}
                  className={`rounded-xl transition-colors ${dropTarget === col.id ? 'bg-primary/5 ring-2 ring-primary/30' : ''}`}
                >
                  <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${tone.head} mb-2`}>
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      <ColIcon size={14} /> {col.label}
                    </span>
                    <span className="text-[11px] font-medium">{items.length}</span>
                  </div>

                  <div className="space-y-2 min-h-[80px]">
                    {items.map((order) => (
                      <div
                        key={order.id}
                        draggable
                        onDragStart={() => setDragId(order.id)}
                        onDragEnd={() => { setDragId(null); setDropTarget(null); }}
                        className={`bg-white border border-gray-200 rounded-xl p-2.5 cursor-grab active:cursor-grabbing transition-colors ${tone.card} ${savingId === order.id ? 'opacity-60' : ''} ${dragId === order.id ? 'opacity-40' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[10px] text-gray-400">#{order.id.slice(0, 6).toUpperCase()}</span>
                          <Link href={`/orders/${order.id}`} className="text-gray-400 hover:text-primary transition-colors">
                            <Eye size={14} />
                          </Link>
                        </div>

                        <p className="text-[13px] font-medium text-gray-800 truncate mt-0.5">
                          {order.customer_name || 'عميل'}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">{order.delivery_phone || '—'}</p>

                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                          <span className="text-[12px] font-bold text-primary">{formatIQD(order.total_iqd)}</span>
                          {order.branches?.name_ar ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-50 text-lime-700">{order.branches.name_ar}</span>
                          ) : (
                            <span className="text-[10px] text-gray-300">بلا فرع</span>
                          )}
                        </div>
                      </div>
                    ))}

                    {items.length === 0 && (
                      <div className="border border-dashed border-gray-200 rounded-xl py-6 text-center text-[11px] text-gray-400">
                        اسحب طلباً هنا
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-600 text-xs font-medium">
                  <tr>
                    <th className="px-5 py-3">رقم الطلب</th>
                    <th className="px-5 py-3">العميل</th>
                    <th className="px-5 py-3">التاريخ</th>
                    <th className="px-5 py-3">المبلغ</th>
                    {branches.length > 0 && <th className="px-5 py-3">الفرع</th>}
                    <th className="px-5 py-3">الحالة</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visible.map((order) => {
                    const badge = STATUS_BADGE[order.status];
                    const BadgeIcon = badge?.icon ?? CircleDot;
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</td>
                        <td className="px-5 py-3">
                          <p className="font-medium text-gray-800 text-sm">{order.customer_name || 'عميل'}</p>
                          <p className="text-xs text-gray-400">{order.delivery_phone}</p>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600">{fmtDate(order.created_at)}</td>
                        <td className="px-5 py-3 font-bold text-primary text-sm">{formatIQD(order.total_iqd)}</td>
                        {branches.length > 0 && (
                          <td className="px-5 py-3 text-xs">
                            {order.branches?.name_ar
                              ? <span className="px-2 py-0.5 rounded-lg bg-lime-50 text-lime-700 border border-lime-100">{order.branches.name_ar}</span>
                              : <span className="text-gray-400">غير محدد</span>}
                          </td>
                        )}
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium border ${badge?.cls ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                            <BadgeIcon size={12} /> {badge?.label ?? order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <Link href={`/orders/${order.id}`} className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors inline-block">
                            <Eye size={17} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-100">
              {visible.map((order) => {
                const badge = STATUS_BADGE[order.status];
                return (
                  <Link key={order.id} href={`/orders/${order.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{order.customer_name || 'عميل'}</p>
                      <p className="text-[11px] text-gray-400">{fmtDate(order.created_at)}</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold text-primary text-sm">{formatIQD(order.total_iqd)}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${badge?.cls ?? ''}`}>{badge?.label ?? order.status}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {!loading && visible.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-14 text-center mt-3">
            <Inbox size={44} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-700 font-medium text-sm">لا توجد طلبات مطابقة</p>
            <p className="text-gray-400 text-xs mt-1">جرّب تغيير الفلاتر</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl">
          {toast}
        </div>
      )}
    </>
  );
}
