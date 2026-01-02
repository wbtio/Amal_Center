'use client';

import { Header } from '@/components/layout/Header';
import { 
  ShoppingBag, 
  ShoppingCart, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  Star
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

interface Stats {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
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
    // Basic counts
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: pendingCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    
    // Current week revenue
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const { data: currentWeekOrders } = await supabase
      .from('orders')
      .select('total_iqd')
      .eq('status', 'delivered')
      .gte('created_at', weekAgo.toISOString());
    
    // Previous week revenue (for comparison)
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const { data: previousWeekOrders } = await supabase
      .from('orders')
      .select('total_iqd')
      .eq('status', 'delivered')
      .gte('created_at', twoWeeksAgo.toISOString())
      .lt('created_at', weekAgo.toISOString());

    // Total revenue (all delivered orders)
    const { data: allDeliveredOrders } = await supabase
      .from('orders')
      .select('total_iqd')
      .eq('status', 'delivered');
    
    // Recent orders
    const { data: recent } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentOrders(recent || []);
    
    const totalRevenue = allDeliveredOrders?.reduce((acc, curr) => acc + (curr.total_iqd || 0), 0) || 0;
    const currentWeekRevenue = currentWeekOrders?.reduce((acc, curr) => acc + (curr.total_iqd || 0), 0) || 0;
    const previousWeekRevenue = previousWeekOrders?.reduce((acc, curr) => acc + (curr.total_iqd || 0), 0) || 0;
    
    // Calculate growth percentage
    const revenueGrowth = previousWeekRevenue > 0 
      ? ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100 
      : 0;

    // Current week orders count
    const { count: currentWeekOrdersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    const { count: previousWeekOrdersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', twoWeeksAgo.toISOString())
      .lt('created_at', weekAgo.toISOString());

    const ordersGrowth = (previousWeekOrdersCount || 0) > 0
      ? (((currentWeekOrdersCount || 0) - (previousWeekOrdersCount || 0)) / (previousWeekOrdersCount || 1)) * 100
      : 0;

    // Average order value
    const deliveredCount = allDeliveredOrders?.length || 0;
    const averageOrderValue = deliveredCount > 0 ? totalRevenue / deliveredCount : 0;

    setStats(prev => ({
      ...prev,
      totalOrders: ordersCount || 0,
      totalProducts: productsCount || 0,
      totalRevenue,
      pendingOrders: pendingCount || 0,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth
    }));
  };

  const fetchWeeklySales = async () => {
    // Get orders from the last 7 days
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const { data: weeklyOrders } = await supabase
      .from('orders')
      .select('created_at, total_iqd, status')
      .gte('created_at', weekAgo.toISOString())
      .in('status', ['delivered', 'confirmed', 'preparing', 'ready']);

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
    weeklyOrders?.forEach(order => {
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
    const { data: allOrders } = await supabase
      .from('orders')
      .select('status');

    const statusCount: { [key: string]: number } = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      ready: 0,
      delivered: 0,
      cancelled: 0
    };

    allOrders?.forEach(order => {
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
    // Get order items from delivered orders with product details
    const { data: orderItems } = await supabase
      .from('order_items')
      .select(`
        quantity,
        price_iqd,
        product_id,
        order_id,
        product_snapshot,
        orders!inner(status),
        products(id, name, name_ar, image_url)
      `)
      .eq('orders.status', 'delivered');

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
    // Low stock products (less than 10)
    const { data: lowStock, count: lowStockCount } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .lt('stock_quantity', 10)
      .gt('stock_quantity', 0)
      .limit(5);

    setLowStockProducts(lowStock || []);

    // Delayed orders (pending for more than 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { count: delayedCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'confirmed'])
      .lt('created_at', yesterday.toISOString());

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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
      <div className="h-80 bg-gray-100 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50">
        <Header title="لوحة التحكم" />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2"><SkeletonChart /></div>
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'إجمالي المبيعات',
      value: formatIQD(stats.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
      growth: stats.revenueGrowth,
      link: '/orders?status=delivered'
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      growth: stats.ordersGrowth,
      link: '/orders'
    },
    {
      title: 'متوسط قيمة الطلب',
      value: formatIQD(stats.averageOrderValue),
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      link: null
    },
    {
      title: 'طلبات قيد الانتظار',
      value: stats.pendingOrders,
      icon: ShoppingBag,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      link: '/orders?status=pending'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="لوحة التحكم" />
      
      <div className="p-6">
        {/* Alerts Section */}
        {(stats.lowStockCount > 0 || stats.delayedOrdersCount > 0) && (
          <div className="mb-6 space-y-3">
            {stats.lowStockCount > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-orange-800">تنبيه المخزون</p>
                    <p className="text-sm text-orange-600">لديك {stats.lowStockCount} منتجات بمخزون منخفض</p>
                  </div>
                </div>
                <Link href="/products?filter=low-stock" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                  عرض المنتجات
                </Link>
              </div>
            )}
            {stats.delayedOrdersCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-red-800">طلبات متأخرة</p>
                    <p className="text-sm text-red-600">لديك {stats.delayedOrdersCount} طلبات تحتاج متابعة (أكثر من 24 ساعة)</p>
                  </div>
                </div>
                <Link href="/orders?filter=delayed" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  عرض الطلبات
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const CardContent = (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    {stat.growth !== undefined && (
                      <div className={`flex items-center gap-1 mt-2 text-sm ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{Math.abs(stat.growth).toFixed(1)}%</span>
                        <span className="text-gray-400 text-xs">من الأسبوع الماضي</span>
                      </div>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                    <Icon className={stat.color} size={24} />
                  </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">المبيعات الأسبوعية</h3>
            <div className="h-80 w-full">
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">توزيع حالات الطلبات</h3>
            <div className="h-64">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">أكثر المنتجات مبيعاً</h3>
              <Link href="/products" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Star size={40} className="mx-auto mb-2 opacity-50" />
                  <p>لا توجد بيانات مبيعات بعد</p>
                </div>
              ) : (
                topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      #{index + 1}
                    </div>
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.quantity} وحدة مباعة</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-primary">{formatIQD(product.revenue)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">أحدث الطلبات</h3>
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
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                          {order.delivery_address?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">طلب #{order.id.slice(0, 6)}</p>
                          <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('ar-IQ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <span className="text-sm font-bold text-primary">{formatIQD(order.total_iqd)}</span>
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">منتجات بمخزون منخفض</h3>
              </div>
              <Link href="/products?filter=low-stock" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {lowStockProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                    <p className="font-medium text-gray-800 line-clamp-1 mb-2">{product.name_ar || product.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">المخزون:</span>
                      <span className="font-bold text-orange-600">{product.stock_quantity} وحدة</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/products/new" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
              <Package size={18} />
              إضافة منتج جديد
            </Link>
            <Link href="/orders?status=pending" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <ShoppingBag size={18} />
              الطلبات الجديدة
            </Link>
            <Link href="/categories" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Eye size={18} />
              إدارة الأقسام
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
