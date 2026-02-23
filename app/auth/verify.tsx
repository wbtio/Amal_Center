import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function VerifyOtpScreen() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otpCode, setOtpCode] = useState('');
    const [loading, setLoading] = useState(false);

    // إعادة إرسال الرمز
    const resendOtp = async () => {
        if (!email) return;
        setLoading(true);
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        });
        setLoading(false);

        if (error) {
            Alert.alert('خطأ', 'حدث خطأ أثناء إعادة إرسال الرمز، يرجى المحاولة لاحقاً.');
        } else {
            Alert.alert('تم الإرسال', 'تم إرسال رمز جديد إلى بريدك الإلكتروني.');
        }
    };

    const verifyOtp = async () => {
        if (otpCode.length < 6) {
            Alert.alert('تنبيه', 'الرجاء إدخال الرمز كاملاً');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: otpCode,
            type: 'signup'
        });

        setLoading(false);

        if (error) {
            Alert.alert('خطأ في التحقق', 'الرمز غير صحيح أو انتهت صلاحيته.');
        } else if (data.session) {
            Alert.alert('تم التفعيل', 'تم تفعيل حسابك بنجاح!', [
                { text: 'ابـدأ التسوق', onPress: () => router.replace('/(tabs)/profile') }
            ]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background p-6 items-center pt-20">
            <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 z-10">
                <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity>

            <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-6">
                <Ionicons name="shield-checkmark-outline" size={48} color="#2E7D32" />
            </View>

            <Text className="font-cairo-bold text-2xl text-primary text-center mb-2">تأكيد الحساب</Text>
            <Text className="font-cairo text-text-secondary text-center mb-10 px-4 leading-6">
                الرجاء إدخال رمز التحقق (OTP) المرسل إلى:{'\n'}
                <Text className="font-cairo-bold text-primary">{email}</Text>
            </Text>

            <View className="w-full mb-8">
                <Text className="font-cairo text-right mb-2 text-text-secondary">رمز التحقق</Text>
                <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-cairo-bold text-3xl tracking-[8px] text-primary"
                    placeholder="--------"
                    placeholderTextColor="#cbd5e1"
                    keyboardType="number-pad"
                    maxLength={8}
                    value={otpCode}
                    onChangeText={setOtpCode}
                    autoFocus
                />
            </View>

            <TouchableOpacity
                className="bg-primary w-full py-4 rounded-xl items-center mb-6 shadow-sm"
                onPress={verifyOtp}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white font-cairo-bold text-lg">تأكيد وتفعيل</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={resendOtp}
                disabled={loading}
                className="p-2"
            >
                <Text className="font-cairo text-text-secondary">
                    لم يصلك الرمز؟ <Text className="text-primary font-cairo-bold">أعد الإرسال</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
