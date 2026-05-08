import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLanguage } from '../../contexts';
import { supabase } from '../../lib/supabase';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, isRTL } = useLanguage();
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendResetLink = async () => {
        if (!email.trim()) return;

        setSending(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: 'alamalcenter://reset-password',
            });

            if (error) {
                Alert.alert(t('common.error'), t('forgotPassword.error'));
                return;
            }

            setSent(true);
        } catch (error) {
            Alert.alert(t('common.error'), t('forgotPassword.error'));
        } finally {
            setSending(false);
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-white border-b border-gray-100" style={{ paddingTop: insets.top }}>
                <View className={`flex-row items-center justify-between px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="text-lg font-ibm-bold text-gray-800">{t('forgotPassword.title')}</Text>
                    <View className="w-8" />
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 p-6 justify-center">
                    {sent ? (
                        <View className="items-center">
                            <View className="w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6">
                                <Ionicons name="checkmark-circle" size={48} color="#2E7D32" />
                            </View>
                            <Text className="font-ibm-bold text-xl text-gray-800 mb-3 text-center">
                                {t('forgotPassword.success')}
                            </Text>
                            <Text className="font-ibm text-sm text-gray-500 text-center leading-6 mb-8">
                                {t('forgotPassword.successMessage')}
                            </Text>
                            <TouchableOpacity
                                className="bg-primary rounded-xl py-3.5 px-8 w-full"
                                onPress={() => router.replace('/auth/login')}
                                activeOpacity={0.7}
                            >
                                <Text className="font-ibm-bold text-base text-white text-center">
                                    {t('forgotPassword.backToLogin')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-6 self-center">
                                <Ionicons name="lock-closed-outline" size={32} color="#2E7D32" />
                            </View>

                            <Text className={`font-ibm text-sm text-gray-500 text-center leading-6 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('forgotPassword.subtitle')}
                            </Text>

                            <View className="bg-white rounded-2xl p-4 mb-4">
                                <Text className={`font-ibm text-sm text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('forgotPassword.email')}
                                </Text>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder={t('forgotPassword.emailPlaceholder')}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className={`bg-gray-50 rounded-xl px-4 py-3.5 font-ibm text-base text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}
                                />
                            </View>

                            <TouchableOpacity
                                className={`rounded-xl py-4 items-center justify-center ${
                                    email.trim() && !sending ? 'bg-primary' : 'bg-primary/40'
                                }`}
                                onPress={handleSendResetLink}
                                disabled={!email.trim() || sending}
                                activeOpacity={0.7}
                            >
                                {sending ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text className="font-ibm-bold text-base text-white">
                                        {t('forgotPassword.sendLink')}
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="mt-4 py-3 items-center"
                                onPress={() => router.back()}
                            >
                                <Text className="font-ibm text-sm text-primary">
                                    {t('forgotPassword.backToLogin')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
