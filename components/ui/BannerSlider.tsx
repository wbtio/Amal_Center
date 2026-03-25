import React, { useState, useEffect, useRef, memo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Href } from 'expo-router';
import { Linking } from 'react-native';
import { Skeleton } from './Skeleton';

interface Banner {
  id: string;
  image_url: string;
  link?: string;
}

interface BannerSliderProps {
  banners: Banner[] | undefined;
  isLoading: boolean;
  error: any;
  onRetry: () => void;
  t: (key: string) => string;
}

export const BannerSlider = memo(({ banners, isLoading, error, onRetry, t }: BannerSliderProps) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);
  const bannerWidth = Math.max(width - 32, 0);
  const bannerHeight = bannerWidth / 3.2;

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveBannerIndex((prev) => {
        const nextIndex = (prev + 1) % banners.length;
        bannerScrollRef.current?.scrollTo({
          x: nextIndex * (bannerWidth + 16),
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [banners, bannerWidth]);

  if (isLoading) {
    return (
      <View className="mt-4 mb-2 px-4">
        <Skeleton width={bannerWidth} height={bannerHeight} borderRadius={20} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="mt-4 mb-2 mx-4 items-center py-6 bg-white rounded-2xl" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Ionicons name="images-outline" size={40} color="#EF4444" />
        <Text className="font-ibm-regular text-text-secondary mt-2">{t('errors.loadError')}</Text>
        <TouchableOpacity
          onPress={onRetry}
          className="mt-3 bg-primary px-6 py-2 rounded-lg"
        >
          <Text className="font-ibm-semibold text-white">{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <View className="mt-4 mb-2">
      <ScrollView
        ref={bannerScrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={bannerWidth + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        onMomentumScrollEnd={(event) => {
          const slideSize = bannerWidth + 16;
          const offset = event.nativeEvent.contentOffset.x;
          const index = Math.round(offset / slideSize);
          setActiveBannerIndex(index);
        }}
      >
        {banners.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            activeOpacity={0.95}
            onPress={() => {
              if (banner.link) {
                if (banner.link.startsWith('http')) {
                  Linking.openURL(banner.link);
                } else {
                  router.push(banner.link as Href);
                }
              }
            }}
          >
            <View
              className="rounded-3xl overflow-hidden"
              style={{
                width: bannerWidth,
                height: bannerHeight,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Image
                source={{ uri: banner.image_url }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                transition={300}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {banners.length > 1 && (
        <View className="flex-row justify-center mt-3 gap-2">
          {banners.map((_, index) => (
            <View
              key={index}
              className="rounded-full"
              style={{
                height: 8,
                width: index === activeBannerIndex ? 24 : 8,
                backgroundColor: index === activeBannerIndex ? '#2E7D32' : '#E0E0E0',
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
});
