import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';
import { AddressStep } from '../components/checkout/AddressStep';
import { DeliveryStep } from '../components/checkout/DeliveryStep';
import { PaymentStep } from '../components/checkout/PaymentStep';
import { ReviewStep } from '../components/checkout/ReviewStep';
import { addressSchema, AddressData, DeliveryType, PaymentMethod } from '../types/checkout';
import { useLanguage, useCurrency } from '../contexts';

interface CouponInfo {
  couponId: string | null;
  couponCode: string | null;
  discountAmount: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, totalIQD, clearCart } = useCartStore();
  const { t, language, isRTL } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('scheduled');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [couponInfo, setCouponInfo] = useState<CouponInfo>({ couponId: null, couponCode: null, discountAmount: 0 });

  const STEPS = [
    { id: 'address', title: t('checkout.address'), icon: 'location' },
    { id: 'delivery', title: t('checkout.delivery'), icon: 'bicycle' },
    { id: 'payment', title: t('checkout.payment'), icon: 'card' },
    { id: 'review', title: t('checkout.review'), icon: 'checkmark-circle' },
  ];

  const { control, handleSubmit, trigger, getValues, setValue, formState: { errors } } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: 'home',
      fullName: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      street: '',
      building: '',
      floor: '',
      apartment: '',
      nearestLandmark: '',
      notes: '',
    },
  });

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      if (currentStep > 0) {
        handleBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentStep]);


  // Redirect if cart is empty (only on initial load, not after order completion)
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  useEffect(() => {
    if (items.length === 0 && !isSubmitting && !orderCompleted) {
      Alert.alert(
        t('common.error'),
        t('checkout.emptyCart'),
        [{ text: t('common.ok'), onPress: () => router.replace('/(tabs)') }]
      );
    }
  }, [items.length, isSubmitting, orderCompleted]);

  // Load saved addresses
  useEffect(() => {
    const loadSavedAddresses = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', session.user.id)
          .order('is_default', { ascending: false });

        if (!error && data) {
          setSavedAddresses(data);
          const defaultAddr = data.find(a => a.is_default);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
          }
        }
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    };
    loadSavedAddresses();
  }, []);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      Alert.alert(
        t('checkout.cancelOrder'),
        t('checkout.cancelOrderConfirm'),
        [
          { text: t('common.no'), style: 'cancel' },
          { text: t('common.yes'), onPress: () => router.back() }
        ]
      );
    }
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Validate only required fields
      const isAddressValid = await trigger(['fullName', 'phone', 'city']);
      const values = getValues();
      
      console.log('Form values:', values);
      console.log('Validation result:', isAddressValid);
      console.log('Errors:', errors);
      
      if (!isAddressValid) {
        // Show specific error messages
        const errorMessages = [];
        if (errors.fullName) errorMessages.push(errors.fullName.message);
        if (errors.phone) errorMessages.push(errors.phone.message);
        if (errors.city) errorMessages.push(errors.city.message);
        
        Alert.alert(
          t('common.error'), 
          errorMessages.length > 0 ? errorMessages.join('\n') : t('checkout.fillAllFields')
        );
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const getDeliveryCost = (type: DeliveryType): number => {
    switch (type) {
      case 'express':
        return 5000;
      case 'electronics':
        return 10000;
      case 'scheduled':
      default:
        return 2000;
    }
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      const addressData = getValues();

      // Check auth session
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        Alert.alert(
          t('common.error'),
          t('checkout.loginRequired'),
          [
            { text: t('common.cancel'), style: 'cancel' },
            { text: t('auth.login'), onPress: () => router.push('/auth/login') }
          ]
        );
        setIsSubmitting(false);
        return;
      }

      // Calculate final totals
      const deliveryCostIQD = getDeliveryCost(deliveryType);
      const discountAmount = couponInfo.discountAmount || 0;
      const finalTotalIQD = totalIQD + deliveryCostIQD - discountAmount;
      const finalTotalUSD = finalTotalIQD / 1480; // Convert IQD to USD

      // Format address
      const addressTypeLabel = addressData.type === 'home'
        ? (language === 'ar' ? 'المنزل' : 'Home')
        : (language === 'ar' ? 'العمل' : 'Work');

      // Build full address from components
      const addressParts = [
        addressData.city,
        addressData.district,
        addressData.neighborhood,
        addressData.street,
        addressData.building ? `عمارة ${addressData.building}` : '',
        addressData.floor ? `طابق ${addressData.floor}` : '',
        addressData.apartment ? `شقة ${addressData.apartment}` : '',
        addressData.nearestLandmark
      ].filter(Boolean);
      const fullAddress = `${addressTypeLabel} - ${addressParts.join(', ')}`;
      
      // Include location coordinates if available
      const locationData = addressData.latitude && addressData.longitude 
        ? { latitude: addressData.latitude, longitude: addressData.longitude }
        : null;

      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_iqd: finalTotalIQD,
          total_usd: finalTotalUSD,
          delivery_cost_iqd: deliveryCostIQD,
          status: 'pending',
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting_payment',
          delivery_type: deliveryType,
          delivery_address: fullAddress,
          delivery_phone: addressData.phone,
          customer_name: addressData.fullName,
          customer_notes: addressData.notes || null,
          coupon_id: couponInfo.couponId || null,
          coupon_code: couponInfo.couponCode || null,
          discount_amount: discountAmount,
          delivery_latitude: locationData?.latitude || null,
          delivery_longitude: locationData?.longitude || null,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 1.5. Record coupon usage if coupon was applied
      if (couponInfo.couponId && discountAmount > 0) {
        await supabase.rpc('use_coupon', {
          p_coupon_id: couponInfo.couponId,
          p_user_id: userId,
          p_order_id: order.id,
          p_discount_amount: discountAmount
        });
      }

      // 1.6. Save address if it's new
      if (!selectedAddressId && addressData.city) {
        await supabase.from('addresses').insert({
          user_id: userId,
          name: addressData.fullName,
          city: addressData.city || '',
          area: addressData.district || '',
          street: addressData.street || '',
          phone: addressData.phone,
          type: addressData.type,
          latitude: locationData?.latitude || null,
          longitude: locationData?.longitude || null,
          is_default: savedAddresses.length === 0
        });
      }

      // 2. Create Order Items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_iqd: item.price_iqd,
        price_usd: item.price_iqd / 1480, // Convert IQD to USD
        product_snapshot: {
          name: item.name,
          name_ar: item.name_ar,
          image_url: item.image_url
        }
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Update product stock (optional)
      for (const item of items) {
        const { error: stockError } = await supabase.rpc('decrease_product_stock', {
          product_id: item.product_id,
          quantity: item.quantity
        });
        if (stockError) console.error('Stock update error:', stockError);
      }

      // Success - mark order as completed before clearing cart
      setOrderCompleted(true);
      clearCart();

      Alert.alert(
        t('common.success'),
        `${t('checkout.orderSuccess')}\n${t('checkout.orderNumber')}: #${order.id.slice(0, 8).toUpperCase()}`,
        [
          {
            text: t('common.ok'),
            onPress: () => router.replace(`/order/${order.id}`)
          }
        ]
      );
    } catch (error: any) {
      console.error('Checkout Error:', error);
      Alert.alert(
        t('common.error'),
        t('checkout.orderError'),
        [{ text: t('common.ok') }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <AddressStep control={control} errors={errors} setValue={setValue} getValues={getValues} />;
      case 1:
        return <DeliveryStep selectedType={deliveryType} onSelect={setDeliveryType} />;
      case 2:
        return <PaymentStep selectedMethod={paymentMethod} onSelect={setPaymentMethod} />;
      case 3:
        return (
          <ReviewStep
            address={getValues()}
            deliveryType={deliveryType}
            paymentMethod={paymentMethod}
            deliveryCost={getDeliveryCost(deliveryType)}
          />
        );
      default:
        return null;
    }
  };

  if (items.length === 0 && !isSubmitting) {
    return null; // Will redirect via useEffect
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View
        className={`flex-row items-center px-4 py-3 bg-white border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={24}
            color="#212121"
          />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="font-cairo-bold text-lg text-text-primary">
            {STEPS[currentStep].title}
          </Text>
          <Text className="font-cairo text-xs text-text-secondary mt-0.5">
            {language === 'ar'
              ? `الخطوة ${currentStep + 1} من ${STEPS.length}`
              : `Step ${currentStep + 1} of ${STEPS.length}`
            }
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Indicator */}
      <View className="bg-white px-4 py-4 mb-2">
        <View className="flex-row justify-between items-center relative">
          {/* Progress Line Background */}
          <View
            className="absolute h-1 bg-gray-200 rounded-full"
            style={{
              left: isRTL ? '10%' : '5%',
              right: isRTL ? '5%' : '10%',
              top: 15,
              zIndex: 0
            }}
          />
          {/* Progress Line Active */}
          <View
            className="absolute h-1 bg-primary rounded-full"
            style={{
              left: isRTL ? '10%' : '5%',
              width: `${(currentStep / (STEPS.length - 1)) * 85}%`,
              top: 15,
              zIndex: 1
            }}
          />

          {STEPS.map((step, index) => (
            <View key={step.id} className="items-center z-10" style={{ width: 70 }}>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center mb-2 border-2 ${index < currentStep
                    ? 'bg-primary border-primary'
                    : index === currentStep
                      ? 'bg-white border-primary'
                      : 'bg-white border-gray-300'
                  }`}
                style={{
                  shadowColor: index <= currentStep ? '#2E7D32' : '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: index <= currentStep ? 0.2 : 0.05,
                  shadowRadius: 4,
                  elevation: index <= currentStep ? 3 : 1,
                }}
              >
                {index < currentStep ? (
                  <Ionicons name="checkmark" size={20} color="white" />
                ) : (
                  <Ionicons
                    name={step.icon as any}
                    size={18}
                    color={index === currentStep ? '#2E7D32' : '#9CA3AF'}
                  />
                )}
              </View>
              <Text
                className={`text-[10px] font-cairo text-center ${index <= currentStep ? 'text-primary font-cairo-bold' : 'text-gray-400'
                  }`}
                numberOfLines={1}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets={true}
        >
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Actions */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        {/* Total Summary (only on review step) */}
        {currentStep === 3 && (
          <View
            className={`flex-row justify-between items-center mb-3 pb-3 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Text className="font-cairo text-text-secondary">
              {t('cart.total')}
            </Text>
            <Text className="font-cairo-bold text-xl text-primary">
              {formatPrice(totalIQD + getDeliveryCost(deliveryType))}
            </Text>
          </View>
        )}

        {/* Buttons */}
        <View className={`flex-row gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {currentStep > 0 && (
            <TouchableOpacity
              className="flex-1 bg-gray-100 py-4 rounded-xl items-center justify-center"
              onPress={handleBack}
              disabled={isSubmitting}
              activeOpacity={0.7}
            >
              <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Ionicons
                  name={isRTL ? "arrow-forward" : "arrow-back"}
                  size={20}
                  color="#424242"
                />
                <Text className="text-text-primary font-cairo-bold text-base">
                  {t('common.back')}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {currentStep < 3 ? (
            <TouchableOpacity
              className="flex-1 bg-primary py-4 rounded-xl items-center justify-center"
              style={{
                shadowColor: '#2E7D32',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Text className="text-white font-cairo-bold text-base">
                  {t('common.next')}
                </Text>
                <Ionicons
                  name={isRTL ? "arrow-back" : "arrow-forward"}
                  size={20}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className={`flex-1 py-4 rounded-2xl items-center justify-center ${isSubmitting ? 'bg-gray-400' : 'bg-primary'
                }`}
              style={!isSubmitting ? {
                shadowColor: '#2E7D32',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 8,
              } : {}}
              onPress={handleConfirmOrder}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-cairo-bold text-lg">
                    {t('checkout.processing')}
                  </Text>
                </View>
              ) : (
                <View className={`flex-row items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Ionicons name="checkmark-done-circle" size={26} color="white" />
                  <Text className="text-white font-cairo-bold text-lg">
                    {t('checkout.confirmOrder')}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
