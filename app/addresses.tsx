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
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: item.is_default ? '#2E7D32' : '#F3F4F6',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        }}>
            <View style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>
                <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Ionicons name={item.type === 'home' ? 'home-outline' : 'business-outline'} size={18} color="#2E7D32" style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }} />
                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 16, color: '#212121' }}>
                            {item.name}
                        </Text>
                        {item.is_default && (
                            <View style={{
                                backgroundColor: '#E8F5E9',
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: 4,
                                marginLeft: isRTL ? 0 : 8,
                                marginRight: isRTL ? 8 : 0
                            }}>
                                <Text style={{ fontFamily: 'Cairo_600SemiBold', fontSize: 10, color: '#2E7D32' }}>
                                    {language === 'ar' ? 'الافتراضي' : 'Default'}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 14, color: '#616161', textAlign: isRTL ? 'right' : 'left', marginBottom: 4 }}>
                        {item.city}, {item.area}
                    </Text>
                    <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 14, color: '#757575', textAlign: isRTL ? 'right' : 'left' }}>
                        {item.street}, {item.details}
                    </Text>
                    <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 14, color: '#757575', textAlign: isRTL ? 'right' : 'left', marginTop: 4 }}>
                        {item.phone}
                    </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    {!item.is_default && (
                        <TouchableOpacity
                            onPress={() => setAsDefault(item.id)}
                            style={{ 
                                padding: 8,
                                backgroundColor: '#E8F5E9',
                                borderRadius: 8,
                                marginBottom: 8
                            }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={20} color="#2E7D32" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={{ padding: 8 }}
                    >
                        <Ionicons name="trash-outline" size={20} color="#D32F2F" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
                    {t('profile.addresses') || (language === 'ar' ? 'عناويني' : 'My Addresses')}
                </Text>
                <TouchableOpacity onPress={() => router.push('/address/add')}>
                    <Ionicons name="add" size={24} color="#2E7D32" />
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
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                            <Ionicons name="location-outline" size={64} color="#E0E0E0" />
                            <Text style={{ fontFamily: 'Cairo_400Regular', color: '#9CA3AF', marginTop: 16 }}>
                                {language === 'ar' ? 'لا توجد عناوين محفوظة' : 'No addresses saved'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/address/add')}
                                style={{
                                    marginTop: 20,
                                    backgroundColor: '#2E7D32',
                                    paddingHorizontal: 24,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{ fontFamily: 'Cairo_700Bold', color: '#FFFFFF' }}>
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
