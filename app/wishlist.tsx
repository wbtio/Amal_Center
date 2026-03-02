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
            setWishlist(prev => prev.filter(item => item.id !== id));
            const { error } = await supabase.from('wishlist').delete().eq('id', id);
            if (error) throw error;
        } catch (error) {
            fetchWishlist();
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في إزالة المنتج' : 'Failed to remove product'
            );
        }
    };

    const handleAddToCart = (product: any) => {
        if (!product) return;
        
        try {
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
        const isOutOfStock = product.stock_quantity !== undefined && product.stock_quantity <= 0;

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#F3F4F6',
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 3,
                    elevation: 1,
                }}
                onPress={() => router.push(`/product/${product.id}`)}
                activeOpacity={0.7}
            >
                <View style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    padding: 12,
                }}>
                    {/* Product Image */}
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{ uri: product.image_url }}
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 12,
                                backgroundColor: '#F9FAFB',
                            }}
                            resizeMode="cover"
                        />
                        {isOutOfStock && (
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                paddingVertical: 3,
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: 'IBMPlexSansArabic_700Bold',
                                    fontSize: 9,
                                    color: '#FFFFFF',
                                }}>
                                    {language === 'ar' ? 'نفد المخزون' : 'Out of stock'}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Product Info */}
                    <View style={{
                        flex: 1,
                        marginHorizontal: 12,
                        justifyContent: 'center',
                        alignItems: isRTL ? 'flex-end' : 'flex-start',
                    }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontFamily: 'IBMPlexSansArabic_600SemiBold',
                                fontSize: 14,
                                color: '#1F2937',
                                textAlign: isRTL ? 'right' : 'left',
                                marginBottom: 6,
                                lineHeight: 22,
                            }}
                        >
                            {productName}
                        </Text>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_700Bold',
                            fontSize: 17,
                            color: '#2E7D32',
                        }}>
                            {formatPrice(product.price_iqd)}
                        </Text>
                        {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 11,
                                color: '#EA580C',
                                marginTop: 3,
                            }}>
                                {language === 'ar' ? `متبقي ${product.stock_quantity} فقط` : `Only ${product.stock_quantity} left`}
                            </Text>
                        )}
                    </View>

                    {/* Actions */}
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 2,
                    }}>
                        <TouchableOpacity
                            onPress={() => removeFromWishlist(item.id)}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: '#FEF2F2',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons name="heart" size={18} color="#EF4444" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => !isOutOfStock && handleAddToCart(product)}
                            disabled={isOutOfStock}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: isOutOfStock ? '#F3F4F6' : '#E8F5E9',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons name="cart-outline" size={18} color={isOutOfStock ? '#9CA3AF' : '#2E7D32'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FA', paddingTop: insets.top }}>
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
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={20} color="#374151" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_700Bold',
                        fontSize: 17,
                        color: '#1F2937'
                    }}>
                        {language === 'ar' ? 'المفضلة' : 'Wishlist'}
                    </Text>
                    {wishlist.length > 0 && (
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 1,
                        }}>
                            {language === 'ar' ? `${wishlist.length} منتج` : `${wishlist.length} items`}
                        </Text>
                    )}
                </View>
                <View style={{ width: 36 }} />
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
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#FEF2F2',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                            }}>
                                <Ionicons name="heart-outline" size={44} color="#FCA5A5" />
                            </View>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 16,
                                color: '#374151',
                                marginBottom: 6,
                            }}>
                                {language === 'ar' ? 'قائمة المفضلة فارغة' : 'No favorites yet'}
                            </Text>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 13,
                                color: '#9CA3AF',
                                textAlign: 'center',
                                maxWidth: 250,
                                lineHeight: 20,
                                marginBottom: 20,
                            }}>
                                {language === 'ar' ? 'اضغط على القلب في أي منتج لإضافته هنا' : 'Tap the heart on any product to save it here'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/categories')}
                                style={{
                                    backgroundColor: '#2E7D32',
                                    paddingHorizontal: 28,
                                    paddingVertical: 12,
                                    borderRadius: 12,
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons name="grid-outline" size={16} color="#FFFFFF" style={isRTL ? { marginLeft: 6 } : { marginRight: 6 }} />
                                <Text style={{ fontFamily: 'IBMPlexSansArabic_700Bold', color: '#FFFFFF', fontSize: 14 }}>
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
