import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Alert, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useProduct, useSimilarProducts } from '../../hooks/useSupabase';
import { useCartStore } from '../../store/cartStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLanguage, useCurrency } from '../../contexts';
import { ProductCard } from '../../components/ui/ProductCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_COLOR = '#2E7D32';
const INACTIVE_COLOR = '#BDBDBD';
const ACTIVE_BG = 'rgba(46, 125, 50, 0.08)';

export default function ProductDetailsScreen() {
  const { id: rawId } = useLocalSearchParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(id as string);
  const addItem = useCartStore(state => state.addItem);
  const totalItems = useCartStore(state => state.totalItems);
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);

  const { data: similarProducts } = useSimilarProducts(
    product?.category_id || '',
    product?.id || ''
  );

  const getProductName = (item: any) => {
    return language === 'ar' ? (item.name_ar || item.name) : (item.name || item.name_ar);
  };

  const getProductDescription = (item: any) => {
    return language === 'ar'
      ? (item.description_ar || item.description || '')
      : (item.description || item.description_ar || '');
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="font-cairo-bold text-lg text-gray-800 mt-4">{t('product.notFound')}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-primary px-6 py-2 rounded-lg">
          <Text className="text-white font-cairo-bold">{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    Alert.alert(t('product.addedToCart'), t('product.addedMessage'));
  };

  const discountPercentage = product.original_price && product.original_price > product.price_iqd
    ? Math.round(((product.original_price - product.price_iqd) / product.original_price) * 100)
    : 0;

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <SafeAreaView edges={['top']} className="bg-white border-b border-gray-100">
        <View className={`flex-row items-center justify-between px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className="p-2 relative">
            <Ionicons name="cart-outline" size={24} color="#212121" />
            {totalItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{totalItems > 9 ? '9+' : totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Product Image */}
        <View className="bg-gray-50 items-center py-6">
          <Image
            source={{ uri: product.image_url }}
            style={{ width: SCREEN_WIDTH - 64, height: 220 }}
            contentFit="contain"
          />
          {discountPercentage > 0 && (
            <View className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-red-500 px-2 py-1 rounded`}>
              <Text className="text-white font-cairo-bold text-xs">-{discountPercentage}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="px-4 py-4">
          {/* Name */}
          <Text className={`text-xl font-cairo-bold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {getProductName(product)}
          </Text>

          {/* Price */}
          <View className={`flex-row items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="text-2xl font-cairo-bold text-primary">{formatPrice(product.price_iqd)}</Text>
            {product.original_price && product.original_price > product.price_iqd && (
              <Text className="text-sm font-cairo text-gray-400 line-through">{formatPrice(product.original_price)}</Text>
            )}
          </View>

          {/* Stock Status */}
          <View className={`flex-row items-center gap-1 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Ionicons
              name={product.stock_quantity > 0 ? "checkmark-circle" : "close-circle"}
              size={16}
              color={product.stock_quantity > 0 ? "#16A34A" : "#DC2626"}
            />
            <Text className={`font-cairo text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock_quantity > 0 ? t('common.inStock') : t('common.outOfStock')}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className={`flex-row items-center justify-between bg-gray-50 rounded-lg px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-cairo-semibold text-gray-700">{t('product.quantity')}</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => quantity > 1 && setQuantity(q => q - 1)}
                className="w-8 h-8 bg-white rounded-full items-center justify-center border border-gray-200"
              >
                <Ionicons name="remove" size={18} color={quantity > 1 ? "#2E7D32" : "#D1D5DB"} />
              </TouchableOpacity>
              <Text className="font-cairo-bold text-lg mx-4">{quantity}</Text>
              <TouchableOpacity
                onPress={() => quantity < product.stock_quantity && setQuantity(q => q + 1)}
                className="w-8 h-8 bg-white rounded-full items-center justify-center border border-gray-200"
              >
                <Ionicons name="add" size={18} color={quantity < product.stock_quantity ? "#2E7D32" : "#D1D5DB"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          {getProductDescription(product) && (
            <View className="mt-4 pt-4 border-t border-gray-100">
              <Text className={`font-cairo-bold text-gray-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('product.description')}
              </Text>
              <Text className={`font-cairo text-gray-600 leading-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {getProductDescription(product)}
              </Text>
            </View>
          )}
        </View>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <View className="mt-4 pb-4">
            <Text className={`font-cairo-bold text-gray-800 px-4 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('product.similarProducts')}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                gap: 12,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}
            >
              {similarProducts.map((item) => (
                <ProductCard key={item.id} product={item} width={140} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar - Add to Cart */}
      <View className="bg-white border-t border-gray-100 px-4 py-3">
        <View className={`flex-row items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <View className={`${isRTL ? 'items-end' : 'items-start'}`}>
            <Text className="text-xs text-gray-500 font-cairo">{t('cart.total')}</Text>
            <Text className="text-xl font-cairo-bold text-primary">{formatPrice(product.price_iqd * quantity)}</Text>
          </View>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl flex-row justify-center items-center gap-2 ${product.stock_quantity > 0 ? 'bg-primary' : 'bg-gray-300'}`}
            onPress={handleAddToCart}
            disabled={product.stock_quantity <= 0}
          >
            <Ionicons name="cart" size={20} color="white" />
            <Text className="text-white font-cairo-bold text-base">
              {product.stock_quantity > 0 ? t('common.addToCart') : t('common.outOfStock')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Tab Bar */}
      <SafeAreaView edges={['bottom']} className="bg-white border-t border-gray-200">
        <View 
          className="flex-row justify-around items-center"
          style={{ 
            height: Platform.OS === 'ios' ? 54 : 58,
            paddingTop: 6,
          }}
        >
          {/* Home */}
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)' as any)}
            className="items-center justify-center flex-1"
          >
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 32,
              width: 44,
              borderRadius: 10,
            }}>
              <Ionicons name="home-outline" size={22} color={INACTIVE_COLOR} />
            </View>
            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 10, color: INACTIVE_COLOR, marginTop: 2 }}>
              {t('common.home')}
            </Text>
          </TouchableOpacity>

          {/* Categories */}
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/categories' as any)}
            className="items-center justify-center flex-1"
          >
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 32,
              width: 44,
              borderRadius: 10,
            }}>
              <Ionicons name="grid-outline" size={22} color={INACTIVE_COLOR} />
            </View>
            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 10, color: INACTIVE_COLOR, marginTop: 2 }}>
              {t('common.categories')}
            </Text>
          </TouchableOpacity>

          {/* Cart */}
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/cart' as any)}
            className="items-center justify-center flex-1"
          >
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 32,
              width: 44,
              borderRadius: 10,
              position: 'relative',
            }}>
              <Ionicons name="cart-outline" size={22} color={INACTIVE_COLOR} />
              {totalItems > 0 && (
                <View style={{
                  position: 'absolute',
                  top: 0,
                  right: 2,
                  backgroundColor: '#D32F2F',
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 3,
                }}>
                  <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 9, color: '#FFFFFF' }}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </Text>
                </View>
              )}
            </View>
            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 10, color: INACTIVE_COLOR, marginTop: 2 }}>
              {t('common.cart')}
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/profile' as any)}
            className="items-center justify-center flex-1"
          >
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 32,
              width: 44,
              borderRadius: 10,
            }}>
              <Ionicons name="person-outline" size={22} color={INACTIVE_COLOR} />
            </View>
            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 10, color: INACTIVE_COLOR, marginTop: 2 }}>
              {t('common.profile')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
