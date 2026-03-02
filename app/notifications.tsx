import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Switch, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getNotificationStyle = (type: string) => {
    switch (type) {
        case 'order': return { bg: '#EEF2FF', icon: 'cube' as const, color: '#4F46E5' };
        case 'promo': return { bg: '#FFF7ED', icon: 'pricetag' as const, color: '#EA580C' };
        case 'system': return { bg: '#F0F9FF', icon: 'information-circle' as const, color: '#0284C7' };
        default: return { bg: '#E8F5E9', icon: 'notifications' as const, color: '#2E7D32' };
    }
};

export default function NotificationsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const { t, language, isRTL } = useLanguage();

    const unreadCount = useMemo(() => notifications.filter(n => !n.is_read).length, [notifications]);

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

    const markAllAsRead = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await supabase
                    .from('notifications')
                    .update({ is_read: true })
                    .eq('user_id', session.user.id)
                    .eq('is_read', false);
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            }
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
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
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        try {
            await supabase.from('notifications').update({ is_read: true }).eq('id', id);
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const renderNotification = ({ item }: { item: any }) => {
        const style = getNotificationStyle(item.type);
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: item.is_read ? '#F3F4F6' : '#E8F5E9',
                    ...(isRTL
                        ? { borderRightWidth: item.is_read ? 1 : 3, borderRightColor: item.is_read ? '#F3F4F6' : style.color }
                        : { borderLeftWidth: item.is_read ? 1 : 3, borderLeftColor: item.is_read ? '#F3F4F6' : style.color }
                    ),
                    overflow: 'hidden',
                }}
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.7}
            >
                <View style={{
                    padding: 14,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                }}>
                    <View style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        backgroundColor: style.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: isRTL ? 12 : 0,
                        marginRight: isRTL ? 0 : 12,
                    }}>
                        <Ionicons name={style.icon} size={20} color={style.color} />
                    </View>

                    <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                        <View style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: 3,
                        }}>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 14,
                                color: '#1F2937',
                                flex: 1,
                                textAlign: isRTL ? 'right' : 'left',
                            }}>
                                {language === 'ar' ? (item.title_ar || item.title) : item.title}
                            </Text>
                            {!item.is_read && (
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: style.color,
                                    marginLeft: isRTL ? 0 : 8,
                                    marginRight: isRTL ? 8 : 0,
                                }} />
                            )}
                        </View>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 13,
                            color: '#6B7280',
                            textAlign: isRTL ? 'right' : 'left',
                            lineHeight: 20,
                        }}>
                            {language === 'ar' ? (item.message_ar || item.message) : item.message}
                        </Text>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 6,
                            textAlign: isRTL ? 'right' : 'left',
                        }}>
                            {getRelativeTime(item.created_at, language)}
                        </Text>
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
                    onPress={() => router.back()}
                    style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={20} color="#374151" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_700Bold',
                        fontSize: 17,
                        color: '#1F2937',
                    }}>
                        {t('profile.notifications') || (language === 'ar' ? 'الإشعارات' : 'Notifications')}
                    </Text>
                    {unreadCount > 0 && (
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 11,
                            color: '#2E7D32',
                            marginTop: 1,
                        }}>
                            {language === 'ar' ? `${unreadCount} غير مقروءة` : `${unreadCount} unread`}
                        </Text>
                    )}
                </View>
                <View style={{ width: 36, alignItems: 'center' }}>
                    {notifications.length > 0 ? (
                        <TouchableOpacity onPress={clearAllNotifications}>
                            <Ionicons name="trash-outline" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    ) : <View style={{ width: 36 }} />}
                </View>
            </View>

            {/* Notification Toggle - Compact */}
            <View style={{
                backgroundColor: '#FFFFFF',
                marginHorizontal: 16,
                marginTop: 12,
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 12,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#F3F4F6',
            }}>
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: notificationsEnabled ? '#E8F5E9' : '#F5F5F5',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: isRTL ? 0 : 10,
                        marginLeft: isRTL ? 10 : 0,
                    }}>
                        <Ionicons 
                            name={notificationsEnabled ? "notifications" : "notifications-off"} 
                            size={18} 
                            color={notificationsEnabled ? '#2E7D32' : '#9E9E9E'} 
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_600SemiBold', fontSize: 14, color: '#1F2937', textAlign: isRTL ? 'right' : 'left' }}>
                            {language === 'ar' ? 'الإشعارات' : 'Push Notifications'}
                        </Text>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', fontSize: 11, color: '#9CA3AF', textAlign: isRTL ? 'right' : 'left' }}>
                            {language === 'ar' ? 'العروض وتحديثات الطلبات' : 'Offers & order updates'}
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

            {/* Mark all as read */}
            {unreadCount > 0 && (
                <TouchableOpacity
                    onPress={markAllAsRead}
                    style={{
                        marginHorizontal: 16,
                        marginTop: 10,
                        paddingVertical: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_600SemiBold',
                        fontSize: 12,
                        color: '#2E7D32',
                    }}>
                        {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}
                    </Text>
                </TouchableOpacity>
            )}

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#2E7D32" size="large" />
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16, paddingTop: 8 }}
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
                                <Ionicons name="notifications-outline" size={44} color="#D1D5DB" />
                            </View>
                            <Text style={{ fontFamily: 'IBMPlexSansArabic_700Bold', fontSize: 16, color: '#374151', marginBottom: 6 }}>
                                {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications yet'}
                            </Text>
                            <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', fontSize: 13, color: '#9CA3AF', textAlign: 'center', maxWidth: 250, lineHeight: 20 }}>
                                {language === 'ar' ? 'سنعلمك عند وجود عروض جديدة أو تحديثات على طلباتك' : "We'll notify you about offers and order updates"}
                            </Text>
                        </View>
                    }
                    renderItem={renderNotification}
                />
            )}
        </View>
    );
}
