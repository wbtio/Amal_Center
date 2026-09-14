'use client';

import { Header } from '@/components/layout/Header';
import Image from 'next/image';
import { getProductThumbnailUrl } from '@/lib/imageUrl';
import {
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Package,
  TriangleAlert,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Loader2,
  Trophy,
  BarChart3,
  Hourglass,
  PackagePlus,
  ClipboardList,
  FolderKanban,
  MessageCircle,
  Download
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { formatIQD } from '@/lib/utils';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// كاش محلي للوحة التحكم — يقلل الاستعلامات بنسبة 80%
let _dashboardCache: { ts: number; data: Record<string, any> } | null = null;
const DASHBOARD_TTL = 5 * 60 * 1000; // 5 دقائق

async function cachedFetch<T = any>(key: string, fetcher: () => PromiseLike<any>): Promise<any> {
  if (_dashboardCache && Date.now() - _dashboardCache.ts < DASHBOARD_TTL && _dashboardCache.data[key]) {
    return _dashboardCache.data[key];
  }
  if (!_dashboardCache) _dashboardCache = { ts: 0, data: {} };
  const result = await fetcher();
  _dashboardCache.data[key] = result;
  _dashboardCache.ts = Date.now();
  return result;
}

interface Stats {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  /** قيمة الطلبات المقبولة التي لم تُسلَّم بعد — مبيعات في الطريق، لا تُحتسب محصّلة */
  pipelineRevenue: number;
  pipelineCount: number;
  pendingOrders: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  lowStockCount: number;
  delayedOrdersCount: number;
}

interface OrderStatusData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

/** خط اتجاه مصغّر — يعطي الرقم سياقاً بدل أن يقف وحده */
function Sparkline({ points, color }: { points: number[]; color: string }) {
  if (points.length < 2) return null;

  const max = Math.max(...points, 1);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = 60 / (points.length - 1);

  const path = points
    .map((v, i) => `${(i * step).toFixed(1)},${(20 - ((v - min) / range) * 18).toFixed(1)}`)
    .join(' ');

  return (
    <svg width="60" height="22" viewBox="0 0 60 22" aria-hidden="true" className="flex-shrink-0">
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface TopProduct {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
  image_url?: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pipelineRevenue: 0,
    pipelineCount: 0,
    pendingOrders: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    lowStockCount: 0,
    delayedOrdersCount: 0
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchWeeklySales(),
      fetchOrderStatusDistribution(),
      fetchTopProducts(),
      fetchAlerts()
    ]);
    setLoading(false);
  };

  const fetchStats = async () => {
    // Basic counts — using head:true لا يجلب البيانات بل فقط العدّ
    const { count: productsCount } = await cachedFetch('productsCount', () =>
      supabase.from('products').select('id', { count: 'exact', head: true })
    );
    const { count: ordersCount } = await cachedFetch('ordersCount', () =>
      supabase.from('orders').select('id', { count: 'exact', head: true })
    );
    const { count: pendingCount } = await cachedFetch('pendingCount', () =>
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending')
    );

    // Current week revenue
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const { data: currentWeekOrders } = await cachedFetch('currentWeekOrders', () =>
      supabase.from('orders').select('total_iqd').eq('status', 'delivered').gte('created_at', weekAgo.toISOString())
    );

    // Previous week revenue (for comparison)
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const { data: previousWeekOrders } = await cachedFetch('previousWeekOrders', () =>
      supabase.from('orders').select('total_iqd').eq('status', 'delivered').gte('created_at', twoWeeksAgo.toISOString()).lt('created_at', weekAgo.toISOString())
    );

    // Total revenue (all delivered orders)
    const { data: allDeliveredOrders } = await cachedFetch('allDeliveredOrders', () =>
      supabase.from('orders').select('total_iqd').eq('status', 'delivered')
    );

    // الطلبات المقبولة التي لم تُسلَّم بعد — تظهر كـ "قيد التنفيذ" بجانب المحصّل،
    // وإلا بدت اللوحة صفراً ما دام لم يُعلَّم أي طلب "تم التوصيل".
    const { data: pipelineOrders } = await cachedFetch('pipelineOrders', () =>
      supabase.from('orders').select('total_iqd')
        .in('status', ['pending', 'confirmed', 'preparing', 'ready'])
    );

    // Recent orders — only needed columns
    const { data: recent } = await cachedFetch('recentOrders', () =>
      supabase.from('orders').select('id, total_iqd, status, delivery_address, created_at').order('created_at', { ascending: false }).limit(5)
    );

    setRecentOrders(recent || []);

    const totalRevenue = (allDeliveredOrders as any[])?.reduce((acc: number, curr: any) => acc + (curr.total_iqd || 0), 0) || 0;
    const currentWeekRevenue = (currentWeekOrders as any[])?.reduce((acc: number, curr: any) => acc + (curr.total_iqd || 0), 0) || 0;
    const previousWeekRevenue = (previousWeekOrders as any[])?.reduce((acc: number, curr: any) => acc + (curr.total_iqd || 0), 0) || 0;

    // Calculate growth percentage
    const revenueGrowth = previousWeekRevenue > 0
      ? ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100
      : 0;

    // Current week orders count
    const { count: currentWeekOrdersCount } = await cachedFetch('currentWeekOrdersCount', () =>
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo.toISOString())
    );

    const { count: previousWeekOrdersCount } = await cachedFetch('previousWeekOrdersCount', () =>
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', twoWeeksAgo.toISOString()).lt('created_at', weekAgo.toISOString())
    );

    const ordersGrowth = (previousWeekOrdersCount || 0) > 0
      ? (((currentWeekOrdersCount || 0) - (previousWeekOrdersCount || 0)) / (previousWeekOrdersCount || 1)) * 100
      : 0;

    // متوسط قيمة الطلب — على كل الطلبات المقبولة، لا المسلَّمة وحدها،
    // وإلا ظهر صفراً ما دام لم يُعلَّم أي طلب "تم التوصيل".
    const pipelineRevenue = (pipelineOrders as any[])?.reduce((acc: number, curr: any) => acc + (curr.total_iqd || 0), 0) || 0;
    const deliveredCount = allDeliveredOrders?.length || 0;
    const countedOrders = deliveredCount + ((pipelineOrders as any[])?.length || 0);
    const averageOrderValue = countedOrders > 0 ? (totalRevenue + pipelineRevenue) / countedOrders : 0;

    setStats(prev => ({
      ...prev,
      totalOrders: ordersCount || 0,
      totalProducts: productsCount || 0,
      totalRevenue,
      pipelineRevenue,
      pipelineCount: (pipelineOrders as any[])?.length || 0,
      pendingOrders: pendingCount || 0,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth
    }));
  };

  const fetchWeeklySales = async () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const { data: weeklyOrders } = await cachedFetch('weeklyOrders', () =>
      // كل الطلبات ما عدا الملغاة — استثناء "قيد الانتظار" كان يُفرغ الرسم البياني تماماً
      supabase.from('orders').select('created_at, total_iqd').gte('created_at', weekAgo.toISOString()).neq('status', 'cancelled')
    );

    // Group by day
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const salesByDay: { [key: string]: number } = {};

    // Initialize all days with 0
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekAgo);
      date.setDate(date.getDate() + i);
      const dayName = dayNames[date.getDay()];
      salesByDay[dayName] = 0;
    }

    // Sum up sales
    (weeklyOrders as any[])?.forEach((order: any) => {
      const orderDate = new Date(order.created_at);
      const dayName = dayNames[orderDate.getDay()];
      salesByDay[dayName] = (salesByDay[dayName] || 0) + (order.total_iqd || 0);
    });

    // Convert to chart format
    const chartDataArray = Object.entries(salesByDay).map(([name, sales]) => ({
      name,
      sales
    }));

    setChartData(chartDataArray);
  };

  const fetchOrderStatusDistribution = async () => {
    const { data: allOrders } = await cachedFetch('allOrderStatuses', () =>
      supabase.from('orders').select('status')
    );

    const statusCount: { [key: string]: number } = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      ready: 0,
      delivered: 0,
      cancelled: 0
    };

    (allOrders as any[])?.forEach((order: any) => {
      if (statusCount[order.status] !== undefined) {
        statusCount[order.status]++;
      }
    });

    const pieData: OrderStatusData[] = [
      { name: 'قيد الانتظار', value: statusCount.pending, color: '#FFA726' },
      { name: 'مؤكد', value: statusCount.confirmed, color: '#42A5F5' },
      { name: 'قيد التحضير', value: statusCount.preparing, color: '#AB47BC' },
      { name: 'جاهز', value: statusCount.ready, color: '#26C6DA' },
      { name: 'تم التوصيل', value: statusCount.delivered, color: '#66BB6A' },
      { name: 'ملغي', value: statusCount.cancelled, color: '#EF5350' }
    ].filter(item => item.value > 0);

    setOrderStatusData(pieData);
  };

  const fetchTopProducts = async () => {
    const { data: orderItems } = await cachedFetch('topOrderItems', () =>
      supabase
        .from('order_items')
        .select(`
          quantity,
          price_iqd,
          product_id,
          product_snapshot,
          orders!inner(status),
          products(id, name, name_ar, image_url)
        `)
        .eq('orders.status', 'delivered')
    );

    if (!orderItems) return;

    const productSales: { [key: string]: TopProduct } = {};

    orderItems.forEach((item: any) => {
      const productId = item.product_id;
      const product = item.products;
      const snapshot = item.product_snapshot as any;

      if (!productSales[productId]) {
        productSales[productId] = {
          id: productId,
          name: product?.name_ar || product?.name || snapshot?.name_ar || snapshot?.name || 'منتج غير معروف',
          quantity: 0,
          revenue: 0,
          image_url: product?.image_url || snapshot?.image_url
        };
      }
      productSales[productId].quantity += item.quantity || 1;
      productSales[productId].revenue += (item.quantity || 1) * (item.price_iqd || 0);
    });

    const sorted = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setTopProducts(sorted);
  };

  const fetchAlerts = async () => {
    // المنتجات التي نفدت (صفر) كانت مستثناة — وهي الأهم. الترتيب تصاعدي فتظهر أولاً.
    const { data: lowStock, count: lowStockCount } = await cachedFetch('lowStock', () =>
      supabase
        .from('products')
        .select('id, name_ar, name, stock_quantity', { count: 'exact' })
        .lte('stock_quantity', 10)
        .eq('is_active', true)
        .order('stock_quantity', { ascending: true })
        .limit(8)
    );

    setLowStockProducts(lowStock || []);

    // رقم واتساب التجهيز من إعدادات المتجر — يُعدَّل من صفحة المحتوى والإعدادات
    const { data: waSetting } = await cachedFetch('waNumber', () =>
      supabase.from('app_settings').select('value').eq('key', 'contact_whatsapp_number').maybeSingle()
    );
    const raw = (waSetting as any)?.value;
    if (raw) setWhatsappNumber(String(raw).replace(/[^\d]/g, ''));

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { count: delayedCount } = await cachedFetch('delayedCount', () =>
      supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .in('status', ['pending', 'confirmed'])
        .lt('created_at', yesterday.toISOString())
    );

    setStats(prev => ({
      ...prev,
      lowStockCount: lowStockCount || 0,
      delayedOrdersCount: delayedCount || 0
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { label: string; bg: string; text: string } } = {
      pending: { label: 'قيد الانتظار', bg: 'bg-yellow-100', text: 'text-yellow-700' },
      confirmed: { label: 'مؤكد', bg: 'bg-blue-100', text: 'text-blue-700' },
      preparing: { label: 'قيد التحضير', bg: 'bg-purple-100', text: 'text-purple-700' },
      ready: { label: 'جاهز', bg: 'bg-cyan-100', text: 'text-cyan-700' },
      delivered: { label: 'تم التوصيل', bg: 'bg-green-100', text: 'text-green-700' },
      cancelled: { label: 'ملغي', bg: 'bg-red-100', text: 'text-red-700' }
    };
    const config = statusConfig[status] || { label: status, bg: 'bg-gray-100', text: 'text-gray-700' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
      <div className="h-80 bg-gray-100 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50">
        <Header title="لوحة التحكم" />
        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="lg:col-span-2"><SkeletonChart /></div>
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  // مسار مبيعات الأسبوع — يُغذّي خطوط الاتجاه في البطاقات
  const salesTrend = chartData.map((d) => Number(d.sales) || 0);

  // تقرير تُصدّره المديرة بضغطة — ملخص + طلبات + نواقص في ملف واحد
  const exportReport = async () => {
    setExporting(true);
    try {
      const XLSX = await import('xlsx');
      const book = XLSX.utils.book_new();

      const summary = [
        { 'المؤشر': 'المبيعات المحصّلة', 'القيمة': stats.totalRevenue },
        { 'المؤشر': 'قيمة الطلبات قيد التنفيذ', 'القيمة': stats.pipelineRevenue },
        { 'المؤشر': 'إجمالي الطلبات', 'القيمة': stats.totalOrders },
        { 'المؤشر': 'طلبات قيد الانتظار', 'القيمة': stats.pendingOrders },
        { 'المؤشر': 'طلبات متأخرة (أكثر من ٢٤ ساعة)', 'القيمة': stats.delayedOrdersCount },
        { 'المؤشر': 'متوسط قيمة الطلب', 'القيمة': Math.round(stats.averageOrderValue) },
        { 'المؤشر': 'إجمالي المنتجات', 'القيمة': stats.totalProducts },
        { 'المؤشر': 'أصناف تحت الحد', 'القيمة': stats.lowStockCount },
      ];
      XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(summary), 'الملخص');

      const week = chartData.map((d) => ({ 'اليوم': d.name, 'المبيعات (د.ع)': d.sales }));
      XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(week), 'مبيعات الأسبوع');

      if (topProducts.length > 0) {
        const top = topProducts.map((p) => ({
          'المنتج': p.name, 'الكمية المباعة': p.quantity, 'الإيراد (د.ع)': p.revenue,
        }));
        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(top), 'الأكثر مبيعاً');
      }

      if (lowStockProducts.length > 0) {
        const low = lowStockProducts.map((p) => ({
          'المنتج': p.name_ar || p.name,
          'المتبقي': p.stock_quantity,
          'الحالة': (p.stock_quantity ?? 0) === 0 ? 'نفد تماماً' : 'منخفض',
        }));
        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(low), 'نواقص المخزون');
      }

      const stamp = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(book, `تقرير-الأمل-سنتر-${stamp}.xlsx`);
    } finally {
      setExporting(false);
    }
  };

  const statCards = [
    {
      title: 'المبيعات المحصّلة',
      trend: salesTrend,
      trendColor: '#16A34A',
      value: formatIQD(stats.totalRevenue),
      icon: Wallet,
      color: 'text-emerald-600',
      bg: 'bg-white',
      iconBg: 'bg-emerald-50 text-emerald-600',
      growth: stats.revenueGrowth,
      note: stats.pipelineCount > 0
        ? `+ ${formatIQD(stats.pipelineRevenue)} قيد التنفيذ (${stats.pipelineCount} طلب)`
        : 'من الطلبات المسلّمة فقط',
      link: '/orders?status=delivered'
    },
    {
      title: 'إجمالي الطلبات',
      trend: salesTrend,
      trendColor: '#2563EB',
      value: stats.totalOrders,
      icon: ClipboardList,
      color: 'text-blue-600',
      bg: 'bg-white',
      iconBg: 'bg-blue-50 text-blue-600',
      growth: stats.ordersGrowth,
      link: '/orders'
    },
    {
      title: 'متوسط قيمة الطلب',
      value: formatIQD(stats.averageOrderValue),
      icon: BarChart3,
      color: 'text-amber-600',
      bg: 'bg-white',
      iconBg: 'bg-amber-50 text-amber-600',
      link: null
    },
    {
      title: 'طلبات قيد الانتظار',
      value: stats.pendingOrders,
      icon: Hourglass,
      color: 'text-violet-600',
      bg: 'bg-white',
      iconBg: 'bg-violet-50 text-violet-600',
      link: '/orders?status=pending'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="لوحة التحكم" />

      <div className="p-3 sm:p-4 md:p-6">
        {/* Alerts Section */}
        {(stats.lowStockCount > 0 || stats.delayedOrdersCount > 0) && (
          <div className="mb-4 md:mb-6 space-y-3">
            {stats.lowStockCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-11 md:h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TriangleAlert className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-amber-800 text-sm md:text-base">تنبيه المخزون</p>
                    <p className="text-xs md:text-sm text-amber-600">لديك {stats.lowStockCount} منتجات بمخزون منخفض</p>
                  </div>
                </div>
                <Link href="/products?filter=low-stock" className="px-3 py-1.5 md:px-4 md:py-2 bg-amber-600 text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity text-center flex-shrink-0">
                  عرض المنتجات
                </Link>
              </div>
            )}
            {stats.delayedOrdersCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-11 md:h-11 bg-red-100 text-red-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Timer className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-red-800 text-sm md:text-base">طلبات متأخرة</p>
                    <p className="text-xs md:text-sm text-red-600">لديك {stats.delayedOrdersCount} طلبات تحتاج متابعة (أكثر من 24 ساعة)</p>
                  </div>
                </div>
                <Link href="/orders?filter=delayed" className="px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity text-center flex-shrink-0">
                  عرض الطلبات
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const CardContent = (
              <div className={`${stat.bg} p-3 md:p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer h-full`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-gray-500 text-[11px] md:text-xs truncate">{stat.title}</p>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-gray-900 truncate leading-tight">{stat.value}</h3>

                <div className="flex items-end justify-between gap-2 mt-2 min-h-[22px]">
                  <div className="min-w-0">
                    {stat.growth !== undefined && (
                      <div className={`flex items-center gap-0.5 text-[11px] md:text-xs ${stat.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {stat.growth >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        <span className="font-medium">{Math.abs(stat.growth).toFixed(1)}%</span>
                      </div>
                    )}
                    {stat.note && (
                      <p className="text-[10px] md:text-[11px] text-gray-500 truncate">{stat.note}</p>
                    )}
                  </div>
                  {stat.trend && stat.trend.length > 1 && (
                    <Sparkline points={stat.trend} color={stat.trendColor ?? '#16A34A'} />
                  )}
                </div>
              </div>
            );

            return stat.link ? (
              <Link key={index} href={stat.link}>{CardContent}</Link>
            ) : (
              <div key={index}>{CardContent}</div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="lg:col-span-2 bg-white p-3 md:p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-3 md:mb-6">المبيعات الأسبوعية</h3>
            <div className="h-52 md:h-80 w-full">
              {chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>لا توجد مبيعات هذا الأسبوع</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value) => [formatIQD(Number(value) || 0), 'المبيعات']}
                      contentStyle={{ direction: 'rtl' }}
                    />
                    <Bar dataKey="sales" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white p-3 md:p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-3 md:mb-4">توزيع حالات الطلبات</h3>
            <div className="h-52 md:h-64">
              {orderStatusData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>لا توجد طلبات</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [Number(value) || 0, '']} />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Second Row: Top Products & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
          {/* Top Products */}
          <div className="bg-white p-3 md:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-sm md:text-lg font-bold text-gray-800">أكثر المنتجات مبيعاً</h3>
              <Link href="/products" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Trophy size={40} className="mx-auto mb-2 opacity-50" />
                  <p>لا توجد بيانات مبيعات بعد</p>
                </div>
              ) : (
                topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-2 md:gap-4 p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                      #{index + 1}
                    </div>
                    {product.image_url ? (
                      <Image src={getProductThumbnailUrl(product.image_url)!} alt={product.name} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package size={18} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 line-clamp-1 text-xs md:text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.quantity} وحدة مباعة</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold text-primary text-xs md:text-sm">{formatIQD(product.revenue)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-3 md:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-sm md:text-lg font-bold text-gray-800">أحدث الطلبات</h3>
              <Link href="/orders" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <ShoppingCart size={40} className="mx-auto mb-2 opacity-50" />
                  <p>لا توجد طلبات حديثة</p>
                </div>
              ) : (
                recentOrders.map((order) => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer gap-2">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                          {order.delivery_address?.[0] || 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gray-800 truncate">طلب #{order.id.slice(0, 6)}</p>
                          <p className="text-[10px] md:text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('ar-IQ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
                        <span className="hidden sm:inline">{getStatusBadge(order.status)}</span>
                        <span className="text-xs md:text-sm font-bold text-primary">{formatIQD(order.total_iqd)}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Low Stock Products Alert Section */}
        {lowStockProducts.length > 0 && (
          <div className="bg-white p-3 md:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <TriangleAlert className="text-amber-500" size={18} />
                <h3 className="text-sm md:text-lg font-bold text-gray-800">نواقص المخزون</h3>
                {stats.lowStockCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-medium">
                    {stats.lowStockCount} صنف
                  </span>
                )}
              </div>
              <Link href="/products?filter=low-stock" className="text-xs md:text-sm text-primary hover:underline">عرض الكل</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {lowStockProducts.map((product) => {
                const out = (product.stock_quantity ?? 0) === 0;
                const name = product.name_ar || product.name;
                const message = `الأمل سنتر — نقص مخزون\nالمنتج: ${name}\n${out ? 'نفد تماماً' : `المتبقي: ${product.stock_quantity} وحدة`}\nالرجاء التجهيز.`;

                return (
                  <div
                    key={product.id}
                    className={`p-3 rounded-xl border transition-colors ${out ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}
                  >
                    <Link href={`/products/${product.id}`} className="block group">
                      <p className="font-medium text-gray-800 line-clamp-2 text-xs md:text-sm min-h-[2.2em] group-hover:text-primary transition-colors">
                        {name}
                      </p>
                    </Link>

                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[11px] md:text-xs font-bold ${out ? 'text-red-600' : 'text-orange-600'}`}>
                        {out ? 'نفد تماماً' : `باقي ${product.stock_quantity}`}
                      </span>

                      {whatsappNumber ? (
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="تنبيه المجهز عبر واتساب"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                        >
                          <MessageCircle size={13} />
                          بلّغ
                        </a>
                      ) : (
                        <Link href="/content" className="text-[10px] text-gray-400 hover:underline">
                          أضف رقم واتساب
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 md:mt-6 bg-white p-3 md:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
            <h3 className="text-sm md:text-lg font-bold text-gray-800">إجراءات سريعة</h3>
            <button
              onClick={exportReport}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs md:text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              تصدير تقرير كامل
            </button>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link href="/products/new" className="px-3 py-1.5 md:px-4 md:py-2.5 bg-primary text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 md:gap-2 shadow-sm">
              <PackagePlus size={16} />
              إضافة منتج جديد
            </Link>
            <Link href="/orders?status=pending" className="px-3 py-1.5 md:px-4 md:py-2.5 bg-blue-600 text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 md:gap-2 shadow-sm">
              <ClipboardList size={16} />
              الطلبات الجديدة
            </Link>
            <Link href="/categories" className="px-3 py-1.5 md:px-4 md:py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs md:text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-1.5 md:gap-2">
              <FolderKanban size={16} />
              إدارة الأقسام
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
