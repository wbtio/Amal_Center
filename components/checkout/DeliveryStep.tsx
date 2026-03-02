import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DeliveryType } from '../../types/checkout';
import { useLanguage, useCurrency } from '../../contexts';

interface DeliveryStepProps {
  selectedType: DeliveryType;
  onSelect: (type: DeliveryType) => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({ selectedType, onSelect }) => {
  const { isRTL, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const alignClass = isRTL ? 'text-right' : 'text-left';

  const deliveryOptions = [
    {
      id: 'scheduled' as DeliveryType,
      title: language === 'ar' ? 'توصيل عادي' : 'Standard',
      desc: language === 'ar' ? '24-48 ساعة' : '24-48 hrs',
      price: 2000,
      icon: 'bicycle-outline'
    },
    {
      id: 'express' as DeliveryType,
      title: language === 'ar' ? 'سريع' : 'Express',
      desc: language === 'ar' ? 'نفس اليوم' : 'Same day',
      price: 5000,
      icon: 'flash-outline'
    },
    {
      id: 'electronics' as DeliveryType,
      title: language === 'ar' ? 'أجهزة' : 'Fragile',
      desc: language === 'ar' ? 'عناية فائقة' : 'Extra care',
      price: 10000,
      icon: 'tv-outline'
    }
  ];

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: isRTL ? 0 : 10, paddingLeft: isRTL ? 10 : 0, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {deliveryOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`w-[130px] p-3 rounded-xl border-2 items-center justify-center ${selectedType === option.id
                ? 'bg-primary/5 border-primary'
                : 'bg-gray-50 border-gray-100'
              }`}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 ${selectedType === option.id ? 'bg-primary/10' : 'bg-white shadow-sm border border-gray-100'
              }`}>
              <Ionicons
                name={option.icon as any}
                size={16}
                color={selectedType === option.id ? '#2E7D32' : '#6B7280'}
              />
            </View>
            <Text className={`font-ibm-bold text-[13px] text-center mb-1 ${selectedType === option.id ? 'text-primary' : 'text-gray-800'}`}>
              {option.title}
            </Text>
            <Text className={`font-ibm-bold text-[11px] text-center ${selectedType === option.id ? 'text-primary' : 'text-gray-800'}`}>
              {formatPrice(option.price)}
            </Text>
            <Text className="font-ibm text-[10px] text-gray-500 text-center mt-1">
              {option.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
