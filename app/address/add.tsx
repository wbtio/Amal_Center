import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, FlatList, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocationPicker } from '../../components/ui/LocationPicker';
import { IRAQI_CITIES } from '../../types/checkout';

export default function AddAddressScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { language, isRTL } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [showCityPicker, setShowCityPicker] = useState(false);
    const alignClass = isRTL ? 'text-right' : 'text-left';
    const flexDir = isRTL ? 'flex-row-reverse' : 'flex-row';

    const [formData, setFormData] = useState({
        name: '', phone: '', city: '', area: '', street: '', details: '',
        type: 'home', latitude: null as number | null, longitude: null as number | null
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const load = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user?.id) return;
                const { data: profile } = await supabase.from('profiles').select('phone').eq('id', session.user.id).single();
                const phone = profile?.phone || session.user.user_metadata?.phone || '';
                setFormData(prev => ({ ...prev, phone: prev.phone || phone }));
            } catch (e) { console.error(e); }
        };
        load();
    }, []);

    const handleLocationSelect = (loc: { latitude: number; longitude: number; address?: string }) => {
        setFormData(prev => ({ ...prev, latitude: loc.latitude, longitude: loc.longitude, ...(loc.address ? { details: loc.address } : {}) }));
    };

    const validate = () => {
        const e: { [k: string]: string } = {};
        if (!formData.name.trim()) e.name = language === 'ar' ? 'مطلوب' : 'Required';
        if (!formData.phone.trim()) e.phone = language === 'ar' ? 'مطلوب' : 'Required';
        if (!formData.city.trim()) e.city = language === 'ar' ? 'مطلوب' : 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No session');
            const { error } = await supabase.from('addresses').insert({
                user_id: session.user.id, name: formData.name, phone: formData.phone,
                city: formData.city, area: formData.area, street: formData.street,
                details: formData.details, type: formData.type,
                latitude: formData.latitude, longitude: formData.longitude, is_default: false
            });
            if (error) throw error;
            router.back();
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const renderInput = (label: string, field: keyof typeof formData, placeholder: string, keyboardType: 'default' | 'phone-pad' = 'default', optional = false) => (
        <View className="mb-4">
            <Text className={`font-ibm-bold text-sm text-gray-700 mb-2 ${alignClass}`}>
                {label}{!optional && <Text className="text-red-500"> *</Text>}
                {optional && <Text className="font-ibm text-gray-400 text-xs"> ({language === 'ar' ? 'اختياري' : 'Optional'})</Text>}
            </Text>
            <TextInput
                className={`bg-gray-50 border ${errors[field] ? 'border-red-500' : 'border-gray-200'} rounded-xl p-4 font-ibm text-base text-gray-900`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
                placeholder={placeholder} placeholderTextColor="#9CA3AF"
                value={(formData[field] as string) || ''}
                onChangeText={(text) => { setFormData(prev => ({ ...prev, [field]: text })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })); }}
                keyboardType={keyboardType}
            />
            {errors[field] && <Text className={`text-red-500 text-xs mt-1 font-ibm ${alignClass}`}>{errors[field]}</Text>}
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className={`flex-row items-center px-4 py-3 bg-white border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 }}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#212121" />
                </TouchableOpacity>
                <Text className="flex-1 text-center font-ibm-bold text-lg text-gray-900">
                    {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16, paddingBottom: 180 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
            >

                {/* Address Type */}
                <View className="bg-white p-5 rounded-2xl border border-gray-100 mb-4" style={{ elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
                    <Text className={`font-ibm-bold text-base mb-4 text-gray-800 ${alignClass}`}>
                        {language === 'ar' ? 'نوع العنوان' : 'Address Type'}
                    </Text>
                    <View className={`flex-row gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {[{ id: 'home', labelAr: 'المنزل', labelEn: 'Home', icon: 'home' }, { id: 'work', labelAr: 'العمل', labelEn: 'Work', icon: 'briefcase' }].map(opt => (
                            <TouchableOpacity key={opt.id} onPress={() => setFormData(prev => ({ ...prev, type: opt.id }))}
                                className={`flex-1 flex-row items-center justify-center p-4 rounded-xl border-2 ${formData.type === opt.id ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-100'} ${isRTL ? 'flex-row-reverse' : ''}`}
                                activeOpacity={0.7}>
                                <Ionicons name={(formData.type === opt.id ? opt.icon : `${opt.icon}-outline`) as any} size={22} color={formData.type === opt.id ? '#2E7D32' : '#6B7280'} />
                                <Text className={`font-ibm-bold mx-2 text-base ${formData.type === opt.id ? 'text-primary' : 'text-gray-600'}`}>
                                    {language === 'ar' ? opt.labelAr : opt.labelEn}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Personal Info */}
                <View className="bg-white p-5 rounded-2xl border border-gray-100 mb-4" style={{ elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
                    <Text className={`font-ibm-bold text-base mb-4 text-gray-800 ${alignClass}`}>
                        {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                    </Text>
                    {renderInput(language === 'ar' ? 'اسم العنوان (مثلاً: المنزل)' : 'Address Label', 'name', language === 'ar' ? 'المنزل، بيت أهل...' : 'Home, Parents house...')}
                    {renderInput(language === 'ar' ? 'رقم الهاتف' : 'Phone Number', 'phone', '07xxxxxxxxx', 'phone-pad')}
                </View>

                {/* Location Info */}
                <View className="bg-white p-5 rounded-2xl border border-gray-100 mb-4" style={{ elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
                    <Text className={`font-ibm-bold text-base mb-4 text-gray-800 ${alignClass}`}>
                        {language === 'ar' ? 'معلومات الموقع' : 'Location Information'}
                    </Text>

                    {/* Map Pin */}
                    <View className="mb-5">
                        <Text className={`font-ibm-bold text-sm text-gray-700 mb-2 ${alignClass}`}>
                            {language === 'ar' ? 'تحديد على الخريطة' : 'Pin on Map'}
                            <Text className="font-ibm text-gray-400 text-xs"> ({language === 'ar' ? 'اختياري' : 'Optional'})</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setShowLocationPicker(true)}
                            className={`flex-row items-center justify-between p-4 rounded-xl border-2 border-dashed ${formData.latitude && formData.longitude ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-300'} ${isRTL ? 'flex-row-reverse' : ''}`}
                            activeOpacity={0.7}>
                            <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${formData.latitude && formData.longitude ? 'bg-primary' : 'bg-white border border-gray-200'} ${isRTL ? 'ml-3' : 'mr-3'}`}>
                                    <Ionicons name={formData.latitude && formData.longitude ? "checkmark" : "map-outline"} size={20} color={formData.latitude && formData.longitude ? "white" : "#6B7280"} />
                                </View>
                                <View>
                                    <Text className={`font-ibm-bold text-base ${formData.latitude && formData.longitude ? 'text-primary' : 'text-gray-800'}`}>
                                        {formData.latitude && formData.longitude ? (language === 'ar' ? 'تم تحديد الموقع' : 'Location Selected') : (language === 'ar' ? 'تحديد على الخريطة' : 'Select on Map')}
                                    </Text>
                                    {formData.latitude && formData.longitude && (
                                        <Text className="font-ibm text-xs text-gray-500 mt-0.5">{language === 'ar' ? 'اضغط لتغيير' : 'Tap to change'}</Text>
                                    )}
                                </View>
                            </View>
                            <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color={formData.latitude && formData.longitude ? "#2E7D32" : "#9CA3AF"} />
                        </TouchableOpacity>
                    </View>

                    {/* City */}
                    <View className="mb-4">
                        <Text className={`font-ibm-bold text-sm text-gray-700 mb-2 ${alignClass}`}>
                            {language === 'ar' ? 'المحافظة' : 'City'} <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setShowCityPicker(true)}
                            className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl p-4 ${flexDir} items-center justify-between`}
                            activeOpacity={0.7}>
                            <Text className={`font-ibm text-base ${formData.city ? 'text-gray-900' : 'text-gray-400'}`}>
                                {formData.city ? IRAQI_CITIES.find(c => c.id === formData.city)?.[language === 'ar' ? 'name_ar' : 'name_en'] || formData.city : (language === 'ar' ? 'اختر المحافظة' : 'Select City')}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                        {errors.city && <Text className={`text-red-500 text-xs mt-1 font-ibm ${alignClass}`}>{errors.city}</Text>}
                    </View>

                    {renderInput(language === 'ar' ? 'المنطقة' : 'Area', 'area', language === 'ar' ? 'مثال: الكرادة، المنصور...' : 'e.g. Karrada, Mansour...', 'default', true)}
                    {renderInput(language === 'ar' ? 'الشارع ورقم الدار' : 'Street & House No.', 'street', language === 'ar' ? 'مثال: شارع 14، دار 25' : 'e.g. St 14, House 25', 'default', true)}
                    {renderInput(language === 'ar' ? 'أقرب نقطة دالة' : 'Nearest Landmark', 'details', language === 'ar' ? 'مثال: قرب مطعم، مدرسة...' : 'e.g. Near restaurant, school...', 'default', true)}
                </View>
            </ScrollView>

            {/* Save Button */}
            <View className="px-4 py-4 bg-white border-t border-gray-100"
                style={{ elevation: 5, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: -3 } }}>
                <TouchableOpacity
                    className={`py-4 rounded-xl items-center justify-center ${loading ? 'bg-gray-300' : 'bg-primary'}`}
                    style={!loading ? { elevation: 4, shadowColor: '#2E7D32', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } } : {}}
                    onPress={handleSave} disabled={loading} activeOpacity={0.8}>
                    {loading ? <ActivityIndicator color="#FFFFFF" /> : (
                        <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Ionicons name="checkmark-circle" size={22} color="white" />
                            <Text className="font-ibm-bold text-base text-white">
                                {language === 'ar' ? 'حفظ العنوان' : 'Save Address'}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* City Picker Modal */}
            <Modal visible={showCityPicker} transparent animationType="slide" onRequestClose={() => setShowCityPicker(false)}>
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl max-h-[70%]">
                        <View className={`flex-row items-center justify-between p-5 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Text className="font-ibm-bold text-lg text-gray-900">{language === 'ar' ? 'اختر المحافظة' : 'Select City'}</Text>
                            <TouchableOpacity onPress={() => setShowCityPicker(false)} className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="close" size={20} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                        <FlatList data={IRAQI_CITIES} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { setFormData(prev => ({ ...prev, city: item.id })); if (errors.city) setErrors(prev => ({ ...prev, city: '' })); setShowCityPicker(false); }}
                                    className={`p-4 border-b border-gray-50 ${flexDir} items-center justify-between`} activeOpacity={0.7}>
                                    <Text className={`font-ibm text-base ${formData.city === item.id ? 'text-primary font-ibm-bold' : 'text-gray-700'}`}>
                                        {language === 'ar' ? item.name_ar : item.name_en}
                                    </Text>
                                    {formData.city === item.id && <Ionicons name="checkmark-circle" size={22} color="#2E7D32" />}
                                </TouchableOpacity>
                            )} />
                    </View>
                </View>
            </Modal>

            {/* Location Picker Modal */}
            <LocationPicker visible={showLocationPicker} onClose={() => setShowLocationPicker(false)} onLocationSelect={handleLocationSelect}
                initialLocation={formData.latitude && formData.longitude ? { latitude: formData.latitude, longitude: formData.longitude } : undefined} />
        </View >
    );
}
