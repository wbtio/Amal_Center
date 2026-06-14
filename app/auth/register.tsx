import { Alert, BackHandler, Linking, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import * as z from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import {
  AuthField,
  AuthPrimaryButton,
  AuthScaffold,
  AuthSwitchPrompt,
} from '../../components/auth/AuthUI';
import { useLanguage } from '../../contexts';
import { APP_CONFIG } from '../../constants/app';

const TOTAL_STEPS = 3;

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

const STEP_KEYS = [
  { title: 'auth.register.step1Title', subtitle: 'auth.register.step1Subtitle' },
  { title: 'auth.register.step2Title', subtitle: 'auth.register.step2Subtitle' },
  { title: 'auth.register.step3Title', subtitle: 'auth.register.step3Subtitle' },
];

function StepIndicator({ step }: { step: number }) {
  return (
    <View style={stepStyles.row}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            stepStyles.dot,
            { width: i === step ? 28 : 8, backgroundColor: i <= step ? '#2E7D32' : '#E0E0E0' },
          ]}
        />
      ))}
    </View>
  );
}

const stepStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});

const getRegisterErrorMessage = (error: string, t: (key: string, options?: object) => string) => {
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
  return `${t('auth.register.errors.fallbackPrefix')}: ${error}`;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const registerSchema = useMemo(() => buildRegisterSchema(t), [language, t]);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', phone: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const isConfirmPasswordMatched =
    confirmPasswordValue.trim().length >= 6 && confirmPasswordValue === passwordValue;

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (step > 1) {
        setStep((s) => s - 1);
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [step]);

  const handleNext = async () => {
    let valid = false;
    if (step === 1) valid = await trigger('fullName');
    else if (step === 2) valid = await trigger('phone');
    if (valid) setStep((s) => s + 1);
  };

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
        const errorMsg = getRegisterErrorMessage(authError.message, t);
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

      if (authData.session) {
        // تأكيد الإيميل معطّل → الجلسة جاهزة، ندخل مباشرة
        Alert.alert(t('auth.register.alerts.successTitle'), t('auth.register.alerts.successMessage'), [
          { text: t('auth.register.alerts.okAction'), onPress: () => router.replace('/(tabs)/profile') },
        ]);
      } else if (authData.user) {
        // مسار احتياطي: لو أُعيد تفعيل تأكيد الإيميل على الخادم
        Alert.alert(
          t('auth.register.alerts.accountCreatedTitle'),
          t('auth.register.alerts.accountCreatedWithoutEmailConfirmation'),
          [{ text: t('auth.register.alerts.loginAction'), onPress: () => router.replace('/auth/login') }]
        );
      }
    } catch {
      setLoading(false);
      Alert.alert(t('auth.register.alerts.errorTitle'), t('auth.register.alerts.unexpectedError'));
    }
  };

  const stepTitle = t(STEP_KEYS[step - 1].title);
  const stepSubtitle = t(STEP_KEYS[step - 1].subtitle);

  return (
    <AuthScaffold
      title={stepTitle}
      subtitle={stepSubtitle}
      onBack={handleBack}
      backAccessibilityLabel={t('auth.back')}
      footer={
        step === 1 ? (
          <AuthSwitchPrompt
            prompt={t('auth.register.actions.footerPrompt')}
            actionLabel={t('auth.register.actions.footerAction')}
            onPress={() => router.push('/auth/login')}
          />
        ) : undefined
      }
    >
      <StepIndicator step={step} />

      {/* Step 1: Full Name */}
      {step === 1 && (
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
      )}

      {/* Step 2: Phone */}
      {step === 2 && (
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
      )}

      {/* Step 3: Email + Password + Confirm */}
      {step === 3 && (
        <>
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
                      showPassword
                        ? t('auth.register.actions.hidePassword')
                        : t('auth.register.actions.showPassword')
                    }
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
                      onPress={() => setShowConfirmPassword((v) => !v)}
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

          <TouchableOpacity
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
                backgroundColor: agreedToTerms ? '#2E7D32' : 'transparent',
                borderColor: agreedToTerms ? '#2E7D32' : '#D1D5DB',
              }}
            >
              {agreedToTerms && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text
              style={{
                fontFamily: 'IBMPlexSansArabic_400Regular',
                fontSize: 12,
                color: '#617167',
                flex: 1,
                lineHeight: 20,
              }}
            >
              {language === 'ar' ? (
                <>
                  {'أوافق على '}
                  <Text
                    style={{ color: '#2E7D32', fontFamily: 'IBMPlexSansArabic_700Bold' }}
                    onPress={() => Linking.openURL(APP_CONFIG.TERMS_OF_SERVICE_URL)}
                  >
                    شروط الاستخدام
                  </Text>
                  {' و '}
                  <Text
                    style={{ color: '#2E7D32', fontFamily: 'IBMPlexSansArabic_700Bold' }}
                    onPress={() => Linking.openURL(APP_CONFIG.PRIVACY_POLICY_URL)}
                  >
                    سياسة الخصوصية
                  </Text>
                </>
              ) : (
                <>
                  {'I agree to the '}
                  <Text
                    style={{ color: '#2E7D32', fontFamily: 'IBMPlexSansArabic_700Bold' }}
                    onPress={() => Linking.openURL(APP_CONFIG.TERMS_OF_SERVICE_URL)}
                  >
                    Terms of Service
                  </Text>
                  {' and '}
                  <Text
                    style={{ color: '#2E7D32', fontFamily: 'IBMPlexSansArabic_700Bold' }}
                    onPress={() => Linking.openURL(APP_CONFIG.PRIVACY_POLICY_URL)}
                  >
                    Privacy Policy
                  </Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Primary action button */}
      {step < TOTAL_STEPS ? (
        <AuthPrimaryButton
          label={t('common.next')}
          iconName="arrow-forward-outline"
          onPress={handleNext}
          loading={false}
        />
      ) : (
        <AuthPrimaryButton
          label={t('auth.register.actions.submit')}
          iconName="person-add-outline"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={!agreedToTerms}
        />
      )}

      {/* Go back to previous step (steps 2 and 3) */}
      {step > 1 && (
        <TouchableOpacity
          onPress={handleBack}
          style={{ alignItems: 'center', paddingVertical: 12 }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              fontFamily: 'IBMPlexSansArabic_400Regular',
              fontSize: 14,
              color: '#617167',
            }}
          >
            {t('common.previous')}
          </Text>
        </TouchableOpacity>
      )}
    </AuthScaffold>
  );
}
