import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts';
import { APP_CONFIG } from '../../constants/app';
import { useContentPage, useAppSettings } from '../../hooks/useSupabase';
import { DEFAULT_SETTINGS } from '../../services/settings.service';

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, isRTL, language } = useLanguage();
    const { data: page } = useContentPage('privacy');
    const { data: settings } = useAppSettings();
    const supportEmail = (settings ?? DEFAULT_SETTINGS).contact.supportEmail;

    const openFullPolicy = () => {
        Linking.openURL(APP_CONFIG.PRIVACY_POLICY_URL);
    };

    const pageTitle = page ? (language === 'ar' ? page.title_ar : page.title_en) : t('privacy.title');
    const pageIntro = page ? (language === 'ar' ? page.intro_ar : page.intro_en) : t('privacy.intro');

    const sections = page && page.sections?.length
        ? page.sections.map(sec => ({
            title: language === 'ar' ? sec.title_ar : sec.title_en,
            content: language === 'ar' ? sec.content_ar : sec.content_en,
            icon: sec.icon || 'document-text-outline',
        }))
        : [
            { title: t('privacy.dataCollected'), content: t('privacy.dataCollectedContent'), icon: 'document-text-outline' },
            { title: t('privacy.howWeUse'), content: t('privacy.howWeUseContent'), icon: 'settings-outline' },
            { title: t('privacy.dataStorage'), content: t('privacy.dataStorageContent'), icon: 'server-outline' },
            { title: t('privacy.yourRights'), content: t('privacy.yourRightsContent'), icon: 'shield-checkmark-outline' },
        ];

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-white border-b border-gray-100" style={{ paddingTop: insets.top }}>
                <View className={`flex-row items-center justify-between px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="text-lg font-ibm-bold text-gray-800">{pageTitle}</Text>
                    <View className="w-8" />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}>
                <View className="p-4">
                    <View className="bg-white rounded-2xl p-5 mb-4">
                        <View className="flex-row items-center mb-3">
                            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                                <Ionicons name="shield-outline" size={20} color="#2E7D32" />
                            </View>
                            <Text className="font-ibm-bold text-base text-gray-800 flex-1">
                                {pageIntro}
                            </Text>
                        </View>
                    </View>

                    {sections.map((section, index) => (
                        <View key={index} className="bg-white rounded-2xl p-5 mb-3">
                            <View className={`flex-row items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <View className="w-9 h-9 bg-primary/10 rounded-full items-center justify-center"
                                    style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }}>
                                    <Ionicons name={section.icon as any} size={18} color="#2E7D32" />
                                </View>
                                <Text className={`font-ibm-bold text-base text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {section.title}
                                </Text>
                            </View>
                            <Text className={`font-ibm text-sm text-gray-600 leading-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {section.content}
                            </Text>
                        </View>
                    ))}

                    <View className="bg-white rounded-2xl p-5 mb-3">
                        <View className={`flex-row items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <View className="w-9 h-9 bg-blue-50 rounded-full items-center justify-center"
                                style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }}>
                                <Ionicons name="mail-outline" size={18} color="#2196F3" />
                            </View>
                            <Text className={`font-ibm-bold text-base text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('privacy.contactUs')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="flex-row items-center mt-1"
                            onPress={() => Linking.openURL(`mailto:${supportEmail}`)}
                        >
                            <Ionicons name="mail" size={16} color="#2E7D32"
                                style={{ marginRight: isRTL ? 0 : 6, marginLeft: isRTL ? 6 : 0 }} />
                            <Text className="font-ibm text-sm text-primary">
                                {supportEmail}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="bg-primary/10 rounded-2xl p-4 mb-4 flex-row items-center justify-center"
                        onPress={openFullPolicy}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="open-outline" size={18} color="#2E7D32"
                            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }} />
                        <Text className="font-ibm-bold text-primary text-sm">
                            {t('privacy.readFullPolicy')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
