import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { ShoppingCartIcon, CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage, useCurrency } from '../../contexts';
import { supabase } from '../../lib/supabase';
import CartItem from '../../components/cart/CartItem';

interface CouponData {
    couponId: string | null;
    discountType: string | null;
    discountValue: number | null;
    discountAmount: number;
}

export default function CartScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { items, removeItem, updateQuantity, totalIQD, clearCart } = useCartStore();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [couponData, setCouponData] = useState<CouponData | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const { t, language, isRTL } = useLanguage();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (appliedCoupon && couponData) {
            let newDiscount = 0;
            if (couponData.discountType === 'percentage' && couponData.discountValue) {
                newDiscount = totalIQD * (couponData.discountValue / 100);
                if (couponData.discountAmount && newDiscount > couponData.discountAmount) {
                    newDiscount = couponData.discountAmount;
                }
            } else if (couponData.discountType === 'fixed' && couponData.discountValue) {
                newDiscount = couponData.discountValue;
            }
            if (newDiscount > totalIQD) newDiscount = totalIQD;
            setDiscount(newDiscount);
        }
    }, [totalIQD, appliedCoupon, couponData]);

    const DELIVERY_FEE_IQD = 2000;

    const handleApplyCoupon = useCallback(async () => {
        if (!couponCode.trim()) {
            Alert.alert(t('common.error'), t('cart.enterCoupon'));
            return;
        }

        setIsApplying(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user?.id || null;

            const { data, error } = await supabase.rpc('validate_coupon', {
                p_code: couponCode.trim(),
                p_order_total: totalIQD,
                p_user_id: userId
            });

            if (error) throw error;

            const result = data?.[0];

            if (result?.is_valid) {
                setCouponData({
                    couponId: result.coupon_id,
                    discountType: result.discount_type,
                    discountValue: result.discount_value,
                    discountAmount: result.discount_amount
                });
                setDiscount(result.discount_amount);
                setAppliedCoupon(couponCode.toUpperCase());

                const discountText = result.discount_type === 'percentage'
                    ? `${result.discount_value}%`
                    : formatPrice(result.discount_value);

                Alert.alert(
                    t('common.success'),
                    `${t('cart.couponApplied')} - ${t('cart.discount')} ${discountText}`,
                    [{ text: t('common.ok') }]
                );
            } else {
                Alert.alert(
                    t('common.error'),
                    result?.error_message || t('cart.invalidCoupon')
                );
                setDiscount(0);
                setAppliedCoupon('');
                setCouponData(null);
            }
        } catch (error) {
            console.error('Coupon validation error:', error);
            Alert.alert(t('common.error'), t('cart.invalidCoupon'));
            setDiscount(0);
            setAppliedCoupon('');
            setCouponData(null);
        } finally {
            setIsApplying(false);
        }
    }, [couponCode, t, totalIQD, formatPrice]);

    const handleRemoveCoupon = useCallback(() => {
        setDiscount(0);
        setAppliedCoupon('');
        setCouponCode('');
        setCouponData(null);
    }, []);

    const handleRemoveItem = useCallback((productId: string, productName: string) => {
        Alert.alert(
            t('cart.removeItem'),
            `${t('cart.removeItemConfirm')} "${productName}"?`,
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.ok'),
                    style: 'destructive',
                    onPress: () => removeItem(productId)
                }
            ]
        );
    }, [t, removeItem]);

    const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
        updateQuantity(productId, quantity);
    }, [updateQuantity]);

    const totals = useMemo(() => ({
        subtotal: totalIQD,
        delivery: DELIVERY_FEE_IQD,
        discount: discount,
        final: totalIQD + DELIVERY_FEE_IQD - discount
    }), [totalIQD, discount]);

    const renderCartItem = useCallback(({ item }: { item: typeof items[0] }) => (
        <CartItem
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            isRTL={isRTL}
            language={language}
            formatPrice={formatPrice}
            t={t}
        />
    ), [handleRemoveItem, handleUpdateQuantity, isRTL, language, formatPrice, t]);

    const renderListHeader = useCallback(() => (
        <Text 
            className={`font-cairo-bold text-text-primary mb-3 ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: 16 }}
        >
            {language === 'ar' ? `سلة التسوق (${items.length})` : `Shopping Cart (${items.length})`}
        </Text>
    ), [isRTL, language, items.length]);

    const renderListFooter = useCallback(() => (
        <View>
            {/* Coupon Section */}
            <View
                className="bg-white rounded-xl border border-gray-100 mb-3"
                style={{
                    padding: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 3,
                    elevation: 1,
                }}
            >
                <View className={`flex-row ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TextInput
                        className={`flex-1 bg-gray-50 border border-gray-200 rounded-lg font-cairo ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ 
                            paddingHorizontal: 12, 
                            paddingVertical: 10, 
                            fontSize: 13,
                            marginRight: isRTL ? 0 : 8,
                            marginLeft: isRTL ? 8 : 0
                        }}
                        placeholder={t('cart.enterCoupon')}
                        placeholderTextColor="#9CA3AF"
                        value={couponCode}
                        onChangeText={setCouponCode}
                        editable={!appliedCoupon}
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity
                        className="rounded-lg justify-center items-center"
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            minWidth: 70,
                            backgroundColor: appliedCoupon ? 'rgba(211, 47, 47, 0.1)' : '#2E7D32'
                        }}
                        onPress={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                        activeOpacity={0.8}
                        disabled={isApplying}
                    >
                        {isApplying ? (
                            <ActivityIndicator size="small" color={appliedCoupon ? "#D32F2F" : "#FFFFFF"} />
                        ) : (
                            <Text 
                                className={`font-cairo-bold ${appliedCoupon ? 'text-danger' : 'text-white'}`}
                                style={{ fontSize: 13 }}
                            >
                                {appliedCoupon ? t('cart.remove') : t('cart.apply')}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {appliedCoupon && (
                    <View
                        className={`flex-row items-center rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                        style={{ 
                            marginTop: 10,
                            padding: 8,
                            backgroundColor: 'rgba(46, 125, 50, 0.08)' 
                        }}
                    >
                        <CheckCircleIcon
                            size={16}
                            color="#2E7D32"
                            style={{ marginRight: isRTL ? 0 : 6, marginLeft: isRTL ? 6 : 0 }}
                        />
                        <Text className="text-primary font-cairo-semibold" style={{ fontSize: 12 }}>
                            {t('cart.couponApplied')} ({appliedCoupon})
                        </Text>
                    </View>
                )}
            </View>

            {/* Summary Section */}
            <View
                className="bg-white rounded-xl border border-gray-100 mb-3"
                style={{
                    padding: 14,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 3,
                    elevation: 1,
                }}
            >
                <Text 
                    className={`font-cairo-bold text-text-primary border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}
                    style={{ fontSize: 15, paddingBottom: 10, marginBottom: 12 }}
                >
                    {t('cart.orderSummary')}
                </Text>

                <View className={`flex-row justify-between ${isRTL ? 'flex-row-reverse' : ''}`} style={{ marginBottom: 10 }}>
                    <Text className="font-cairo text-text-secondary" style={{ fontSize: 13 }}>
                        {t('cart.subtotal')}
                    </Text>
                    <Text className="font-cairo-semibold text-text-primary" style={{ fontSize: 13 }}>
                        {formatPrice(totals.subtotal)}
                    </Text>
                </View>

                <View className={`flex-row justify-between ${isRTL ? 'flex-row-reverse' : ''}`} style={{ marginBottom: 10 }}>
                    <Text className="font-cairo text-text-secondary" style={{ fontSize: 13 }}>
                        {t('cart.deliveryFee')}
                    </Text>
                    <Text className="font-cairo-semibold text-text-primary" style={{ fontSize: 13 }}>
                        {formatPrice(totals.delivery)}
                    </Text>
                </View>

                {discount > 0 && (
                    <View className={`flex-row justify-between ${isRTL ? 'flex-row-reverse' : ''}`} style={{ marginBottom: 10 }}>
                        <Text className="font-cairo text-danger" style={{ fontSize: 13 }}>
                            {t('cart.discount')}
                        </Text>
                        <Text className="font-cairo-semibold text-danger" style={{ fontSize: 13 }}>
                            -{formatPrice(totals.discount)}
                        </Text>
                    </View>
                )}

                <View
                    className={`flex-row justify-between border-t border-dashed border-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                    style={{ paddingTop: 12, marginTop: 4 }}
                >
                    <Text className="font-cairo-bold text-text-primary" style={{ fontSize: 15 }}>
                        {t('cart.total')}
                    </Text>
                    <Text className="font-cairo-bold text-primary" style={{ fontSize: 18 }}>
                        {formatPrice(totals.final)}
                    </Text>
                </View>
            </View>
        </View>
    ), [isRTL, t, couponCode, appliedCoupon, isApplying, handleRemoveCoupon, handleApplyCoupon, discount, totals, formatPrice]);

    return (
        <View className="flex-1 bg-background">
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {items.length === 0 ? (
                    <View className="flex-1 justify-center items-center px-6">
                        <View
                            className="rounded-full items-center justify-center mb-6"
                            style={{ 
                                width: 130, 
                                height: 130,
                                backgroundColor: 'rgba(46, 125, 50, 0.06)' 
                            }}
                        >
                            <ShoppingCartIcon size={65} color="#BDBDBD" />
                        </View>
                        <Text className="font-cairo-bold text-text-primary mb-2" style={{ fontSize: 18 }}>
                            {t('cart.empty')}
                        </Text>
                        <Text className="font-cairo text-text-secondary text-center mb-8" style={{ fontSize: 14, maxWidth: 280, lineHeight: 22 }}>
                            {t('cart.emptyMessage')}
                        </Text>
                        <TouchableOpacity
                            className="bg-primary rounded-xl flex-row items-center"
                            style={{
                                paddingHorizontal: 24,
                                paddingVertical: 13,
                                gap: 8,
                                shadowColor: '#2E7D32',
                                shadowOpacity: 0.2,
                                shadowRadius: 8,
                                shadowOffset: { width: 0, height: 3 },
                                elevation: 4,
                            }}
                            onPress={() => router.push('/(tabs)')}
                            activeOpacity={0.8}
                        >
                            <BuildingStorefrontIcon size={20} color="white" />
                            <Text className="font-cairo-bold text-white" style={{ fontSize: 15 }}>
                                {t('cart.browseProducts')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            renderItem={renderCartItem}
                            keyExtractor={(item) => item.id}
                            ListHeaderComponent={renderListHeader}
                            ListFooterComponent={renderListFooter}
                            contentContainerStyle={{ 
                                paddingHorizontal: 16, 
                                paddingTop: 14, 
                                paddingBottom: insets.bottom + 80 
                            }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        />

                        {/* Checkout Footer */}
                        <View
                            className="bg-white border-t border-gray-100"
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                paddingBottom: insets.bottom + 12,
                                shadowColor: '#000',
                                shadowOpacity: 0.06,
                                shadowRadius: 5,
                                shadowOffset: { width: 0, height: -2 },
                                elevation: 5,
                            }}
                        >
                            <TouchableOpacity
                                className={`rounded-xl flex-row justify-center items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                                style={{
                                    paddingVertical: 14,
                                    gap: 8,
                                    backgroundColor: '#2E7D32',
                                    shadowColor: '#2E7D32',
                                    shadowOpacity: 0.25,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 3 },
                                    elevation: 4,
                                }}
                                onPress={() => router.push('/checkout')}
                                activeOpacity={0.8}
                                accessibilityLabel={t('cart.checkout')}
                                accessibilityRole="button"
                            >
                                <Text className="font-cairo-bold text-white" style={{ fontSize: 16 }}>
                                    {t('cart.checkout')}
                                </Text>
                                {isRTL ? (
                                    <ArrowLeftIcon size={20} color="white" />
                                ) : (
                                    <ArrowRightIcon size={20} color="white" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
