import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem {
    id: string;
    question_ar: string;
    question_en: string;
    answer_ar: string;
    answer_en: string;
}

const faqData: FAQItem[] = [
    {
        id: '1',
        question_ar: 'كيف يمكنني تتبع طلبي؟',
        question_en: 'How can I track my order?',
        answer_ar: 'يمكنك تتبع طلبك من خلال الذهاب إلى صفحة "طلباتي" في حسابك. ستجد هناك جميع طلباتك مع حالة كل طلب محدثة.',
        answer_en: 'You can track your order by going to "My Orders" page in your account. There you will find all your orders with updated status for each order.'
    },
    {
        id: '2',
        question_ar: 'ما هي طرق الدفع المتاحة؟',
        question_en: 'What payment methods are available?',
        answer_ar: 'نوفر عدة طرق للدفع: الدفع عند الاستلام (كاش)، البطاقات الائتمانية (Visa, Mastercard)، والمحافظ الإلكترونية (Zain Cash, Asia Hawala).',
        answer_en: 'We offer several payment methods: Cash on Delivery, Credit Cards (Visa, Mastercard), and E-Wallets (Zain Cash, Asia Hawala).'
    },
    {
        id: '3',
        question_ar: 'كم تستغرق عملية التوصيل؟',
        question_en: 'How long does delivery take?',
        answer_ar: 'التوصيل العادي يستغرق من 24-48 ساعة. التوصيل السريع متاح ويستغرق ساعتين فقط. أوقات التوصيل قد تختلف حسب موقعك.',
        answer_en: 'Standard delivery takes 24-48 hours. Express delivery is available and takes only 2 hours. Delivery times may vary based on your location.'
    },
    {
        id: '4',
        question_ar: 'هل يمكنني إلغاء طلبي؟',
        question_en: 'Can I cancel my order?',
        answer_ar: 'نعم، يمكنك إلغاء طلبك إذا كان في حالة "قيد الانتظار" أو "تم التأكيد". بمجرد بدء تحضير الطلب، لا يمكن إلغاؤه.',
        answer_en: 'Yes, you can cancel your order if it is in "Pending" or "Confirmed" status. Once the order preparation starts, it cannot be cancelled.'
    },
    {
        id: '5',
        question_ar: 'ما هي سياسة الاسترجاع؟',
        question_en: 'What is the return policy?',
        answer_ar: 'يمكنك إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام بشرط أن تكون في حالتها الأصلية. المنتجات الغذائية القابلة للتلف غير قابلة للإرجاع.',
        answer_en: 'You can return products within 7 days of receipt provided they are in their original condition. Perishable food products are non-returnable.'
    },
    {
        id: '6',
        question_ar: 'كيف يمكنني التواصل مع خدمة العملاء؟',
        question_en: 'How can I contact customer service?',
        answer_ar: 'يمكنك التواصل معنا عبر الواتساب، أو من خلال صفحة "اتصل بنا" في التطبيق، أو عبر البريد الإلكتروني support@al-amal-center.iq',
        answer_en: 'You can contact us via WhatsApp, through the "Contact Us" page in the app, or via email at support@al-amal-center.iq'
    },
    {
        id: '7',
        question_ar: 'هل التوصيل مجاني؟',
        question_en: 'Is delivery free?',
        answer_ar: 'التوصيل مجاني للطلبات التي تزيد عن 50,000 دينار عراقي. للطلبات الأقل، تُحسب رسوم التوصيل حسب المنطقة.',
        answer_en: 'Delivery is free for orders over 50,000 IQD. For smaller orders, delivery fees are calculated based on your area.'
    },
    {
        id: '8',
        question_ar: 'كيف أستخدم كود الخصم؟',
        question_en: 'How do I use a discount code?',
        answer_ar: 'عند إتمام الطلب في صفحة السلة، أدخل كود الخصم في الحقل المخصص واضغط "تطبيق". سيتم خصم المبلغ تلقائياً.',
        answer_en: 'When checking out in the cart page, enter the discount code in the designated field and press "Apply". The amount will be deducted automatically.'
    }
];

export default function FAQScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { language, isRTL } = useLanguage();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
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
                    {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Info */}
                <View style={{
                    backgroundColor: '#E8F5E9',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center'
                }}>
                    <Ionicons 
                        name="help-circle" 
                        size={32} 
                        color="#2E7D32" 
                        style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_700Bold',
                            fontSize: 16,
                            color: '#1B5E20',
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                        </Text>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 13,
                            color: '#2E7D32',
                            textAlign: isRTL ? 'right' : 'left',
                            marginTop: 2
                        }}>
                            {language === 'ar' ? 'اعثر على إجابات لأسئلتك الشائعة' : 'Find answers to your common questions'}
                        </Text>
                    </View>
                </View>

                {/* FAQ Items */}
                {faqData.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 12,
                            marginBottom: 8,
                            borderWidth: 1,
                            borderColor: expandedId === item.id ? '#2E7D32' : '#F3F4F6',
                            overflow: 'hidden'
                        }}
                        onPress={() => toggleExpand(item.id)}
                        activeOpacity={0.7}
                    >
                        <View style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            padding: 16
                        }}>
                            <View style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: expandedId === item.id ? '#2E7D32' : '#F3F4F6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: isRTL ? 0 : 12,
                                marginLeft: isRTL ? 12 : 0
                            }}>
                                <Text style={{
                                    fontFamily: 'IBMPlexSansArabic_700Bold',
                                    fontSize: 14,
                                    color: expandedId === item.id ? '#FFFFFF' : '#757575'
                                }}>
                                    {item.id}
                                </Text>
                            </View>
                            <Text style={{
                                flex: 1,
                                fontFamily: 'IBMPlexSansArabic_600SemiBold',
                                fontSize: 14,
                                color: '#212121',
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {language === 'ar' ? item.question_ar : item.question_en}
                            </Text>
                            <Ionicons 
                                name={expandedId === item.id ? "chevron-up" : "chevron-down"} 
                                size={20} 
                                color="#757575" 
                            />
                        </View>
                        
                        {expandedId === item.id && (
                            <View style={{
                                paddingHorizontal: 16,
                                paddingBottom: 16,
                                paddingTop: 0,
                                borderTopWidth: 1,
                                borderTopColor: '#F3F4F6'
                            }}>
                                <Text style={{
                                    fontFamily: 'IBMPlexSansArabic_400Regular',
                                    fontSize: 14,
                                    color: '#616161',
                                    textAlign: isRTL ? 'right' : 'left',
                                    lineHeight: 24,
                                    paddingTop: 12
                                }}>
                                    {language === 'ar' ? item.answer_ar : item.answer_en}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Still need help */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 20,
                    marginTop: 8,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#F3F4F6'
                }}>
                    <Ionicons name="chatbubbles-outline" size={40} color="#2E7D32" />
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_700Bold',
                        fontSize: 16,
                        color: '#212121',
                        marginTop: 12
                    }}>
                        {language === 'ar' ? 'لم تجد إجابتك؟' : "Didn't find your answer?"}
                    </Text>
                    <Text style={{
                        fontFamily: 'IBMPlexSansArabic_400Regular',
                        fontSize: 13,
                        color: '#757575',
                        textAlign: 'center',
                        marginTop: 4
                    }}>
                        {language === 'ar' ? 'تواصل معنا وسنساعدك' : 'Contact us and we will help you'}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#2E7D32',
                            borderRadius: 8,
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            marginTop: 16
                        }}
                        onPress={() => router.push('/help/contact')}
                    >
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_700Bold',
                            fontSize: 14,
                            color: '#FFFFFF'
                        }}>
                            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
