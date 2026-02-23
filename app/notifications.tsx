import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Switch, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const { t, language, isRTL } = useLanguage();

    useEffect(() => {
        fetchNotifications();
        loadNotificationSettings();
    }, []);

    const loadNotificationSettings = async () => {
        try {
            const enabled = await AsyncStorage.getItem('notifications_enabled');
            setNotificationsEnabled(enabled !== 'false');
        } catch (error) {
            console.error('Error loading notification settings:', error);
        }
    };

    const toggleNotifications = async (value: boolean) => {
        try {
            setNotificationsEnabled(value);
            await AsyncStorage.setItem('notifications_enabled', value.toString());
            
            // Update user preferences in database
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await supabase
                    .from('profiles')
                    .upsert({
                        id: session.user.id,
                        notifications_enabled: value,
                        updated_at: new Date().toISOString()
                    });
            }

            Alert.alert(
                language === 'ar' ? 'تم' : 'Done',
                value 
                    ? (language === 'ar' ? 'تم تفعيل الإشعارات' : 'Notifications enabled')
                    : (language === 'ar' ? 'تم إيقاف الإشعارات' : 'Notifications disabled')
            );
        } catch (error) {
            console.error('Error toggling notifications:', error);
        }
    };

    const clearAllNotifications = async () => {
        Alert.alert(
            language === 'ar' ? 'مسح الكل' : 'Clear All',
            language === 'ar' ? 'هل تريد مسح جميع الإشعارات؟' : 'Do you want to clear all notifications?',
            [
                { text: language === 'ar' ? 'إلغاء' : 'Cancel', style: 'cancel' },
                {
                    text: language === 'ar' ? 'مسح' : 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { data: { session } } = await supabase.auth.getSession();
                            if (session) {
                                await supabase
                                    .from('notifications')
                                    .delete()
                                    .eq('user_id', session.user.id);
                                setNotifications([]);
                            }
                        } catch (error) {
                            console.error('Error clearing notifications:', error);
                        }
                    }
                }
            ]
        );
    };

    const fetchNotifications = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotifications(data || []);
        } catch (error) {
            console.error(error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        // Implement read logic here
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return 'cube-outline';
            case 'promo': return 'pricetag-outline';
            case 'system': return 'information-circle-outline';
            default: return 'notifications-outline';
        }
    };

    const renderNotification = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={{
                backgroundColor: item.is_read ? '#FFFFFF' : '#F0F9F0',
                padding: 16,
                borderRadius: 12,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center'
            }}
            onPress={() => markAsRead(item.id)}
        >
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E8F5E9',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: isRTL ? 12 : 0,
                marginRight: isRTL ? 0 : 12
            }}>
                <Ionicons name={getIcon(item.type)} size={20} color="#2E7D32" />
            </View>

            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text style={{ fontFamily: 'Cairo_600SemiBold', fontSize: 14, color: '#212121', marginBottom: 2 }}>
                    {language === 'ar' ? (item.title_ar || item.title) : item.title}
                </Text>
                <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 13, color: '#616161', textAlign: isRTL ? 'right' : 'left' }}>
                    {language === 'ar' ? (item.message_ar || item.message) : item.message}
                </Text>
                <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>
                    {new Date(item.created_at).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>

            {!item.is_read && (
                <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#D32F2F',
                    marginLeft: isRTL ? 0 : 8,
                    marginRight: isRTL ? 8 : 0
                }} />
            )}
        </TouchableOpacity>
    );

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
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'Cairo_700Bold',
                    fontSize: 18,
                    color: '#212121'
                }}>
                    {t('profile.notifications') || (language === 'ar' ? 'الإشعارات' : 'Notifications')}
                </Text>
                {notifications.length > 0 && (
                    <TouchableOpacity onPress={clearAllNotifications}>
                        <Ionicons name="trash-outline" size={22} color="#D32F2F" />
                    </TouchableOpacity>
                )}
                {notifications.length === 0 && <View style={{ width: 24 }} />}
            </View>

            {/* Notification Toggle */}
            <View style={{
                backgroundColor: '#FFFFFF',
                marginHorizontal: 16,
                marginTop: 16,
                borderRadius: 12,
                padding: 16,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#F3F4F6'
            }}>
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: notificationsEnabled ? '#E8F5E9' : '#F5F5F5',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0
                    }}>
                        <Ionicons 
                            name={notificationsEnabled ? "notifications" : "notifications-off"} 
                            size={20} 
                            color={notificationsEnabled ? '#2E7D32' : '#9E9E9E'} 
                        />
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Cairo_600SemiBold', fontSize: 15, color: '#212121' }}>
                            {language === 'ar' ? 'تفعيل الإشعارات' : 'Enable Notifications'}
                        </Text>
                        <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 12, color: '#757575' }}>
                            {language === 'ar' ? 'استلم إشعارات العروض والطلبات' : 'Receive offers and order updates'}
                        </Text>
                    </View>
                </View>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
                    thumbColor={notificationsEnabled ? '#2E7D32' : '#BDBDBD'}
                    ios_backgroundColor="#E0E0E0"
                />
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#2E7D32" size="large" />
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                            <Ionicons name="notifications-off-outline" size={64} color="#E0E0E0" />
                            <Text style={{ fontFamily: 'Cairo_400Regular', color: '#9CA3AF', marginTop: 16 }}>
                                {language === 'ar' ? 'لا توجد إشعارات جديدة' : 'No new notifications'}
                            </Text>
                        </View>
                    }
                    renderItem={renderNotification}
                />
            )}
        </View>
    );
}
