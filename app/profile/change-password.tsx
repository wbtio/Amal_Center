import { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthField } from '../../components/auth/AuthUI';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'كلمة المرور الحالية مطلوبة'),
    newPassword: z.string().min(6, 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية',
    path: ['newPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { language, isRTL } = useLanguage();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPasswordValue = watch('newPassword');
  const confirmPasswordValue = watch('confirmPassword');
  const isConfirmPasswordMatched =
    confirmPasswordValue.trim().length >= 6 && confirmPasswordValue === newPasswordValue;

  const scrollConfirmFieldIntoView = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 160);
  };

  const renderPasswordToggle = (
    visible: boolean,
    onPress: () => void,
    iconColor = '#617167'
  ) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={
        visible
          ? language === 'ar'
            ? 'إخفاء كلمة المرور'
            : 'Hide password'
          : language === 'ar'
            ? 'إظهار كلمة المرور'
            : 'Show password'
      }
      onPress={onPress}
      style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={20} color={iconColor} />
    </TouchableOpacity>
  );

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setSaving(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        Alert.alert(
          language === 'ar' ? 'خطأ' : 'Error',
          language === 'ar' ? 'يرجى تسجيل الدخول مرة أخرى' : 'Please login again'
        );
        router.replace('/auth/login');
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: data.currentPassword,
      });

      if (signInError) {
        Alert.alert(
          language === 'ar' ? 'خطأ' : 'Error',
          language === 'ar' ? 'كلمة المرور الحالية غير صحيحة' : 'Current password is incorrect'
        );
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      Alert.alert(
        language === 'ar' ? 'تم بنجاح' : 'Success',
        language === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully',
        [{ text: language === 'ar' ? 'حسناً' : 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error('Error changing password:', error);
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'فشل في تغيير كلمة المرور' : 'Failed to change password'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: insets.top }}>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={24} color="#212121" />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'IBMPlexSansArabic_700Bold',
            fontSize: 18,
            color: '#212121',
          }}
        >
          {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: Math.max(insets.bottom + 140, 160) }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          <View
            style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              flexDirection: isRTL ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="information-circle"
              size={24}
              color="#D97706"
              style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
            />
            <Text
              style={{
                flex: 1,
                fontFamily: 'IBMPlexSansArabic_400Regular',
                fontSize: 13,
                color: '#92400E',
                textAlign: isRTL ? 'right' : 'left',
                lineHeight: 20,
              }}
            >
              {language === 'ar'
                ? 'تأكد من اختيار كلمة مرور قوية تحتوي على أحرف وأرقام'
                : 'Make sure to choose a strong password with letters and numbers'}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}
          >
            <View style={{ marginBottom: 16 }}>
              <Controller
                control={control}
                name="currentPassword"
                render={({ field: { onChange, value } }) => (
                  <AuthField
                    label={language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                    iconName="lock-closed-outline"
                    error={errors.currentPassword?.message}
                    placeholder="••••••"
                    secureTextEntry={!showCurrentPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    value={value}
                    onChangeText={onChange}
                    trailing={renderPasswordToggle(showCurrentPassword, () => {
                      setShowCurrentPassword((current) => !current);
                    })}
                  />
                )}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <AuthField
                    label={language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                    iconName="key-outline"
                    error={errors.newPassword?.message}
                    placeholder="••••••"
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    value={value}
                    onChangeText={onChange}
                    trailing={renderPasswordToggle(showNewPassword, () => {
                      setShowNewPassword((current) => !current);
                    })}
                  />
                )}
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <AuthField
                    label={language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                    iconName="checkmark-circle-outline"
                    error={errors.confirmPassword?.message}
                    success={isConfirmPasswordMatched}
                    placeholder="••••••"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    value={value}
                    onChangeText={onChange}
                    onFocus={scrollConfirmFieldIntoView}
                    trailing={
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {isConfirmPasswordMatched ? (
                          <View
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 14,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#E8F5E9',
                            }}
                          >
                            <Ionicons name="checkmark" size={16} color="#2E7D32" />
                          </View>
                        ) : null}

                        {renderPasswordToggle(
                          showConfirmPassword,
                          () => setShowConfirmPassword((current) => !current),
                          isConfirmPasswordMatched ? '#2E7D32' : '#617167'
                        )}
                      </View>
                    }
                  />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#2E7D32',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              marginBottom: 16,
              shadowColor: '#2E7D32',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
            onPress={handleSubmit(onSubmit)}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                style={{
                  fontFamily: 'IBMPlexSansArabic_700Bold',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
