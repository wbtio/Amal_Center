import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';

const registerSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const getErrorMessage = (error: string) => {
  const errorMessages: Record<string, string> = {
    'User already registered': 'هذا البريد الإلكتروني مسجل مسبقاً',
    'Password should be at least 6 characters': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  };
  return errorMessages[error] || 'حدث خطأ، يرجى المحاولة مرة أخرى';
};

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: {
          full_name: data.fullName.trim(),
          name_ar: data.fullName.trim(),
        }
      }
    });

    setLoading(false);

    if (authError) {
      Alert.alert('خطأ', getErrorMessage(authError.message));
      return;
    }

    // Check if successful signup requires verification
    if (authData.user && !authData.session) {
      // Redirect to Verify Page
      router.push({
        pathname: '/auth/verify',
        params: { email: data.email.trim().toLowerCase() }
      });
    } else if (authData.session) {
      Alert.alert('تم بنجاح', 'تم إنشاء حسابك بنجاح!', [
        { text: 'حسناً', onPress: () => router.replace('/(tabs)/profile') }
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-6 justify-center">
      <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 z-10">
        <Ionicons name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>

      <Text className="font-cairo-bold text-2xl text-primary text-center mb-2">إنشاء حساب جديد</Text>
      <Text className="font-cairo text-text-secondary text-center mb-8">انضم إلينا واستمتع بتجربة تسوق مميزة</Text>

      {/* Full Name */}
      <View className="mb-4">
        <Text className="font-cairo text-right mb-1 text-text-secondary">الاسم الكامل</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-right font-cairo"
              placeholder="الاسم الكامل"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.fullName && <Text className="text-danger text-xs text-right mt-1 font-cairo">{errors.fullName.message}</Text>}
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="font-cairo text-right mb-1 text-text-secondary">البريد الإلكتروني</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-cairo"
              style={{ textAlign: 'left', writingDirection: 'ltr' }}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text className="text-danger text-xs text-right mt-1 font-cairo">{errors.email.message}</Text>}
      </View>

      {/* Password */}
      <View className="mb-4">
        <Text className="font-cairo text-right mb-1 text-text-secondary">كلمة المرور</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-right font-cairo"
              placeholder="******"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text className="text-danger text-xs text-right mt-1 font-cairo">{errors.password.message}</Text>}
      </View>

      {/* Confirm Password */}
      <View className="mb-6">
        <Text className="font-cairo text-right mb-1 text-text-secondary">تأكيد كلمة المرور</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-right font-cairo"
              placeholder="******"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.confirmPassword && <Text className="text-danger text-xs text-right mt-1 font-cairo">{errors.confirmPassword.message}</Text>}
      </View>

      <TouchableOpacity
        className="bg-primary w-full py-4 rounded-xl items-center mb-4"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-cairo-bold text-lg">إنشاء الحساب</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text className="text-primary font-cairo-bold">سجل دخولك</Text>
        </TouchableOpacity>
        <Text className="font-cairo text-text-secondary mx-1">لديك حساب بالفعل؟</Text>
      </View>
    </SafeAreaView>
  );
}
