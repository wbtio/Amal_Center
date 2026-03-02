import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaymentMethod } from '../../types/checkout';
import { useLanguage } from '../../contexts';

interface PaymentStepProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ selectedMethod, onSelect }) => {
  const { isRTL, language } = useLanguage();
  const alignClass = isRTL ? 'text-right' : 'text-left';

  const paymentOptions = [
    {
      id: 'cod' as PaymentMethod,
      title: language === 'ar' ? 'الدفع عند الاستلام (نقد)' : 'Cash on Delivery (COD)',
      available: true,
      icon: 'cash'
    },
    {
      id: 'wallet' as PaymentMethod,
      title: language === 'ar' ? 'زين كاش (قريباً)' : 'Zain Cash (Soon)',
      available: false,
      icon: 'phone-portrait'
    },
    {
      id: 'card' as PaymentMethod,
      title: language === 'ar' ? 'بطاقة بنكية (قريباً)' : 'Credit Card (Soon)',
      available: false,
      icon: 'card'
    }
  ];

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
      <View className="gap-2">
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`flex-row items-center p-3 rounded-xl border ${selectedMethod === option.id
                ? 'bg-primary/5 border-primary'
                : 'bg-gray-50 border-gray-100'
              } ${!option.available ? 'opacity-50' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
            onPress={() => option.available && onSelect(option.id)}
            disabled={!option.available}
            activeOpacity={0.7}
          >
            <Ionicons
              name={option.icon as any}
              size={20}
              color={selectedMethod === option.id ? '#2E7D32' : '#6B7280'}
              style={isRTL ? { marginLeft: 12 } : { marginRight: 12 }}
            />
            <Text className={`flex-1 font-ibm-bold text-sm ${selectedMethod === option.id ? 'text-primary' : 'text-gray-800'} ${alignClass}`}>
              {option.title}
            </Text>
            {selectedMethod === option.id && (
              <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
