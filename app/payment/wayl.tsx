import { View, Text, TouchableOpacity, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useLanguage } from '../../contexts';

// يجب أن يطابق RETURN_URL في الـ edge function (wayl-payment).
const RETURN_URL = 'https://amalcenter.app/payment-return';

export default function WaylPaymentScreen() {
  const router = useRouter();
  const { orderId, url } = useLocalSearchParams<{ orderId: string; url: string }>();
  const { language, isRTL } = useLanguage();
  const { clearCart } = useCartStore();

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const verifiedRef = useRef(false);

  const goToOrder = (paid: boolean) => {
    if (paid) clearCart();
    router.replace({ pathname: '/order/[id]', params: { id: String(orderId), isNewOrder: 'true' } });
  };

  // التحقق من حالة الدفع عبر الـ API ثم الانتقال لصفحة الطلب.
  const verifyAndFinish = async () => {
    if (verifiedRef.current) return;
    verifiedRef.current = true;
    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('wayl-payment', {
        body: { action: 'status', orderId: String(orderId) },
      });
      if (error) throw error;

      if (data?.paid) {
        goToOrder(true);
      } else {
        Alert.alert(
          language === 'ar' ? 'لم يكتمل الدفع' : 'Payment not completed',
          language === 'ar'
            ? 'لم نتمكن من تأكيد الدفع. طلبك محفوظ بانتظار الدفع.'
            : 'We could not confirm the payment. Your order is saved as awaiting payment.',
          [{ text: language === 'ar' ? 'حسناً' : 'OK', onPress: () => goToOrder(false) }]
        );
      }
    } catch {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'تعذّر التحقق من حالة الدفع.' : 'Could not verify payment status.',
        [{ text: language === 'ar' ? 'حسناً' : 'OK', onPress: () => goToOrder(false) }]
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleNavChange = (nav: WebViewNavigation) => {
    if (nav.url && nav.url.startsWith(RETURN_URL)) {
      verifyAndFinish();
    }
  };

  const confirmClose = () => {
    Alert.alert(
      language === 'ar' ? 'إلغاء الدفع؟' : 'Cancel payment?',
      language === 'ar'
        ? 'سيتم حفظ طلبك بانتظار الدفع ويمكنك إكماله لاحقاً.'
        : 'Your order will be saved as awaiting payment and you can complete it later.',
      [
        { text: language === 'ar' ? 'متابعة الدفع' : 'Continue paying', style: 'cancel' },
        { text: language === 'ar' ? 'خروج' : 'Exit', style: 'destructive', onPress: () => goToOrder(false) },
      ]
    );
  };

  // زر الرجوع في الأندرويد = نفس سلوك زر الإغلاق.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      confirmClose();
      return true;
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className={`flex-row items-center justify-between px-4 py-3 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <TouchableOpacity onPress={confirmClose} className="p-1.5" hitSlop={8}>
          <Ionicons name="close" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="font-ibm-bold text-base text-gray-800">
          {language === 'ar' ? 'الدفع الإلكتروني' : 'Online Payment'}
        </Text>
        <View style={{ width: 30 }} />
      </View>

      <View className="flex-1">
        {url ? (
          <WebView
            source={{ uri: String(url) }}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={handleNavChange}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
          />
        ) : null}

        {(loading || verifying) && (
          <View className="absolute inset-0 items-center justify-center bg-white/80">
            <ActivityIndicator size="large" color="#2E7D32" />
            {verifying && (
              <Text className="font-ibm-regular text-sm text-gray-600 mt-3">
                {language === 'ar' ? 'جاري تأكيد الدفع...' : 'Confirming payment...'}
              </Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
