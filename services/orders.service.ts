/**
 * Orders Service
 * خدمة الطلبات - تحتوي على جميع استدعاءات Supabase المتعلقة بالطلبات
 */

import { supabase } from '../lib/supabase';
import type { Order, OrderInsert, OrderItem, OrderItemInsert, OrderWithItems } from '../shared/types';

/**
 * إنشاء طلب جديد
 */
export const createOrder = async (orderData: OrderInsert): Promise<Order> => {
    const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * إضافة عناصر الطلب
 */
export const createOrderItems = async (items: OrderItemInsert[]): Promise<OrderItem[]> => {
    const { data, error } = await supabase
        .from('order_items')
        .insert(items)
        .select();

    if (error) throw error;
    return data || [];
};

/**
 * جلب طلب بواسطة الـ ID مع العناصر
 */
export const getOrderById = async (id: string): Promise<OrderWithItems> => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (*)
    `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * جلب طلبات المستخدم
 */
export const getUserOrders = async (userId: string): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

/**
 * جلب جميع الطلبات (للـ Admin)
 */
export const getAllOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

/**
 * تحديث حالة الطلب
 */
export const updateOrderStatus = async (
    orderId: string,
    status: Order['status']
): Promise<Order> => {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * تحديث حالة الدفع
 */
export const updatePaymentStatus = async (
    orderId: string,
    paymentStatus: Order['payment_status']
): Promise<Order> => {
    const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId)
        .select()
        .single();

    if (error) throw error;
    return data;
};
