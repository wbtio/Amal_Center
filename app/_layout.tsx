import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import '../global.css';
import { I18nManager, View, ActivityIndicator } from 'react-native';
import {
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold
} from '@expo-google-fonts/ibm-plex-sans-arabic';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider, CurrencyProvider } from '../contexts';
import SplashScreen from '../components/SplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// إعداد أولي للاتجاه (لضمان تحميل التطبيق بالاتجاه الصحيح من البداية)
try {
  I18nManager.allowRTL(true);
} catch (e) {
  console.log(e);
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded, error] = useFonts({
    IBMPlexSansArabic_400Regular,
    IBMPlexSansArabic_600SemiBold,
    IBMPlexSansArabic_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [loaded]);

  // Always render the Stack navigator to maintain the navigation context.
  // Show splash/loading as overlays on top instead of conditional early returns.
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <CurrencyProvider>
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
                <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
                <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="addresses" options={{ headerShown: false }} />
                <Stack.Screen name="address/add" options={{ headerShown: false }} />
                <Stack.Screen name="wishlist" options={{ headerShown: false }} />
                <Stack.Screen name="notifications" options={{ headerShown: false }} />
                <Stack.Screen name="checkout" options={{ headerShown: false }} />
                <Stack.Screen name="search" options={{ headerShown: false }} />
                <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
              </Stack>

              {/* Loading overlay - shown while fonts are loading */}
              {!loaded && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E7D32', zIndex: 100 }}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              )}

              {/* Splash screen overlay - shown after fonts load */}
              {loaded && showSplash && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}>
                  <SplashScreen onFinish={() => setShowSplash(false)} />
                </View>
              )}
            </View>
          </CurrencyProvider>
        </LanguageProvider>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
