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
  const { t, isRTL } = useLanguage();
  const alignClass = isRTL ? 'text-right' : 'text-left';

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
      <Text className={`font-cairo-bold text-lg mb-4 text-primary ${alignClass}`}>{t('checkout.paymentMethod')}</Text>

      {/* COD */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border mb-3 ${selectedMethod === 'cod' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('cod')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedMethod === 'cod' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.cod')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.codDesc')}</Text>
        </View>
        <Ionicons name="cash-outline" size={24} color={selectedMethod === 'cod' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>

      {/* Credit Card */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border mb-3 ${selectedMethod === 'card' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('card')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedMethod === 'card' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.card')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.cardDesc')}</Text>
        </View>
        <Ionicons name="card-outline" size={24} color={selectedMethod === 'card' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>

      {/* Wallet */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border ${selectedMethod === 'wallet' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('wallet')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedMethod === 'wallet' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.wallet')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.walletDesc')}</Text>
        </View>
        <Ionicons name="phone-portrait-outline" size={24} color={selectedMethod === 'wallet' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>
    </View>
  );
};
