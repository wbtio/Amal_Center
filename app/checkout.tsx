import { View, Text, TouchableOpacity, Alert, ActivityIndicator, BackHandler, Modal, Keyboard, Animated, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';
import { useState, useEffect, useRef } from 'react';

import { AddressStep } from '../components/checkout/AddressStep';
import { DeliveryStep } from '../components/checkout/DeliveryStep';
import { PaymentStep } from '../components/checkout/PaymentStep';
import { ReviewStep } from '../components/checkout/ReviewStep';
import { addressSchema, AddressData, DeliveryType, PaymentMethod } from '../types/checkout';
import { getDeliveryCost } from '../constants/delivery';
import { useLanguage, useCurrency } from '../contexts';
import { useAppSettings } from '../hooks/useSupabase';

interface CouponInfo {
  couponId: string | null;
  couponCode: string | null;
  discountAmount: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    couponId?: string;
    couponCode?: string;
    discountAmount?: string;
  }>();
  const { items, totalIQD, clearCart } = useCartStore();
  const { t, language, isRTL } = useLanguage();
  const { formatPrice, exchangeRate } = useCurrency();
  const insets = useSafeAreaInsets();
  const { data: appSettings } = useAppSettings();
  const waylEnabled = appSettings?.payment?.waylEnabled ?? false;

  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('scheduled');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [couponInfo, setCouponInfo] = useState<CouponInfo>({ couponId: null, couponCode: null, discountAmount: 0 });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const STEPS = [
    { title: language === 'ar' ? 'العنوان' : 'Address', icon: 'location' as const },
    { title: language === 'ar' ? 'الدفع والتوصيل' : 'Pay & Ship', icon: 'card' as const },
    { title: language === 'ar' ? 'المراجعة' : 'Review', icon: 'checkmark-done' as const },
  ];

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: currentStep,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
  }, [currentStep]);

  const { control, handleSubmit, trigger, getValues, setValue, formState: { errors } } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { type: 'home', fullName: '', phone: '', city: 'baghdad', area: '', street: '', nearestLandmark: '', notes: '' },
  });

  useEffect(() => {
    const backAction = () => {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
        return true;
      }
      setShowCancelModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentStep]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  useEffect(() => {
    if (items.length === 0 && !isSubmitting && !orderCompleted) {
      Alert.alert(t('common.error'), t('checkout.emptyCart'), [{ text: t('common.ok'), onPress: () => router.replace('/(tabs)') }]);
    }
  }, [items.length, isSubmitting, orderCompleted]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data: addresses } = await supabase.from('addresses').select('id, name, city, area, street, phone, type, is_default').eq('user_id', session.user.id).order('is_default', { ascending: false });
        if (addresses?.length) {
          setSavedAddresses(addresses);
          const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
          setSelectedAddressId(defaultAddr.id);
        }

        const { data: profile } = await supabase.from('profiles').select('full_name, phone').eq('id', session.user.id).single();
        const currentValues = getValues();

        let fullName = profile?.full_name || session.user.user_metadata?.full_name || '';
        let phone = profile?.phone || session.user.user_metadata?.phone || '';

        if (!currentValues.fullName && fullName) setValue('fullName', fullName);
        if (!currentValues.phone && phone) setValue('phone', phone);
      } catch (error) { console.error('Error loading data:', error); }
    };
    loadData();
  }, []);

  useEffect(() => {
    const parsedDiscount = Number(params.discountAmount || 0);

    if (params.couponCode && parsedDiscount > 0) {
      setCouponInfo({
        couponId: params.couponId || null,
        couponCode: params.couponCode,
        discountAmount: parsedDiscount,
      });
    }
  }, [params.couponCode, params.couponId, params.discountAmount]);

  const handleNext = async () => {
    if (currentStep === 0) {
      const isAddressValid = await trigger(['fullName', 'phone', 'city']);
      if (!isAddressValid) {
        Alert.alert(t('common.error'), language === 'ar' ? 'الرجاء التأكد من تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    try {
      const addressData = getValues();
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        Alert.alert(t('common.error'), t('checkout.loginRequired'));
        setIsSubmitting(false);
        return;
      }

      // ── التحقق من توفّر المخزون قبل إنشاء الطلب ───────────────────────────
      // مخزون السلة مخزَّن وقت الإضافة وقد يكون قديماً، فنقرأ الحالي من القاعدة.
      // بدون هذا الفحص يُنشأ الطلب حتى لو نفدت الكمية (بيع ما ليس في المخزن).
      const { data: stockRows, error: stockError } = await supabase
        .from('products')
        .select('id, name_ar, name, price_iqd, stock_quantity, is_active')
        .in('id', items.map(i => i.product_id));

      if (stockError) throw stockError;

      const stockMap = new Map(
        (stockRows || []).map((p: any) => [p.id, p]),
      );
      const unavailable = items
        .map(item => {
          const p = stockMap.get(item.product_id);
          const label = item.name_ar || item.name;
          if (!p || p.is_active === false) return { label, left: 0 };
          if ((p.stock_quantity ?? 0) < item.quantity) {
            return { label: p.name_ar || p.name || label, left: p.stock_quantity ?? 0 };
          }
          return null;
        })
        .filter(Boolean) as { label: string; left: number }[];

      if (unavailable.length > 0) {
        const lines = unavailable
          .map(u =>
            u.left > 0
              ? language === 'ar'
                ? `• ${u.label} — المتوفر ${u.left} فقط`
                : `• ${u.label} — only ${u.left} left`
              : language === 'ar'
                ? `• ${u.label} — غير متوفر`
                : `• ${u.label} — out of stock`,
          )
          .join('\n');

        Alert.alert(
          language === 'ar' ? 'الكمية غير متوفرة' : 'Not enough stock',
          (language === 'ar'
            ? 'تغيّرت الكمية المتاحة لهذه المنتجات:\n\n'
            : 'Availability changed for these items:\n\n') +
            lines +
            (language === 'ar'
              ? '\n\nعدّل سلتك ثم أعد المحاولة.'
              : '\n\nPlease update your cart and try again.'),
          [{ text: t('common.ok') }],
        );
        setIsSubmitting(false);
        return;
      }

      // ── تسعير من القاعدة، لا من السلة ────────────────────────────────────
      // سعر السلة مخزَّن وقت الإضافة. نعيد حسابه من أسعار القاعدة الحالية
      // حتى لا يُنشأ طلب بسعر قديم أو معدَّل.
      const pricedItems = items.map(item => {
        const p = stockMap.get(item.product_id);
        const unitPrice = Number(p?.price_iqd ?? item.price_iqd);
        return { ...item, serverPriceIQD: unitPrice, lineTotal: unitPrice * item.quantity };
      });
      const subtotalIQD = pricedItems.reduce((s, i) => s + i.lineTotal, 0);

      // إن اختلف السعر عمّا رآه الزبون، نُعلمه ولا نُكمل بصمت.
      if (Math.round(subtotalIQD) !== Math.round(totalIQD)) {
        const changed = pricedItems
          .filter(i => Math.round(i.serverPriceIQD) !== Math.round(i.price_iqd))
          .map(i =>
            language === 'ar'
              ? `• ${i.name_ar || i.name}: ${formatPrice(i.price_iqd)} ← ${formatPrice(i.serverPriceIQD)}`
              : `• ${i.name_ar || i.name}: ${formatPrice(i.price_iqd)} → ${formatPrice(i.serverPriceIQD)}`,
          )
          .join('\n');

        Alert.alert(
          language === 'ar' ? 'تغيّرت الأسعار' : 'Prices changed',
          (language === 'ar'
            ? 'تغيّر سعر بعض المنتجات منذ إضافتها للسلة:\n\n'
            : 'Some prices changed since you added them:\n\n') +
            (changed || '') +
            (language === 'ar'
              ? `\n\nالمجموع الجديد: ${formatPrice(subtotalIQD)}`
              : `\n\nNew subtotal: ${formatPrice(subtotalIQD)}`),
          [{ text: t('common.ok') }],
        );
        setIsSubmitting(false);
        return;
      }

      const deliveryCostIQD = getDeliveryCost(deliveryType);
      const discountAmount = couponInfo.discountAmount || 0;
      const finalTotalIQD = subtotalIQD + deliveryCostIQD - discountAmount;
      const finalTotalUSD = finalTotalIQD / (exchangeRate || 1500);

      const addressTypeLabel = addressData.type === 'home' ? (language === 'ar' ? 'المنزل' : 'Home') : (language === 'ar' ? 'العمل' : 'Work');
      const addressParts = [addressData.city, addressData.area, addressData.street, addressData.nearestLandmark].filter(Boolean);
      const fullAddress = `${addressTypeLabel} - ${addressParts.join(', ')}`;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_iqd: finalTotalIQD,
          total_usd: finalTotalUSD,
          delivery_cost_iqd: deliveryCostIQD,
          coupon_id: couponInfo.couponId,
          coupon_code: couponInfo.couponCode,
          discount_amount: discountAmount,
          status: 'pending',
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting_payment',
          delivery_type: deliveryType,
          delivery_address: fullAddress,
          delivery_phone: addressData.phone,
          customer_name: addressData.fullName,
          customer_notes: addressData.notes || null,
          created_at: new Date().toISOString(),
        }).select().single();

      if (orderError) throw orderError;

      if (!selectedAddressId && addressData.city) {
        await supabase.from('addresses').insert({
          user_id: userId, name: addressData.fullName, city: addressData.city, area: addressData.area || '', street: addressData.street || '', phone: addressData.phone, type: addressData.type, is_default: savedAddresses.length === 0
        });
      }

      // نستخدم سعر القاعدة (serverPriceIQD) لا سعر السلة
      const orderItems = pricedItems.map(item => ({
        order_id: order.id, product_id: item.product_id, quantity: item.quantity,
        price_iqd: item.serverPriceIQD,
        price_usd: item.serverPriceIQD / (exchangeRate || 1500),
        product_snapshot: { name: item.name, name_ar: item.name_ar, image_url: item.image_url }
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        await supabase.from('orders').delete().eq('id', order.id);
        throw itemsError;
      }

      if (couponInfo.couponId && couponInfo.couponCode && discountAmount > 0) {
        const { error: usageError } = await supabase.from('coupon_usages').insert({
          coupon_id: couponInfo.couponId,
          user_id: userId,
          order_id: order.id,
          discount_amount: discountAmount,
        });

        if (usageError) {
          await supabase.from('order_items').delete().eq('order_id', order.id);
          await supabase.from('orders').delete().eq('id', order.id);
          throw usageError;
        }

        const { data: couponRecord } = await supabase
          .from('coupons')
          .select('used_count')
          .eq('id', couponInfo.couponId)
          .single();

        await supabase
          .from('coupons')
          .update({ used_count: (couponRecord?.used_count || 0) + 1 })
          .eq('id', couponInfo.couponId);
      }

      for (const item of items) {
        await supabase.rpc('decrease_product_stock', { product_id: item.product_id, quantity: item.quantity });
      }

      // الدفع الإلكتروني (Wayl): أنشئ رابط الدفع وافتح صفحة الدفع داخل التطبيق.
      // لا نُفرّغ السلة إلا بعد تأكيد الدفع داخل شاشة WebView.
      if (paymentMethod === 'wayl') {
        setOrderCompleted(true); // لمنع تنبيه «السلة فارغة» عند مغادرة الشاشة
        const { data: linkData, error: linkError } = await supabase.functions.invoke('wayl-payment', {
          body: { action: 'create', orderId: order.id },
        });

        if (linkError || !linkData?.url) {
          Alert.alert(
            t('common.error'),
            language === 'ar' ? 'تعذّر إنشاء رابط الدفع. طلبك محفوظ بانتظار الدفع.' : 'Could not create the payment link. Your order is saved as awaiting payment.'
          );
          router.replace({ pathname: '/order/[id]', params: { id: order.id, isNewOrder: 'true' } });
          return;
        }

        router.replace({
          pathname: '/payment/wayl' as any,
          params: { orderId: order.id, url: linkData.url },
        });
        return;
      }

      setOrderCompleted(true);
      clearCart();
      router.replace({ pathname: '/order/[id]', params: { id: order.id, isNewOrder: 'true' } });

    } catch (error) {
      console.error(error);
      Alert.alert(t('common.error'), t('checkout.orderError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <AddressStep control={control} errors={errors} setValue={setValue} getValues={getValues} />;
      case 1: return (
        <>
          <Text className={`font-ibm-bold text-sm text-gray-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'طريقة التوصيل' : 'Delivery Method'}
          </Text>
          <DeliveryStep selectedType={deliveryType} onSelect={setDeliveryType} />
          <View className="h-4" />
          <Text className={`font-ibm-bold text-sm text-gray-800 mb-2 mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
          </Text>
          <PaymentStep selectedMethod={paymentMethod} onSelect={setPaymentMethod} waylEnabled={waylEnabled} />
        </>
      );
      case 2: return (
        <ReviewStep
          address={getValues()}
          deliveryType={deliveryType}
          paymentMethod={paymentMethod}
          deliveryCost={getDeliveryCost(deliveryType)}
          couponCode={couponInfo.couponCode}
          discountAmount={couponInfo.discountAmount}
        />
      );
      default: return null;
    }
  };

  if (items.length === 0 && !isSubmitting && !orderCompleted) return null;

  const bottomSafeInset = Platform.OS === 'android' ? Math.max(insets.bottom, 24) : Math.max(insets.bottom, 34);
  const footerPaddingBottom = bottomSafeInset + 8;

  const getStepButtonText = () => {
    if (currentStep === 0) return language === 'ar' ? 'اختر طريقة الدفع' : 'Continue to Payment';
    if (currentStep === 1) return language === 'ar' ? 'مراجعة الطلب' : 'Review Order';
    return language === 'ar' ? 'تأكيد الطلب' : 'Place Order';
  };

  const getStepButtonIcon = () => {
    if (currentStep < 2) return isRTL ? ('chevron-back' as const) : ('chevron-forward' as const);
    return 'checkmark-circle' as const;
  };

  const stepButtonBg = currentStep === 2 ? '#1B5E20' : '#2E7D32';

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Compact Header with integrated stepper */}
      <View className="bg-white border-b border-gray-100 relative z-10">
        <View className="px-4 py-3 flex-row items-center" style={isRTL ? { flexDirection: 'row-reverse' } : {}}>
          <TouchableOpacity
            onPress={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : setShowCancelModal(true)}
            className="w-9 h-9 items-center justify-center rounded-full bg-gray-50"
            activeOpacity={0.7}
          >
            <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-ibm-bold text-base text-gray-900">
            {language === 'ar' ? 'تأكيد الطلب' : 'Checkout'}
          </Text>
          <Text className="font-ibm text-xs text-gray-400 w-9 text-center">
            {currentStep + 1}/3
          </Text>
        </View>

        {/* Modern Stepper */}
        <View className="px-6 pb-4 pt-1">
          <View className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPassed = idx < currentStep;
              return (
                <TouchableOpacity
                  key={idx}
                  className="items-center z-10"
                  activeOpacity={isPassed ? 0.7 : 1}
                  onPress={() => isPassed ? setCurrentStep(idx) : undefined}
                >
                  <View className={`w-9 h-9 rounded-full items-center justify-center ${
                    isActive ? 'bg-primary' : isPassed ? 'bg-primary' : 'bg-gray-100'
                  }`}
                    style={isActive ? {
                      shadowColor: '#2E7D32',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      elevation: 4,
                    } : {}}
                  >
                    {isPassed ? (
                      <Ionicons name="checkmark" size={18} color="white" />
                    ) : (
                      <Ionicons name={step.icon} size={16} color={isActive ? 'white' : '#9CA3AF'} />
                    )}
                  </View>
                  <Text className={`mt-1.5 font-ibm text-[10px] ${
                    isActive ? 'text-primary font-ibm-bold' : isPassed ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
          {/* Progress Line */}
          <View className="absolute top-[19px] z-0" style={isRTL ? { right: 48, left: 48 } : { left: 48, right: 48 }}>
            <View className="h-[2px] bg-gray-100 w-full" />
            <Animated.View
              className="h-[2px] bg-primary absolute top-0"
              style={isRTL ? {
                right: 0,
                width: progressAnim.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: ['0%', '50%', '100%'],
                }),
              } : {
                left: 0,
                width: progressAnim.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: ['0%', '50%', '100%'],
                }),
              }}
            />
          </View>
        </View>
      </View>

      {/* Form Area */}
      <KeyboardAwareScrollView
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {!isKeyboardVisible && (
        <View
          className="bg-white border-t border-gray-100 px-4 pt-3"
          style={{
            paddingBottom: footerPaddingBottom,
            elevation: 15,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { height: -4, width: 0 },
          }}
        >
          {/* Price summary row */}
          <View className={`flex-row items-center justify-between mb-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <View className={`${isRTL ? 'items-end' : 'items-start'}`}>
              <Text className="font-ibm text-[10px] text-gray-400 uppercase tracking-wider">
                {language === 'ar' ? 'المجموع الكلي' : 'Total'}
              </Text>
              <Text className="font-ibm-bold text-xl text-gray-900">
                {formatPrice(Math.max(0, totalIQD + getDeliveryCost(deliveryType) - couponInfo.discountAmount))}
              </Text>
              {couponInfo.discountAmount > 0 && (
                <Text className="font-ibm text-[11px] text-red-500" style={{ marginTop: 1 }}>
                  {language === 'ar' ? `خصم: -${formatPrice(couponInfo.discountAmount)}` : `-${formatPrice(couponInfo.discountAmount)} off`}
                </Text>
              )}
            </View>
            {currentStep === 2 && (
              <View className={`flex-row items-center bg-green-50 px-3 py-1.5 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Ionicons name="shield-checkmark" size={14} color="#2E7D32" />
                <Text className="font-ibm text-[11px] text-primary" style={{ marginLeft: isRTL ? 0 : 4, marginRight: isRTL ? 4 : 0 }}>
                  {language === 'ar' ? 'دفع آمن' : 'Secure'}
                </Text>
              </View>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={currentStep < 2 ? handleNext : submitOrder}
            disabled={isSubmitting}
            activeOpacity={0.8}
            className="flex-row items-center justify-center rounded-xl h-[52px]"
            style={isSubmitting
              ? { backgroundColor: '#9CA3AF' }
              : {
                  backgroundColor: stepButtonBg,
                  shadowColor: stepButtonBg,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 6,
                }
            }
          >
            {isSubmitting ? (
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ gap: 10 }}>
                <ActivityIndicator color="white" />
                <Text className="text-white font-ibm-bold text-sm">
                  {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                </Text>
              </View>
            ) : (
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ gap: 8 }}>
                <Text className="text-white font-ibm-bold text-base">
                  {getStepButtonText()}
                </Text>
                <Ionicons name={getStepButtonIcon()} size={currentStep === 2 ? 22 : 20} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Cancel Modal - Modern Design */}
      <Modal visible={showCancelModal} transparent animationType="fade" onRequestClose={() => setShowCancelModal(false)}>
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center p-5"
          activeOpacity={1}
          onPress={() => setShowCancelModal(false)}
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-3xl w-full max-w-sm p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-5">
              <Ionicons name="bag-remove-outline" size={32} color="#EF4444" />
            </View>
            <Text className="font-ibm-bold text-lg text-gray-900 mb-2">
              {language === 'ar' ? 'إلغاء عملية الشراء؟' : 'Leave Checkout?'}
            </Text>
            <Text className="font-ibm text-sm text-gray-500 text-center mb-6 leading-5">
              {language === 'ar' ? 'لا تقلق، سلة التسوق ستبقى محفوظة لك' : "Don't worry, your cart items will be saved"}
            </Text>
            <View className={`flex-row w-full gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TouchableOpacity
                className="flex-1 bg-gray-100 py-3.5 rounded-2xl items-center"
                onPress={() => setShowCancelModal(false)}
                activeOpacity={0.8}
              >
                <Text className="font-ibm-bold text-gray-700">
                  {language === 'ar' ? 'متابعة الشراء' : 'Continue'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-500 py-3.5 rounded-2xl items-center"
                onPress={() => { setShowCancelModal(false); router.back(); }}
                activeOpacity={0.8}
              >
                <Text className="font-ibm-bold text-white">
                  {language === 'ar' ? 'خروج' : 'Leave'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
