import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';

export function MainHeader() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t, isRTL } = useLanguage();

    return (
        <View 
            className="bg-white border-b border-gray-100"
            style={{ 
                paddingTop: insets.top + 8,
                paddingBottom: 12,
            }}
        >
            <View className="px-4">
                {/* Search Bar Container */}
                <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    
                    {/* Search Box - Takes Most Space */}
                    <TouchableOpacity
                        className={`flex-1 h-11 bg-gray-50 rounded-xl flex-row items-center px-4 border border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                        activeOpacity={0.7}
                        onPress={() => router.push('/search')}
                    >
                        <Ionicons 
                            name="search" 
                            size={20} 
                            color="#757575" 
                        />
                        <Text 
                            className={`flex-1 font-cairo text-gray-400 text-sm include-font-padding-false ${isRTL ? 'text-right mr-2' : 'text-left ml-2'}`}
                            numberOfLines={1}
                            style={{ textAlignVertical: 'center' }}
                        >
                            {t('common.searchPlaceholder')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
