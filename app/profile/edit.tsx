import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const profileSchema = z.object({
    fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileData {
    id: string;
    full_name: string | null;
    phone: string | null;
    avatar_url: string | null;
}

export default function EditProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const { t, language, isRTL } = useLanguage();

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            phone: '',
        }
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/auth/login');
                return;
            }

            setUserEmail(session.user.email || '');

            // Try to get profile from profiles table
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
            }

            if (profile) {
                setValue('fullName', profile.full_name || '');
                setValue('phone', profile.phone || '');
                setAvatarUrl(profile.avatar_url);
            } else {
                // Use user metadata as fallback
                const metadata = session.user.user_metadata;
                setValue('fullName', metadata?.full_name || metadata?.name_ar || '');
                setValue('phone', metadata?.phone || '');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (!permissionResult.granted) {
                Alert.alert(
                    language === 'ar' ? 'صلاحية مطلوبة' : 'Permission Required',
                    language === 'ar' ? 'نحتاج صلاحية الوصول للصور' : 'We need permission to access your photos'
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                await uploadImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في اختيار الصورة' : 'Failed to pick image'
            );
        }
    };

    const uploadImage = async (uri: string) => {
        try {
            setUploadingImage(true);
            
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            // Create file name - just the filename, no subfolder
            const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
            const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

            // Convert URI to blob/arraybuffer for React Native
            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();

            // Upload to Supabase Storage - bucket is 'avatars', file is just fileName
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, arrayBuffer, {
                    contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
                    upsert: true
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            setAvatarUrl(publicUrl);

            // Update profile with new avatar URL
            await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    avatar_url: publicUrl
                });

            Alert.alert(
                language === 'ar' ? 'تم بنجاح' : 'Success',
                language === 'ar' ? 'تم تحديث الصورة بنجاح' : 'Photo updated successfully'
            );

        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في رفع الصورة' : 'Failed to upload image'
            );
        } finally {
            setUploadingImage(false);
        }
    };


    const onSubmit = async (data: ProfileFormData) => {
        try {
            setSaving(true);
            
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/auth/login');
                return;
            }

            // Update profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    full_name: data.fullName.trim(),
                    phone: data.phone?.trim() || null,
                    avatar_url: avatarUrl
                });

            if (profileError) {
                throw profileError;
            }

            // Also update user metadata
            await supabase.auth.updateUser({
                data: {
                    full_name: data.fullName.trim(),
                    name_ar: data.fullName.trim(),
                    phone: data.phone?.trim() || null,
                }
            });

            Alert.alert(
                language === 'ar' ? 'تم بنجاح' : 'Success',
                language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully',
                [{ text: language === 'ar' ? 'حسناً' : 'OK', onPress: () => router.back() }]
            );

        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في حفظ التغييرات' : 'Failed to save changes'
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                <ActivityIndicator color="#2E7D32" size="large" />
            </View>
        );
    }

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
                    {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Avatar Section */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: '#F3F4F6'
                }}>
                    <TouchableOpacity 
                        onPress={pickImage}
                        disabled={uploadingImage}
                        style={{ position: 'relative' }}
                    >
                        {avatarUrl ? (
                            <Image
                                source={{ uri: avatarUrl }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    backgroundColor: '#F5F5F5'
                                }}
                            />
                        ) : (
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: 'rgba(46, 125, 50, 0.2)'
                            }}>
                                <Ionicons name="person" size={48} color="#2E7D32" />
                            </View>
                        )}
                        
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor: '#2E7D32',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {uploadingImage ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Ionicons name="camera" size={18} color="#FFFFFF" />
                            )}
                        </View>
                    </TouchableOpacity>
                    
                    <Text style={{
                        fontFamily: 'Cairo_400Regular',
                        fontSize: 14,
                        color: '#757575',
                        marginTop: 12
                    }}>
                        {language === 'ar' ? 'اضغط لتغيير الصورة' : 'Tap to change photo'}
                    </Text>
                </View>

                {/* Form Section */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: '#F3F4F6'
                }}>
                    {/* Full Name */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                        </Text>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={{
                                        backgroundColor: '#F9FAFB',
                                        borderWidth: 1,
                                        borderColor: errors.fullName ? '#D32F2F' : '#E5E7EB',
                                        borderRadius: 12,
                                        padding: 14,
                                        fontFamily: 'Cairo_400Regular',
                                        fontSize: 16,
                                        textAlign: isRTL ? 'right' : 'left',
                                        color: '#212121'
                                    }}
                                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                    placeholderTextColor="#9CA3AF"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.fullName && (
                            <Text style={{
                                fontFamily: 'Cairo_400Regular',
                                fontSize: 12,
                                color: '#D32F2F',
                                marginTop: 4,
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {errors.fullName.message}
                            </Text>
                        )}
                    </View>

                    {/* Email (Read Only) */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </Text>
                        <View style={{
                            backgroundColor: '#F3F4F6',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            borderRadius: 12,
                            padding: 14,
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center'
                        }}>
                            <Ionicons 
                                name="lock-closed-outline" 
                                size={18} 
                                color="#9CA3AF" 
                                style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
                            />
                            <Text style={{
                                fontFamily: 'Cairo_400Regular',
                                fontSize: 16,
                                color: '#6B7280',
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                {userEmail}
                            </Text>
                        </View>
                        <Text style={{
                            fontFamily: 'Cairo_400Regular',
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 4,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'لا يمكن تغيير البريد الإلكتروني' : 'Email cannot be changed'}
                        </Text>
                    </View>

                    {/* Phone */}
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                        </Text>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={{
                                        backgroundColor: '#F9FAFB',
                                        borderWidth: 1,
                                        borderColor: '#E5E7EB',
                                        borderRadius: 12,
                                        padding: 14,
                                        fontFamily: 'Cairo_400Regular',
                                        fontSize: 16,
                                        textAlign: 'left',
                                        color: '#212121'
                                    }}
                                    placeholder={language === 'ar' ? '07XX XXX XXXX' : '07XX XXX XXXX'}
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#2E7D32',
                        borderRadius: 12,
                        padding: 16,
                        alignItems: 'center',
                        marginBottom: 16,
                        shadowColor: '#2E7D32',
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 4
                    }}
                    onPress={handleSubmit(onSubmit)}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={{
                            fontFamily: 'Cairo_700Bold',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }}>
                            {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Change Password Link */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        padding: 16,
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: '#F3F4F6'
                    }}
                    onPress={() => router.push('/profile/change-password')}
                >
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#FEF3C7',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: isRTL ? 0 : 12,
                            marginLeft: isRTL ? 12 : 0
                        }}>
                            <Ionicons name="key-outline" size={20} color="#D97706" />
                        </View>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 15,
                            color: '#212121'
                        }}>
                            {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                        </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
