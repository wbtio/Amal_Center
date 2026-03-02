import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function AddressesScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t, language, isRTL } = useLanguage();

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    const fetchAddresses = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('addresses')
                .select('*')
                .eq('user_id', session.user.id)
                .order('is_default', { ascending: false });

            if (error) throw error;
            setAddresses(data || []);
        } catch (error) {
            console.error(error);
            Alert.alert(t('common.error'), t('errors.fetchFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            t('common.delete'),
            language === 'ar' ? 'هل أنت متأكد من حذف هذا العنوان؟' : 'Are you sure you want to delete this address?',
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { error } = await supabase.from('addresses').delete().eq('id', id);
                            if (error) throw error;
                            fetchAddresses();
                            Alert.alert(
                                language === 'ar' ? 'تم' : 'Done',
                                language === 'ar' ? 'تم حذف العنوان بنجاح' : 'Address deleted successfully'
                            );
                        } catch (error) {
                            Alert.alert(t('common.error'), t('errors.general'));
                        }
                    }
                }
            ]
        );
    };

    const setAsDefault = async (id: string) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            // First, unset all defaults
            await supabase
                .from('addresses')
                .update({ is_default: false })
                .eq('user_id', session.user.id);

            // Then set the selected one as default
            const { error } = await supabase
                .from('addresses')
                .update({ is_default: true })
                .eq('id', id);

            if (error) throw error;

            fetchAddresses();
            Alert.alert(
                language === 'ar' ? 'تم' : 'Done',
                language === 'ar' ? 'تم تعيين العنوان كافتراضي' : 'Address set as default'
            );
        } catch (error) {
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في تعيين العنوان كافتراضي' : 'Failed to set as default'
            );
        }
    };

    const renderAddress = ({ item }: { item: any }) => (
        <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            marginBottom: 12,
            borderWidth: item.is_default ? 1.5 : 1,
            borderColor: item.is_default ? '#2E7D32' : '#F3F4F6',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
        }}>
            <View style={{ padding: 14 }}>
                <View style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                }}>
                    {/* Type Icon */}
                    <View style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        backgroundColor: item.is_default ? '#E8F5E9' : '#F3F4F6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0,
                    }}>
                        <Ionicons
                            name={item.type === 'home' ? 'home' : 'briefcase'}
                            size={20}
                            color={item.is_default ? '#2E7D32' : '#6B7280'}
                        />
                    </View>

                    {/* Address Info */}
                    <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                        <View style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            marginBottom: 4,
                        }}>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 15,
                                color: '#1F2937',
                            }}>
                                {item.name}
                            </Text>
                            {item.is_default && (
                                <View style={{
                                    backgroundColor: '#E8F5E9',
                                    paddingHorizontal: 8,
                                    paddingVertical: 2,
                                    borderRadius: 10,
                                    marginLeft: isRTL ? 0 : 8,
                                    marginRight: isRTL ? 8 : 0,
                                }}>
                                    <Text style={{
                                        fontFamily: 'IBMPlexSansArabic_700Bold',
                                        fontSize: 9,
                                        color: '#2E7D32',
                                    }}>
                                        {language === 'ar' ? 'الافتراضي' : 'DEFAULT'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 13,
                            color: '#6B7280',
                            textAlign: isRTL ? 'right' : 'left',
                            lineHeight: 20,
                        }}>
                            {[item.city, item.area, item.street].filter(Boolean).join(', ')}
                        </Text>

                        {item.phone && (
                            <View style={{
                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                marginTop: 6,
                            }}>
                                <Ionicons name="call-outline" size={12} color="#9CA3AF" style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }} />
                                <Text style={{
                                    fontFamily: 'IBMPlexSansArabic_400Regular',
                                    fontSize: 12,
                                    color: '#9CA3AF',
                                }}>
                                    {item.phone}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Action buttons */}
                <View style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    marginTop: 12,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    justifyContent: isRTL ? 'flex-start' : 'flex-end',
                    gap: 8,
                }}>
                    {!item.is_default && (
                        <TouchableOpacity
                            onPress={() => setAsDefault(item.id)}
                            style={{
                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                paddingHorizontal: 12,
                                paddingVertical: 7,
                                backgroundColor: '#E8F5E9',
                                borderRadius: 8,
                            }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={14} color="#2E7D32" style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }} />
                            <Text style={{ fontFamily: 'IBMPlexSansArabic_600SemiBold', fontSize: 11, color: '#2E7D32' }}>
                                {language === 'ar' ? 'تعيين كافتراضي' : 'Set Default'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 7,
                            backgroundColor: '#FEF2F2',
                            borderRadius: 8,
                        }}
                    >
                        <Ionicons name="trash-outline" size={14} color="#EF4444" style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }} />
                        <Text style={{ fontFamily: 'IBMPlexSansArabic_600SemiBold', fontSize: 11, color: '#EF4444' }}>
                            {language === 'ar' ? 'حذف' : 'Delete'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

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
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'IBMPlexSansArabic_700Bold',
                    fontSize: 17,
                    color: '#1F2937'
                }}>
                    {t('profile.addresses') || (language === 'ar' ? 'عناويني' : 'My Addresses')}
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/address/add')}
                    style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name="add" size={20} color="#2E7D32" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#2E7D32" size="large" />
                </View>
            ) : (
                <FlatList
                    data={addresses}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#EEF2FF',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                            }}>
                                <Ionicons name="location-outline" size={44} color="#818CF8" />
                            </View>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 16,
                                color: '#374151',
                                marginBottom: 6,
                            }}>
                                {language === 'ar' ? 'لا توجد عناوين محفوظة' : 'No addresses saved'}
                            </Text>
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 13,
                                color: '#9CA3AF',
                                textAlign: 'center',
                                maxWidth: 250,
                                lineHeight: 20,
                                marginBottom: 20,
                            }}>
                                {language === 'ar' ? 'أضف عنوانك لتسريع عملية الطلب' : 'Add your address to speed up checkout'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/address/add')}
                                style={{
                                    backgroundColor: '#2E7D32',
                                    paddingHorizontal: 28,
                                    paddingVertical: 12,
                                    borderRadius: 12,
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" style={isRTL ? { marginLeft: 6 } : { marginRight: 6 }} />
                                <Text style={{ fontFamily: 'IBMPlexSansArabic_700Bold', color: '#FFFFFF', fontSize: 14 }}>
                                    {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    renderItem={renderAddress}
                />
            )}
        </View>
    );
}
