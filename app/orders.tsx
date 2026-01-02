import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage, useCurrency } from '../contexts';

type TabType = 'active' | 'history';

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const { t, language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchOrders();
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
    }
  };

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const historyOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', text: '#92400E' };
      case 'confirmed': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'preparing': return { bg: '#FFEDD5', text: '#9A3412' };
      case 'ready': return { bg: '#F3E8FF', text: '#7C3AED' };
      case 'delivered': return { bg: '#D1FAE5', text: '#065F46' };
      case 'cancelled': return { bg: '#FEE2E2', text: '#991B1B' };
      default: return { bg: '#F3F4F6', text: '#374151' };
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
      // Fallback if router.back() fails
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

  const renderOrder = ({ item }: { item: any }) => {
    const statusColors = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#F3F4F6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
        onPress={() => handleOrderPress(item.id)}
      >
        <View style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8
        }}>
          <View style={{
            backgroundColor: statusColors.bg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6
          }}>
            <Text style={{
              fontFamily: 'Cairo_700Bold',
              fontSize: 11,
              color: statusColors.text
            }}>
              {getStatusText(item.status)}
            </Text>
          </View>
          <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 14, color: '#212121' }}>
            #{item.id.slice(0, 8)}
          </Text>
        </View>

        <View style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 12, color: '#6B7280' }}>
            {new Date(item.created_at).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US')}
          </Text>
          <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 14, color: '#2E7D32' }}>
            {formatPrice(item.total_iqd)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: insets.top }}>
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
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: 'Cairo_700Bold',
          fontSize: 18,
          color: '#212121'
        }}>
          {t('profile.orders') || (language === 'ar' ? 'طلباتي' : 'My Orders')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#FFFFFF',
        padding: 4,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6'
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
            backgroundColor: activeTab === 'active' ? '#2E7D32' : 'transparent'
          }}
          onPress={() => setActiveTab('active')}
        >
          <Text style={{
            fontFamily: 'Cairo_700Bold',
            fontSize: 14,
            color: activeTab === 'active' ? '#FFFFFF' : '#6B7280'
          }}>
            {language === 'ar' ? 'الحالية' : 'Active'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
            backgroundColor: activeTab === 'history' ? '#2E7D32' : 'transparent'
          }}
          onPress={() => setActiveTab('history')}
        >
          <Text style={{
            fontFamily: 'Cairo_700Bold',
            fontSize: 14,
            color: activeTab === 'history' ? '#FFFFFF' : '#6B7280'
          }}>
            {language === 'ar' ? 'السابقة' : 'History'}
          </Text>
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
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
              <Ionicons
                name={activeTab === 'active' ? "cube-outline" : "time-outline"}
                size={64}
                color="#E0E0E0"
              />
              <Text style={{ fontFamily: 'Cairo_400Regular', color: '#9CA3AF', marginTop: 16 }}>
                {activeTab === 'active'
                  ? (language === 'ar' ? 'لا توجد طلبات نشطة حالياً' : 'No active orders')
                  : (language === 'ar' ? 'سجل الطلبات فارغ' : 'Order history is empty')}
              </Text>
            </View>
          }
          renderItem={renderOrder}
        />
      )}
    </View>
  );
}
