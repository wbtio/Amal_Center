import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DeliveryType } from '../../types/checkout';
import { useLanguage, useCurrency } from '../../contexts';

interface DeliveryStepProps {
  selectedType: DeliveryType;
  onSelect: (type: DeliveryType) => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({ selectedType, onSelect }) => {
  const { t, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const flexDir = isRTL ? 'flex-row-reverse' : 'flex-row'; // NOT used on main container, but inner content

  // We need to reverse the content order based on RTL
  // Icon on one side, Text on the other.
  // Standard Row: [RadioButton] [Text] [Icon]   <-- Current Layout seems specific
  // Current: [RadioButton] [Flex-1 Text] [Icon]
  // Ideally: Start [RadioButton] ..... [Icon] End
  // Text should align to Start or End?
  // Current code: `flex-row items-center`
  // RB (mr-3) | Text (flex-1 items-end) | Icon (ml-3) 
  // It forces Text to right.

  // Let's make it direction aware.

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
      <Text className={`font-cairo-bold text-lg mb-4 text-primary ${alignClass}`}>{t('checkout.chooseDelivery')}</Text>

      {/* Scheduled Delivery */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border mb-3 ${selectedType === 'scheduled' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('scheduled')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedType === 'scheduled' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.scheduledDelivery')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.scheduledDeliveryDesc')}</Text>
          <Text className="font-cairo-bold text-primary mt-1">{formatPrice(2000)}</Text>
        </View>
        <Ionicons name="calendar-outline" size={24} color={selectedType === 'scheduled' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>

      {/* Express Delivery */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border mb-3 ${selectedType === 'express' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('express')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedType === 'express' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.expressDelivery')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.expressDeliveryDesc')}</Text>
          <Text className="font-cairo-bold text-primary mt-1">{formatPrice(5000)}</Text>
        </View>
        <Ionicons name="flash-outline" size={24} color={selectedType === 'express' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>

      {/* Electronics Delivery */}
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-lg border ${selectedType === 'electronics' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}
        onPress={() => onSelect('electronics')}
      >
        <View className={`w-5 h-5 rounded-full border border-primary items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
          {selectedType === 'electronics' && <View className="w-3 h-3 rounded-full bg-primary" />}
        </View>
        <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className={`font-cairo-bold text-text-primary ${alignClass}`}>{t('checkout.electronicsDelivery')}</Text>
          <Text className={`font-cairo text-text-secondary text-xs mt-1 ${alignClass}`}>{t('checkout.electronicsDeliveryDesc')}</Text>
          <Text className="font-cairo-bold text-primary mt-1">{formatPrice(10000)}</Text>
        </View>
        <Ionicons name="tv-outline" size={24} color={selectedType === 'electronics' ? '#2E7D32' : '#757575'} className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
      </TouchableOpacity>
    </View>
  );
};
