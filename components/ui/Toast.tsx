import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type AlertButtons = Parameters<typeof Alert.alert>[2];
type AlertOptions = Parameters<typeof Alert.alert>[3];
type AlertButton = NonNullable<AlertButtons>[number];

interface ToastData {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface DialogData {
  title?: string;
  message?: string;
  type?: ToastType;
  buttons?: AlertButtons;
  options?: AlertOptions;
}

let _showToast: ((data: ToastData) => void) | null = null;
let _showDialog: ((data: DialogData) => void) | null = null;

const ARABIC_TEXT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const LATIN_TEXT_REGEX = /[A-Za-z]/;

const TYPE_KEYWORDS: Record<ToastType, string[]> = {
  success: ['success', 'done', 'saved', 'created', 'updated', 'added', 'deleted', 'removed', 'sent', 'verified', 'تم', 'نجح', 'نجاح', 'اكتمل', 'تمت', 'تمّ'],
  error: ['error', 'failed', 'invalid', 'expired', 'unable', 'required', 'empty', 'خطأ', 'فشل', 'تعذر', 'غير صحيح', 'منتهي', 'مطلوب'],
  warning: ['warning', 'alert', 'confirm', 'delete', 'clear', 'تنبيه', 'تحذير', 'تأكيد', 'حذف', 'مسح'],
  info: ['info', 'notice', 'معلومة', 'إشعار'],
};

export function showToast(message: string, type: ToastType = 'success', duration: number = 2200) {
  _showToast?.({ message, type, duration });
}

export function showAppToast(data: ToastData) {
  _showToast?.(data);
}

export function showAppDialog(data: DialogData) {
  _showDialog?.(data);
}

function inferNotificationType(
  title?: string,
  message?: string,
  buttons?: AlertButtons,
): ToastType {
  if (buttons?.some((button) => button?.style === 'destructive')) {
    return 'warning';
  }

  const haystack = `${title ?? ''} ${message ?? ''}`.toLowerCase();

  if (TYPE_KEYWORDS.error.some((keyword) => haystack.includes(keyword))) {
    return 'error';
  }

  if (TYPE_KEYWORDS.warning.some((keyword) => haystack.includes(keyword))) {
    return 'warning';
  }

  if (TYPE_KEYWORDS.success.some((keyword) => haystack.includes(keyword))) {
    return 'success';
  }

  return 'info';
}

function normalizeToastData(title?: string, message?: string, type: ToastType = 'info'): ToastData {
  if (message?.trim()) {
    return {
      title: title?.trim() || undefined,
      message: message.trim(),
      type,
    };
  }

  return {
    message: title?.trim() || '',
    type,
  };
}

function resolveTextDirection(text?: string, fallbackRTL: boolean = false) {
  const value = text?.trim() || '';

  if (ARABIC_TEXT_REGEX.test(value)) {
    return {
      textAlign: 'right' as const,
      writingDirection: 'rtl' as const,
    };
  }

  if (LATIN_TEXT_REGEX.test(value)) {
    return {
      textAlign: 'left' as const,
      writingDirection: 'ltr' as const,
    };
  }

  return {
    textAlign: fallbackRTL ? ('right' as const) : ('left' as const),
    writingDirection: fallbackRTL ? ('rtl' as const) : ('ltr' as const),
  };
}

function resolveContentRTL(primaryText?: string, secondaryText?: string, fallbackRTL: boolean = false) {
  const combined = `${primaryText ?? ''} ${secondaryText ?? ''}`.trim();

  if (ARABIC_TEXT_REGEX.test(combined)) {
    return true;
  }

  if (LATIN_TEXT_REGEX.test(combined)) {
    return false;
  }

  return fallbackRTL;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const { isRTL, language } = useLanguage();

  const toastTranslateY = useRef(new Animated.Value(-120)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(320)).current;
  const sheetOpacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [toast, setToast] = useState<ToastData | null>(null);
  const [dialog, setDialog] = useState<DialogData | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getConfig = useCallback((type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        return {
          accent: '#2E7D32',
          soft: '#F7FBF7',
          border: '#D8EAD9',
          icon: 'checkmark-circle' as const,
        };
      case 'error':
        return {
          accent: '#C62828',
          soft: '#FFF7F7',
          border: '#F2D7D7',
          icon: 'close-circle' as const,
        };
      case 'warning':
        return {
          accent: '#C17A12',
          soft: '#FFF9EF',
          border: '#F2E0BA',
          icon: 'warning' as const,
        };
      case 'info':
      default:
        return {
          accent: '#1976D2',
          soft: '#F5FAFF',
          border: '#D6E7F8',
          icon: 'information-circle' as const,
        };
    }
  }, []);

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(toastTranslateY, {
        toValue: -120,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToast(null);
    });
  }, [toastOpacity, toastTranslateY]);

  const showToastCard = useCallback(
    (data: ToastData) => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      setToast(data);
      toastTranslateY.setValue(-120);
      toastOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(toastTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 90,
          friction: 11,
        }),
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      toastTimeoutRef.current = setTimeout(() => {
        hideToast();
      }, data.duration || 2200);
    },
    [hideToast, toastOpacity, toastTranslateY],
  );

  const closeDialog = useCallback(
    (afterClose?: () => void) => {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 320,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(sheetOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDialog(null);
        afterClose?.();
      });
    },
    [backdropOpacity, sheetOpacity, sheetTranslateY],
  );

  const showDialogCard = useCallback(
    (data: DialogData) => {
      setDialog(data);
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(320);
      sheetOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(sheetTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 90,
          friction: 12,
        }),
        Animated.timing(sheetOpacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [backdropOpacity, sheetOpacity, sheetTranslateY],
  );

  useEffect(() => {
    _showToast = showToastCard;
    _showDialog = showDialogCard;

    const originalAlert = Alert.alert;

    Alert.alert = (title, message, buttons, options) => {
      const type = inferNotificationType(title, message, buttons);
      const hasActions = Array.isArray(buttons) && buttons.length > 0;

      if (hasActions) {
        showDialogCard({
          title,
          message,
          buttons,
          options,
          type,
        });
        return;
      }

      showToastCard(normalizeToastData(title, message, type));
    };

    return () => {
      _showToast = null;
      _showDialog = null;
      Alert.alert = originalAlert;

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [showDialogCard, showToastCard]);

  const toastConfig = useMemo(() => getConfig(toast?.type), [getConfig, toast?.type]);
  const dialogConfig = useMemo(() => getConfig(dialog?.type), [dialog?.type, getConfig]);

  const dialogButtons = useMemo<AlertButton[]>(
    () =>
      dialog?.buttons?.length
        ? dialog.buttons
        : [
            {
              text: language === 'ar' ? 'حسناً' : 'OK',
            },
          ],
    [dialog?.buttons, language],
  );

  const getDirectionalTextStyle = useCallback(
    (text?: string) => resolveTextDirection(text, isRTL),
    [isRTL],
  );

  const toastLayoutRTL = useMemo(
    () => resolveContentRTL(toast?.title, toast?.message, isRTL),
    [isRTL, toast?.message, toast?.title],
  );

  const dialogLayoutRTL = useMemo(
    () => resolveContentRTL(dialog?.title, dialog?.message, isRTL),
    [dialog?.message, dialog?.title, isRTL],
  );

  const handleBackdropPress = useCallback(() => {
    if (!dialog?.options?.cancelable) {
      return;
    }

    closeDialog(() => {
      dialog.options?.onDismiss?.();
    });
  }, [closeDialog, dialog]);

  return (
    <View style={styles.root}>
      {children}

      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toastContainer,
            {
              top: insets.top + 12,
              backgroundColor: toastConfig.soft,
              borderColor: toastConfig.border,
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <View
            style={[
              styles.accentBar,
              toastLayoutRTL
                ? { right: 0, left: undefined, borderTopRightRadius: 20, borderBottomRightRadius: 20 }
                : { left: 0, right: undefined, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
              { backgroundColor: toastConfig.accent },
            ]}
          />

          <View style={[styles.toastRow, toastLayoutRTL ? styles.rowReverse : styles.row]}>
            <View style={[styles.iconBubble, { backgroundColor: `${toastConfig.accent}18` }]}>
              <Ionicons name={toastConfig.icon} size={22} color={toastConfig.accent} />
            </View>

            <View style={styles.toastTextWrap}>
              {toast.title ? (
                <Text style={[styles.toastTitle, getDirectionalTextStyle(toast.title)]}>
                  {toast.title}
                </Text>
              ) : null}
              <Text style={[styles.toastMessage, getDirectionalTextStyle(toast.message)]}>
                {toast.message}
              </Text>
            </View>
          </View>
        </Animated.View>
      ) : null}

      <Modal
        transparent
        visible={!!dialog}
        animationType="none"
        onRequestClose={handleBackdropPress}
      >
        <View style={styles.modalRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
          </Pressable>

          {dialog ? (
            <Animated.View
              style={[
                styles.sheet,
                {
                  paddingBottom: insets.bottom + 18,
                  backgroundColor: dialogConfig.soft,
                  borderColor: dialogConfig.border,
                  opacity: sheetOpacity,
                  transform: [{ translateY: sheetTranslateY }],
                },
              ]}
            >
              <View style={[styles.sheetHeader, dialogLayoutRTL ? styles.rowReverse : styles.row]}>
                <View style={[styles.sheetIconWrap, { backgroundColor: `${dialogConfig.accent}18` }]}>
                  <Ionicons name={dialogConfig.icon} size={26} color={dialogConfig.accent} />
                </View>

                <View style={styles.sheetTextWrap}>
                  {dialog.title ? (
                    <Text style={[styles.sheetTitle, getDirectionalTextStyle(dialog.title)]}>
                      {dialog.title}
                    </Text>
                  ) : null}

                  {dialog.message ? (
                    <Text style={[styles.sheetMessage, getDirectionalTextStyle(dialog.message)]}>
                      {dialog.message}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.sheetActions}>
                {dialogButtons.map((button, index) => {
                  const isDestructive = button.style === 'destructive';
                  const isCancel = button.style === 'cancel';
                  const buttonText = button.text || (language === 'ar' ? 'حسناً' : 'OK');

                  return (
                    <TouchableOpacity
                      key={`${buttonText}-${index}`}
                      activeOpacity={0.86}
                      onPress={() =>
                        closeDialog(() => {
                          button.onPress?.();
                        })
                      }
                      style={[
                        styles.sheetButton,
                        isCancel ? styles.sheetButtonSecondary : null,
                        isDestructive
                          ? { borderColor: '#F0C7C7', backgroundColor: '#FFF5F5' }
                          : { borderColor: dialogConfig.border, backgroundColor: '#FFFFFF' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sheetButtonText,
                          getDirectionalTextStyle(buttonText),
                          isCancel ? { color: '#526257' } : null,
                          isDestructive ? { color: '#C62828' } : { color: dialogConfig.accent },
                        ]}
                      >
                        {buttonText}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  toastContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#17341B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 10,
    zIndex: 9999,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
  },
  toastRow: {
    alignItems: 'center',
    gap: 12,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastTextWrap: {
    flex: 1,
    gap: 2,
  },
  toastTitle: {
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 14,
    color: '#1F2D21',
  },
  toastMessage: {
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 13,
    lineHeight: 20,
    color: '#526257',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.36)',
  },
  sheet: {
    marginHorizontal: 14,
    marginBottom: 12,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 20,
  },
  sheetHeader: {
    alignItems: 'flex-start',
    gap: 12,
  },
  sheetIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTextWrap: {
    flex: 1,
    gap: 6,
  },
  sheetTitle: {
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 17,
    color: '#1C251D',
  },
  sheetMessage: {
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#526257',
  },
  sheetActions: {
    marginTop: 18,
    gap: 10,
  },
  sheetButton: {
    minHeight: 50,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  sheetButtonSecondary: {
    backgroundColor: '#FFFFFF',
  },
  sheetButtonText: {
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 15,
  },
});
