import React, { useEffect, useState } from 'react';
import { Tabs, router } from 'expo-router';
import {
  HomeIcon, Squares2X2Icon, ShoppingCartIcon, UserIcon,
  ClipboardDocumentListIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeSolid,
  Squares2X2Icon as Squares2X2Solid,
  ShoppingCartIcon as ShoppingCartSolid,
  UserIcon as UserSolid,
  ClipboardDocumentListIcon as ClipboardSolid,
} from 'react-native-heroicons/solid';
import {
  View, Text, TouchableOpacity, Platform, StyleSheet, Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MainHeader } from '../../components/ui/MainHeader';
import { useLanguage } from '../../contexts';
import { useCartStore } from '../../store/cartStore';

const PRIMARY  = '#2E7D32';
const INACTIVE = '#BDBDBD';

// ─── Pill dimensions ──────────────────────────────────────────────────────
const PILL_H      = 54;
const PILL_GAP    = 12;   // gap between pill bottom and safe-area edge
const PILL_MARGIN = 22;   // horizontal margin from screen edges
const FADE_H      = 74;   // height of the gradient fade above the pill

// ─── Per-screen background colours ────────────────────────────────────────
// Opaque colour must match each screen's root View background.
// Transparent colour must be the same RGB with alpha 0 (avoids iOS grey tinge).
const TAB_KEYS = ['index', 'categories', 'cart', 'orders', 'profile'] as const;
type TabKey = typeof TAB_KEYS[number];

const SCENE_BG: Record<TabKey, string> = {
  index:      '#FFFFFF',  // bg-white
  categories: '#FFFFFF',  // bg-white
  cart:       '#F5F5F5',  // bg-background  (tailwind.config)
  orders:     '#F8F9FA',  // يطابق خلفية شاشة الطلبات
  profile:    '#F9FAFB',  // bg-gray-50
};

// Same colours at 0 opacity — used for the gradient start so it doesn't grey on iOS
const SCENE_BG_ZERO: Record<TabKey, string> = {
  index:      'rgba(255,255,255,0)',
  categories: 'rgba(255,255,255,0)',
  cart:       'rgba(245,245,245,0)',
  orders:     'rgba(248,249,250,0)',
  profile:    'rgba(249,250,251,0)',
};

// ─── Route paths for expo-router navigation ───────────────────────────────
const ROUTE_PATHS = {
  index:      '/',
  categories: '/categories',
  cart:       '/cart',
  orders:     '/orders',
  profile:    '/profile',
} as const;

// ─── Icon map ─────────────────────────────────────────────────────────────
const ICONS: Record<TabKey, { Outline: typeof HomeIcon; Solid: typeof HomeSolid }> = {
  index:      { Outline: HomeIcon,         Solid: HomeSolid },
  categories: { Outline: Squares2X2Icon,   Solid: Squares2X2Solid },
  cart:       { Outline: ShoppingCartIcon, Solid: ShoppingCartSolid },
  orders:     { Outline: ClipboardDocumentListIcon, Solid: ClipboardSolid },
  profile:    { Outline: UserIcon,         Solid: UserSolid },
};

// ─── Tab label map ────────────────────────────────────────────────────────
const TAB_LABEL_KEYS: Record<TabKey, string> = {
  index:      'common.home',
  categories: 'common.categories',
  cart:       'common.cart',
  orders:     'common.orders',
  profile:    'common.profile',
};

