import React from 'react';
import { View, Text, TouchableOpacity, DimensionValue } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../store/cartStore';
import { Product } from '../../hooks/useSupabase';
import { useCurrency, useLanguage } from '../../contexts';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
  width?: DimensionValue;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showDiscount = false, width = 160 }) => {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);
  const { formatPrice } = useCurrency();
  const { language, isRTL } = useLanguage();

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden"
      style={{ width }}
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
    >
      {/* صورة المنتج مع زر الإضافة */}
      <View className="rounded-xl items-center justify-center relative overflow-hidden border border-gray-200" style={{ aspectRatio: 1 }}>
        <Image
          source={{ uri: product.image_url }}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
          transition={200}
        />
        
        {/* زر الإضافة داخل الصورة */}
        <TouchableOpacity
          className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-primary rounded-full w-8 h-8 items-center justify-center`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={handleAddToCart}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
        
        {/* شارة الخصم */}
        {showDiscount && (
          <View className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} bg-red-500 px-2 py-0.5 rounded-full`}>
            <Text className="text-white text-[10px] font-cairo-bold">-20%</Text>
          </View>
        )}
      </View>

      {/* اسم المنتج والسعر تحت الصورة */}
      <View className="pt-2 pb-1">
        <Text 
          className={`font-cairo-semibold text-sm text-[#1B4D2E] leading-5 ${isRTL ? 'text-right' : 'text-left'}`} 
          numberOfLines={2}
        >
          {language === 'ar' ? product.name_ar : (product.name || product.name_ar)}
        </Text>
        
        <Text className={`font-cairo-bold text-sm text-primary mt-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
          {formatPrice(product.price_iqd)}
        </Text>
        
        {showDiscount && (
          <Text className={`text-gray-400 font-cairo text-[10px] line-through ${isRTL ? 'text-right' : 'text-left'}`}>
            {formatPrice(product.price_iqd * 1.2)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
