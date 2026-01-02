import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { AddressData } from '../../types/checkout';
import { useLanguage } from '../../contexts';

interface AddressStepProps {
  control: Control<AddressData>;
  errors: FieldErrors<AddressData>;
}

export const AddressStep: React.FC<AddressStepProps> = ({ control, errors }) => {
  const { t, isRTL } = useLanguage();
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const flexDir = isRTL ? 'flex-row-reverse' : 'flex-row';

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
      <Text className={`font-cairo-bold text-lg mb-4 text-primary ${alignClass}`}>{t('checkout.deliveryAddress')}</Text>

      {/* Address Type Selection */}
      <View className="mb-4">
        <Text className={`font-cairo mb-2 text-text-secondary ${alignClass}`}>{t('checkout.addressType')}</Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View className={`flex-row ${isRTL ? 'justify-end' : 'justify-start'} gap-2`}>
              <TouchableOpacity
                onPress={() => onChange('home')}
                className={`flex-row items-center px-4 py-2 rounded-full border ${value === 'home' ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
              >
                <Ionicons name="home-outline" size={18} color={value === 'home' ? 'white' : '#757575'} />
                <Text className={`font-cairo mx-2 ${value === 'home' ? 'text-white' : 'text-text-secondary'}`}>{t('checkout.home')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onChange('work')}
                className={`flex-row items-center px-4 py-2 rounded-full border ${value === 'work' ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
              >
                <Ionicons name="briefcase-outline" size={18} color={value === 'work' ? 'white' : '#757575'} />
                <Text className={`font-cairo mx-2 ${value === 'work' ? 'text-white' : 'text-text-secondary'}`}>{t('checkout.work')}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Name */}
      <View className="mb-4">
        <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>{t('checkout.fullName')}</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo ${alignClass}`}
              placeholder={t('checkout.fullName')}
              value={value}
              onChangeText={onChange}
              textAlign={isRTL ? 'right' : 'left'}
            />
          )}
        />
        {errors.fullName && <Text className={`text-danger text-xs mt-1 font-cairo ${alignClass}`}>{errors.fullName.message}</Text>}
      </View>

      {/* Phone */}
      <View className="mb-4">
        <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>{t('checkout.phone')}</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo text-left`} // Phone usually LTR
              placeholder="07xxxxxxxxx"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phone && <Text className={`text-danger text-xs mt-1 font-cairo ${alignClass}`}>{errors.phone.message}</Text>}
      </View>

      {/* City */}
      <View className="mb-4">
        <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>{t('checkout.city')}</Text>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo ${alignClass}`}
              placeholder={t('checkout.cityPlaceholder')}
              value={value || ''}
              onChangeText={onChange}
              textAlign={isRTL ? 'right' : 'left'}
            />
          )}
        />
      </View>

      {/* Address */}
      <View className="mb-4">
        <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>{t('checkout.addressDetails')}</Text>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo h-24 ${alignClass}`}
              placeholder={t('checkout.addressPlaceholder')}
              multiline
              textAlignVertical="top"
              value={value}
              onChangeText={onChange}
              textAlign={isRTL ? 'right' : 'left'}
            />
          )}
        />
        {errors.address && <Text className={`text-danger text-xs mt-1 font-cairo ${alignClass}`}>{errors.address.message}</Text>}
      </View>

      {/* Notes */}
      <View className="mb-4">
        <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>{t('checkout.notes')}</Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo ${alignClass}`}
              placeholder={t('checkout.notesPlaceholder')}
              value={value}
              onChangeText={onChange}
              textAlign={isRTL ? 'right' : 'left'}
            />
          )}
        />
      </View>
    </View>
  );
};
