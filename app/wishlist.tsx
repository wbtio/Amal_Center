import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useCartStore } from '../store/cartStore';

export default function WishlistScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t, language, isRTL } = useLanguage();
    const { formatPrice } = useCurrency();
    const addToCart = useCartStore((state) => state.addItem);

    useFocusEffect(
        useCallback(() => {
            fetchWishlist();
        }, [])
    );

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setLoading(false);
                return;
            }

            console.log('Fetching wishlist for user:', session.user.id);
            
            // Try to fetch from wishlist table
            const { data, error } = await supabase
                .from('wishlist')
                .select(`
                    id,
                    product_id,
                    product:products (
                        id,
                        name,
                        name_ar,
                        price_iqd,
                        image_url,
                        stock_quantity,
                        is_active
                    )
                `)
                .eq('user_id', session.user.id);

            console.log('Wishlist data:', data);
            console.log('Wishlist error:', error);

            if (error) {
                // If table doesn't exist, show empty state gracefully
                if (error.code === '42P01' || error.message.includes('does not exist')) {
                    console.log('Wishlist table does not exist yet');
                    setWishlist([]);
                } else {
                    throw error;
                }
            } else {
                setWishlist(data || []);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (id: string) => {
        try {
            const { error } = await supabase.from('wishlist').delete().eq('id', id);
            if (error) throw error;
            setWishlist(prev => prev.filter(item => item.id !== id));
            Alert.alert(
                language === 'ar' ? 'تم' : 'Done',
                language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Product removed from wishlist'
            );
        } catch (error) {
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في إزالة المنتج' : 'Failed to remove product'
            );
        }
    };

    const handleAddToCart = (product: any) => {
        if (!product) return;
        
        try {
            // Build product object matching Database type
            const productData = {
                id: product.id,
                name: product.name || '',
                name_ar: product.name_ar || '',
                description: product.description || '',
                description_ar: product.description_ar || '',
                price_iqd: product.price_iqd || product.price || 0,
                price_usd: product.price_usd || (product.price || 0) / 1480,
                image_url: product.image_url || '',
                category_id: product.category_id || '',
                stock_quantity: product.stock_quantity || product.stock || 100,
                is_active: product.is_active ?? true,
                created_at: product.created_at || new Date().toISOString(),
                updated_at: product.updated_at || new Date().toISOString()
            };

            addToCart(productData as any, 1);

            Alert.alert(
                language === 'ar' ? 'تمت الإضافة' : 'Added',
                language === 'ar' ? 'تم إضافة المنتج إلى السلة' : 'Product added to cart'
            );
        } catch (error: any) {
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                error.message || (language === 'ar' ? 'فشل في إضافة المنتج' : 'Failed to add product')
            );
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const product = item.product;
        if (!product) return null;

        const productName = language === 'ar' ? (product.name_ar || product.name) : product.name;

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    marginBottom: 12,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#F3F4F6',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                }}
                onPress={() => router.push(`/product/${product.id}`)}
            >
                <Image
                    source={{ uri: product.image_url }}
                    style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: '#F5F5F5' }}
                    resizeMode="cover"
                />

                <View style={{ flex: 1, marginHorizontal: 12, justifyContent: 'center', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            textAlign: isRTL ? 'right' : 'left',
                            marginBottom: 4
                        }}
                    >
                        {productName}
                    </Text>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 16, color: '#2E7D32' }}>
                            {formatPrice(product.price_iqd)}
                        </Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => removeFromWishlist(item.id)}
                        style={{ padding: 4, marginBottom: 8 }}
                    >
                        <Ionicons name="heart" size={24} color="#D32F2F" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleAddToCart(product)}
                        style={{ 
                            backgroundColor: '#2E7D32',
                            borderRadius: 8,
                            padding: 8
                        }}
                    >
                        <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: insets.top }}>
            {/* Header */}
            <View style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: '#FFFFFF',
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6'
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'Cairo_700Bold',
                    fontSize: 18,
                    color: '#212121'
                }}>
                    {language === 'ar' ? 'المفضلة' : 'Wishlist'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#2E7D32" size="large" />
                </View>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                            <Ionicons name="heart-outline" size={64} color="#E0E0E0" />
                            <Text style={{ fontFamily: 'Cairo_400Regular', color: '#9CA3AF', marginTop: 16 }}>
                                {language === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/categories')}
                                style={{
                                    marginTop: 20,
                                    backgroundColor: '#2E7D32',
                                    paddingHorizontal: 24,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{ fontFamily: 'Cairo_700Bold', color: '#FFFFFF' }}>
                                    {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}
