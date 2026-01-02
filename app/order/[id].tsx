import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage, useCurrency } from '../../contexts';
import { Image } from 'expo-image';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchOrderDetails();
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
    }
  };

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
        <Text className="font-cairo text-danger">
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
        <Text className="flex-1 text-center font-cairo-bold text-lg text-text-primary">
          {t('order.details') || (language === 'ar' ? 'تفاصيل الطلب' : 'Order Details')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Status Card */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <View className={`flex-row justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-cairo text-gray-500">{t('status.label') || (language === 'ar' ? 'حالة الطلب' : 'Status')}</Text>
            <Text className="font-cairo-bold text-primary">{getStatusText(order.status)}</Text>
          </View>
          <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-cairo text-gray-500">{t('order.date') || (language === 'ar' ? 'تاريخ الطلب' : 'Order Date')}</Text>
            <Text className="font-cairo text-text-primary">
              {new Date(order.created_at).toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US')}
            </Text>
          </View>
        </View>

        {/* Address Card */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <Text className={`font-cairo-bold mb-2 text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('checkout.deliveryInfo') || (language === 'ar' ? 'معلومات التوصيل' : 'Delivery Info')}
          </Text>
          <Text className={`font-cairo text-text-primary mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>{order.delivery_address}</Text>
          <Text className={`font-cairo text-text-secondary ${isRTL ? 'text-right' : 'text-left'}`}>{order.delivery_phone}</Text>
        </View>

        {/* Items List */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
          <Text className={`font-cairo-bold mb-4 text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
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
                <Text className={`font-cairo text-text-primary text-sm ${isRTL ? 'text-right' : 'text-left'}`} numberOfLines={1}>
                  {language === 'ar' ? (item.product_snapshot?.name_ar || 'منتج') : (item.product_snapshot?.name || item.product_snapshot?.name_ar)}
                </Text>
                <Text className={`font-cairo text-gray-400 text-xs ${isRTL ? 'text-right' : 'text-left'}`}>
                  {item.quantity} x {formatPrice(item.price_iqd)}
                </Text>
              </View>
              <Text className="font-cairo-bold text-text-primary text-sm">
                {formatPrice(item.price_iqd * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Summary */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
          <View className={`flex-row justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-cairo-bold text-text-primary">
              {t('cart.total') || (language === 'ar' ? 'المجموع الكلي' : 'Total')}
            </Text>
            <Text className="font-cairo-bold text-text-primary">{formatPrice(order.total_iqd)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
