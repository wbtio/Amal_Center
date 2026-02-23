import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
  borderRadius?: number;
}

export function Skeleton({ width, height, style, borderRadius = 4 }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width,
          height: height,
          backgroundColor: '#F5F5F5',
          borderRadius: borderRadius,
          opacity: opacity,
        },
        style,
      ] as any}
    />
  );
}

interface ProductCardSkeletonProps {
  width?: number | string;
  style?: ViewStyle;
}

export function ProductCardSkeleton({ width, style }: ProductCardSkeletonProps) {
  return (
    <View style={[styles.card, width ? { width: width as any } : {}, style]}>
      <Skeleton width="100%" height={120} borderRadius={8} />
      <View style={{ marginTop: 8 }}>
        <Skeleton width="80%" height={20} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
           <Skeleton width={30} height={30} borderRadius={15} />
           <Skeleton width={60} height={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
});
