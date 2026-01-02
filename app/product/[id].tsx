import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Alert, Share, StatusBar } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useProduct, useSimilarProducts } from '../../hooks/useSupabase';
import { useCartStore } from '../../store/cartStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../../components/ui/ProductCard';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';
import { useState, useEffect } from 'react';
import { useLanguage, useCurrency } from '../../contexts';
import { supabase } from '../../lib/supabase';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4; // 40% of screen height for better proportions

export default function ProductDetailsScreen() {
  const { id: rawId } = useLocalSearchParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(id as string);
  const addItem = useCartStore(state => state.addItem);
  const totalItems = useCartStore(state => state.totalItems);
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  // Local state
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    if (id) {
      checkIfFavorite();
    }
  }, [id]);

  const checkIfFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !id) return;

      const { data, error } = await supabase
        .from('wishlist')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('product_id', id)
        .maybeSingle();

      if (data) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        Alert.alert(
          language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required',
          language === 'ar' ? 'يرجى تسجيل الدخول لإضافة المنتجات للمفضلة' : 'Please login to add products to wishlist',
          [{ text: t('common.ok'), style: 'default' }]
        );
        return;
      }

      setFavoriteLoading(true);

      if (!id) {
        throw new Error('Product ID is missing');
      }

      if (isFavorite) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', session.user.id)
          .eq('product_id', id);

        if (error) {
          console.error('Delete error:', error);
          throw error;
        }
        setIsFavorite(false);
        Alert.alert(
          language === 'ar' ? 'تم' : 'Done',
          language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Product removed from wishlist'
        );
      } else {
        // Add to wishlist
        const { error, data } = await supabase
          .from('wishlist')
          .insert({
            user_id: session.user.id,
            product_id: id
          })
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Wishlist item added:', data);
        setIsFavorite(true);
        Alert.alert(
          language === 'ar' ? 'تم' : 'Done',
          language === 'ar' ? 'تم إضافة المنتج للمفضلة' : 'Product added to wishlist'
        );
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again'
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Fetch similar products if product is loaded
  const { data: similarProducts, isLoading: isSimilarLoading } = useSimilarProducts(
    product?.category_id || '',
    product?.id || ''
  );

  // Get product name based on language
  const getProductName = (item: any) => {
    return language === 'ar' ? (item.name_ar || item.name) : (item.name || item.name_ar);
  };

  const getProductDescription = (item: any) => {
    return language === 'ar'
      ? (item.description_ar || item.description || t('product.noDescription'))
      : (item.description || item.description_ar || t('product.noDescription'));
  };

  // Calculate discount percentage if applicable
  const getDiscountPercentage = () => {
    if (product?.original_price && product.original_price > product.price_iqd) {
      return Math.round(((product.original_price - product.price_iqd) / product.original_price) * 100);
    }
    return 0;
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center">
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text className="font-cairo text-gray-500 mt-3">{t('common.loading')}</Text>
        </View>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <View className="items-center">
          <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-4">
            <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
          </View>
          <Text className="font-cairo-bold text-xl text-gray-800 mb-2">{t('common.error')}</Text>
          <Text className="font-cairo text-gray-500 text-center mb-6">{t('product.notFound')}</Text>
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-primary px-8 py-3 rounded-xl"
          >
            <Text className="text-white font-cairo-bold">{t('common.back')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleCreateAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: t('common.ok'), style: 'default' }]);
  };

  const handleAddToCart = () => {
    try {
      addItem(product, quantity);
      handleCreateAlert(t('product.addedToCart'), t('product.addedMessage'));
    } catch (err) {
      handleCreateAlert(t('common.error'), err instanceof Error ? err.message : t('common.error'));
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${getProductName(product)} - ${formatPrice(product.price_iqd)}`,
        title: getProductName(product),
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(q => q + 1);
    } else {
      handleCreateAlert(t('common.error'), t('product.noMoreStock'));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Floating Header */}
      <SafeAreaView edges={['top']} className="absolute top-0 left-0 right-0 z-20">
        <View className="flex-row justify-between items-center px-4 py-2">
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-11 h-11 bg-white/95 rounded-full items-center justify-center shadow-sm"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
          >
            <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={22} color="#212121" />
          </TouchableOpacity>

          {/* Right Actions */}
          <View className="flex-row gap-2">
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/cart')} 
              className="w-11 h-11 bg-white/95 rounded-full items-center justify-center shadow-sm"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
            >
              <Ionicons name="cart-outline" size={22} color="#212121" />
              {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">{totalItems > 9 ? '9+' : totalItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 140 }} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Product Image Section */}
        <View className="bg-white" style={{ marginTop: 60 }}>
          <View 
            className="items-center justify-center relative"
            style={{ height: IMAGE_HEIGHT, maxHeight: 350 }}
          >
            {/* Main Image */}
            <Image
              source={{ uri: product.image_url }}
              style={{ width: SCREEN_WIDTH - 32, height: IMAGE_HEIGHT, maxHeight: 350 }}
              contentFit="contain"
              transition={300}
            />

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <View className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-red-500 px-3 py-1.5 rounded-lg`}>
                <Text className="text-white font-cairo-bold text-sm">-{discountPercentage}%</Text>
              </View>
            )}
          </View>
        </View>

        {/* Product Info Card - Compact */}
        <View className="bg-white mx-4 -mt-6 rounded-3xl shadow-lg px-4 py-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
          {/* Action Buttons Row */}
          <View className={`flex-row items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Stock Badge */}
            <View className={`px-3 py-1.5 rounded-full ${product.stock_quantity > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <View className="flex-row items-center gap-1">
                <Ionicons
                  name={product.stock_quantity > 0 ? "checkmark-circle" : "close-circle"}
                  size={14}
                  color={product.stock_quantity > 0 ? "#16A34A" : "#DC2626"}
                />
                <Text className={`font-cairo-semibold text-xs ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock_quantity > 0 ? t('common.inStock') : t('common.outOfStock')}
                </Text>
              </View>
            </View>

            {/* Favorite & Share Buttons */}
            <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TouchableOpacity 
                onPress={handleToggleFavorite}
                disabled={favoriteLoading}
                className={`w-10 h-10 rounded-full items-center justify-center ${isFavorite ? 'bg-red-50' : 'bg-gray-100'}`}
              >
                {favoriteLoading ? (
                  <ActivityIndicator size="small" color="#EF4444" />
                ) : (
                  <Ionicons 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    size={20} 
                    color={isFavorite ? "#EF4444" : "#757575"} 
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleShare}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="share-social-outline" size={20} color="#757575" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Row 1: Name */}
          <View className="mb-2">
            <Text 
              className={`text-xl font-cairo-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ lineHeight: 28 }}
              numberOfLines={2}
            >
              {getProductName(product)}
            </Text>
            <Text className={`text-xs font-cairo text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? product.name : product.name_ar}
            </Text>
          </View>

          {/* Row 2: Price + Rating */}
          <View className={`flex-row justify-between items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Price */}
            <View className={`flex-row items-baseline gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Text className="text-2xl font-cairo-bold text-primary">{formatPrice(product.price_iqd)}</Text>
              {product.original_price && product.original_price > product.price_iqd && (
                <Text className="text-xs font-cairo text-gray-400 line-through">{formatPrice(product.original_price)}</Text>
              )}
            </View>

            {/* Rating */}
            <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-lg">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-sm font-cairo-bold text-amber-600 mx-1">4.8</Text>
              <Text className="text-[10px] font-cairo text-gray-500">(245)</Text>
            </View>
          </View>

          {/* Row 3: Quantity Selector - Compact */}
          <View className={`flex-row justify-between items-center bg-gray-50 rounded-xl px-3 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="font-cairo-semibold text-gray-600 text-sm">{t('product.quantity')}</Text>
            
            <View className="flex-row items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
              <TouchableOpacity
                className="w-9 h-9 justify-center items-center"
                onPress={handleDecrease}
                disabled={quantity <= 1}
              >
                <Ionicons name="remove" size={18} color={quantity > 1 ? "#2E7D32" : "#D1D5DB"} />
              </TouchableOpacity>
              
              <View className="w-10 h-9 justify-center items-center border-x border-gray-200">
                <Text className="font-cairo-bold text-lg text-gray-900">{quantity}</Text>
              </View>
              
              <TouchableOpacity
                className="w-9 h-9 justify-center items-center"
                onPress={handleIncrease}
                disabled={quantity >= product.stock_quantity}
              >
                <Ionicons name="add" size={18} color={quantity < product.stock_quantity ? "#2E7D32" : "#D1D5DB"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stock Warning - Only if low */}
          {product.stock_quantity > 0 && product.stock_quantity <= 10 && (
            <View className={`flex-row items-center mt-2 gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Ionicons name="information-circle-outline" size={14} color="#F59E0B" />
              <Text className="font-cairo text-amber-600 text-xs">
                {t('product.onlyLeft').replace('{count}', product.stock_quantity.toString())}
              </Text>
            </View>
          )}
        </View>

        {/* Description Section */}
        <View className="bg-white mx-4 mt-4 rounded-2xl px-5 py-5">
          <View className={`flex-row items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <View className="w-8 h-8 bg-primary/10 rounded-lg items-center justify-center">
              <Ionicons name="document-text-outline" size={18} color="#2E7D32" />
            </View>
            <Text className="font-cairo-bold text-lg text-gray-900">{t('product.description')}</Text>
          </View>
          
          <Text 
            className={`font-cairo text-gray-600 leading-7 text-base ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {getProductDescription(product)}
          </Text>
        </View>

        {/* Product Features */}
        <View className="bg-white mx-4 mt-4 rounded-2xl px-5 py-5">
          <View className={`flex-row items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <View className="w-8 h-8 bg-blue-50 rounded-lg items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={18} color="#3B82F6" />
            </View>
            <Text className="font-cairo-bold text-lg text-gray-900">{t('product.features')}</Text>
          </View>
          
          <View className="gap-3">
            {/* Feature 1 */}
            <View className={`flex-row items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center">
                <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
              </View>
              <Text className="font-cairo text-gray-700 flex-1">{t('product.qualityGuarantee')}</Text>
            </View>
            
            {/* Feature 2 */}
            <View className={`flex-row items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                <Ionicons name="car-outline" size={22} color="#3B82F6" />
              </View>
              <Text className="font-cairo text-gray-700 flex-1">{t('product.fastDelivery')}</Text>
            </View>
            
            {/* Feature 3 */}
            <View className={`flex-row items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center">
                <Ionicons name="refresh-outline" size={22} color="#F59E0B" />
              </View>
              <Text className="font-cairo text-gray-700 flex-1">{t('product.easyReturn')}</Text>
            </View>
          </View>
        </View>

        {/* Similar Products - Always show section if category exists */}
        {product.category_id && (
          <View className="mt-6 mb-4">
            <View className={`flex-row justify-between items-center mb-3 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Text className="text-lg font-cairo-bold text-gray-900">{t('product.similarProducts')}</Text>
              {similarProducts && similarProducts.length > 0 && (
                <TouchableOpacity 
                  onPress={() => router.push(`/(tabs)/category/${product.category_id}` as any)}
                >
                  <Text className="text-primary font-cairo-semibold text-sm">{t('common.seeAll')}</Text>
                </TouchableOpacity>
              )}
            </View>

            {isSimilarLoading ? (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              >
                {[1, 2, 3].map(i => <ProductCardSkeleton key={i} width={140} />)}
              </ScrollView>
            ) : similarProducts && similarProducts.length > 0 ? (
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
            ) : (
              <View className="items-center justify-center py-6 mx-4 bg-gray-50 rounded-xl">
                <Ionicons name="cube-outline" size={32} color="#9CA3AF" />
                <Text className="font-cairo text-gray-500 mt-2 text-sm">{t('product.noSimilar')}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 10 }}>
        <View className="px-4 py-3">
          <View className={`flex-row items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Price Summary */}
            <View className={`${isRTL ? 'items-end' : 'items-start'}`}>
              <Text className="text-xs text-gray-500 font-cairo">{t('cart.total')}</Text>
              <Text className="text-xl font-cairo-bold text-primary">{formatPrice(product.price_iqd * quantity)}</Text>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
              className={`flex-1 py-4 rounded-2xl flex-row justify-center items-center gap-2 ${product.stock_quantity > 0 ? 'bg-primary' : 'bg-gray-300'}`}
              onPress={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              style={product.stock_quantity > 0 ? { shadowColor: '#2E7D32', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 } : {}}
            >
              {product.stock_quantity > 0 && <Ionicons name="cart" size={22} color="white" />}
              <Text className="text-white font-cairo-bold text-lg">
                {product.stock_quantity > 0 ? t('common.addToCart') : t('common.outOfStock')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
