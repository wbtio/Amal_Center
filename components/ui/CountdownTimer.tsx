import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts';

interface CountdownTimerProps {
  initialSeconds?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds = 19425 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (timeLeft <= 0) return null;

  return (
    <View
      className={`flex-row items-center px-2.5 py-1.5 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
      style={{ backgroundColor: 'rgba(211, 47, 47, 0.08)' }}
    >
      {/* Icon */}
      <Ionicons
        name="time-outline"
        size={14}
        color="#D32F2F"
        style={{
          marginRight: isRTL ? 0 : 4,
          marginLeft: isRTL ? 4 : 0
        }}
      />

      {/* Time */}
      <Text
        className="text-danger font-cairo-bold text-xs"
        style={{
          direction: 'ltr',
          marginRight: isRTL ? 0 : 4,
          marginLeft: isRTL ? 4 : 0
        }}
      >
        {formatTime(timeLeft)}
      </Text>

      {/* Text */}
      <Text className="text-danger font-cairo text-xs">
        {t('home.endsIn')}
      </Text>
    </View>
  );
};
