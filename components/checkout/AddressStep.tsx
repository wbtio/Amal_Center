import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, TextInputProps } from 'react-native';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { AddressData, IRAQI_CITIES } from '../../types/checkout';
import { useLanguage } from '../../contexts';
import { LocationPicker } from '../ui/LocationPicker';

interface AddressStepProps {
  control: Control<AddressData>;
  errors: FieldErrors<AddressData>;
  setValue: UseFormSetValue<AddressData>;
  getValues: () => AddressData;
}

export const AddressStep: React.FC<AddressStepProps> = ({ control, errors, setValue, getValues }) => {
  const { isRTL, language } = useLanguage();
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const flexDir = isRTL ? 'flex-row-reverse' : 'flex-row';
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLocationSelect = (location: { latitude: number; longitude: number; address?: string }) => {
    setValue('latitude', location.latitude);
    setValue('longitude', location.longitude);
    if (location.address) {
      setValue('nearestLandmark', location.address);
    }
  };

  const handleInputFocus = (y: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
    }, 300);
  };

  const renderInput = (
    name: keyof AddressData,
    label: string,
    placeholder: string,
    required: boolean = false,
    options?: Partial<TextInputProps>,
    yPosition: number = 0,
    containerClass: string = "mb-4"
  ) => (
    <View className={containerClass}>
      <Text className={`font-ibm-bold text-xs text-gray-700 mb-1.5 ${alignClass}`}>
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`bg-gray-50 border ${errors[name] ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-primary'} rounded-xl p-3.5 font-ibm text-sm text-gray-900 ${alignClass}`}
            placeholder={placeholder}
            value={typeof value === 'string' ? value : ''}
            onChangeText={onChange}
            textAlign={isRTL ? 'right' : 'left'}
            placeholderTextColor="#9CA3AF"
            onFocus={() => handleInputFocus(yPosition)}
            {...options}
          />
        )}
      />
      {errors[name] && (
        <View className={`flex-row items-center mt-1.5 bg-red-50 border border-red-100 py-1.5 px-2.5 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Ionicons name="warning" size={14} color="#EF4444" />
          <Text className={`text-red-600 text-[11px] font-ibm-bold flex-1 px-1.5 ${alignClass}`}>
            {errors[name]?.message as string}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">

      {/* Address Type Selection */}
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <View className={`flex-row gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <TouchableOpacity
              onPress={() => onChange('home')}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 ${value === 'home' ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-100'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              activeOpacity={0.7}
            >
              <Ionicons name={value === 'home' ? "home" : "home-outline"} size={18} color={value === 'home' ? '#2E7D32' : '#6B7280'} />
              <Text className={`font-ibm-bold mx-2 text-sm ${value === 'home' ? 'text-primary' : 'text-gray-600'}`}>
                {language === 'ar' ? 'المنزل' : 'Home'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onChange('work')}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 ${value === 'work' ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-100'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              activeOpacity={0.7}
            >
              <Ionicons name={value === 'work' ? "briefcase" : "briefcase-outline"} size={18} color={value === 'work' ? '#2E7D32' : '#6B7280'} />
              <Text className={`font-ibm-bold mx-2 text-sm ${value === 'work' ? 'text-primary' : 'text-gray-600'}`}>
                {language === 'ar' ? 'العمل' : 'Work'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Row 1: Name and Phone */}
      {renderInput('fullName', language === 'ar' ? 'الاسم الكامل' : 'Full Name', language === 'ar' ? 'الاسم الكامل' : 'Full Name', true)}
      {renderInput('phone', language === 'ar' ? 'رقم الهاتف' : 'Phone Number', '07xxxxxxxxx', true, { keyboardType: 'phone-pad', textAlign: 'left' })}

      {/* City Dropdown */}
      <View className="mb-4">
        <Text className={`font-ibm-bold text-xs text-gray-700 mb-1.5 ${alignClass}`}>
          {language === 'ar' ? 'المحافظة' : 'City/Province'} <Text className="text-red-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => setShowCityPicker(true)}
                className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3.5 ${flexDir} items-center justify-between`}
                activeOpacity={0.7}
              >
                <Text className={`font-ibm text-sm ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                  {value
                    ? IRAQI_CITIES.find(c => c.id === value)?.[language === 'ar' ? 'name_ar' : 'name_en'] || value
                    : (language === 'ar' ? 'اختر المحافظة' : 'Select City')
                  }
                </Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* City Picker Modal */}
              <Modal visible={showCityPicker} transparent animationType="slide" onRequestClose={() => setShowCityPicker(false)}>
                <View className="flex-1 bg-black/50 justify-end">
                  <View className="bg-white rounded-t-3xl max-h-[70%]">
                    <View className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Text className="font-ibm-bold text-base text-gray-900">{language === 'ar' ? 'اختر المحافظة' : 'Select City'}</Text>
                      <TouchableOpacity onPress={() => setShowCityPicker(false)} className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                        <Ionicons name="close" size={20} color="#4B5563" />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={IRAQI_CITIES}
                      keyExtractor={(item) => item.id}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => { onChange(item.id); setShowCityPicker(false); }}
                          className={`p-4 border-b border-gray-50 ${flexDir} items-center justify-between`}
                        >
                          <Text className={`font-ibm text-base ${value === item.id ? 'text-primary font-ibm-bold' : 'text-gray-700'}`}>
                            {language === 'ar' ? item.name_ar : item.name_en}
                          </Text>
                          {value === item.id && <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </>
          )}
        />
        {errors.city && (
          <View className={`flex-row items-center mt-1.5 bg-red-50 border border-red-100 py-1.5 px-2.5 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Ionicons name="warning" size={14} color="#EF4444" />
            <Text className={`text-red-600 text-[11px] font-ibm-bold flex-1 px-1.5 ${alignClass}`}>
              {errors.city.message}
            </Text>
          </View>
        )}
      </View>

      {/* Row 2: Area and Street side by side */}
      <View className={`flex-row gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <View className="flex-1">
          {renderInput('area', language === 'ar' ? 'المنطقة' : 'Area', language === 'ar' ? 'المنطقة...' : 'Area...', false, {}, 150, "mb-4")}
        </View>
        <View className="flex-1">
          {renderInput('street', language === 'ar' ? 'رقم الدار' : 'House No.', language === 'ar' ? 'الدار/الشارع...' : 'House/St...', false, {}, 150, "mb-4")}
        </View>
      </View>

      {/* Map Location (Compact) */}
      <View className="mb-4">
        <Controller
          control={control}
          name="latitude"
          render={({ field: { value: latitude } }) => (
            <Controller
              control={control}
              name="longitude"
              render={({ field: { value: longitude } }) => (
                <TouchableOpacity
                  onPress={() => setShowLocationPicker(true)}
                  className={`flex-row items-center justify-center py-3 rounded-xl border border-dashed ${latitude && longitude ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-300'} ${isRTL ? 'flex-row-reverse' : ''}`}
                  activeOpacity={0.7}
                >
                  <Ionicons name={latitude && longitude ? "checkmark-circle" : "location-outline"} size={18} color={latitude && longitude ? "#2E7D32" : "#6B7280"} className={isRTL ? 'ml-2' : 'mr-2'} />
                  <Text className={`font-ibm-bold text-sm ${latitude && longitude ? 'text-primary' : 'text-gray-600'}`}>
                    {latitude && longitude ? (language === 'ar' ? 'تم التحديد على الخريطة' : 'Map Pinned') : (language === 'ar' ? 'تحديد على الخريطة (اختياري)' : 'Pin on Map (Optional)')}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        />
      </View>

      <LocationPicker
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onLocationSelect={handleLocationSelect}
        initialLocation={
          getValues().latitude && getValues().longitude
            ? { latitude: getValues().latitude!, longitude: getValues().longitude! }
            : undefined
        }
      />
    </View>
  );
};
