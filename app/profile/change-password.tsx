import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'كلمة المرور الحالية مطلوبة'),
    newPassword: z.string().min(6, 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية",
    path: ["newPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [saving, setSaving] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t, language, isRTL } = useLanguage();

    const { control, handleSubmit, formState: { errors } } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: PasswordFormData) => {
        try {
            setSaving(true);

            // First verify current password by trying to sign in
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user?.email) {
                Alert.alert(
                    language === 'ar' ? 'خطأ' : 'Error',
                    language === 'ar' ? 'يرجى تسجيل الدخول مرة أخرى' : 'Please login again'
                );
                router.replace('/auth/login');
                return;
            }

            // Verify current password
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: session.user.email,
                password: data.currentPassword,
            });

            if (signInError) {
                Alert.alert(
                    language === 'ar' ? 'خطأ' : 'Error',
                    language === 'ar' ? 'كلمة المرور الحالية غير صحيحة' : 'Current password is incorrect'
                );
                return;
            }

            // Update password
            const { error: updateError } = await supabase.auth.updateUser({
                password: data.newPassword
            });

            if (updateError) {
                throw updateError;
            }

            Alert.alert(
                language === 'ar' ? 'تم بنجاح' : 'Success',
                language === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully',
                [{ text: language === 'ar' ? 'حسناً' : 'OK', onPress: () => router.back() }]
            );

        } catch (error: any) {
            console.error('Error changing password:', error);
            Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' ? 'فشل في تغيير كلمة المرور' : 'Failed to change password'
            );
        } finally {
            setSaving(false);
        }
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
                    fontFamily: 'Cairo_700Bold',
                    fontSize: 18,
                    color: '#212121'
                }}>
                    {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Info Card */}
                <View style={{
                    backgroundColor: '#FEF3C7',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center'
                }}>
                    <Ionicons 
                        name="information-circle" 
                        size={24} 
                        color="#D97706" 
                        style={{ marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}
                    />
                    <Text style={{
                        flex: 1,
                        fontFamily: 'Cairo_400Regular',
                        fontSize: 13,
                        color: '#92400E',
                        textAlign: isRTL ? 'right' : 'left',
                        lineHeight: 20
                    }}>
                        {language === 'ar' 
                            ? 'تأكد من اختيار كلمة مرور قوية تحتوي على أحرف وأرقام'
                            : 'Make sure to choose a strong password with letters and numbers'}
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
                    {/* Current Password */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'} *
                        </Text>
                        <View style={{ position: 'relative' }}>
                            <Controller
                                control={control}
                                name="currentPassword"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={{
                                            backgroundColor: '#F9FAFB',
                                            borderWidth: 1,
                                            borderColor: errors.currentPassword ? '#D32F2F' : '#E5E7EB',
                                            borderRadius: 12,
                                            padding: 14,
                                            paddingRight: 50,
                                            fontFamily: 'Cairo_400Regular',
                                            fontSize: 16,
                                            textAlign: isRTL ? 'right' : 'left',
                                            color: '#212121'
                                        }}
                                        placeholder="••••••"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showCurrentPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: isRTL ? undefined : 12,
                                    left: isRTL ? 12 : undefined,
                                    top: 14
                                }}
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                <Ionicons 
                                    name={showCurrentPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={22} 
                                    color="#9CA3AF" 
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.currentPassword && (
                            <Text style={{
                                fontFamily: 'Cairo_400Regular',
                                fontSize: 12,
                                color: '#D32F2F',
                                marginTop: 4,
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {errors.currentPassword.message}
                            </Text>
                        )}
                    </View>

                    {/* New Password */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'} *
                        </Text>
                        <View style={{ position: 'relative' }}>
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={{
                                            backgroundColor: '#F9FAFB',
                                            borderWidth: 1,
                                            borderColor: errors.newPassword ? '#D32F2F' : '#E5E7EB',
                                            borderRadius: 12,
                                            padding: 14,
                                            paddingRight: 50,
                                            fontFamily: 'Cairo_400Regular',
                                            fontSize: 16,
                                            textAlign: isRTL ? 'right' : 'left',
                                            color: '#212121'
                                        }}
                                        placeholder="••••••"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showNewPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: isRTL ? undefined : 12,
                                    left: isRTL ? 12 : undefined,
                                    top: 14
                                }}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                <Ionicons 
                                    name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={22} 
                                    color="#9CA3AF" 
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.newPassword && (
                            <Text style={{
                                fontFamily: 'Cairo_400Regular',
                                fontSize: 12,
                                color: '#D32F2F',
                                marginTop: 4,
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {errors.newPassword.message}
                            </Text>
                        )}
                    </View>

                    {/* Confirm Password */}
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{
                            fontFamily: 'Cairo_600SemiBold',
                            fontSize: 14,
                            color: '#212121',
                            marginBottom: 8,
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'} *
                        </Text>
                        <View style={{ position: 'relative' }}>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={{
                                            backgroundColor: '#F9FAFB',
                                            borderWidth: 1,
                                            borderColor: errors.confirmPassword ? '#D32F2F' : '#E5E7EB',
                                            borderRadius: 12,
                                            padding: 14,
                                            paddingRight: 50,
                                            fontFamily: 'Cairo_400Regular',
                                            fontSize: 16,
                                            textAlign: isRTL ? 'right' : 'left',
                                            color: '#212121'
                                        }}
                                        placeholder="••••••"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showConfirmPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: isRTL ? undefined : 12,
                                    left: isRTL ? 12 : undefined,
                                    top: 14
                                }}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons 
                                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={22} 
                                    color="#9CA3AF" 
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && (
                            <Text style={{
                                fontFamily: 'Cairo_400Regular',
                                fontSize: 12,
                                color: '#D32F2F',
                                marginTop: 4,
                                textAlign: isRTL ? 'right' : 'left'
                            }}>
                                {errors.confirmPassword.message}
                            </Text>
                        )}
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
                            {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
