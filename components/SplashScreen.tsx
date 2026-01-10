import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0.3);

  useEffect(() => {
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Text animation - fade in and slide up
    textOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    textTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));

    // Tagline animation
    taglineOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));

    // Background circle animation
    circleScale.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }));

    // Finish animation and navigate
    const timeout = setTimeout(() => {
      // Fade out animation
      logoOpacity.value = withTiming(0, { duration: 300 });
      textOpacity.value = withTiming(0, { duration: 300 });
      taglineOpacity.value = withTiming(0, { duration: 300 });
      circleOpacity.value = withTiming(0, { duration: 300 });

      setTimeout(() => {
        onFinish();
      }, 350);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleOpacity.value,
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
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: width * 1.5,
            height: width * 1.5,
            borderRadius: width * 0.75,
            backgroundColor: '#3D8B40',
          },
          circleAnimatedStyle,
        ]}
      />

      {/* Second decorative circle */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: width * 1.2,
            height: width * 1.2,
            borderRadius: width * 0.6,
            backgroundColor: '#4CAF50',
            opacity: 0.2,
          },
          circleAnimatedStyle,
        ]}
      />

      {/* Logo */}
      <Animated.View style={[logoAnimatedStyle]}>
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
      </Animated.View>

      {/* App Name */}
      <Animated.View style={[{ marginTop: 30 }, textAnimatedStyle]}>
        <Text
          style={{
            fontFamily: 'Cairo_700Bold',
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
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[{ marginTop: 10 }, taglineAnimatedStyle]}>
        <Text
          style={{
            fontFamily: 'Cairo_400Regular',
            fontSize: 16,
            color: '#E8F5E9',
            textAlign: 'center',
          }}
        >
          كل ما تحتاجه في مكان واحد
        </Text>
      </Animated.View>

      {/* Loading dots */}
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            marginTop: 50,
            gap: 8,
          },
          taglineAnimatedStyle,
        ]}
      >
        <LoadingDot delay={0} />
        <LoadingDot delay={150} />
        <LoadingDot delay={300} />
      </Animated.View>
    </View>
  );
}


function LoadingDot({ delay }: { delay: number }) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    const animate = () => {
      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.2, { duration: 400 }),
          withTiming(0.8, { duration: 400 })
        )
      );
      opacity.value = withDelay(
        delay,
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.5, { duration: 400 })
        )
      );
    };

    animate();
    const interval = setInterval(animate, 800);
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#FFB300',
        },
        animatedStyle,
      ]}
    />
  );
}
