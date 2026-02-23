import React from 'react';
import { Tabs } from 'expo-router';
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, Squares2X2Icon as Squares2X2Solid, ShoppingCartIcon as ShoppingCartSolid, UserIcon as UserSolid } from 'react-native-heroicons/solid';
import { View, Platform, Text } from 'react-native';
import { MainHeader } from '../../components/ui/MainHeader';
import { useLanguage } from '../../contexts';
import { useCartStore } from '../../store/cartStore';

const PRIMARY_COLOR = '#2E7D32';
const INACTIVE_COLOR = '#BDBDBD';
const BG_COLOR = '#FFFFFF';
const ACTIVE_BG = 'rgba(46, 125, 50, 0.08)';

export default function TabLayout() {
  const { t, isRTL } = useLanguage();
  const { items } = useCartStore();
  const cartItemsCount = items.length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: BG_COLOR,
          borderTopWidth: 0.5,
          borderTopColor: '#E0E0E0',
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 34 : 16, // 🔥 مساحة أكبر
          paddingTop: 3, // 🔥 مساحة أصغر
          paddingHorizontal: 4,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontFamily: 'Cairo_700Bold',
          fontSize: 11.5,
          marginTop: -1, // 🔥 أقرب للأيقونة
          marginBottom: 0,
          letterSpacing: 0.2,
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
        header: () => <MainHeader />,
        headerShown: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('common.home'),
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 34,
                width: 48,
                borderRadius: 12,
                backgroundColor: focused ? ACTIVE_BG : 'transparent',
                marginBottom: 0,
              }}
            >
              {focused ? (
                <HomeSolid size={23} color={color} />
              ) : (
                <HomeIcon size={23} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: t('common.categories'),
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 34,
                width: 48,
                borderRadius: 12,
                backgroundColor: focused ? ACTIVE_BG : 'transparent',
                marginBottom: 0,
              }}
            >
              {focused ? (
                <Squares2X2Solid size={23} color={color} />
              ) : (
                <Squares2X2Icon size={23} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('common.cart'),
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 34,
                width: 48,
                borderRadius: 12,
                backgroundColor: focused ? ACTIVE_BG : 'transparent',
                position: 'relative',
                marginBottom: 0,
              }}
            >
              {focused ? (
                <ShoppingCartSolid size={23} color={color} />
              ) : (
                <ShoppingCartIcon size={23} color={color} />
              )}
              {cartItemsCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: isRTL ? undefined : 4,
                    left: isRTL ? 4 : undefined,
                    backgroundColor: '#D32F2F',
                    borderRadius: 9,
                    minWidth: 18,
                    height: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                    borderWidth: 2,
                    borderColor: BG_COLOR,
                  }}
                >
                  <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 9, color: '#FFFFFF', lineHeight: 10 }}>
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('common.profile'),
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 34,
                width: 48,
                borderRadius: 12,
                backgroundColor: focused ? ACTIVE_BG : 'transparent',
                marginBottom: 0,
              }}
            >
              {focused ? (
                <UserSolid size={23} color={color} />
              ) : (
                <UserIcon size={23} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
