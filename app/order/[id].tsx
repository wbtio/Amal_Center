import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage, useCurrency } from '../../contexts';
import { Image } from 'expo-image';

export default function OrderDetailsScreen() {
  const { id, isNewOrder } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(isNewOrder === 'true');
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchOrderDetails();

    // Subscribe to realtime updates for this specific order
    const subscription = supabase
      .channel(`order-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`
        },
        (payload) => {
          console.log('Order updated:', payload);
          setOrder((prevOrder: any) => ({ ...prevOrder, ...payload.new }));
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch Order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Fetch Items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id);

      if (itemsError) throw itemsError;
      setItems(itemsData || []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrderDetails();
  }, [id]);


  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('status.pending') || 'Pending';
      case 'confirmed': return t('status.confirmed') || 'Confirmed';
      case 'preparing': return t('status.preparing') || 'Preparing';
      case 'ready': return t('status.ready') || 'Ready';
      case 'delivered': return t('status.delivered') || 'Delivered';
      case 'cancelled': return t('status.cancelled') || 'Cancelled';
      default: return status;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator color="#2E7D32" />
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="font-ibm text-danger">
          {language === 'ar' ? 'الطلب غير موجود' : 'Order not found'}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className={`flex-row items-center px-4 py-3 bg-white border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-ibm-bold text-lg text-text-primary">
          {t('order.details') || (language === 'ar' ? 'تفاصيل الطلب' : 'Order Details')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2E7D32']}
            tintColor="#2E7D32"
          />
        }
      >
        {/* Status Card */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <View className={`flex-row justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-ibm text-gray-500">{t('status.label') || (language === 'ar' ? 'حالة الطلب' : 'Status')}</Text>
            <Text className="font-ibm-bold text-primary">{getStatusText(order.status)}</Text>
          </View>
          <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-ibm text-gray-500">{t('order.date') || (language === 'ar' ? 'تاريخ الطلب' : 'Order Date')}</Text>
            <Text className="font-ibm text-text-primary">
              {new Date(order.created_at).toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US')}
            </Text>
          </View>
        </View>

        {/* Address Card */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <Text className={`font-ibm-bold mb-2 text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('checkout.deliveryInfo') || (language === 'ar' ? 'معلومات التوصيل' : 'Delivery Info')}
          </Text>
          <Text className={`font-ibm text-text-primary mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>{order.delivery_address}</Text>
          <Text className={`font-ibm text-text-secondary ${isRTL ? 'text-right' : 'text-left'}`}>{order.delivery_phone}</Text>
        </View>

        {/* Items List */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <Text className={`font-ibm-bold mb-4 text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('home.products') || (language === 'ar' ? 'المنتجات' : 'Products')}
          </Text>
          {items.map((item) => (
            <View key={item.id} className={`flex-row items-center mb-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0 last:mb-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Image
                source={{ uri: item.product_snapshot?.image_url }}
                style={{ width: 50, height: 50, borderRadius: 4, backgroundColor: 'transparent' }}
                contentFit="contain"
              />
              <View className={`flex-1 mx-3`}>
                <Text className={`font-ibm text-text-primary text-sm ${isRTL ? 'text-right' : 'text-left'}`} numberOfLines={1}>
                  {language === 'ar' ? (item.product_snapshot?.name_ar || 'منتج') : (item.product_snapshot?.name || item.product_snapshot?.name_ar)}
                </Text>
                <Text className={`font-ibm text-gray-400 text-xs ${isRTL ? 'text-right' : 'text-left'}`}>
                  {item.quantity} x {formatPrice(item.price_iqd)}
                </Text>
              </View>
              <Text className="font-ibm-bold text-text-primary text-sm">
                {formatPrice(item.price_iqd * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Summary */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
          <View className={`flex-row justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-ibm-bold text-text-primary">
              {t('cart.total') || (language === 'ar' ? 'المجموع الكلي' : 'Total')}
            </Text>
            <Text className="font-ibm-bold text-text-primary">{formatPrice(order.total_iqd)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Thank You Modal */}
      <Modal visible={showThankYou} transparent animationType="fade" onRequestClose={() => setShowThankYou(false)}>
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-white rounded-3xl w-full max-w-sm p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-green-50 items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#10B981" />
            </View>
            <Text className="font-ibm-bold text-xl text-gray-900 mb-2 text-center">
              {language === 'ar' ? 'شكراً لشرائك!' : 'Thank you for your purchase!'}
            </Text>
            <Text className="font-ibm text-sm text-gray-500 text-center mb-6 leading-5">
              {language === 'ar' ? 'تم استلام طلبك بنجاح. يمكنك متابعة حالة الطلب من هذه الصفحة.' : 'Your order has been received successfully. You can track your order status from this page.'}
            </Text>
            <TouchableOpacity
              className="w-full bg-primary py-3 rounded-xl items-center"
              onPress={() => setShowThankYou(false)}
            >
              <Text className="font-ibm-bold text-white text-base">
                {language === 'ar' ? 'حسناً' : 'OK'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
