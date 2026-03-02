import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_CONFIG } from '../../constants/app';

interface ContactOption {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    title_ar: string;
    title_en: string;
    subtitle_ar: string;
    subtitle_en: string;
    color: string;
    bgColor: string;
    action: () => void;
}

export default function ContactScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { language, isRTL } = useLanguage();

    const contactOptions: ContactOption[] = [
        {
            id: 'whatsapp',
            icon: 'logo-whatsapp',
            title_ar: 'واتساب',
            title_en: 'WhatsApp',
            subtitle_ar: 'تواصل معنا عبر الواتساب',
            subtitle_en: 'Chat with us on WhatsApp',
            color: '#25D366',
            bgColor: '#E8F8ED',
            action: () => Linking.openURL(APP_CONFIG.WHATSAPP_URL)
        },
        {
            id: 'phone',
            icon: 'call-outline',
            title_ar: 'اتصل بنا',
            title_en: 'Call Us',
            subtitle_ar: APP_CONFIG.WHATSAPP_NUMBER,
            subtitle_en: APP_CONFIG.WHATSAPP_NUMBER,
            color: '#2196F3',
            bgColor: '#E3F2FD',
            action: () => Linking.openURL(`tel:${APP_CONFIG.WHATSAPP_NUMBER}`)
        },
        {
            id: 'email',
            icon: 'mail-outline',
            title_ar: 'البريد الإلكتروني',
            title_en: 'Email',
            subtitle_ar: APP_CONFIG.SUPPORT_EMAIL,
            subtitle_en: APP_CONFIG.SUPPORT_EMAIL,
            color: '#FF5722',
            bgColor: '#FBE9E7',
            action: () => Linking.openURL(`mailto:${APP_CONFIG.SUPPORT_EMAIL}`)
        },
        {
            id: 'facebook',
            icon: 'logo-facebook',
            title_ar: 'فيسبوك',
            title_en: 'Facebook',
            subtitle_ar: 'تابعنا على فيسبوك',
            subtitle_en: 'Follow us on Facebook',
            color: '#1877F2',
            bgColor: '#E7F0FF',
            action: () => Linking.openURL(APP_CONFIG.FACEBOOK_URL)
        },
        {
            id: 'instagram',
            icon: 'logo-instagram',
            title_ar: 'انستغرام',
            title_en: 'Instagram',
            subtitle_ar: 'تابعنا على انستغرام',
            subtitle_en: 'Follow us on Instagram',
            color: '#E4405F',
            bgColor: '#FCE4EC',
            action: () => Linking.openURL(APP_CONFIG.INSTAGRAM_URL)
        }
    ];

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
                    fontFamily: 'IBMPlexSansArabic_700Bold',
                    fontSize: 18,
                    color: '#212121'
                }}>
                    {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Card */}
                <View style={{
                    backgroundColor: '#2E7D32',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 20,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                    }}>
                        <Ionicons name="headset-outline" size={32} color="#FFFFFF" />
                    </View>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_700Bold',
                        fontSize: 20,
                        color: '#FFFFFF',
                        marginBottom: 8
                    }}>
                        {language === 'ar' ? 'نحن هنا لمساعدتك' : "We're here to help"}
                    </Text>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_400Regular',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.9)',
                        textAlign: 'center',
                        lineHeight: 22
                    }}>
                        {language === 'ar' 
                            ? 'فريق الدعم متاح على مدار الساعة للإجابة على استفساراتك'
                            : 'Our support team is available 24/7 to answer your questions'}
                    </Text>
                </View>

                {/* Contact Options */}
                <Text style={{
                    fontFamily: 'IBMPlexSansArabic_700Bold',
                    fontSize: 16,
                    color: '#212121',
                    marginBottom: 12,
                    textAlign: isRTL ? 'right' : 'left'
                }}>
                    {language === 'ar' ? 'طرق التواصل' : 'Contact Methods'}
                </Text>

                {contactOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 10,
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#F3F4F6'
                        }}
                        onPress={option.action}
                        activeOpacity={0.7}
                    >
                        <View style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            backgroundColor: option.bgColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: isRTL ? 0 : 14,
                            marginLeft: isRTL ? 14 : 0
                        }}>
                            <Ionicons name={option.icon} size={24} color={option.color} />
                        </View>
                        <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 15,
                                color: '#212121'
                            }}>
                                {language === 'ar' ? option.title_ar : option.title_en}
                            </Text>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 13,
                                color: '#757575',
                                marginTop: 2
                            }}>
                                {language === 'ar' ? option.subtitle_ar : option.subtitle_en}
                            </Text>
                        </View>
                        <Ionicons 
                            name={isRTL ? "chevron-back" : "chevron-forward"} 
                            size={20} 
                            color="#BDBDBD" 
                        />
                    </TouchableOpacity>
                ))}

                {/* Working Hours */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 16,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#F3F4F6'
                }}>
                    <View style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        marginBottom: 12
                    }}>
                        <Ionicons 
                            name="time-outline" 
                            size={20} 
                            color="#2E7D32" 
                            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
                        />
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_700Bold',
                            fontSize: 15,
                            color: '#212121'
                        }}>
                            {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                        </Text>
                    </View>
                    
                    <View style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F4F6'
                    }}>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', fontSize: 14, color: '#616161' }}>
                            {language === 'ar' ? 'السبت - الخميس' : 'Saturday - Thursday'}
                        </Text>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_600SemiBold', fontSize: 14, color: '#212121' }}>
                            {language === 'ar' ? '٨ ص - ١٠ م' : '8 AM - 10 PM'}
                        </Text>
                    </View>
                    
                    <View style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 8
                    }}>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_400Regular', fontSize: 14, color: '#616161' }}>
                            {language === 'ar' ? 'الجمعة' : 'Friday'}
                        </Text>
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_600SemiBold', fontSize: 14, color: '#212121' }}>
                            {language === 'ar' ? '٢ م - ١٠ م' : '2 PM - 10 PM'}
                        </Text>
                    </View>
                </View>

                {/* Location */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 16,
                    marginTop: 10,
                    marginBottom: 20,
                    borderWidth: 1,
                    borderColor: '#F3F4F6'
                }}>
                    <View style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        marginBottom: 8
                    }}>
                        <Ionicons 
                            name="location-outline" 
                            size={20} 
                            color="#2E7D32" 
                            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
                        />
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_700Bold',
                            fontSize: 15,
                            color: '#212121'
                        }}>
                            {language === 'ar' ? 'العنوان' : 'Address'}
                        </Text>
                    </View>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_400Regular',
                        fontSize: 14,
                        color: '#616161',
                        textAlign: isRTL ? 'right' : 'left',
                        lineHeight: 22
                    }}>
                        {language === 'ar' 
                            ? 'بغداد، العراق\nشارع الرشيد، مقابل سوق الشورجة'
                            : 'Baghdad, Iraq\nAl-Rasheed Street, opposite Shorja Market'}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
