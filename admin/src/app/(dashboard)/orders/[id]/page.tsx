'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Printer, MapPin, Phone, User, Clock, CreditCard, Truck, Package, Calendar, Receipt, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { formatIQD } from '@/lib/utils';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    if (!id) return;

    // Debug: Check current user
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current Session:', session);
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      console.log('Current Profile:', profile);

      if (profile?.role !== 'admin') {
        console.warn('User is NOT an admin!');
      }
    }

    // Fetch Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
    }

    setOrder(orderData);

    // Fetch Items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', id);

    if (itemsError) {
      console.error('Error fetching items:', itemsError);
    }

    setItems(itemsData || []);
    setLoading(false);
  };

  // Debug helper
  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('غير مسجل الدخول!');
      return false;
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      alert(`تنبيه: أنت لست أدمن! دورك هو: ${profile?.role}`);
      return false;
    }
    return true;
  };

  const updateStatus = async (newStatus: string) => {
    // Check perm first
    const isAdmin = await checkAdminStatus();
    if (!isAdmin) return;

    const previousStatus = order.status;
    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    // Optimistic update
    setOrder({ ...order, status: newStatus });

    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    setUpdating(false);

    if (error) {
      // Revert on error
      setOrder({ ...order, status: previousStatus });
      console.error('Error updating order status FULL:', JSON.stringify(error, null, 2));
      setUpdateError(`فشل تحديث الحالة: ${error.message || JSON.stringify(error)}`);

      // Clear error after 5 seconds
      setTimeout(() => setUpdateError(null), 5000);
      return;
    }

    if (data) {
      setOrder(data);
      setUpdateSuccess('تم تحديث حالة الطلب بنجاح!');

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(null), 3000);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsTotal = items.reduce((sum, item) => sum + (item.price_iqd * item.quantity), 0);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>طلب #${order.id.slice(0, 8)}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 20px; direction: rtl; }
          .header { text-align: center; border-bottom: 2px solid #2E7D32; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { color: #2E7D32; font-size: 24px; margin-bottom: 5px; }
          .header p { color: #666; font-size: 12px; }
          .order-info { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px; }
          .order-info div { text-align: center; }
          .order-info label { display: block; font-size: 11px; color: #888; margin-bottom: 3px; }
          .order-info span { font-weight: bold; font-size: 14px; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 14px; font-weight: bold; color: #333; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #eee; }
          .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .customer-info div { padding: 10px; background: #f5f5f5; border-radius: 5px; }
          .customer-info label { font-size: 11px; color: #888; display: block; }
          .customer-info span { font-weight: 500; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #2E7D32; color: white; padding: 10px; text-align: right; font-size: 12px; }
          td { padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; }
          .total-row { background: #f9f9f9; }
          .total-row td { font-weight: bold; }
          .grand-total { background: #2E7D32; color: white; }
          .grand-total td { font-size: 16px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px dashed #ccc; color: #888; font-size: 11px; }
          .notes { background: #fff3cd; padding: 10px; border-radius: 5px; border: 1px solid #ffc107; margin-top: 10px; }
          .notes label { font-weight: bold; color: #856404; font-size: 12px; }
          .notes p { color: #856404; font-size: 13px; margin-top: 5px; }
          .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .status-pending { background: #fff3cd; color: #856404; }
          .status-confirmed { background: #cce5ff; color: #004085; }
          .status-preparing { background: #ffe5d0; color: #c45c00; }
          .status-ready { background: #e2d5f1; color: #6f42c1; }
          .status-delivered { background: #d4edda; color: #155724; }
          .status-cancelled { background: #f8d7da; color: #721c24; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🛒 الأمل سنتر</h1>
          <p>فاتورة طلب</p>
        </div>

        <div class="order-info">
          <div>
            <label>رقم الطلب</label>
            <span>#${order.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <div>
            <label>تاريخ الطلب</label>
            <span>${format(new Date(order.created_at), 'yyyy/MM/dd')}</span>
          </div>
          <div>
            <label>وقت الطلب</label>
            <span>${format(new Date(order.created_at), 'hh:mm a')}</span>
          </div>
          <div>
            <label>حالة الطلب</label>
            <span class="status status-${order.status}">${getStatusText(order.status)}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📍 معلومات التوصيل</div>
          <div class="customer-info">
            <div>
              <label>اسم العميل</label>
              <span>${order.customer_name || '-'}</span>
            </div>
            <div>
              <label>رقم الهاتف</label>
              <span>${order.delivery_phone}</span>
            </div>
            <div style="grid-column: span 2;">
              <label>العنوان</label>
              <span>${order.delivery_address}</span>
            </div>
          </div>
          ${order.customer_notes ? `
          <div class="notes">
            <label>📝 ملاحظات العميل:</label>
            <p>${order.customer_notes}</p>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <div class="section-title">📦 تفاصيل المنتجات</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.product_snapshot?.name_ar || 'منتج'}</td>
                  <td>${formatIQD(item.price_iqd)}</td>
                  <td>${item.quantity}</td>
                  <td>${formatIQD(item.price_iqd * item.quantity)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="4">المجموع الفرعي</td>
                <td>${formatIQD(itemsTotal)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="4">رسوم التوصيل</td>
                <td>${formatIQD(order.delivery_cost_iqd || 0)}</td>
              </tr>
              ${order.discount_amount > 0 ? `
              <tr class="total-row">
                <td colspan="4">الخصم ${order.coupon_code ? `(${order.coupon_code})` : ''}</td>
                <td style="color: #dc3545;">- ${formatIQD(order.discount_amount)}</td>
              </tr>
              ` : ''}
              <tr class="grand-total">
                <td colspan="4">المجموع الكلي</td>
                <td>${formatIQD(order.total_iqd)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">💳 معلومات الدفع</div>
          <div class="customer-info">
            <div>
              <label>طريقة الدفع</label>
              <span>${getPaymentMethodText(order.payment_method)}</span>
            </div>
            <div>
              <label>حالة الدفع</label>
              <span>${getPaymentStatusText(order.payment_status)}</span>
            </div>
            <div>
              <label>نوع التوصيل</label>
              <span>${getDeliveryTypeText(order.delivery_type)}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>شكراً لتسوقكم من الأمل سنتر</p>
          <p>للاستفسارات: 07xxxxxxxxx</p>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      preparing: 'جاري التحضير',
      ready: 'جاهز للتوصيل',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي'
    };
    return statusMap[status] || status;
  };

  const getPaymentMethodText = (method: string) => {
    const methodMap: Record<string, string> = {
      cod: 'الدفع عند الاستلام',
      cash: 'نقداً',
      card: 'بطاقة ائتمان',
      wallet: 'محفظة إلكترونية'
    };
    return methodMap[method] || method;
  };

  const getPaymentStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'في انتظار الدفع',
      paid: 'مدفوع',
      failed: 'فشل الدفع',
      awaiting_payment: 'في انتظار الدفع'
    };
    return statusMap[status] || status;
  };

  const getDeliveryTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      scheduled: 'توصيل عادي',
      express: 'توصيل سريع',
      electronics: 'توصيل إلكترونيات'
    };
    return typeMap[type] || type;
  };

  const getStatusBadgeClass = (status: string) => {
    const classMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      preparing: 'bg-orange-100 text-orange-700',
      ready: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return classMap[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">الطلب غير موجود</div>;

  const itemsTotal = items.reduce((sum, item) => sum + (item.price_iqd * item.quantity), 0);

  return (
    <div className="p-6" ref={printRef}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowRight size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              طلب #{order.id.slice(0, 8).toUpperCase()}
              <span className={`text-xs px-3 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              {format(new Date(order.created_at), 'EEEE، d MMMM yyyy - hh:mm a', { locale: ar })}
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {updating && (
            <span className="text-sm text-blue-600 animate-pulse">جاري التحديث...</span>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
            onClick={handlePrint}
          >
            <Printer size={18} />
            <span>طباعة الفاتورة</span>
          </button>

          <select
            className={`px-4 py-2 bg-primary text-white rounded-lg outline-none cursor-pointer font-bold ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updating}
          >
            <option value="pending">قيد الانتظار</option>
            <option value="confirmed">تأكيد الطلب</option>
            <option value="preparing">جاري التحضير</option>
            <option value="ready">جاهز للتوصيل</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">إلغاء الطلب</option>
          </select>
        </div>
      </div>

      {/* Status Update Messages */}
      {updateError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
          <XCircle size={20} />
          <span>{updateError}</span>
        </div>
      )}

      {updateSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
          <CheckCircle size={20} />
          <span>{updateSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Package size={18} className="text-primary" />
              <h3 className="font-bold text-gray-800">تفاصيل المنتجات ({items.length} منتج)</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-500 text-xs">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">المنتج</th>
                    <th className="px-6 py-3">السعر</th>
                    <th className="px-6 py-3">الكمية</th>
                    <th className="px-6 py-3">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400 text-sm">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.product_snapshot?.image_url && (
                            <img src={item.product_snapshot.image_url} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          )}
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{item.product_snapshot?.name_ar || 'منتج غير معروف'}</p>
                            {item.product_snapshot?.name && (
                              <p className="text-xs text-gray-400">{item.product_snapshot.name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{formatIQD(item.price_iqd)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-gray-100 px-2 py-1 rounded font-bold">{item.quantity}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary text-sm">{formatIQD(item.price_iqd * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">المجموع الفرعي</span>
                <span className="font-medium">{formatIQD(itemsTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">رسوم التوصيل</span>
                <span className="font-medium">{formatIQD(order.delivery_cost_iqd || 0)}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>الخصم {order.coupon_code && `(${order.coupon_code})`}</span>
                  <span className="font-medium">- {formatIQD(order.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-800">المجموع الكلي</span>
                <span className="text-2xl font-bold text-primary">{formatIQD(order.total_iqd)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <User size={18} className="text-primary" />
              <h3 className="font-bold text-gray-800">معلومات العميل</h3>
            </div>
            <div className="space-y-4">
              {order.customer_name && (
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-1" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">الاسم</p>
                    <p className="font-medium text-gray-800">{order.customer_name}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Phone className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">رقم الهاتف</p>
                  <p className="font-medium text-gray-800 font-mono">{order.delivery_phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">العنوان</p>
                  <p className="font-medium text-gray-800">{order.delivery_address}</p>
                </div>
              </div>
              {order.customer_notes && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-2">
                  <p className="text-xs text-yellow-700 font-bold mb-1">📝 ملاحظات العميل:</p>
                  <p className="text-sm text-gray-700">{order.customer_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <CreditCard size={18} className="text-primary" />
              <h3 className="font-bold text-gray-800">معلومات الدفع والتوصيل</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">طريقة الدفع</span>
                </div>
                <span className="font-medium text-sm">{getPaymentMethodText(order.payment_method)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {order.payment_status === 'paid' ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <Clock size={16} className="text-yellow-500" />
                  )}
                  <span className="text-sm text-gray-600">حالة الدفع</span>
                </div>
                <span className={`font-medium text-sm ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {getPaymentStatusText(order.payment_status)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">نوع التوصيل</span>
                </div>
                <span className="font-medium text-sm">{getDeliveryTypeText(order.delivery_type)}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <Calendar size={18} className="text-primary" />
              <h3 className="font-bold text-gray-800">تفاصيل الوقت</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">تاريخ الإنشاء</span>
                <span className="font-medium">{format(new Date(order.created_at), 'yyyy/MM/dd')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">وقت الإنشاء</span>
                <span className="font-medium">{format(new Date(order.created_at), 'hh:mm a')}</span>
              </div>
              {order.updated_at && order.updated_at !== order.created_at && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">آخر تحديث</span>
                  <span className="font-medium">{format(new Date(order.updated_at), 'yyyy/MM/dd hh:mm a')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
