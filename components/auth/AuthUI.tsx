import React, { ReactNode, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { COLORS } from '../../constants/app';
import { useLanguage } from '../../contexts';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AuthScaffoldProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  backAccessibilityLabel?: string;
}

interface AuthFieldProps extends TextInputProps {
  label: string;
  iconName: IconName;
  error?: string;
  helperText?: string;
  success?: boolean;
  forceLTR?: boolean;
  trailing?: ReactNode;
  textAlign?: 'left' | 'right' | 'center';
}

interface AuthPrimaryButtonProps {
  label: string;
  iconName: IconName;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface AuthSwitchPromptProps {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
}

export function AuthScaffold({
  title,
  subtitle,
  children,
  footer,
  backAccessibilityLabel,
}: AuthScaffoldProps) {
  const router = useRouter();
  const { isRTL } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={['#F7FBF7', '#EEF7EE', '#F9F3E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.safeArea}>
        <View style={[styles.headerRow, { paddingHorizontal: 20 }]}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={backAccessibilityLabel || (isRTL ? 'الرجوع' : 'Back')}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={22} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: insets.bottom + 16,
            },
          ]}
          bottomOffset={16}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.centerColumn}>
            <View style={styles.heroBlock}>
              <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{title}</Text>
              <Text style={[styles.subtitle, { textAlign: isRTL ? 'right' : 'left' }]}>{subtitle}</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.formStack}>{children}</View>
              {footer ? <View style={styles.footerWrap}>{footer}</View> : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

export function AuthField({
  label,
  iconName,
  error,
  helperText,
  success = false,
  forceLTR = false,
  trailing,
  textAlign,
  style,
  ...inputProps
}: AuthFieldProps) {
  const { isRTL } = useLanguage();
  const [focused, setFocused] = useState(false);

  const alignment = useMemo(() => {
    if (textAlign) return textAlign;
    if (forceLTR) return 'left';
    return isRTL ? 'right' : 'left';
  }, [forceLTR, isRTL, textAlign]);

  const borderColor = error ? COLORS.DANGER : success ? '#43A047' : focused ? COLORS.PRIMARY : '#D9E5D9';
  const iconBackground = error ? '#FDE8E8' : success || focused ? '#E8F5E9' : '#F2F6F2';
  const iconColor = error ? COLORS.DANGER : success ? '#2E7D32' : COLORS.PRIMARY;
  const helperColor = error ? COLORS.DANGER : success ? COLORS.SUCCESS : COLORS.TEXT_SECONDARY;
  const shellBackgroundColor = error ? '#FFF9F9' : success ? '#F7FCF7' : focused ? '#FCFEFC' : '#FDFDFD';

  return (
    <View style={styles.fieldBlock}>
      <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{label}</Text>

      <View
        style={[
          styles.fieldShell,
          {
            backgroundColor: shellBackgroundColor,
            borderColor,
            shadowOpacity: focused || success ? 0.05 : 0,
          },
        ]}
      >
        <View style={[styles.fieldInner, isRTL ? styles.rowReverse : styles.row]}>
          <View style={[styles.fieldIconWrap, { backgroundColor: iconBackground }]}>
            <Ionicons name={iconName} size={18} color={iconColor} />
          </View>

          <TextInput
            {...inputProps}
            style={[
              styles.input,
              {
                textAlign: alignment,
                writingDirection: forceLTR ? 'ltr' : isRTL ? 'rtl' : 'ltr',
              },
              style as StyleProp<TextStyle>,
            ]}
            placeholderTextColor="#93A49A"
            selectionColor={COLORS.PRIMARY}
            onFocus={(event) => {
              setFocused(true);
              inputProps.onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              inputProps.onBlur?.(event);
            }}
          />

          {trailing ? <View style={styles.trailingWrap}>{trailing}</View> : null}
        </View>
      </View>

      {error || helperText ? (
        <Text style={[styles.helperText, { color: helperColor, textAlign: isRTL ? 'right' : 'left' }]}>
          {error || helperText}
        </Text>
      ) : null}
    </View>
  );
}

export function AuthPrimaryButton({
  label,
  iconName,
  onPress,
  loading = false,
  disabled = false,
}: AuthPrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.buttonTouchable, isDisabled ? styles.buttonDisabled : null]}
    >
      <LinearGradient
        colors={['#2E7D32', '#256A2A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryButton}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <View style={styles.buttonContent}>
            <Ionicons name={iconName} size={18} color="#FFFFFF" />
            <Text style={styles.buttonText}>{label}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function AuthSwitchPrompt({ prompt, actionLabel, onPress }: AuthSwitchPromptProps) {
  const { isRTL } = useLanguage();

  return (
    <View style={[styles.switchPrompt, isRTL ? styles.rowReverse : styles.row]}>
      <Text style={styles.switchPromptText}>{prompt}</Text>
      <TouchableOpacity onPress={onPress} style={styles.switchPromptAction}>
        <Text style={styles.switchPromptActionText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function AuthNote({
  iconName,
  children,
  style,
}: {
  iconName: IconName;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { isRTL } = useLanguage();

  return (
    <View style={[styles.noteBox, style]}>
      <View style={[styles.noteRow, isRTL ? styles.rowReverse : styles.row]}>
        <View style={styles.noteIconWrap}>
          <Ionicons name={iconName} size={18} color={COLORS.PRIMARY} />
        </View>
        <View style={styles.noteTextWrap}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FBF7',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 4,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerColumn: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroBlock: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  title: {
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 26,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.06)',
    shadowColor: '#1B2A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  formStack: {
    gap: 16,
  },
  footerWrap: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F5F0',
  },
  fieldBlock: {
    gap: 6,
  },
  label: {
    color: '#435A47',
    fontFamily: 'IBMPlexSansArabic_600SemiBold',
    fontSize: 13,
    paddingHorizontal: 4,
  },
  fieldShell: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FDFDFD',
    shadowColor: '#29402B',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 1,
  },
  fieldInner: {
    alignItems: 'center',
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 12,
  },
  fieldIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 50,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 15,
    paddingVertical: 8,
  },
  trailingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  helperText: {
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  buttonTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 16,
  },
  switchPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  switchPromptText: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 14,
  },
  switchPromptAction: {
    minHeight: 32,
    justifyContent: 'center',
  },
  switchPromptActionText: {
    color: COLORS.PRIMARY,
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 14,
  },
  noteBox: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#F5F9F5',
    borderWidth: 1,
    borderColor: '#E3EFE4',
    marginBottom: 4,
  },
  noteRow: {
    alignItems: 'center',
    gap: 12,
  },
  noteIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  noteTextWrap: {
    flex: 1,
  },
});
