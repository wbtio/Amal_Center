import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';

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
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
              onPress: () => router.push({ pathname: '/auth/verify', params: { email: data.email } })
            }
          ]
        );
      } else {
        Alert.alert('خطأ', getErrorMessage(error.message));
      }
    } else {
      router.replace('/(tabs)/profile');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-6 justify-center">
      <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 z-10">
        <Ionicons name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>

      <Text className="font-ibm-bold text-2xl text-primary text-center mb-2">تسجيل الدخول</Text>
      <Text className="font-ibm text-text-secondary text-center mb-8">مرحباً بعودتك إلى الأمل ماركت</Text>

      {/* Email */}
      <View className="mb-4">
        <Text className="font-ibm text-right mb-1 text-text-secondary">البريد الإلكتروني</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-ibm"
              style={{ textAlign: 'left', writingDirection: 'ltr' }}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text className="text-danger text-xs text-right mt-1 font-ibm">{errors.email.message}</Text>}
      </View>

      {/* Password */}
      <View className="mb-6">
        <Text className="font-ibm text-right mb-1 text-text-secondary">كلمة المرور</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-right font-ibm"
              placeholder="******"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text className="text-danger text-xs text-right mt-1 font-ibm">{errors.password.message}</Text>}
      </View>

      <TouchableOpacity
        className="bg-primary w-full py-4 rounded-xl items-center mb-4"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-ibm-bold text-lg">دخول</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-primary font-ibm-bold">أنشئ حساباً الآن</Text>
        </TouchableOpacity>
        <Text className="font-ibm text-text-secondary mx-1">ليس لديك حساب؟</Text>
      </View>
    </SafeAreaView>
  );
}
