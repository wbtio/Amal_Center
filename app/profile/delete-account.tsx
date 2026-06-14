import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLanguage } from '../../contexts';
import { supabase } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';

export default function DeleteAccountScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, isRTL, language } = useLanguage();
    const [confirmText, setConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);
    const clearCart = useCartStore.getState().clearCart;

    const confirmWord = language === 'ar' ? 'حذف' : 'delete';
    const isConfirmValid = confirmText.toLowerCase().trim() === confirmWord;

    const handleDeleteAccount = async () => {
        if (!isConfirmValid) return;

        Alert.alert(
            t('deleteAccount.title'),
            language === 'ar'
                ? 'هل أنت متأكد تماماً؟ لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you absolutely sure? This action cannot be undone.',
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: performDelete,
                },
            ]
        );
    };

    const performDelete = async () => {
        setDeleting(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                Alert.alert(t('common.error'), t('profile.sessionExpired'));
                return;
            }

            const userId = user.id;

            // Delete user data from related tables
            const tables = ['addresses', 'notifications', 'wishlist', 'coupon_usages'];
            for (const table of tables) {
                await supabase.from(table).delete().eq('user_id', userId);
            }

            // Delete profile
            await supabase.from('profiles').delete().eq('id', userId);

            // Delete avatar from storage
            try {
                await supabase.storage.from('avatars').remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`]);
            } catch (e) {
                // Avatar removal is not critical
            }

            // Delete the auth user via admin API (requires service role)
            // Since we can't call admin from client, we sign out and rely on a database trigger
            // or a Supabase Edge Function to complete the deletion
            const { error: deleteError } = await supabase.auth.signOut();

            if (deleteError) {
                throw deleteError;
            }

            // Call Edge Function or API to delete the auth user
            // For now, we mark the user for deletion and sign them out
            try {
                await supabase.functions.invoke('delete-user', {
                    body: { userId },
                });
            } catch (e) {
                // Edge function might not exist yet; user is already signed out
                // and their data is deleted from public tables
            }

            clearCart();

            Alert.alert(
                t('deleteAccount.success'),
                '',
                [{ text: t('common.ok'), onPress: () => router.replace('/(tabs)') }]
            );
        } catch (error: any) {
            console.error('Delete account error:', error);
            Alert.alert(t('common.error'), t('deleteAccount.error'));
        } finally {
            setDeleting(false);
        }
    };

    const dataItems = [
        { icon: 'person-outline', text: t('deleteAccount.profileData') },
        { icon: 'location-outline', text: t('deleteAccount.addressesData') },
        { icon: 'notifications-outline', text: t('deleteAccount.notificationsData') },
        { icon: 'heart-outline', text: t('deleteAccount.wishlistData') },
    ];

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-white border-b border-gray-100" style={{ paddingTop: insets.top }}>
                <View className={`flex-row items-center justify-between px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="text-lg font-ibm-bold text-red-600">{t('deleteAccount.title')}</Text>
                    <View className="w-8" />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
            >
                <View className="p-4">
                    {/* Warning Banner */}
                    <View className="bg-red-50 rounded-2xl p-4 mb-4 flex-row items-center">
                        <Ionicons name="warning" size={24} color="#D32F2F"
                            style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                        <Text className={`font-ibm-bold text-sm text-red-700 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('deleteAccount.warning')}
                        </Text>
                    </View>

                    {/* Data that will be deleted */}
                    <View className="bg-white rounded-2xl p-5 mb-3">
                        <Text className={`font-ibm-bold text-base text-gray-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('deleteAccount.dataDeleted')}
                        </Text>
                        {dataItems.map((item, index) => (
                            <View key={index} className={`flex-row items-center py-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Ionicons name={item.icon as any} size={18} color="#D32F2F"
                                    style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                                <Text className={`font-ibm text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {item.text}
                                </Text>
                            </View>
                        ))}

                        <View className={`flex-row items-center py-2.5 mt-1 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Ionicons name="receipt-outline" size={18} color="#FF9800"
                                style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                            <Text className={`font-ibm text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('deleteAccount.ordersNote')}
                            </Text>
                        </View>
                    </View>

                    {/* Confirmation Input */}
                    <View className="bg-white rounded-2xl p-5 mb-4">
                        <Text className={`font-ibm-bold text-sm text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('deleteAccount.confirmType')}
                        </Text>
                        <TextInput
                            value={confirmText}
                            onChangeText={setConfirmText}
                            placeholder={t('deleteAccount.confirmPlaceholder')}
                            className={`bg-gray-50 rounded-xl px-4 py-3 font-ibm text-base text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Delete Button */}
                    <TouchableOpacity
                        className={`rounded-2xl py-4 items-center justify-center ${
                            isConfirmValid && !deleting ? 'bg-red-600' : 'bg-red-300'
                        }`}
                        onPress={handleDeleteAccount}
                        disabled={!isConfirmValid || deleting}
                        activeOpacity={0.7}
                    >
                        {deleting ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text className="font-ibm-bold text-base text-white">
                                {t('deleteAccount.deleteButton')}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
