import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import '../global.css';
import { I18nManager, View, ActivityIndicator, LogBox } from 'react-native';
import {
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold
} from '@expo-google-fonts/ibm-plex-sans-arabic';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider, CurrencyProvider } from '../contexts';
import SplashScreen from '../components/SplashScreen';
import { ToastProvider } from '../components/ui/Toast';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore errors here — safe on iPad
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // زيادة staleTime إلى 15 دقيقة بدلاً من 5 — يبقى الـ cache صالح لفترة أطول
      staleTime: 15 * 60 * 1000,
      // إطالة عمر الكاش في الذاكرة إلى ساعة كاملة
      gcTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 1,
      // عند تحديث الـ query، أظهر البيانات القديمة فوراً لتفادي loading flash
      placeholderData: (prev: unknown) => prev as any,
    },
  },
});

// Suppress known harmless warnings on iPad
LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

try {
  I18nManager.allowRTL(true);
} catch (e) {
  console.warn('Failed to enable RTL:', e);
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontError, setFontError] = useState<Error | null>(null);
  const [loaded, error] = useFonts({
    IBMPlexSansArabic_400Regular,
    IBMPlexSansArabic_600SemiBold,
    IBMPlexSansArabic_700Bold,
  });

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      setFontError(error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded || fontError) {
      ExpoSplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, fontError]);

  const fontsReady = loaded || !!fontError;

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <CurrencyProvider>
              <ToastProvider>
                <KeyboardProvider>
                  <View style={{ flex: 1 }}>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        animation: 'fade',
                      }}
                    >
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen name="orders" options={{ headerShown: false }} />
                      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                      <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
                      <Stack.Screen name="addresses" options={{ headerShown: false }} />
                      <Stack.Screen name="address/add" options={{ headerShown: false }} />
                      <Stack.Screen name="wishlist" options={{ headerShown: false }} />
                      <Stack.Screen name="notifications" options={{ headerShown: false }} />
                      <Stack.Screen name="checkout" options={{ headerShown: false, gestureEnabled: false }} />
                      <Stack.Screen name="payment/wayl" options={{ headerShown: false, gestureEnabled: false }} />
                      <Stack.Screen name="search" options={{ headerShown: false }} />
                      <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
                    </Stack>

                    {!fontsReady && (
                      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E7D32', zIndex: 100 }}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                      </View>
                    )}

                    {fontsReady && showSplash && (
                      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}>
                        <SplashScreen onFinish={() => setShowSplash(false)} />
                      </View>
                    )}

                    <StatusBar style="auto" />
                  </View>
                </KeyboardProvider>
              </ToastProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
