import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CountdownTimer } from './CountdownTimer';
import { useLanguage } from '../../contexts';

interface SectionHeaderProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onSeeAll?: () => void;
  hasTimer?: boolean;
  timerSeconds?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  onSeeAll,
  hasTimer = false,
  timerSeconds
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <View
      className={`flex-row justify-between items-center mb-3 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}
    >
      {/* Left Side: Title + Icon + Timer */}
      <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Icon (Optional) */}
        {icon && (
          <View
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(46, 125, 50, 0.1)' }}
          >
            <Ionicons name={icon} size={18} color="#2E7D32" />
          </View>
        )}

        {/* Title */}
        <Text
          className={`text-base font-ibm-bold text-text-primary ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {title}
        </Text>

        {/* Timer (Optional) */}
        {hasTimer && timerSeconds && (
          <CountdownTimer initialSeconds={timerSeconds} />
        )}
      </View>

      {/* Right Side: See All Button */}
      {onSeeAll && (
        <TouchableOpacity
          onPress={onSeeAll}
          className={`px-3 py-1.5 rounded-full bg-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
          activeOpacity={0.7}
        >
          <Text className="text-text-primary font-ibm-bold text-xs">
            {t('common.seeAll')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
