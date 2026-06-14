import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts';
import { APP_CONFIG } from '../../constants/app';
import { useContentPage } from '../../hooks/useSupabase';

export default function TermsOfServiceScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, isRTL, language } = useLanguage();
    const { data: page } = useContentPage('terms');

    const openFullTerms = () => {
        Linking.openURL(APP_CONFIG.TERMS_OF_SERVICE_URL);
    };

    const pageTitle = page ? (language === 'ar' ? page.title_ar : page.title_en) : t('terms.title');
    const pageIntro = page ? (language === 'ar' ? page.intro_ar : page.intro_en) : t('terms.intro');

    const sections = page && page.sections?.length
        ? page.sections.map(sec => ({
            title: language === 'ar' ? sec.title_ar : sec.title_en,
            content: language === 'ar' ? sec.content_ar : sec.content_en,
            icon: sec.icon || 'document-text-outline',
        }))
        : [
            { title: t('terms.ordering'), content: t('terms.orderingContent'), icon: 'cart-outline' },
            { title: t('terms.returns'), content: t('terms.returnsContent'), icon: 'return-down-back-outline' },
            { title: t('terms.delivery'), content: t('terms.deliveryContent'), icon: 'car-outline' },
            { title: t('terms.coupons'), content: t('terms.couponsContent'), icon: 'pricetag-outline' },
            { title: t('terms.liability'), content: t('terms.liabilityContent'), icon: 'information-circle-outline' },
            { title: t('terms.changes'), content: t('terms.changesContent'), icon: 'create-outline' },
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
                                <Ionicons name="document-text-outline" size={20} color="#2E7D32" />
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

                    <TouchableOpacity
                        className="bg-primary/10 rounded-2xl p-4 mb-4 flex-row items-center justify-center"
                        onPress={openFullTerms}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="open-outline" size={18} color="#2E7D32"
                            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }} />
                        <Text className="font-ibm-bold text-primary text-sm">
                            {t('terms.readFullTerms')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
