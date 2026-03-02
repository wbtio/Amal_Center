import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    contentOpacity.value = withTiming(1, { duration: 350 });

    const timeout = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [contentOpacity, onFinish]);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2E7D32',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background decorative circle */}
      <View
        style={[
          {
            position: 'absolute',
            width: width * 1.5,
            height: width * 1.5,
            borderRadius: width * 0.75,
            backgroundColor: '#3D8B40',
          },
        ]}
      />

      {/* Second decorative circle */}
      <View
        style={[
          {
            position: 'absolute',
            width: width * 1.2,
            height: width * 1.2,
            borderRadius: width * 0.6,
            backgroundColor: '#4CAF50',
            opacity: 0.2,
          },
        ]}
      />

      <Animated.View style={[{ alignItems: 'center' }, contentAnimatedStyle]}>
        {/* Logo */}
        <View
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 100, height: 100 }}
            contentFit="contain"
          />
        </View>

        {/* App Name */}
        <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontFamily: 'IBMPlexSansArabic_700Bold',
            fontSize: 32,
            color: '#FFFFFF',
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}
        >
          الأمل سنتر
        </Text>
        </View>

        {/* Tagline */}
        <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: 'IBMPlexSansArabic_400Regular',
            fontSize: 16,
            color: '#E8F5E9',
            textAlign: 'center',
          }}
        >
          كل ما تحتاجه في مكان واحد
        </Text>
        </View>

        {/* Loading dots */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            gap: 8,
          }}
        >
          <LoadingDot />
          <LoadingDot />
          <LoadingDot />
        </View>
      </Animated.View>
    </View>
  );
}

function LoadingDot() {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFB300',
      }}
    />
  );
}
