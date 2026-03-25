import { Alert, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import * as z from 'zod';
import { useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  AuthField,
  AuthPrimaryButton,
  AuthScaffold,
  AuthSwitchPrompt,
} from '../../components/auth/AuthUI';
import { useLanguage } from '../../contexts';

const buildRegisterSchema = (t: (key: string, options?: object) => string) =>
  z
    .object({
      fullName: z.string().min(3, t('auth.register.validation.fullNameMin')),
      phone: z
        .string()
        .regex(/^(07[3-9]\d{8}|\+9647[3-9]\d{8})$/, t('auth.register.validation.invalidPhone')),
      email: z.string().email(t('auth.register.validation.invalidEmail')),
      password: z.string().min(6, t('auth.register.validation.passwordMin')),
      confirmPassword: z.string().min(6, t('auth.register.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.register.validation.passwordMismatch'),
      path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<ReturnType<typeof buildRegisterSchema>>;

const getErrorMessage = (error: string, t: (key: string, options?: object) => string) => {
  const errorMessages: Record<string, string> = {
    'User already registered': t('auth.register.errors.alreadyRegistered'),
    'Password should be at least 6 characters': t('auth.register.errors.passwordTooShort'),
    'Invalid API key': t('auth.register.errors.invalidApiKey'),
    'Unable to validate email address': t('auth.register.errors.invalidEmailAddress'),
    'Signup requires a valid password': t('auth.register.errors.invalidPassword'),
    'Email rate limit exceeded': t('auth.register.errors.rateLimit'),
  };

  if (error.includes('already registered') || error.includes('already exists')) {
    return t('auth.register.errors.alreadyRegistered');
  }

  if (error.includes('Invalid') || error.includes('invalid')) {
    return t('auth.register.errors.invalidData');
  }

  if (error.includes('network') || error.includes('Network')) {
    return t('auth.register.errors.network');
  }

  if (error.includes('confirmation email') || error.includes('sending email')) {
    return undefined;
  }

  return errorMessages[error] || `${t('auth.register.errors.fallbackPrefix')}: ${error}`;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerSchema = useMemo(() => buildRegisterSchema(t), [language, t]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const isConfirmPasswordMatched =
    confirmPasswordValue.trim().length >= 6 && confirmPasswordValue === passwordValue;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const normalizedEmail = data.email.trim().toLowerCase();
      const normalizedPhone = data.phone.trim();
      const normalizedName = data.fullName.trim();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: data.password,
        options: {
          data: {
            full_name: normalizedName,
            name_ar: normalizedName,
            phone: normalizedPhone,
          },
        },
      });

      setLoading(false);

      const isEmailConfirmationError =
        authError?.message?.includes('confirmation email') ||
        authError?.message?.includes('sending email');

      if (authError && !isEmailConfirmationError) {
        const errorMsg = getErrorMessage(authError.message, t);
        if (errorMsg) {
          Alert.alert(t('auth.register.alerts.errorTitle'), errorMsg);
        }
        return;
      }

      if (isEmailConfirmationError && authData.user) {
        Alert.alert(
          t('auth.register.alerts.accountCreatedTitle'),
          t('auth.register.alerts.accountCreatedWithoutEmailConfirmation'),
          [{ text: t('auth.register.alerts.loginAction'), onPress: () => router.replace('/auth/login') }]
        );
        return;
      }

      if (authData.user && !authData.session) {
        router.push({
          pathname: '/auth/verify',
          params: { email: normalizedEmail },
        });
      } else if (authData.session) {
        Alert.alert(t('auth.register.alerts.successTitle'), t('auth.register.alerts.successMessage'), [
          { text: t('auth.register.alerts.okAction'), onPress: () => router.replace('/(tabs)/profile') },
        ]);
      }
    } catch {
      setLoading(false);
      Alert.alert(t('auth.register.alerts.errorTitle'), t('auth.register.alerts.unexpectedError'));
    }
  };

  return (
    <AuthScaffold
      title={t('auth.register.title')}
      subtitle={t('auth.register.subtitle')}
      backAccessibilityLabel={t('auth.back')}
      footer={
        <AuthSwitchPrompt
          prompt={t('auth.register.actions.footerPrompt')}
          actionLabel={t('auth.register.actions.footerAction')}
          onPress={() => router.push('/auth/login')}
        />
      }
    >
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label={t('auth.register.fields.fullName')}
            iconName="person-outline"
            error={errors.fullName?.message}
            placeholder={t('auth.register.fields.fullNamePlaceholder')}
            autoCapitalize="words"
            textContentType="name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label={t('auth.register.fields.phone')}
            iconName="call-outline"
            error={errors.phone?.message}
            helperText={t('auth.register.fields.phoneHelper')}
            forceLTR
            placeholder={t('auth.register.fields.phonePlaceholder')}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            value={value}
            onChangeText={(text) => onChange(text.replace(/[^\d+]/g, ''))}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label={t('auth.register.fields.email')}
            iconName="mail-outline"
            error={errors.email?.message}
            forceLTR
            placeholder={t('auth.register.fields.emailPlaceholder')}
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
            label={t('auth.register.fields.password')}
            iconName="lock-closed-outline"
            error={errors.password?.message}
            helperText={t('auth.register.fields.passwordHelper')}
            placeholder={t('auth.register.fields.passwordPlaceholder')}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            value={value}
            onChangeText={onChange}
            trailing={
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? t('auth.register.actions.hidePassword') : t('auth.register.actions.showPassword')
                }
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label={t('auth.register.fields.confirmPassword')}
            iconName="checkmark-circle-outline"
            error={errors.confirmPassword?.message}
            success={isConfirmPasswordMatched}
            placeholder={t('auth.register.fields.confirmPasswordPlaceholder')}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            value={value}
            onChangeText={onChange}
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

                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={
                    showConfirmPassword
                      ? t('auth.register.actions.hidePassword')
                      : t('auth.register.actions.showPassword')
                  }
                  onPress={() => setShowConfirmPassword((current) => !current)}
                  style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={isConfirmPasswordMatched ? '#2E7D32' : '#617167'}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        )}
      />

      <AuthPrimaryButton
        label={t('auth.register.actions.submit')}
        iconName="person-add-outline"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </AuthScaffold>
  );
}
