import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

type ProfileFormData = {
    fullName: string;
    phone: string;
};

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
    const initialDataRef = useRef<{ fullName: string; phone: string; avatarUrl: string | null }>({
        fullName: '', phone: '', avatarUrl: null
    });

    const profileSchema = z.object({
        fullName: z.string().min(2, t('profile.nameMinLength')),
        phone: z.string()
            .refine(
                (val) => !val || /^07\d{9}$/.test(val.replace(/\s/g, '')),
                { message: t('profile.invalidPhone') }
            )
            .optional()
            .or(z.literal('')),
    });

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormData>({
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
                const name = profile.full_name || '';
                const phone = profile.phone || '';
                setValue('fullName', name);
                setValue('phone', phone);
                setAvatarUrl(profile.avatar_url);
                initialDataRef.current = { fullName: name, phone, avatarUrl: profile.avatar_url };
            } else {
                // Use user metadata as fallback
                const metadata = session.user.user_metadata;
                const name = metadata?.full_name || metadata?.name_ar || '';
                const phone = metadata?.phone || '';
                setValue('fullName', name);
                setValue('phone', phone);
                initialDataRef.current = { fullName: name, phone, avatarUrl: null };
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert(t('common.error'), t('errors.loadError'));
        } finally {
            setLoading(false);
        }
    };

    const extractFileNameFromUrl = (url: string): string | null => {
        try {
            const parts = url.split('/avatars/');
            if (parts.length > 1) {
                return parts[1].split('?')[0];
            }
            return null;
        } catch {
            return null;
        }
    };

    const deleteOldAvatar = async (oldUrl: string | null) => {
        if (!oldUrl) return;
        const fileName = extractFileNameFromUrl(oldUrl);
        if (fileName) {
            try {
                await supabase.storage.from('avatars').remove([fileName]);
            } catch (error) {
                console.error('Error deleting old avatar:', error);
            }
        }
    };

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(
                    t('profile.permissionRequired'),
                    t('profile.permissionMessage')
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
            Alert.alert(t('common.error'), t('profile.photoPickFailed'));
        }
    };

    const uploadImage = async (uri: string) => {
        try {
            setUploadingImage(true);

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                Alert.alert(t('common.error'), t('profile.sessionExpired'));
                router.replace('/auth/login');
                return;
            }

            // Create file name
            const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
            const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

            // Convert URI to arraybuffer for React Native
            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();

            // Upload to Supabase Storage
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

            // Delete old avatar from storage
            const oldAvatarUrl = avatarUrl;
            await deleteOldAvatar(oldAvatarUrl);

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            setAvatarUrl(publicUrl);

            // Update profile with new avatar URL
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    avatar_url: publicUrl
                });

            if (updateError) {
                console.error('Profile update error:', updateError);
                throw updateError;
            }

            Alert.alert(t('common.success'), t('profile.photoUpdated'));

        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert(t('common.error'), t('profile.photoUploadFailed'));
        } finally {
            setUploadingImage(false);
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setSaving(true);

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                Alert.alert(t('common.error'), t('profile.sessionExpired'));
                router.replace('/auth/login');
                return;
            }

            const trimmedName = data.fullName.trim();
            const trimmedPhone = data.phone?.replace(/\s/g, '').trim() || null;

            // Update profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    full_name: trimmedName,
                    phone: trimmedPhone,
                    avatar_url: avatarUrl
                });

            if (profileError) {
                console.error('Profile save error:', profileError);
                throw profileError;
            }

            // Also update user metadata for consistency
            const { error: metaError } = await supabase.auth.updateUser({
                data: {
                    full_name: trimmedName,
                    name_ar: trimmedName,
                    phone: trimmedPhone,
                }
            });

            if (metaError) {
                console.error('Metadata update error:', metaError);
            }

            // Update initial data reference
            initialDataRef.current = { fullName: trimmedName, phone: trimmedPhone || '', avatarUrl };

            Alert.alert(
                t('common.success'),
                t('profile.profileUpdated'),
                [{ text: t('common.ok'), onPress: () => router.back() }]
            );

        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert(t('common.error'), t('profile.saveFailed'));
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
                    fontFamily: 'IBMPlexSansArabic_700Bold',
                    fontSize: 18,
                    color: '#212121'
                }}>
                    {t('profile.editProfile')}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
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
                        fontFamily: 'IBMPlexSansArabic_400Regular',
                        fontSize: 14,
                        color: '#757575',
                        marginTop: 12
                    }}>
                        {t('profile.tapToChangePhoto')}
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
                            fontFamily: 'IBMPlexSansArabic_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {t('profile.fullName')} *
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
                                        fontFamily: 'IBMPlexSansArabic_400Regular',
                                        fontSize: 16,
                                        textAlign: isRTL ? 'right' : 'left',
                                        color: '#212121'
                                    }}
                                    placeholder={t('profile.enterFullName')}
                                    placeholderTextColor="#9CA3AF"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.fullName && (
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
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
                            fontFamily: 'IBMPlexSansArabic_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {t('profile.email')}
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
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 16,
                                color: '#6B7280',
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                {userEmail}
                            </Text>
                        </View>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_400Regular',
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 4,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {t('profile.emailCannotChange')}
                        </Text>
                    </View>

                    {/* Phone */}
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{
                            fontFamily: 'IBMPlexSansArabic_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {t('profile.phone')}
                        </Text>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={{
                                        backgroundColor: '#F9FAFB',
                                        borderWidth: 1,
                                        borderColor: errors.phone ? '#D32F2F' : '#E5E7EB',
                                        borderRadius: 12,
                                        padding: 14,
                                        fontFamily: 'IBMPlexSansArabic_400Regular',
                                        fontSize: 16,
                                        textAlign: 'left',
                                        color: '#212121'
                                    }}
                                    placeholder={t('profile.phonePlaceholder')}
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    maxLength={11}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.phone && (
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_400Regular',
                                fontSize: 12,
                                color: '#D32F2F',
                                marginTop: 4,
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {errors.phone.message}
                            </Text>
                        )}
                    </View>
                </View>

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
                            fontFamily: 'IBMPlexSansArabic_600SemiBold',
                            fontSize: 15,
                            color: '#212121'
                        }}>
                            {t('profile.changePassword')}
                        </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </ScrollView>

            {/* Save Button (Fixed Bottom) */}
            <View style={{
                backgroundColor: '#FFFFFF',
                borderTopWidth: 1,
                borderTopColor: '#F3F4F6',
                padding: 16,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 6,
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: saving ? '#9CA3AF' : '#2E7D32',
                        borderRadius: 12,
                        padding: 16,
                        alignItems: 'center',
                        shadowColor: '#2E7D32',
                        shadowOpacity: saving ? 0 : 0.3,
                        shadowRadius: 8,
                        elevation: saving ? 0 : 4
                    }}
                    onPress={handleSubmit(onSubmit)}
                    disabled={saving}
                    activeOpacity={0.8}
                >
                    {saving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }} />
                            <Text style={{
                                fontFamily: 'IBMPlexSansArabic_700Bold',
                                fontSize: 16,
                                color: '#FFFFFF'
                            }}>
                                {t('profile.saveChanges')}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
