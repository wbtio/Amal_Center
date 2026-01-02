import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AddAddressScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, language, isRTL } = useLanguage();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        area: '',
        street: '',
        details: '',
        type: 'home' // home or work
    });

    const handleSave = async () => {
        if (!formData.name || !formData.phone || !formData.city || !formData.area || !formData.street) {
            Alert.alert(t('common.error'), language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No session');

            const { error } = await supabase.from('addresses').insert({
                user_id: session.user.id,
                ...formData,
                is_default: false // Default to false for now
            });

            if (error) throw error;

            Alert.alert(
                t('common.success'),
                language === 'ar' ? 'تم إضافة العنوان بنجاح' : 'Address added successfully',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error(error);
            Alert.alert(t('common.error'), t('errors.general'));
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (label: string, field: keyof typeof formData, placeholder: string, keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default') => (
        <View style={{ marginBottom: 16 }}>
            <Text style={{
                fontFamily: 'Cairo_600SemiBold',
                fontSize: 14,
                color: '#212121',
                marginBottom: 8,
                textAlign: isRTL ? 'right' : 'left'
            }}>
                {label} <Text style={{ color: '#D32F2F' }}>*</Text>
            </Text>
            <TextInput
                style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 12,
                    padding: 12,
                    fontFamily: 'Cairo_400Regular',
                    textAlign: isRTL ? 'right' : 'left',
                    fontSize: 16
                }}
                placeholder={placeholder}
                value={formData[field]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
                keyboardType={keyboardType}
            />
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
                    {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {/* Type Selection */}
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', marginBottom: 24, gap: 12 }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: formData.type === 'home' ? '#E8F5E9' : '#FFFFFF',
                                borderWidth: 1,
                                borderColor: formData.type === 'home' ? '#2E7D32' : '#E0E0E0',
                                padding: 12,
                                borderRadius: 12,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 8
                            }}
                            onPress={() => setFormData(prev => ({ ...prev, type: 'home' }))}
                        >
                            <Ionicons name="home-outline" size={20} color={formData.type === 'home' ? '#2E7D32' : '#757575'} />
                            <Text style={{ fontFamily: 'Cairo_600SemiBold', color: formData.type === 'home' ? '#2E7D32' : '#757575' }}>
                                {language === 'ar' ? 'منزل' : 'Home'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: formData.type === 'work' ? '#E8F5E9' : '#FFFFFF',
                                borderWidth: 1,
                                borderColor: formData.type === 'work' ? '#2E7D32' : '#E0E0E0',
                                padding: 12,
                                borderRadius: 12,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 8
                            }}
                            onPress={() => setFormData(prev => ({ ...prev, type: 'work' }))}
                        >
                            <Ionicons name="business-outline" size={20} color={formData.type === 'work' ? '#2E7D32' : '#757575'} />
                            <Text style={{ fontFamily: 'Cairo_600SemiBold', color: formData.type === 'work' ? '#2E7D32' : '#757575' }}>
                                {language === 'ar' ? 'عمل' : 'Work'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {renderInput(language === 'ar' ? 'اسم العنوان (مثلاً: المنزل)' : 'Label (e.g. Home)', 'name', language === 'ar' ? 'المنزل' : 'Home')}
                    {renderInput(language === 'ar' ? 'رقم الهاتف' : 'Phone Number', 'phone', '078xxxxxxxx', 'phone-pad')}
                    {renderInput(language === 'ar' ? 'المدينة' : 'City', 'city', language === 'ar' ? 'بغداد' : 'Baghdad')}
                    {renderInput(language === 'ar' ? 'المنطقة' : 'Area', 'area', language === 'ar' ? 'الكرادة' : 'Karrada')}
                    {renderInput(language === 'ar' ? 'الشارع' : 'Street', 'street', language === 'ar' ? 'شارع 62' : '62 St.')}

                    <View style={{ marginBottom: 16 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'تفاصيل إضافية (اختياري)' : 'Additional Details (Optional)'}
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 1,
                                borderColor: '#E0E0E0',
                                borderRadius: 12,
                                padding: 12,
                                fontFamily: 'Cairo_400Regular',
                                textAlign: isRTL ? 'right' : 'left',
                                fontSize: 16,
                                minHeight: 80
                            }}
                            placeholder={language === 'ar' ? 'أقرب نقطة دالة...' : 'Nearest landmark...'}
                            value={formData.details}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, details: text }))}
                            multiline
                        />
                    </View>
                </ScrollView>

                <View style={{ padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#2E7D32',
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                            shadowColor: '#2E7D32',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 4
                        }}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 16, color: '#FFFFFF' }}>
                                {language === 'ar' ? 'حفظ العنوان' : 'Save Address'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
