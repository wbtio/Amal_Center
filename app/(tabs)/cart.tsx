import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator, Platform, FlatList } from 'react-native';
import { ShoppingCartIcon, CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, BuildingStorefrontIcon, TagIcon, TruckIcon, ReceiptPercentIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage, useCurrency } from '../../contexts';
import { supabase } from '../../lib/supabase';
import { DEFAULT_DELIVERY_FEE_IQD } from '../../constants/delivery';
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

    // الرسوم الافتراضية (توصيل عادي) — تُحدّد نهائياً حسب نوع التوصيل في صفحة الدفع
    const DELIVERY_FEE_IQD = DEFAULT_DELIVERY_FEE_IQD;

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
        <View
            className={`flex-row items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ gap: 8 }}
        >
            <View style={{ backgroundColor: 'rgba(46,125,50,0.1)', borderRadius: 10, padding: 6 }}>
                <ShoppingCartIcon size={18} color="#2E7D32" />
            </View>
            <Text className="font-ibm-bold text-text-primary" style={{ fontSize: 17 }}>
                {language === 'ar' ? `سلة التسوق` : `My Cart`}
            </Text>
            <View style={{ backgroundColor: '#2E7D32', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text className="font-ibm-bold text-white" style={{ fontSize: 12 }}>{items.length}</Text>
            </View>
        </View>
    ), [isRTL, language, items.length]);

    const renderListFooter = useCallback(() => (
        <View style={{ marginTop: 4 }}>

            {/* Coupon Section */}
            <View
                className="bg-white rounded-xl mb-3"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ gap: 8 }}>
                    <TagIcon size={15} color="#2E7D32" />
                    <TextInput
                        className={`flex-1 font-ibm ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{
                            paddingHorizontal: 11,
                            paddingVertical: 8,
                            fontSize: 13,
                            backgroundColor: '#F9FAFB',
                            borderRadius: 10,
                            borderWidth: appliedCoupon ? 1.5 : 1,
                            borderColor: appliedCoupon ? '#2E7D32' : '#E5E7EB',
                            color: appliedCoupon ? '#2E7D32' : '#111827',
                        }}
                        placeholder={t('cart.enterCoupon')}
                        placeholderTextColor="#9CA3AF"
                        value={couponCode}
                        onChangeText={setCouponCode}
                        editable={!appliedCoupon}
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: appliedCoupon ? 'rgba(211,47,47,0.1)' : '#2E7D32',
                            minWidth: 66,
                        }}
                        onPress={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                        activeOpacity={0.8}
                        disabled={isApplying}
                    >
                        {isApplying ? (
                            <ActivityIndicator size="small" color={appliedCoupon ? '#D32F2F' : '#FFFFFF'} />
                        ) : (
                            <Text
                                className="font-ibm-bold"
                                style={{ fontSize: 12, color: appliedCoupon ? '#D32F2F' : '#FFFFFF' }}
                            >
                                {appliedCoupon ? t('cart.remove') : t('cart.apply')}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {appliedCoupon && (
                    <View
                        className={`flex-row items-center rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                        style={{ marginTop: 8, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: 'rgba(46,125,50,0.08)', gap: 6 }}
                    >
                        <CheckCircleIcon size={14} color="#2E7D32" />
                        <Text className="font-ibm-semibold text-primary" style={{ fontSize: 11 }}>
                            {t('cart.couponApplied')} · {appliedCoupon}
                        </Text>
                    </View>
                )}
            </View>

            {/* Summary Section */}
            <View
                className="bg-white rounded-2xl mb-3"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 3,
                    overflow: 'hidden',
                }}
            >
                {/* Section header */}
                <View
                    className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                    style={{ backgroundColor: 'rgba(46,125,50,0.06)', paddingHorizontal: 14, paddingVertical: 10 }}
                >
                    <ReceiptPercentIcon size={15} color="#2E7D32" style={{ marginRight: isRTL ? 0 : 6, marginLeft: isRTL ? 6 : 0 }} />
                    <Text className="font-ibm-semibold text-primary" style={{ fontSize: 13 }}>
                        {t('cart.orderSummary')}
                    </Text>
                </View>

                <View style={{ padding: 14 }}>
                    {/* Subtotal */}
                    <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ marginBottom: 12 }}>
                        <Text className="font-ibm text-text-secondary" style={{ fontSize: 13 }}>
                            {t('cart.subtotal')}
                        </Text>
                        <Text className="font-ibm-semibold text-text-primary" style={{ fontSize: 13 }}>
                            {formatPrice(totals.subtotal)}
                        </Text>
                    </View>

                    {/* Delivery Fee */}
                    <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ marginBottom: discount > 0 ? 12 : 0 }}>
                        <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ gap: 6 }}>
                            <TruckIcon size={14} color="#6B7280" />
                            <View className={isRTL ? 'items-end' : 'items-start'}>
                                <Text className="font-ibm text-text-secondary" style={{ fontSize: 13 }}>
                                    {t('cart.deliveryFee')}
                                </Text>
                                <Text className="font-ibm text-text-secondary" style={{ fontSize: 10, opacity: 0.7 }}>
                                    {language === 'ar' ? 'تُحدّد حسب نوع التوصيل عند الدفع' : 'Varies by delivery type at checkout'}
                                </Text>
                            </View>
                        </View>
                        <Text className="font-ibm-semibold text-text-primary" style={{ fontSize: 13 }}>
                            {formatPrice(totals.delivery)}
                        </Text>
                    </View>

                    {/* Discount */}
                    {discount > 0 && (
                        <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Text className="font-ibm text-danger" style={{ fontSize: 13 }}>
                                {t('cart.discount')}
                            </Text>
                            <Text className="font-ibm-semibold text-danger" style={{ fontSize: 13 }}>
                                −{formatPrice(totals.discount)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Total row — highlighted */}
                <View
                    className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                    style={{
                        backgroundColor: 'rgba(46,125,50,0.07)',
                        paddingHorizontal: 14,
                        paddingVertical: 14,
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(46,125,50,0.12)',
                    }}
                >
                    <Text className="font-ibm-bold text-text-primary" style={{ fontSize: 15 }}>
                        {t('cart.total')}
                    </Text>
                    <Text className="font-ibm-bold text-primary" style={{ fontSize: 20 }}>
                        {formatPrice(totals.final)}
                    </Text>
                </View>
            </View>
        </View>
    ), [isRTL, language, t, couponCode, appliedCoupon, isApplying, handleRemoveCoupon, handleApplyCoupon, discount, totals, formatPrice]);

    return (
        <View className="flex-1 bg-background">
            <View className="flex-1">
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
                        <Text className="font-ibm-bold text-text-primary mb-2" style={{ fontSize: 18 }}>
                            {t('cart.empty')}
                        </Text>
                        <Text className="font-ibm text-text-secondary text-center mb-8" style={{ fontSize: 14, maxWidth: 280, lineHeight: 22 }}>
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
                            <Text className="font-ibm-bold text-white" style={{ fontSize: 15 }}>
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
                                paddingBottom: 16,
                            }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            automaticallyAdjustKeyboardInsets={true}
                        />

                        {/* Checkout Footer */}
                        <View
                            style={{
                                paddingHorizontal: 16,
                                paddingTop: 12,
                                paddingBottom: 12,
                            }}
                        >
                            <TouchableOpacity
                                className={`rounded-xl flex-row justify-center items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                                style={{
                                    paddingVertical: 14,
                                    gap: 8,
                                    backgroundColor: '#2E7D32',
                                    shadowColor: '#1B5E20',
                                    shadowOpacity: 0.55,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 3 },
                                    elevation: 14,
                                }}
                                onPress={() => {
                                    if (couponData && appliedCoupon) {
                                        router.push({
                                            pathname: '/checkout',
                                            params: {
                                                couponId: couponData.couponId || '',
                                                couponCode: appliedCoupon,
                                                discountAmount: discount.toString(),
                                            },
                                        });
                                    } else {
                                        router.push('/checkout');
                                    }
                                }}
                                activeOpacity={0.8}
                                accessibilityLabel={t('cart.checkout')}
                                accessibilityRole="button"
                            >
                                <Text className="font-ibm-bold text-white" style={{ fontSize: 16 }}>
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
            </View>
        </View>
    );
}
