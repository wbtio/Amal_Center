import { Alert, Text, TouchableOpacity } from 'react-native';
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

const buildLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('auth.loginValidation.invalidEmail')),
    password: z.string().min(6, t('auth.loginValidation.passwordMin')),
  });

type LoginFormData = { email: string; password: string };

export default function LoginScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = useMemo(() => buildLoginSchema(t), [language, t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const getErrorMessage = (error: string) => {
    if (error.includes('Invalid login credentials') || error.includes('Invalid email or password')) {
      return t('auth.loginErrors.invalidCredentials');
    }
    if (error.includes('Email not confirmed')) {
      return t('auth.loginErrors.emailNotConfirmed');
    }
    return t('auth.loginErrors.fallback');
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    setLoading(false);

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        Alert.alert(t('auth.emailConfirmTitle'), t('auth.emailConfirmMessage'));
      } else {
        Alert.alert(t('auth.loginErrorTitle'), getErrorMessage(error.message));
      }
      return;
    }

    router.replace('/(tabs)/profile');
  };

  return (
    <AuthScaffold
      title={t('auth.login')}
      subtitle={t('auth.loginSubtitle')}
      footer={
        <AuthSwitchPrompt
          prompt={t('auth.noAccount')}
          actionLabel={t('auth.createAccountNow')}
          onPress={() => router.push('/auth/register')}
        />
      }
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <AuthField
            label={t('auth.emailLabel')}
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
            label={t('auth.passwordLabel')}
            iconName="lock-closed-outline"
            error={errors.password?.message}
            placeholder={t('auth.passwordPlaceholder')}
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
                accessibilityLabel={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                onPress={() => setShowPassword((v) => !v)}
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

      <TouchableOpacity
        className="self-end mt-1 mb-3"
        onPress={() => router.push('/auth/forgot-password')}
        activeOpacity={0.7}
      >
        <Text className="font-ibm text-sm text-primary">{t('auth.forgotPassword')}</Text>
      </TouchableOpacity>

      <AuthPrimaryButton
        label={t('auth.loginAction')}
        iconName="log-in-outline"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </AuthScaffold>
  );
}
