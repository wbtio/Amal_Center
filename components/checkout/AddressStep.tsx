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
  const { t, isRTL, language } = useLanguage();
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
    yPosition: number = 0
  ) => (
    <View className="mb-4">
      <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`bg-gray-50 border border-gray-200 rounded-xl p-4 font-cairo text-base ${alignClass}`}
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
        <Text className={`text-red-500 text-xs mt-1 font-cairo ${alignClass}`}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );

  return (
    <View className="flex-1">
      {/* Address Type Selection */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'نوع العنوان' : 'Address Type'}
        </Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View className={`flex-row gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TouchableOpacity
                onPress={() => onChange('home')}
                className={`flex-1 flex-row items-center justify-center px-4 py-3 rounded-xl border-2 ${
                  value === 'home' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200'
                }`}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="home" 
                  size={20} 
                  color={value === 'home' ? '#2E7D32' : '#9CA3AF'} 
                />
                <Text className={`font-cairo-bold mx-2 ${value === 'home' ? 'text-primary' : 'text-gray-500'}`}>
                  {language === 'ar' ? 'المنزل' : 'Home'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onChange('work')}
                className={`flex-1 flex-row items-center justify-center px-4 py-3 rounded-xl border-2 ${
                  value === 'work' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200'
                }`}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="briefcase" 
                  size={20} 
                  color={value === 'work' ? '#2E7D32' : '#9CA3AF'} 
                />
                <Text className={`font-cairo-bold mx-2 ${value === 'work' ? 'text-primary' : 'text-gray-500'}`}>
                  {language === 'ar' ? 'العمل' : 'Work'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Personal Info */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
        </Text>
        
        {renderInput('fullName', language === 'ar' ? 'الاسم' : 'Name', language === 'ar' ? 'أدخل اسمك' : 'Enter your name', true)}
        
        {renderInput('phone', language === 'ar' ? 'رقم الهاتف' : 'Phone Number', '07xxxxxxxxx', true, {
          keyboardType: 'phone-pad',
          textAlign: 'left'
        })}
      </View>

      {/* Location Info */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'معلومات الموقع' : 'Location Information'}
        </Text>

        {/* City Dropdown */}
        <View className="mb-4">
          <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>
            {language === 'ar' ? 'المحافظة' : 'City/Province'} <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setShowCityPicker(true)}
                  className={`bg-gray-50 border border-gray-200 rounded-xl p-4 ${flexDir} items-center justify-between`}
                  activeOpacity={0.7}
                >
                  <Text className={`font-cairo text-base ${value ? 'text-gray-800' : 'text-gray-400'}`}>
                    {value 
                      ? IRAQI_CITIES.find(c => c.id === value)?.[language === 'ar' ? 'name_ar' : 'name_en'] || value
                      : (language === 'ar' ? 'اختر المحافظة' : 'Select City')
                    }
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                {/* City Picker Modal */}
                <Modal
                  visible={showCityPicker}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowCityPicker(false)}
                >
                  <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl max-h-[70%]">
                      <View className={`flex-row items-center justify-between p-4 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Text className="font-cairo-bold text-lg text-gray-800">
                          {language === 'ar' ? 'اختر المحافظة' : 'Select City'}
                        </Text>
                        <TouchableOpacity onPress={() => setShowCityPicker(false)}>
                          <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        data={IRAQI_CITIES}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              onChange(item.id);
                              setShowCityPicker(false);
                            }}
                            className={`p-4 border-b border-gray-100 ${flexDir} items-center justify-between`}
                            activeOpacity={0.7}
                          >
                            <Text className={`font-cairo text-base ${value === item.id ? 'text-primary font-cairo-bold' : 'text-gray-700'}`}>
                              {language === 'ar' ? item.name_ar : item.name_en}
                            </Text>
                            {value === item.id && (
                              <Ionicons name="checkmark-circle" size={22} color="#2E7D32" />
                            )}
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
            <Text className={`text-red-500 text-xs mt-1 font-cairo ${alignClass}`}>
              {errors.city.message}
            </Text>
          )}
        </View>

        {renderInput('district', language === 'ar' ? 'القضاء / المنطقة' : 'District', language === 'ar' ? 'مثال: الكرادة' : 'e.g. Karrada', false, {}, 200)}
        
        {renderInput('neighborhood', language === 'ar' ? 'الحي' : 'Neighborhood', language === 'ar' ? 'مثال: حي الوحدة' : 'e.g. Al-Wahda', false, {}, 280)}
        
        {renderInput('street', language === 'ar' ? 'الشارع' : 'Street', language === 'ar' ? 'مثال: شارع 14' : 'e.g. Street 14', false, {}, 360)}
      </View>

      {/* Building Details */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'تفاصيل المبنى' : 'Building Details'}
        </Text>

        <View className={`flex-row gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <View className="flex-1">
            <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>
              {language === 'ar' ? 'رقم العمارة' : 'Building No.'}
            </Text>
            <Controller
              control={control}
              name="building"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-gray-50 border border-gray-200 rounded-xl p-4 font-cairo text-base ${alignClass}`}
                  placeholder={language === 'ar' ? 'رقم' : 'No.'}
                  value={value || ''}
                  onChangeText={onChange}
                  textAlign={isRTL ? 'right' : 'left'}
                  placeholderTextColor="#9CA3AF"
                  onFocus={() => handleInputFocus(500)}
                />
              )}
            />
          </View>

          <View className="flex-1">
            <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>
              {language === 'ar' ? 'الطابق' : 'Floor'}
            </Text>
            <Controller
              control={control}
              name="floor"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-gray-50 border border-gray-200 rounded-xl p-4 font-cairo text-base ${alignClass}`}
                  placeholder={language === 'ar' ? 'الطابق' : 'Floor'}
                  value={value || ''}
                  onChangeText={onChange}
                  textAlign={isRTL ? 'right' : 'left'}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  onFocus={() => handleInputFocus(500)}
                />
              )}
            />
          </View>

          <View className="flex-1">
            <Text className={`font-cairo mb-1 text-text-secondary ${alignClass}`}>
              {language === 'ar' ? 'رقم الشقة' : 'Apt. No.'}
            </Text>
            <Controller
              control={control}
              name="apartment"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-gray-50 border border-gray-200 rounded-xl p-4 font-cairo text-base ${alignClass}`}
                  placeholder={language === 'ar' ? 'رقم' : 'No.'}
                  value={value || ''}
                  onChangeText={onChange}
                  textAlign={isRTL ? 'right' : 'left'}
                  placeholderTextColor="#9CA3AF"
                  onFocus={() => handleInputFocus(500)}
                />
              )}
            />
          </View>
        </View>

        {renderInput('nearestLandmark', language === 'ar' ? 'أقرب نقطة دالة' : 'Nearest Landmark', language === 'ar' ? 'مثال: قرب مطعم...' : 'e.g. Near restaurant...', false, {}, 580)}
      </View>

      {/* Map Location */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'الموقع على الخريطة' : 'Location on Map'}
        </Text>
        
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
                  className={`bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-dashed ${
                    latitude && longitude ? 'border-primary bg-primary/5' : 'border-gray-300'
                  } rounded-2xl p-5 items-center justify-center`}
                  activeOpacity={0.7}
                >
                  <View className={`w-14 h-14 rounded-full ${latitude && longitude ? 'bg-primary' : 'bg-gray-200'} items-center justify-center mb-3`}>
                    <Ionicons 
                      name={latitude && longitude ? "checkmark" : "location"} 
                      size={28} 
                      color={latitude && longitude ? "white" : "#9CA3AF"} 
                    />
                  </View>
                  <Text className={`font-cairo-bold text-base ${latitude && longitude ? 'text-primary' : 'text-gray-600'}`}>
                    {latitude && longitude 
                      ? (language === 'ar' ? '✓ تم تحديد الموقع بنجاح' : '✓ Location Selected')
                      : (language === 'ar' ? 'اضغط لتحديد موقعك على الخريطة' : 'Tap to select your location on map')
                    }
                  </Text>
                  {latitude && longitude && (
                    <Text className="font-cairo text-xs text-gray-500 mt-1">
                      {language === 'ar' ? 'اضغط لتغيير الموقع' : 'Tap to change location'}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          )}
        />
      </View>

      {/* Notes */}
      <View className="bg-white p-4 rounded-2xl shadow-sm mb-3 border border-gray-100">
        <Text className={`font-cairo-bold text-base mb-3 text-gray-800 ${alignClass}`}>
          {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
        </Text>
        
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`bg-gray-50 border border-gray-200 rounded-xl p-4 font-cairo text-base h-24 ${alignClass}`}
              placeholder={language === 'ar' ? 'أي تعليمات خاصة للتوصيل...' : 'Any special delivery instructions...'}
              value={value || ''}
              onChangeText={onChange}
              textAlign={isRTL ? 'right' : 'left'}
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              onFocus={() => handleInputFocus(700)}
            />
          )}
        />
      </View>

      {/* Location Picker Modal */}
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
