import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AddressData, DeliveryType, PaymentMethod } from '../../types/checkout';
import { useCartStore } from '../../store/cartStore';
import { useLanguage, useCurrency } from '../../contexts';

interface ReviewStepProps {
  address: AddressData | null;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  deliveryCost: number;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ address, deliveryType, paymentMethod, deliveryCost }) => {
  const { items, totalIQD } = useCartStore();
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const flexRow = isRTL ? 'flex-row-reverse' : 'flex-row';

  // Helper functions for labels...

  const getDeliveryLabel = () => {
    switch (deliveryType) {
      case 'express': return t('checkout.expressDelivery'); // 'توصيل سريع (ساعتين)';
      case 'electronics': return t('checkout.electronicsDelivery'); // 'إلكترونيات+';
      default: return t('checkout.scheduledDelivery'); // 'توصيل بموعد محدد';
    }
  };

  const getPaymentLabel = () => {
    switch (paymentMethod) {
      case 'card': return t('checkout.card'); // 'بطاقة ائتمان';
      case 'wallet': return t('checkout.wallet'); // 'محفظة إلكترونية';
      default: return t('checkout.cod'); // 'الدفع عند الاستلام';
    }
  };

  const grandTotal = totalIQD + deliveryCost;

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
      <Text className={`font-cairo-bold text-lg mb-4 text-primary ${alignClass}`}>{t('checkout.reviewOrder')}</Text>

      {/* Order Items Summary */}
      <View className="mb-6 border-b border-gray-100 pb-4">
        <View className={`flex-row justify-between items-center mb-2 ${flexRow}`}>
          <Text className="font-cairo text-text-secondary">{t('checkout.items')}</Text>
          <Text className="font-cairo-bold text-text-primary">{items.length} {t('checkout.items')}</Text>
        </View>
        {items.slice(0, 3).map((item) => (
          <View key={item.id} className={`flex-row justify-between items-center mb-1 ${flexRow}`}>
            <Text className="font-cairo text-text-secondary text-sm" numberOfLines={1} style={{ flex: 1, textAlign: isRTL ? 'left' : 'right' }}>
              {language === 'ar' ? (item.name_ar || item.name) : (item.name || item.name_ar)}
            </Text>
            <Text className="font-cairo text-text-primary text-sm ml-2">x{item.quantity}</Text>
          </View>
        ))}
        {items.length > 3 && (
          <Text className={`font-cairo text-primary text-xs mt-1 ${alignClass}`}>+ {items.length - 3} {t('checkout.moreItems')}</Text>
        )}
      </View>

      {/* Details Summary */}
      <View className="mb-6 border-b border-gray-100 pb-4">
        <View className={`flex-row justify-between items-start mb-3 ${flexRow}`}>
          <View className={`flex-row items-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
            <Ionicons name="location-outline" size={20} color="#757575" />
            <Text className={`font-cairo-bold text-text-primary ${isRTL ? 'mr-2' : 'ml-2'}`}>{t('checkout.address')}</Text>
          </View>
          <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
            <Text className={`font-cairo text-text-primary ${alignClass}`}>{address?.fullName}</Text>
            <Text className={`font-cairo text-text-secondary text-sm ${alignClass}`}>{address?.address}</Text>
            <Text className={`font-cairo text-text-secondary text-sm ${alignClass}`}>{address?.phone}</Text>
          </View>
        </View>

        <View className={`flex-row justify-between items-center mb-3 ${flexRow}`}>
          <View className={`flex-row items-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
            <Ionicons name="car-outline" size={20} color="#757575" />
            <Text className={`font-cairo-bold text-text-primary ${isRTL ? 'mr-2' : 'ml-2'}`}>{t('checkout.delivery')}</Text>
          </View>
          <Text className={`font-cairo text-text-primary ${alignClass}`}>{getDeliveryLabel()}</Text>
        </View>

        <View className={`flex-row justify-between items-center ${flexRow}`}>
          <View className={`flex-row items-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
            <Ionicons name="card-outline" size={20} color="#757575" />
            <Text className={`font-cairo-bold text-text-primary ${isRTL ? 'mr-2' : 'ml-2'}`}>{t('checkout.payment')}</Text>
          </View>
          <Text className={`font-cairo text-text-primary ${alignClass}`}>{getPaymentLabel()}</Text>
        </View>
      </View>

      {/* Cost Summary */}
      <View>
        <View className={`flex-row justify-between mb-2 ${flexRow}`}>
          <Text className="font-cairo text-text-secondary">{t('cart.subtotal')}</Text>
          <Text className="font-cairo text-text-primary">{formatPrice(totalIQD)}</Text>
        </View>
        <View className={`flex-row justify-between mb-2 ${flexRow}`}>
          <Text className="font-cairo text-text-secondary">{t('cart.deliveryFee')}</Text>
          <Text className="font-cairo text-text-primary">{formatPrice(deliveryCost)}</Text>
        </View>
        <View className={`flex-row justify-between pt-3 mt-2 border-t border-dashed border-gray-200 ${flexRow}`}>
          <Text className="font-cairo-bold text-lg text-text-primary">{t('cart.total')}</Text>
          <Text className="font-cairo-bold text-xl text-primary">{formatPrice(grandTotal)}</Text>
        </View>
      </View>

    </View>
  );
};