// ─── Floating tab bar ─────────────────────────────────────────────────────
function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets       = useSafeAreaInsets();
  const { items }    = useCartStore();
  const { t }        = useLanguage();
  const [kbVisible, setKbVisible] = useState(false);

  useEffect(() => {
    const show = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const s = Keyboard.addListener(show, () => setKbVisible(true));
    const h = Keyboard.addListener(hide, () => setKbVisible(false));
    return () => { s.remove(); h.remove(); };
  }, []);

  const cartCount     = items.length;
  const scenePadBottom = PILL_H + PILL_GAP + insets.bottom + 8;

  // Detect active tab for gradient colour
  const rawName  = state.routes[state.index]?.name ?? '';
  const validKey: TabKey | undefined = (TAB_KEYS as readonly string[]).includes(rawName)
    ? rawName as TabKey
    : undefined;
  const bgOpaque = SCENE_BG[validKey ?? 'index'];
  const bgZero   = SCENE_BG_ZERO[validKey ?? 'index'];

  const visibleRoutes = state.routes.filter(
    (r) => (TAB_KEYS as readonly string[]).includes(r.name),
  );

  if (kbVisible) return null;

  // Hide gradient on cart screen — checkout footer occupies same zone
  const showGradient = validKey !== 'cart';

  return (
    <>
      {/* ── Gradient fade: content dissolves into background colour ── */}
      {showGradient && (
        <LinearGradient
          colors={[bgZero, bgOpaque]}
          pointerEvents="none"
          style={[styles.fade, { bottom: scenePadBottom }]}
        />
      )}

      {/* ── Floating pill ── */}
      <View
        style={[styles.wrapper, { bottom: insets.bottom + PILL_GAP }]}
        pointerEvents="box-none"
      >
        <View style={styles.pill}>
          {visibleRoutes.map((route) => {
            const routeIdx = state.routes.findIndex((r) => r.key === route.key);
            const focused  = state.index === routeIdx;
            const key      = route.name as TabKey;
            const { Outline, Solid } = ICONS[key];
            const Icon     = focused ? Solid : Outline;
            const isCart   = key === 'cart';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                router.navigate(ROUTE_PATHS[key] as any);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={() =>
                  navigation.emit({ type: 'tabLongPress', target: route.key })
                }
                style={styles.tab}
                activeOpacity={0.75}
                accessibilityRole="tab"
                accessibilityState={focused ? { selected: true } : {}}
              >
                <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
                  <Icon size={22} color={focused ? PRIMARY : INACTIVE} />
                  {isCart && cartCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeTxt}>
                        {cartCount > 9 ? '9+' : cartCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[styles.tabLabel, { color: focused ? PRIMARY : INACTIVE }]}
                  numberOfLines={1}
                >
                  {t(TAB_LABEL_KEYS[key])}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: FADE_H,
  },
  wrapper: {
    position: 'absolute',
    left: PILL_MARGIN,
    right: PILL_MARGIN,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: PILL_H,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 24,
    elevation: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 4,
  },
  iconBox: {
    width: 42,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBoxActive: {
    backgroundColor: 'rgba(46, 125, 50, 0.09)',
  },
  tabLabel: {
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontSize: 10,
    marginTop: 1,
    textAlign: 'center',
    lineHeight: 13,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#D32F2F',
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeTxt: {
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontSize: 9,
    color: '#FFFFFF',
    lineHeight: 11,
  },
});

// ─── Tab layout ───────────────────────────────────────────────────────────
export default function TabLayout() {
  const { t }    = useLanguage();
  const insets   = useSafeAreaInsets();
  const scenePadBottom = PILL_H + PILL_GAP + insets.bottom + 8;

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={({ route }) => ({
        header: () => <MainHeader />,
        headerShown: true,
        sceneStyle: {
          paddingBottom: scenePadBottom,
          backgroundColor: SCENE_BG[route.name as TabKey] ?? '#FFFFFF',
        },
      })}
    >
      <Tabs.Screen name="index"      options={{ title: t('common.home') }} />
      <Tabs.Screen name="categories" options={{ title: t('common.categories') }} />
      <Tabs.Screen name="cart"       options={{ title: t('common.cart') }} />
      {/* شاشة الطلبات تملك رأسها الخاص، فنُخفي رأس التبويبات لها */}
      <Tabs.Screen
        name="orders"
        options={{ title: t('common.orders'), headerShown: false }}
      />
      <Tabs.Screen name="profile"    options={{ title: t('common.profile') }} />
      <Tabs.Screen
        name="category/[id]"
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
