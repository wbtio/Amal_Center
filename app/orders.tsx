import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage, useCurrency } from '../contexts';

type TabType = 'active' | 'history';

const ORDER_STEPS = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

const getRelativeTime = (dateStr: string, lang: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return lang === 'ar' ? 'الآن' : 'Just now';
  if (diffMins < 60) return lang === 'ar' ? `منذ ${diffMins} دقيقة` : `${diffMins}m ago`;
  if (diffHours < 24) return lang === 'ar' ? `منذ ${diffHours} ساعة` : `${diffHours}h ago`;
  if (diffDays < 7) return lang === 'ar' ? `منذ ${diffDays} يوم` : `${diffDays}d ago`;
  return date.toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'en-US', { day: 'numeric', month: 'short' });
};

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchOrders();

    let subscription: any = null;

    const setupRealtimeSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      subscription = supabase
        .channel('orders-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `user_id=eq.${session.user.id}`
          },
          (payload) => {
            console.log('Order changed:', payload);

            if (payload.eventType === 'UPDATE') {
              setOrders(prevOrders =>
                prevOrders.map(order =>
                  order.id === payload.new.id ? { ...order, ...payload.new } : order
                )
              );
            } else if (payload.eventType === 'INSERT') {
              setOrders(prevOrders => [payload.new as any, ...prevOrders]);
            } else if (payload.eventType === 'DELETE') {
              setOrders(prevOrders =>
                prevOrders.filter(order => order.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, []);

  const activeOrders = useMemo(() => orders.filter(o => !['delivered', 'cancelled'].includes(o.status)), [orders]);
  const historyOrders = useMemo(() => orders.filter(o => ['delivered', 'cancelled'].includes(o.status)), [orders]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', text: '#92400E', icon: 'time' as const, iconBg: '#FFF7ED' };
      case 'confirmed': return { bg: '#DBEAFE', text: '#1E40AF', icon: 'checkmark-circle' as const, iconBg: '#EFF6FF' };
      case 'preparing': return { bg: '#FFEDD5', text: '#9A3412', icon: 'restaurant' as const, iconBg: '#FFF7ED' };
      case 'ready': return { bg: '#F3E8FF', text: '#7C3AED', icon: 'bag-check' as const, iconBg: '#FAF5FF' };
      case 'delivered': return { bg: '#D1FAE5', text: '#065F46', icon: 'checkmark-done-circle' as const, iconBg: '#ECFDF5' };
      case 'cancelled': return { bg: '#FEE2E2', text: '#991B1B', icon: 'close-circle' as const, iconBg: '#FEF2F2' };
      default: return { bg: '#F3F4F6', text: '#374151', icon: 'ellipse' as const, iconBg: '#F9FAFB' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('status.pending') || 'Pending';
      case 'confirmed': return t('status.confirmed') || 'Confirmed';
      case 'preparing': return t('status.preparing') || 'Preparing';
      case 'ready': return t('status.ready') || 'Ready';
      case 'delivered': return t('status.delivered') || 'Delivered';
      case 'cancelled': return t('status.cancelled') || 'Cancelled';
      default: return status;
    }
  };

  const handleGoBack = () => {
    try {
      router.back();
    } catch (e) {
      router.replace('/(tabs)/profile');
    }
  };

  const handleOrderPress = (orderId: string) => {
    try {
      router.push({ pathname: '/order/[id]', params: { id: orderId } });
    } catch (e) {
      console.error('Navigation error:', e);
    }
  };

  const getProgressWidth = (status: string) => {
    if (status === 'cancelled') return 0;
    const idx = ORDER_STEPS.indexOf(status);
    if (idx === -1) return 0;
    return ((idx + 1) / ORDER_STEPS.length) * 100;
  };

  const renderOrder = ({ item }: { item: any }) => {
    const statusInfo = getStatusInfo(item.status);
    const progress = getProgressWidth(item.status);
    const isActive = !['delivered', 'cancelled'].includes(item.status);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#F3F4F6',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
        onPress={() => handleOrderPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={{ padding: 14 }}>
          {/* Top row: Status + Order ID */}
          <View style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <View style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: statusInfo.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: isRTL ? 0 : 10,
                marginLeft: isRTL ? 10 : 0,
              }}>
                <Ionicons name={statusInfo.icon} size={18} color={statusInfo.text} />
              </View>
              <View style={{ alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text style={{
                  fontFamily: 'IBMPlexSansArabic_700Bold',
                  fontSize: 14,
                  color: '#1F2937',
                }}>
                  #{item.id.slice(0, 8)}
                </Text>
                <Text style={{
                  fontFamily: 'IBMPlexSansArabic_400Regular',
                  fontSize: 11,
                  color: '#9CA3AF',
                  marginTop: 1,
                }}>
                  {getRelativeTime(item.created_at, language)}
                </Text>
              </View>
            </View>

            <View style={{
              backgroundColor: statusInfo.bg,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
            }}>
              <Text style={{
                fontFamily: 'IBMPlexSansArabic_700Bold',
                fontSize: 11,
                color: statusInfo.text,
              }}>
                {getStatusText(item.status)}
              </Text>
            </View>
          </View>

          {/* Progress bar for active orders */}
          {isActive && (
            <View style={{ marginBottom: 12 }}>
              <View style={{ height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <View style={{
                  height: 4,
                  backgroundColor: statusInfo.text,
                  borderRadius: 2,
                  width: `${progress}%`,
                }} />
              </View>
            </View>
          )}

          {/* Bottom row: Price + Delivery info */}
          <View style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: 'IBMPlexSansArabic_700Bold',
              fontSize: 16,
              color: '#2E7D32',
            }}>
              {formatPrice(item.total_iqd)}
            </Text>

            <View style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}>
              {item.payment_method && (
                <View style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  backgroundColor: '#F9FAFB',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}>
                  <Ionicons
                    name={item.payment_method === 'cod' ? 'cash-outline' : 'card-outline'}
                    size={12}
                    color="#6B7280"
                    style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }}
                  />
                  <Text style={{
                    fontFamily: 'IBMPlexSansArabic_400Regular',
                    fontSize: 10,
                    color: '#6B7280',
                  }}>
                    {item.payment_method === 'cod'
                      ? (language === 'ar' ? 'نقد' : 'COD')
                      : (language === 'ar' ? 'بطاقة' : 'Card')
                    }
                  </Text>
                </View>
              )}

              <Ionicons
                name={isRTL ? "chevron-back" : "chevron-forward"}
                size={16}
                color="#D1D5DB"
                style={isRTL ? { marginRight: 8 } : { marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA', paddingTop: insets.top }}>
      {/* Header */}
      <View style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
      }}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: 'IBMPlexSansArabic_700Bold',
          fontSize: 17,
          color: '#1F2937'
        }}>
          {t('profile.orders') || (language === 'ar' ? 'طلباتي' : 'My Orders')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Tabs with count badges */}
      <View style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#FFFFFF',
        padding: 4,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            backgroundColor: activeTab === 'active' ? '#2E7D32' : 'transparent',
          }}
          onPress={() => setActiveTab('active')}
          activeOpacity={0.7}
        >
          <Text style={{
            fontFamily: 'IBMPlexSansArabic_700Bold',
            fontSize: 13,
            color: activeTab === 'active' ? '#FFFFFF' : '#6B7280',
          }}>
            {language === 'ar' ? 'الحالية' : 'Active'}
          </Text>
          {activeOrders.length > 0 && (
            <View style={{
              backgroundColor: activeTab === 'active' ? 'rgba(255,255,255,0.25)' : '#E8F5E9',
              borderRadius: 10,
              minWidth: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isRTL ? 0 : 6,
              marginRight: isRTL ? 6 : 0,
              paddingHorizontal: 6,
            }}>
              <Text style={{
                fontFamily: 'IBMPlexSansArabic_700Bold',
                fontSize: 10,
                color: activeTab === 'active' ? '#FFFFFF' : '#2E7D32',
              }}>
                {activeOrders.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            backgroundColor: activeTab === 'history' ? '#2E7D32' : 'transparent',
          }}
          onPress={() => setActiveTab('history')}
          activeOpacity={0.7}
        >
          <Text style={{
            fontFamily: 'IBMPlexSansArabic_700Bold',
            fontSize: 13,
            color: activeTab === 'history' ? '#FFFFFF' : '#6B7280',
          }}>
            {language === 'ar' ? 'السابقة' : 'History'}
          </Text>
          {historyOrders.length > 0 && (
            <View style={{
              backgroundColor: activeTab === 'history' ? 'rgba(255,255,255,0.25)' : '#F3F4F6',
              borderRadius: 10,
              minWidth: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isRTL ? 0 : 6,
              marginRight: isRTL ? 6 : 0,
              paddingHorizontal: 6,
            }}>
              <Text style={{
                fontFamily: 'IBMPlexSansArabic_700Bold',
                fontSize: 10,
                color: activeTab === 'history' ? '#FFFFFF' : '#6B7280',
              }}>
                {historyOrders.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#2E7D32" size="large" />
        </View>
      ) : (
        <FlatList
          data={activeTab === 'active' ? activeOrders : historyOrders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 12 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2E7D32']}
              tintColor="#2E7D32"
            />
          }
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#F3F4F6',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Ionicons
                  name={activeTab === 'active' ? "cube-outline" : "time-outline"}
                  size={44}
                  color="#D1D5DB"
                />
              </View>
              <Text style={{ fontFamily: 'IBMPlexSansArabic_700Bold', fontSize: 16, color: '#374151', marginBottom: 6 }}>
                {activeTab === 'active'
                  ? (language === 'ar' ? 'لا توجد طلبات حالية' : 'No active orders')
                  : (language === 'ar' ? 'لا توجد طلبات سابقة' : 'No order history')}
              </Text>
              <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', fontSize: 13, color: '#9CA3AF', textAlign: 'center', maxWidth: 250, lineHeight: 20 }}>
                {activeTab === 'active'
                  ? (language === 'ar' ? 'ابدأ التسوق واطلب منتجاتك المفضلة' : 'Start shopping and order your favorites')
                  : (language === 'ar' ? 'طلباتك المكتملة والملغاة ستظهر هنا' : 'Completed and cancelled orders will appear here')}
              </Text>
              {activeTab === 'active' && (
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)')}
                  style={{
                    marginTop: 20,
                    backgroundColor: '#2E7D32',
                    paddingHorizontal: 28,
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontFamily: 'IBMPlexSansArabic_700Bold', color: '#FFFFFF', fontSize: 14 }}>
                    {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          }
          renderItem={renderOrder}
        />
      )}
    </View>
  );
}
