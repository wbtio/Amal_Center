import { Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import * as z from 'zod';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  AuthField,
  AuthPrimaryButton,
  AuthScaffold,
  AuthSwitchPrompt,
} from '../../components/auth/AuthUI';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const getErrorMessage = (error: string) => {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'Email not confirmed': 'يرجى تأكيد بريدك الإلكتروني أولاً',
    'Invalid email or password': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  };

  return errorMessages[error] || 'حدث خطأ، يرجى المحاولة مرة أخرى';
};

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        Alert.alert(
          'تأكيد الحساب',
          'البريد الإلكتروني غير مؤكد. هل تريد إدخال رمز التحقق الآن؟',
          [
            { text: 'إلغاء', style: 'cancel' },
            {
              text: 'نعم، تفعيل الحساب',
              onPress: () =>
                router.push({
                  pathname: '/auth/verify',
                  params: { email: data.email.trim().toLowerCase() },
                }),
            },
          ]
        );
      } else {
        Alert.alert('خطأ', getErrorMessage(error.message));
      }

      return;
    }

    router.replace('/(tabs)/profile');
  };

  return (
    <AuthScaffold
      title="تسجيل الدخول"
      subtitle="ادخل إلى حسابك لمتابعة طلباتك، عناوينك المفضلة، وكل ما يخص تجربة التسوق في الأمل سنتر."
      footer={
        <AuthSwitchPrompt
          prompt="ليس لديك حساب؟"
          actionLabel="أنشئ حساباً الآن"
          onPress={() => router.push('/auth/register')}
        />
      }
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label="البريد الإلكتروني"
            iconName="mail-outline"
            error={errors.email?.message}
            forceLTR
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            value={value}
            onChangeText={(text) => onChange(text.replace(/\s+/g, ''))}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label="كلمة المرور"
            iconName="lock-closed-outline"
            error={errors.password?.message}
            placeholder="أدخل كلمة المرور"
            secureTextEntry={!showPassword}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="password"
            textContentType="password"
            value={value}
            onChangeText={onChange}
            trailing={
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                onPress={() => setShowPassword((current) => !current)}
                style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#617167"
                />
              </TouchableOpacity>
            }
          />
        )}
      />

      <AuthPrimaryButton
        label="دخول إلى الحساب"
        iconName="log-in-outline"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </AuthScaffold>
  );
}
