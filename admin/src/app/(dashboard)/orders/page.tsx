'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Eye, Clock, CheckCircle, Truck, XCircle, Search, Filter, Package } from 'lucide-react';
import Link from 'next/link';
import { formatIQD } from '@/lib/utils';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> قيد الانتظار</span>;
      case 'confirmed': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12} /> مؤكد</span>;
      case 'preparing': return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> جاري التحضير</span>;
      case 'ready': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12} /> جاهز للتوصيل</span>;
      case 'delivered': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Truck size={12} /> تم التوصيل</span>;
      case 'cancelled': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12} /> ملغي</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  if (loading) return (
    <>
      <Header title="إدارة الطلبات" />
      <div className="p-8 text-center">جاري التحميل...</div>
    </>
  );

  return (
    <>
    <Header title="إدارة الطلبات" />
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">إدارة الطلبات</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            إجمالي: <strong className="text-primary">{filteredOrders.length}</strong> طلب
            {filterStatus !== 'all' && ` (من ${orders.length})`}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 w-full sm:w-auto">
          <Filter size={16} className="text-gray-500 mr-1 md:mr-2 flex-shrink-0" />
          <select
            className="bg-transparent text-xs md:text-sm outline-none cursor-pointer flex-1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">كل الطلبات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="confirmed">مؤكد</option>
            <option value="preparing">جاري التحضير</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">رقم الطلب</th>
                <th className="px-6 py-4">العميل</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">المبلغ</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{order.customer_name || 'عميل'}</p>
                    <p className="text-xs text-gray-500">{order.delivery_phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(order.created_at), 'yyyy/MM/dd HH:mm')}
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">{formatIQD(order.total_iqd)}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredOrders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{order.customer_name || 'عميل'}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-gray-500 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                      {order.delivery_phone && (
                        <p className="text-[10px] text-gray-400">{order.delivery_phone}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-primary text-sm flex-shrink-0">{formatIQD(order.total_iqd)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {format(new Date(order.created_at), 'yyyy/MM/dd HH:mm')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 md:p-12 text-center">
            <div className="text-gray-300 mb-3">
              <Package size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              {filterStatus !== 'all' ? 'لا توجد طلبات بهذه الحالة' : 'لا توجد طلبات'}
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
