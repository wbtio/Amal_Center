import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Linking } from 'react-native';
import { CachedImage as Image } from '../../components/ui/CachedImage';
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

  // ─── Not logged in ────────────────────────────────────────────────────────
  if (!user) {
    return (
      <View className="flex-1 bg-gray-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View
            className="bg-primary items-center px-6"
            style={{
              paddingTop: insets.top + 32,
              paddingBottom: 36,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
          >
            <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-4"
              style={{ borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.4)' }}
            >
              <Ionicons name="person-outline" size={42} color="#fff" />
            </View>
            <Text className="text-xl font-ibm-bold text-white mb-1.5 text-center">
              {t('profile.welcome')}
            </Text>
            <Text className="text-sm font-ibm text-white/80 text-center mb-6 leading-5">
              {t('profile.welcomeMessage')}
            </Text>
            <View className="flex-row gap-3 w-full">
              <TouchableOpacity
                className="flex-1 py-3.5 bg-white rounded-xl"
                onPress={() => router.push('/auth/login')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={t('profile.login')}
              >
                <Text className="text-primary font-ibm-bold text-base text-center">
                  {t('profile.login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3.5 bg-white/15 rounded-xl border border-white/25"
                onPress={() => router.push('/auth/register')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={t('profile.createAccount')}
              >
                <Text className="text-white font-ibm-bold text-base text-center">
                  {t('profile.createAccount')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-4 py-4">
            <SectionLabel text={t('profile.settings')} isRTL={isRTL} />
            <View className="bg-white rounded-2xl overflow-hidden mb-4">
              <SettingRow
                icon="language-outline"
                title={t('profile.language')}
                value={
                  <TogglePill
                    options={[
                      { label: 'العربية', value: 'ar' },
                      { label: 'English', value: 'en' },
                    ]}
                    selected={language}
                    onSelect={(v) => changeLanguage(v as 'ar' | 'en')}
                  />
                }
              />
              <View className="h-px bg-gray-100 mx-4" />
              <SettingRow
                icon="cash-outline"
                title={t('profile.currency')}
                value={
                  <TogglePill
                    options={[
                      { label: 'د.ع', value: 'IQD' },
                      { label: 'USD', value: 'USD' },
                    ]}
                    selected={currency}
                    onSelect={(v) => setCurrency(v as 'IQD' | 'USD')}
                  />
                }
              />
            </View>

            <SectionLabel text={t('profile.helpAndSupport')} isRTL={isRTL} />
            <View className="bg-white rounded-2xl overflow-hidden mb-3">
              <MenuButton
                icon="help-circle-outline"
                title={t('profile.helpAndSupport')}
                onPress={() => router.push('/help/faq')}
                iconBg="bg-blue-50"
                iconColor="#2196F3"
                isRTL={isRTL}
              />
              <View className="h-px bg-gray-100 mx-4" />
              <MenuButton
                icon="logo-whatsapp"
                title={t('profile.whatsapp')}
                onPress={openWhatsApp}
                iconBg="bg-green-50"
                iconColor="#25D366"
                isRTL={isRTL}
              />
              <View className="h-px bg-gray-100 mx-4" />
              <MenuButton
                icon="shield-outline"
                title={t('profile.privacyPolicy')}
                onPress={() => router.push('/help/privacy')}
                iconBg="bg-purple-50"
                iconColor="#7C3AED"
                isRTL={isRTL}
              />
              <View className="h-px bg-gray-100 mx-4" />
              <MenuButton
                icon="document-text-outline"
                title={t('profile.termsOfService')}
                onPress={() => router.push('/help/terms')}
                iconBg="bg-amber-50"
                iconColor="#D97706"
                isRTL={isRTL}
              />
            </View>

            <Text className="text-center text-gray-400 font-ibm text-xs mt-4 mb-2">
              v{APP_CONFIG.VERSION}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ─── Logged in ────────────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Profile header ── */}
        <View
          className="bg-primary"
          style={{
            paddingTop: insets.top + 14,
            paddingBottom: 24,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className={`px-4 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                className="w-[68px] h-[68px] rounded-full"
                style={{
                  marginRight: isRTL ? 0 : 14,
                  marginLeft: isRTL ? 14 : 0,
                  borderWidth: 2.5,
                  borderColor: 'rgba(255,255,255,0.55)',
                }}
              />
            ) : (
              <View
                className="w-[68px] h-[68px] rounded-full bg-white/20 items-center justify-center"
                style={{
                  marginRight: isRTL ? 0 : 14,
                  marginLeft: isRTL ? 14 : 0,
                  borderWidth: 2.5,
                  borderColor: 'rgba(255,255,255,0.45)',
                }}
              >
                <Text className="font-ibm-bold text-2xl text-white">
                  {(profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
                </Text>
              </View>
            )}

            {/* Name & Email */}
            <View className="flex-1">
              <Text
                className={`font-ibm-bold text-[17px] text-white ${isRTL ? 'text-right' : 'text-left'}`}
                numberOfLines={1}
              >
                {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
              </Text>
              <Text
                className={`font-ibm text-xs text-white/70 ${isRTL ? 'text-right' : 'text-left'} mt-0.5`}
                numberOfLines={1}
              >
                {user.email}
              </Text>
            </View>

            {/* Edit button */}
            <TouchableOpacity
              className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
              style={{ marginLeft: isRTL ? 0 : 4, marginRight: isRTL ? 4 : 0 }}
              onPress={() => router.push('/profile/edit')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={t('profile.editProfile')}
            >
              <Ionicons name="pencil-outline" size={17} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 pt-4 pb-2">
          {/* ── Quick actions ── */}
          <SectionLabel text={t('profile.myAccount')} isRTL={isRTL} />
          <View className="bg-white rounded-2xl overflow-hidden mb-4">
            <View className="flex-row">
              <ActionCard
                icon="receipt-outline"
                title={t('profile.orders')}
                onPress={() => router.push('/orders')}
                iconBg="bg-blue-50"
                iconColor="#1E88E5"
              />
              <ActionCard
                icon="location-outline"
                title={t('profile.addresses')}
                onPress={() => router.push('/addresses')}
                iconBg="bg-violet-50"
                iconColor="#7C3AED"
              />
              <ActionCard
                icon="heart-outline"
                title={t('profile.wishlist')}
                onPress={() => router.push('/wishlist')}
                iconBg="bg-rose-50"
                iconColor="#E53935"
                isLast
              />
            </View>
          </View>

          {/* ── Settings ── */}
          <SectionLabel text={t('profile.settings')} isRTL={isRTL} />
          <View className="bg-white rounded-2xl overflow-hidden mb-4">
            <SettingRow
              icon="language-outline"
              title={t('profile.language')}
              value={
                <TogglePill
                  options={[
                    { label: 'العربية', value: 'ar' },
                    { label: 'English', value: 'en' },
                  ]}
                  selected={language}
                  onSelect={(v) => changeLanguage(v as 'ar' | 'en')}
                />
              }
            />
            <View className="h-px bg-gray-100 mx-4" />
            <SettingRow
              icon="cash-outline"
              title={t('profile.currency')}
              value={
                <TogglePill
                  options={[
                    { label: 'د.ع', value: 'IQD' },
                    { label: 'USD', value: 'USD' },
                  ]}
                  selected={currency}
                  onSelect={(v) => setCurrency(v as 'IQD' | 'USD')}
                />
              }
            />
          </View>

          {/* ── Support ── */}
          <SectionLabel text={t('profile.helpAndSupport')} isRTL={isRTL} />
          <View className="bg-white rounded-2xl overflow-hidden mb-4">
            <MenuButton
              icon="help-circle-outline"
              title={t('profile.helpAndSupport')}
              onPress={() => router.push('/help/faq')}
              iconBg="bg-blue-50"
              iconColor="#2196F3"
              isRTL={isRTL}
            />
            <View className="h-px bg-gray-100 mx-4" />
            <MenuButton
              icon="logo-whatsapp"
              title={t('profile.whatsapp')}
              onPress={openWhatsApp}
              iconBg="bg-green-50"
              iconColor="#25D366"
              isRTL={isRTL}
            />
            <View className="h-px bg-gray-100 mx-4" />
            <MenuButton
              icon="shield-outline"
              title={t('profile.privacyPolicy')}
              onPress={() => router.push('/help/privacy')}
              iconBg="bg-purple-50"
              iconColor="#7C3AED"
              isRTL={isRTL}
            />
            <View className="h-px bg-gray-100 mx-4" />
            <MenuButton
              icon="document-text-outline"
              title={t('profile.termsOfService')}
              onPress={() => router.push('/help/terms')}
              iconBg="bg-amber-50"
              iconColor="#D97706"
              isRTL={isRTL}
            />
          </View>

          {/* ── Logout ── */}
          <TouchableOpacity
            className={`bg-red-50 border border-red-100 rounded-2xl py-3.5 mb-3 flex-row items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
            onPress={handleLogout}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={t('profile.logout')}
          >
            <Ionicons
              name="log-out-outline"
              size={19}
              color="#EF4444"
              style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
            />
            <Text className="font-ibm-bold text-base text-red-500">
              {t('profile.logout')}
            </Text>
          </TouchableOpacity>

          {/* ── Delete account ── */}
          <View className="bg-white rounded-2xl overflow-hidden mb-3">
            <MenuButton
              icon="trash-outline"
              title={t('profile.deleteAccount')}
              onPress={() => router.push('/profile/delete-account')}
              iconBg="bg-red-50"
              iconColor="#D32F2F"
              isRTL={isRTL}
            />
          </View>

          <Text className="text-center text-gray-400 font-ibm text-xs mt-3 mb-2">
            v{APP_CONFIG.VERSION}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ text, isRTL }: { text: string; isRTL: boolean }) => (
  <Text
    className={`font-ibm-bold text-[11px] text-gray-400 mb-2 mx-0.5 ${isRTL ? 'text-right' : 'text-left'}`}
  >
    {text}
  </Text>
);

const TogglePill = ({
  options,
  selected,
  onSelect,
}: {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (v: string) => void;
}) => (
  <View className="flex-row bg-gray-100 rounded-lg p-1">
    {options.map((opt) => (
      <TouchableOpacity
        key={opt.value}
        className={`px-4 py-1.5 rounded-md ${selected === opt.value ? 'bg-white' : ''}`}
        onPress={() => onSelect(opt.value)}
      >
        <Text
          className={`text-sm font-ibm-bold ${selected === opt.value ? 'text-primary' : 'text-gray-400'}`}
        >
          {opt.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ActionCard = ({
  icon,
  title,
  onPress,
  isLast = false,
  iconBg = 'bg-primary/10',
  iconColor = '#2E7D32',
}: {
  icon: any;
  title: string;
  onPress: () => void;
  isLast?: boolean;
  iconBg?: string;
  iconColor?: string;
}) => (
  <TouchableOpacity
    className={`flex-1 py-4 items-center ${!isLast ? 'border-r border-gray-100' : ''}`}
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    <View className={`w-12 h-12 ${iconBg} rounded-2xl items-center justify-center mb-2`}>
      <Ionicons name={icon} size={22} color={iconColor} />
    </View>
    <Text className="font-ibm-bold text-xs text-gray-700 text-center" numberOfLines={1}>
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
    <View className={`px-4 py-3.5 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
      <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Ionicons
          name={icon}
          size={19}
          color="#2E7D32"
          style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }}
        />
        <Text className="text-sm font-ibm-bold text-gray-700">{title}</Text>
      </View>
      {value}
    </View>
  );
};

const MenuButton = ({
  icon,
  title,
  onPress,
  iconBg,
  iconColor,
  isRTL,
}: {
  icon: any;
  title: string;
  onPress: () => void;
  iconBg: string;
  iconColor: string;
  isRTL: boolean;
}) => (
  <TouchableOpacity
    className={`px-4 py-3.5 flex-row items-center justify-between active:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
      <View
        className={`w-9 h-9 ${iconBg} rounded-xl items-center justify-center`}
        style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
      >
        <Ionicons name={icon} size={19} color={iconColor} />
      </View>
      <Text className="font-ibm text-[15px] text-gray-700">{title}</Text>
    </View>
    <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={18} color="#D1D5DB" />
  </TouchableOpacity>
);
