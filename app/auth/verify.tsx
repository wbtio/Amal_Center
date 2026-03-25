import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  AuthField,
  AuthNote,
  AuthPrimaryButton,
  AuthScaffold,
} from '../../components/auth/AuthUI';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const email = Array.isArray(params.email) ? params.email[0] : params.email ?? '';

  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const resendOtp = async () => {
    if (!email) {
      Alert.alert('تنبيه', 'لا يوجد بريد إلكتروني مرتبط بعملية التحقق.');
      return;
    }

    setIsResending(true);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    setIsResending(false);

    if (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء إعادة إرسال الرمز، يرجى المحاولة لاحقاً.');
    } else {
      Alert.alert('تم الإرسال', 'تم إرسال رمز جديد إلى بريدك الإلكتروني.');
    }
  };

  const verifyOtp = async () => {
    if (!email) {
      Alert.alert('تنبيه', 'لا يوجد بريد إلكتروني مرتبط بعملية التحقق.');
      return;
    }

    if (otpCode.length !== 6) {
      Alert.alert('تنبيه', 'الرجاء إدخال الرمز المكوّن من 6 أرقام.');
      return;
    }

    setIsVerifying(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'signup',
    });

    setIsVerifying(false);

    if (error) {
      Alert.alert('خطأ في التحقق', 'الرمز غير صحيح أو انتهت صلاحيته.');
    } else if (data.session) {
      Alert.alert('تم التفعيل', 'تم تفعيل حسابك بنجاح!', [
        { text: 'ابدأ التسوق', onPress: () => router.replace('/(tabs)/profile') },
      ]);
    }
  };

  return (
    <AuthScaffold
      title="تأكيد الحساب"
      subtitle="أدخل رمز التحقق المرسل إلى بريدك حتى نفعّل الحساب ونربطه بجلسة تسجيل الدخول الحالية."
    >
      <AuthNote iconName="mail-open-outline">
        <View style={{ gap: 4 }}>
          <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', color: '#5D6F62', fontSize: 13 }}>
            تم إرسال رمز التحقق إلى:
          </Text>
          <Text
            style={{
              fontFamily: 'IBMPlexSansArabic_700Bold',
              color: '#214D26',
              fontSize: 14,
            }}
          >
            {email || 'لا يوجد بريد محدد'}
          </Text>
        </View>
      </AuthNote>

      <AuthField
        label="رمز التحقق"
        iconName="keypad-outline"
        helperText="أدخل الرمز كما وصلك في البريد الإلكتروني."
        placeholder="------"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        autoFocus
        forceLTR
        textAlign="center"
        maxLength={6}
        value={otpCode}
        onChangeText={(text) => setOtpCode(text.replace(/\D/g, '').slice(0, 6))}
      />

      <AuthPrimaryButton
        label="تأكيد وتفعيل الحساب"
        iconName="checkmark-circle-outline"
        onPress={verifyOtp}
        loading={isVerifying}
        disabled={!email}
      />

      <TouchableOpacity
        onPress={resendOtp}
        disabled={isResending || isVerifying || !email}
        style={{
          minHeight: 48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#DCE8DD',
          backgroundColor: isResending ? '#F1F5F1' : '#F8FBF8',
        }}
      >
        <Text
          style={{
            fontFamily: 'IBMPlexSansArabic_600SemiBold',
            color: '#3B5E40',
            fontSize: 14,
          }}
        >
          {isResending ? 'جارِ إعادة الإرسال...' : 'لم يصلك الرمز؟ أعد الإرسال'}
        </Text>
      </TouchableOpacity>
    </AuthScaffold>
  );
}
