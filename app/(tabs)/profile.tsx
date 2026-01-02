import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Linking, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useLanguage, useCurrency } from '../../contexts';
import { User } from '@supabase/supabase-js';
import { APP_CONFIG } from '../../constants/app';

interface ProfileData {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { currency, setCurrency } = useCurrency();
  const { language, changeLanguage, t, isRTL } = useLanguage();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Initial fetch
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log(`Supabase auth event: ${event}`);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setUser(session?.user || null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            setUser(null);
            useCartStore.getState().clearCart();
            router.replace('/(tabs)');
          }
        }
      ]
    );
  };

  const openWhatsApp = () => {
    Linking.openURL(APP_CONFIG.WHATSAPP_URL);
  };

  // State for expandable sections - must be before any return
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator color="#2E7D32" size="large" />
        <Text className="mt-4 text-text-secondary font-cairo text-sm">
          {t('common.loading')}
        </Text>
      </View>
    );
  }

  // ===== Guest User View (Not Logged In) =====
  if (!user) {
    return (
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

          {/* Hero Section - Welcome - starts from top */}
          <View className="bg-primary px-4 pb-10" style={{ paddingTop: insets.top + 16, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
            <View className="items-center">
              {/* Avatar */}
              <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-4 border-2 border-white/30">
                <Ionicons name="person" size={40} color="#fff" />
              </View>
              
              <Text className="text-xl font-cairo-bold text-white mb-1 text-center">
                {t('profile.welcome')}
              </Text>
              <Text className="text-sm font-cairo text-white/80 text-center mb-5 px-4">
                {t('profile.welcomeMessage')}
              </Text>

              {/* Auth Buttons */}
              <View className="flex-row gap-3 w-full">
                <TouchableOpacity
                  className="flex-1 py-3 bg-white rounded-xl items-center"
                  onPress={() => router.push('/auth/login')}
                >
                  <Text className="text-primary font-cairo-bold text-base">{t('profile.login')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 py-3 bg-white/20 border border-white/40 rounded-xl items-center"
                  onPress={() => router.push('/auth/register')}
                >
                  <Text className="text-white font-cairo-bold text-base">
                    {t('profile.createAccount')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <View className={`p-4 flex-row items-center justify-between border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Ionicons name="language-outline" size={20} color="#2E7D32" style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                <Text className="text-sm font-cairo-bold text-text-primary">
                  {t('profile.language')}
                </Text>
              </View>
              <View className="flex-row bg-gray-100 rounded-lg p-1">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-md ${language === 'ar' ? 'bg-white' : ''}`}
                  onPress={() => changeLanguage('ar')}
                  style={{ shadowColor: language === 'ar' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: language === 'ar' ? 1 : 0 }}
                >
                  <Text className={`text-xs font-cairo-bold ${language === 'ar' ? 'text-primary' : 'text-gray-500'}`}>العربية</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-2 rounded-md ${language === 'en' ? 'bg-white' : ''}`}
                  onPress={() => changeLanguage('en')}
                  style={{ shadowColor: language === 'en' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: language === 'en' ? 1 : 0 }}
                >
                  <Text className={`text-xs font-cairo-bold ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>Eng</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Ionicons name="cash-outline" size={20} color="#2E7D32" style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                <Text className="text-sm font-cairo-bold text-text-primary">
                  {t('profile.currency')}
                </Text>
              </View>
              <View className="flex-row bg-gray-100 rounded-lg p-1">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-md ${currency === 'IQD' ? 'bg-white' : ''}`}
                  onPress={() => setCurrency('IQD')}
                  style={{ shadowColor: currency === 'IQD' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: currency === 'IQD' ? 1 : 0 }}
                >
                  <Text className={`text-xs font-cairo-bold ${currency === 'IQD' ? 'text-primary' : 'text-gray-500'}`}>د.ع</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-2 rounded-md ${currency === 'USD' ? 'bg-white' : ''}`}
                  onPress={() => setCurrency('USD')}
                  style={{ shadowColor: currency === 'USD' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: currency === 'USD' ? 1 : 0 }}
                >
                  <Text className={`text-xs font-cairo-bold ${currency === 'USD' ? 'text-primary' : 'text-gray-500'}`}>USD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Help & Support - Expandable */}
          <View className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <TouchableOpacity 
              className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
              onPress={() => setHelpExpanded(!helpExpanded)}
              activeOpacity={0.7}
            >
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <View className="w-9 h-9 bg-blue-50 rounded-full items-center justify-center" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>
                  <Ionicons name="help-circle-outline" size={20} color="#2196F3" />
                </View>
                <Text className="font-cairo-bold text-base text-text-primary">{t('profile.helpAndSupport')}</Text>
              </View>
              <Ionicons name={helpExpanded ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            {helpExpanded && (
              <View className="px-4 pb-3 border-t border-gray-100">
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => router.push('/help/faq')}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.faq')}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => router.push('/help/contact')}>
                  <Ionicons name="call-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.contactUs')}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={openWhatsApp}>
                  <Ionicons name="logo-whatsapp" size={18} color="#25D366" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.whatsapp')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Terms & Policies - Expandable */}
          <View className="mx-4 mt-3 mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <TouchableOpacity 
              className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
              onPress={() => setTermsExpanded(!termsExpanded)}
              activeOpacity={0.7}
            >
              <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <View className="w-9 h-9 bg-orange-50 rounded-full items-center justify-center" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>
                  <Ionicons name="document-text-outline" size={20} color="#FF9800" />
                </View>
                <Text className="font-cairo-bold text-base text-text-primary">{t('profile.termsAndPolicies')}</Text>
              </View>
              <Ionicons name={termsExpanded ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            {termsExpanded && (
              <View className="px-4 pb-3 border-t border-gray-100">
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.TERMS_URL)}>
                  <Ionicons name="reader-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.terms')}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.PRIVACY_URL)}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.privacy')}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.RETURN_POLICY_URL)}>
                  <Ionicons name="refresh-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                  <Text className="font-cairo text-sm text-text-secondary">{t('profile.returnPolicy')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* App Version */}
          <Text className="text-center text-gray-400 font-cairo text-xs mb-6">v{APP_CONFIG.VERSION}</Text>
        </ScrollView>
      </View>
    );
  }

  // ===== Logged In User View =====
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* Hero Section - User Profile - starts from top */}
        <View className="bg-primary px-4 pb-8" style={{ paddingTop: insets.top + 16, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
          <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                className="w-16 h-16 rounded-full border-2 border-white/40"
                style={{ marginRight: isRTL ? 0 : 14, marginLeft: isRTL ? 14 : 0 }}
              />
            ) : (
              <View className="w-16 h-16 rounded-full items-center justify-center bg-white/20 border-2 border-white/40" style={{ marginRight: isRTL ? 0 : 14, marginLeft: isRTL ? 14 : 0 }}>
                <Text className="font-cairo-bold text-2xl text-white">
                  {(profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
                </Text>
              </View>
            )}
            
            {/* User Info */}
            <View className={`flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
              <Text className={`font-cairo-bold text-lg text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
              </Text>
              <Text className={`font-cairo text-sm text-white/70 ${isRTL ? 'text-right' : 'text-left'}`}>
                {user.email}
              </Text>
            </View>

            {/* Edit & Logout Buttons */}
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                onPress={() => router.push('/profile/edit')}
              >
                <Ionicons name="pencil-outline" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-red-500/80 items-center justify-center"
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-4 -mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 }}>
          <View className="flex-row">
            <QuickAction icon="cube-outline" title={t('profile.orders')} onPress={() => router.push('/orders')} />
            <QuickAction icon="location-outline" title={t('profile.addresses')} onPress={() => router.push('/addresses')} />
            <QuickAction icon="heart-outline" title={t('profile.wishlist')} onPress={() => router.push('/wishlist')} />
            <QuickAction icon="notifications-outline" title={t('profile.notifications')} onPress={() => router.push('/notifications')} isLast />
          </View>
        </View>

        {/* Settings Section */}
        <View className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <View className={`p-4 flex-row items-center justify-between border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Ionicons name="language-outline" size={20} color="#2E7D32" style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
              <Text className="text-sm font-cairo-bold text-text-primary">{t('profile.language')}</Text>
            </View>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                className={`px-4 py-2 rounded-md ${language === 'ar' ? 'bg-white' : ''}`}
                onPress={() => changeLanguage('ar')}
                style={{ shadowColor: language === 'ar' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: language === 'ar' ? 1 : 0 }}
              >
                <Text className={`text-xs font-cairo-bold ${language === 'ar' ? 'text-primary' : 'text-gray-500'}`}>العربية</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-4 py-2 rounded-md ${language === 'en' ? 'bg-white' : ''}`}
                onPress={() => changeLanguage('en')}
                style={{ shadowColor: language === 'en' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: language === 'en' ? 1 : 0 }}
              >
                <Text className={`text-xs font-cairo-bold ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>Eng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Ionicons name="cash-outline" size={20} color="#2E7D32" style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
              <Text className="text-sm font-cairo-bold text-text-primary">{t('profile.currency')}</Text>
            </View>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                className={`px-4 py-2 rounded-md ${currency === 'IQD' ? 'bg-white' : ''}`}
                onPress={() => setCurrency('IQD')}
                style={{ shadowColor: currency === 'IQD' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: currency === 'IQD' ? 1 : 0 }}
              >
                <Text className={`text-xs font-cairo-bold ${currency === 'IQD' ? 'text-primary' : 'text-gray-500'}`}>د.ع</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-4 py-2 rounded-md ${currency === 'USD' ? 'bg-white' : ''}`}
                onPress={() => setCurrency('USD')}
                style={{ shadowColor: currency === 'USD' ? '#000' : 'transparent', shadowOpacity: 0.05, shadowRadius: 2, elevation: currency === 'USD' ? 1 : 0 }}
              >
                <Text className={`text-xs font-cairo-bold ${currency === 'USD' ? 'text-primary' : 'text-gray-500'}`}>USD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Help & Support - Expandable */}
        <View className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <TouchableOpacity 
            className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
            onPress={() => setHelpExpanded(!helpExpanded)}
            activeOpacity={0.7}
          >
            <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className="w-9 h-9 bg-blue-50 rounded-full items-center justify-center" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>
                <Ionicons name="help-circle-outline" size={20} color="#2196F3" />
              </View>
              <Text className="font-cairo-bold text-base text-text-primary">{t('profile.helpAndSupport')}</Text>
            </View>
            <Ionicons name={helpExpanded ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          {helpExpanded && (
            <View className="px-4 pb-3 border-t border-gray-100">
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => router.push('/help/faq')}>
                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.faq')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => router.push('/help/contact')}>
                <Ionicons name="call-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.contactUs')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={openWhatsApp}>
                <Ionicons name="logo-whatsapp" size={18} color="#25D366" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.whatsapp')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Terms & Policies - Expandable */}
        <View className="mx-4 mt-3 mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <TouchableOpacity 
            className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
            onPress={() => setTermsExpanded(!termsExpanded)}
            activeOpacity={0.7}
          >
            <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <View className="w-9 h-9 bg-orange-50 rounded-full items-center justify-center" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>
                <Ionicons name="document-text-outline" size={20} color="#FF9800" />
              </View>
              <Text className="font-cairo-bold text-base text-text-primary">{t('profile.termsAndPolicies')}</Text>
            </View>
            <Ionicons name={termsExpanded ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          {termsExpanded && (
            <View className="px-4 pb-3 border-t border-gray-100">
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.TERMS_URL)}>
                <Ionicons name="reader-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.terms')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.PRIVACY_URL)}>
                <Ionicons name="shield-checkmark-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.privacy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`py-3 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`} onPress={() => Linking.openURL(APP_CONFIG.RETURN_POLICY_URL)}>
                <Ionicons name="refresh-outline" size={18} color="#757575" style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }} />
                <Text className="font-cairo text-sm text-text-secondary">{t('profile.returnPolicy')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* App Version */}
        <Text className="text-center text-gray-400 font-cairo text-xs mb-6">v{APP_CONFIG.VERSION}</Text>
      </ScrollView>
    </View>
  );
}

// Quick Action Component for logged-in user
const QuickAction = ({ icon, title, onPress, isLast = false }: {
  icon: any,
  title: string,
  onPress: () => void,
  isLast?: boolean
}) => {
  return (
    <TouchableOpacity
      className={`flex-1 py-4 items-center ${!isLast ? 'border-r border-gray-100' : ''}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
        <Ionicons name={icon} size={20} color="#2E7D32" />
      </View>
      <Text className="font-cairo text-xs text-text-secondary text-center" numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

// Menu Item Component
const MenuItem = ({ icon, title, value, onPress, isLast = false }: {
  icon: any,
  title: string,
  value?: string,
  onPress: () => void,
  isLast?: boolean
}) => {
  const { isRTL } = useLanguage();
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-gray-100' : ''} active:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
      onPress={onPress}
    >
      <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <View
          className="w-9 h-9 bg-primary/10 rounded-full items-center justify-center"
          style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
        >
          <Ionicons name={icon} size={20} color="#2E7D32" />
        </View>
        <Text className="font-cairo text-text-primary text-base">{title}</Text>
      </View>

      <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        {value && <Text className="font-cairo text-text-secondary mx-2 text-sm">{value}</Text>}
        <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={18} color="#ccc" />
      </View>
    </TouchableOpacity>
  );
};

// Settings Link Component
const SettingsLink = ({ title, onPress }: { title: string, onPress: () => void }) => {
  const { isRTL } = useLanguage();
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-3 rounded-lg active:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
      onPress={onPress}
    >
      <Text className="text-sm font-cairo text-text-secondary">{title}</Text>
      <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={16} color="#ccc" />
    </TouchableOpacity>
  );
};
