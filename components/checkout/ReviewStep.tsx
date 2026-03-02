import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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

const getDeliveryLabel = (type: DeliveryType, lang: string) => {
  const labels: Record<DeliveryType, { ar: string; en: string; icon: string }> = {
    scheduled: { ar: 'توصيل عادي (24-48 ساعة)', en: 'Standard (24-48 hrs)', icon: 'bicycle-outline' },
    express: { ar: 'سريع (نفس اليوم)', en: 'Express (Same day)', icon: 'flash-outline' },
    electronics: { ar: 'أجهزة (عناية فائقة)', en: 'Fragile (Extra care)', icon: 'tv-outline' },
  };
  return labels[type] || labels.scheduled;
};

const getPaymentLabel = (method: PaymentMethod, lang: string) => {
  const labels: Record<PaymentMethod, { ar: string; en: string; icon: string }> = {
    cod: { ar: 'الدفع عند الاستلام', en: 'Cash on Delivery', icon: 'cash' },
    wallet: { ar: 'زين كاش', en: 'Zain Cash', icon: 'phone-portrait' },
    card: { ar: 'بطاقة بنكية', en: 'Credit Card', icon: 'card' },
  };
  return labels[method] || labels.cod;
};

export const ReviewStep: React.FC<ReviewStepProps> = ({ address, deliveryType, paymentMethod, deliveryCost }) => {
  const { items, totalIQD } = useCartStore();
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const flexRow = isRTL ? 'flex-row-reverse' : 'flex-row';
  const delivery = getDeliveryLabel(deliveryType, language);
  const payment = getPaymentLabel(paymentMethod, language);

  const InfoRow = ({ icon, label, value, iconColor = '#2E7D32' }: { icon: string; label: string; value: string; iconColor?: string }) => (
    <View className={`flex-row items-start py-2 ${flexRow}`}>
      <View className="w-7 h-7 rounded-full bg-gray-50 items-center justify-center" style={isRTL ? { marginLeft: 10 } : { marginRight: 10 }}>
        <Ionicons name={icon as any} size={14} color={iconColor} />
      </View>
      <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
        <Text className={`font-ibm text-[11px] text-gray-400 ${alignClass}`}>{label}</Text>
        <Text className={`font-ibm-bold text-[13px] text-gray-800 ${alignClass}`}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Delivery & Payment Summary */}
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
        <View className={`flex-row items-center mb-2 ${flexRow}`}>
          <Ionicons name="reader-outline" size={16} color="#2E7D32" style={isRTL ? { marginLeft: 6 } : { marginRight: 6 }} />
          <Text className="font-ibm-bold text-gray-800 text-sm">
            {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
          </Text>
        </View>

        {address && (
          <InfoRow
            icon="location"
            label={language === 'ar' ? 'العنوان' : 'Address'}
            value={[address.fullName, address.city, address.area, address.street].filter(Boolean).join(' - ')}
          />
        )}
        {address?.phone && (
          <InfoRow
            icon="call"
            label={language === 'ar' ? 'الهاتف' : 'Phone'}
            value={address.phone}
          />
        )}
        <InfoRow
          icon={delivery.icon}
          label={language === 'ar' ? 'التوصيل' : 'Delivery'}
          value={language === 'ar' ? delivery.ar : delivery.en}
        />
        <InfoRow
          icon={payment.icon}
          label={language === 'ar' ? 'الدفع' : 'Payment'}
          value={language === 'ar' ? payment.ar : payment.en}
        />
      </View>

      {/* Compact Order Items Preview */}
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
        <View className={`flex-row justify-between items-center mb-3 ${flexRow}`}>
          <Text className="font-ibm-bold text-gray-800 text-sm">
            {language === 'ar' ? 'المنتجات' : 'Items'}
          </Text>
          <Text className="font-ibm-bold text-primary text-[11px] bg-primary/10 px-2.5 py-1 rounded-full">
            {items.length} {language === 'ar' ? 'عناصر' : 'items'}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          {items.map((item) => (
            <View key={item.id} className={`items-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
              <View className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden relative">
                {item.image_url ? (
                  <Image source={{ uri: item.image_url }} className="w-full h-full" resizeMode="cover" />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-gray-100">
                    <Ionicons name="image-outline" size={20} color="#9CA3AF" />
                  </View>
                )}
                {item.quantity > 1 && (
                  <View className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} bg-primary rounded-full w-5 h-5 items-center justify-center`}>
                    <Text className="text-white text-[10px] font-ibm-bold">{item.quantity}</Text>
                  </View>
                )}
              </View>
              <Text className="font-ibm text-[9px] text-gray-500 mt-1 w-16 text-center" numberOfLines={1}>
                {language === 'ar' ? (item.name_ar || item.name) : item.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Cost Summary */}
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-10">
        <View className="gap-2.5">
          <View className={`flex-row justify-between items-center ${flexRow}`}>
            <Text className="font-ibm text-gray-500 text-sm">{t('cart.subtotal')}</Text>
            <Text className="font-ibm-bold text-gray-800 text-sm">{formatPrice(totalIQD)}</Text>
          </View>

          <View className={`flex-row justify-between items-center ${flexRow}`}>
            <Text className="font-ibm text-gray-500 text-sm">{t('cart.deliveryFee')}</Text>
            <Text className="font-ibm-bold text-gray-800 text-sm">{formatPrice(deliveryCost)}</Text>
          </View>

          <View className="h-px bg-gray-100 my-1" />

          <View className={`flex-row justify-between items-center ${flexRow}`}>
            <Text className="font-ibm-bold text-gray-900 text-base">{t('cart.total')}</Text>
            <Text className="font-ibm-bold text-primary text-lg">{formatPrice(totalIQD + deliveryCost)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
