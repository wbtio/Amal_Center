import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';
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
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator color="#2E7D32" size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primary" style={{ paddingTop: insets.top + 20, paddingBottom: 40 }}>
            <View className="items-center px-6">
              <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
                <Ionicons name="person-outline" size={48} color="#fff" />
              </View>
              <Text className="text-2xl font-cairo-bold text-white mb-2">
                {t('profile.welcome')}
              </Text>
              <Text className="text-sm font-cairo text-white/90 text-center mb-6">
                {t('profile.welcomeMessage')}
              </Text>
              <View className="flex-row gap-3 w-full">
                <TouchableOpacity
                  className="flex-1 py-3.5 bg-white rounded-xl"
                  onPress={() => router.push('/auth/login')}
                  activeOpacity={0.8}
                >
                  <Text className="text-primary font-cairo-bold text-base text-center">
                    {t('profile.login')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-3.5 bg-white/20 rounded-xl border border-white/30"
                  onPress={() => router.push('/auth/register')}
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-cairo-bold text-base text-center">
                    {t('profile.createAccount')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="px-4 py-4">
            <View className="bg-white rounded-2xl overflow-hidden mb-3">
              <SettingRow
                icon="language-outline"
                title={t('profile.language')}
                value={
                  <View className="flex-row bg-gray-100 rounded-lg p-1">
                    <TouchableOpacity
                      className={`px-4 py-1.5 rounded-md ${language === 'ar' ? 'bg-white' : ''}`}
                      onPress={() => changeLanguage('ar')}
                    >
                      <Text className={`text-sm font-cairo-bold ${language === 'ar' ? 'text-primary' : 'text-gray-500'}`}>
                        العربية
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`px-4 py-1.5 rounded-md ${language === 'en' ? 'bg-white' : ''}`}
                      onPress={() => changeLanguage('en')}
                    >
                      <Text className={`text-sm font-cairo-bold ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>
                        English
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
              <View className="h-px bg-gray-100 mx-4" />
              <SettingRow
                icon="cash-outline"
                title={t('profile.currency')}
                value={
                  <View className="flex-row bg-gray-100 rounded-lg p-1">
                    <TouchableOpacity
                      className={`px-4 py-1.5 rounded-md ${currency === 'IQD' ? 'bg-white' : ''}`}
                      onPress={() => setCurrency('IQD')}
                    >
                      <Text className={`text-sm font-cairo-bold ${currency === 'IQD' ? 'text-primary' : 'text-gray-500'}`}>
                        د.ع
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`px-4 py-1.5 rounded-md ${currency === 'USD' ? 'bg-white' : ''}`}
                      onPress={() => setCurrency('USD')}
                    >
                      <Text className={`text-sm font-cairo-bold ${currency === 'USD' ? 'text-primary' : 'text-gray-500'}`}>
                        USD
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>

            <View className="bg-white rounded-2xl overflow-hidden mb-3">
              <MenuButton
                icon="help-circle-outline"
                title={t('profile.helpAndSupport')}
                onPress={() => router.push('/help/faq')}
                iconBg="bg-blue-50"
                iconColor="#2196F3"
              />
              <View className="h-px bg-gray-100 mx-4" />
              <MenuButton
                icon="logo-whatsapp"
                title={t('profile.whatsapp')}
                onPress={openWhatsApp}
                iconBg="bg-green-50"
                iconColor="#25D366"
              />
            </View>

            <Text className="text-center text-gray-400 font-cairo text-xs mt-4">
              v{APP_CONFIG.VERSION}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-primary" style={{ paddingTop: insets.top + 20, paddingBottom: 24 }}>
          <View className={`px-4 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                className="w-20 h-20 rounded-full"
                style={{ marginRight: isRTL ? 0 : 14, marginLeft: isRTL ? 14 : 0 }}
              />
            ) : (
              <View
                className="w-20 h-20 rounded-full bg-white/20 items-center justify-center"
                style={{ marginRight: isRTL ? 0 : 14, marginLeft: isRTL ? 14 : 0 }}
              >
                <Text className="font-cairo-bold text-3xl text-white">
                  {(profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
                </Text>
              </View>
            )}
            <View className="flex-1">
              <Text className={`font-cairo-bold text-lg text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
              </Text>
              <Text className={`font-cairo text-sm text-white/85 ${isRTL ? 'text-right' : 'text-left'} mt-1`}>
                {user.email}
              </Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => router.push('/profile/edit')}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 py-3">
          <View className="bg-white rounded-2xl overflow-hidden mb-3">
            <View className="flex-row">
              <ActionCard
                icon="receipt-outline"
                title={t('profile.orders')}
                onPress={() => router.push('/orders')}
              />
              <ActionCard
                icon="location-outline"
                title={t('profile.addresses')}
                onPress={() => router.push('/addresses')}
              />
              <ActionCard
                icon="heart-outline"
                title={t('profile.wishlist')}
                onPress={() => router.push('/wishlist')}
                isLast
              />
            </View>
          </View>

          <View className="bg-white rounded-2xl overflow-hidden mb-3">
            <SettingRow
              icon="language-outline"
              title={t('profile.language')}
              value={
                <View className="flex-row bg-gray-100 rounded-lg p-1">
                  <TouchableOpacity
                    className={`px-4 py-1.5 rounded-md ${language === 'ar' ? 'bg-white' : ''}`}
                    onPress={() => changeLanguage('ar')}
                  >
                    <Text className={`text-sm font-cairo-bold ${language === 'ar' ? 'text-primary' : 'text-gray-500'}`}>
                      العربية
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`px-4 py-1.5 rounded-md ${language === 'en' ? 'bg-white' : ''}`}
                    onPress={() => changeLanguage('en')}
                  >
                    <Text className={`text-sm font-cairo-bold ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>
                      English
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
            <View className="h-px bg-gray-100 mx-4" />
            <SettingRow
              icon="cash-outline"
              title={t('profile.currency')}
              value={
                <View className="flex-row bg-gray-100 rounded-lg p-1">
                  <TouchableOpacity
                    className={`px-4 py-1.5 rounded-md ${currency === 'IQD' ? 'bg-white' : ''}`}
                    onPress={() => setCurrency('IQD')}
                  >
                    <Text className={`text-sm font-cairo-bold ${currency === 'IQD' ? 'text-primary' : 'text-gray-500'}`}>
                      د.ع
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`px-4 py-1.5 rounded-md ${currency === 'USD' ? 'bg-white' : ''}`}
                    onPress={() => setCurrency('USD')}
                  >
                    <Text className={`text-sm font-cairo-bold ${currency === 'USD' ? 'text-primary' : 'text-gray-500'}`}>
                      USD
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>

          <View className="bg-white rounded-2xl overflow-hidden mb-3">
            <MenuButton
              icon="help-circle-outline"
              title={t('profile.helpAndSupport')}
              onPress={() => router.push('/help/faq')}
              iconBg="bg-blue-50"
              iconColor="#2196F3"
            />
            <View className="h-px bg-gray-100 mx-4" />
            <MenuButton
              icon="logo-whatsapp"
              title={t('profile.whatsapp')}
              onPress={openWhatsApp}
              iconBg="bg-green-50"
              iconColor="#25D366"
            />
            <View className="h-px bg-gray-100 mx-4" />
            <MenuButton
              icon="log-out-outline"
              title={t('profile.logout')}
              onPress={handleLogout}
              iconBg="bg-red-50"
              iconColor="#EF4444"
            />
          </View>

          <Text className="text-center text-gray-400 font-cairo text-xs mt-4">
            v{APP_CONFIG.VERSION}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const ActionCard = ({ icon, title, onPress, isLast = false }: {
  icon: any;
  title: string;
  onPress: () => void;
  isLast?: boolean;
}) => (
  <TouchableOpacity
    className={`flex-1 py-3.5 items-center ${!isLast ? 'border-r border-gray-100' : ''}`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-1.5">
      <Ionicons name={icon} size={20} color="#2E7D32" />
    </View>
    <Text className="font-cairo text-xs text-gray-600 text-center" numberOfLines={1}>
      {title}
    </Text>
  </TouchableOpacity>
);

const SettingRow = ({ icon, title, value }: {
  icon: any;
  title: string;
  value: React.ReactNode;
}) => {
  const { isRTL } = useLanguage();
  return (
    <View className={`p-4 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
      <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Ionicons
          name={icon}
          size={20}
          color="#2E7D32"
          style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }}
        />
        <Text className="text-sm font-cairo-bold text-gray-700">{title}</Text>
      </View>
      {value}
    </View>
  );
};

const MenuButton = ({ icon, title, onPress, iconBg, iconColor }: {
  icon: any;
  title: string;
  onPress: () => void;
  iconBg: string;
  iconColor: string;
}) => {
  const { isRTL } = useLanguage();
  return (
    <TouchableOpacity
      className={`p-4 flex-row items-center justify-between active:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <View
          className={`w-10 h-10 ${iconBg} rounded-full items-center justify-center`}
          style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
        >
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text className="font-cairo text-base text-gray-700">{title}</Text>
      </View>
      <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );
};
