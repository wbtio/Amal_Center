import React from 'react';
import { View, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { PromoBanner } from '../../hooks/useSupabase';
import { Skeleton } from './Skeleton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Banner dimensions
const BANNER_FULL_WIDTH = SCREEN_WIDTH - 32;
const BANNER_FULL_HEIGHT = 100;
const BANNER_HALF_WIDTH = (SCREEN_WIDTH - 48) / 2;
const BANNER_HALF_HEIGHT = 85;
const BANNER_SQUARE_SIZE = (SCREEN_WIDTH - 48) / 2;
const BANNER_SQUARE_HEIGHT = 120;

interface PromoBannerSlotProps {
    banners: PromoBanner[] | undefined;
    isLoading?: boolean;
}

/**
 * PromoBannerSlot Component
 * Renders promo banners based on their size configuration
 */
export const PromoBannerSlot: React.FC<PromoBannerSlotProps> = ({ banners, isLoading = false }) => {
    const router = useRouter();

    // Handle banner press
    const handlePress = (link?: string) => {
        if (!link) return;

        if (link.startsWith('http')) {
            Linking.openURL(link);
        } else {
            router.push(link as any);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <View className="px-4 mt-4">
                <Skeleton width={BANNER_FULL_WIDTH} height={BANNER_FULL_HEIGHT} borderRadius={16} />
            </View>
        );
    }

    // Empty state - hide the slot
    if (!banners || banners.length === 0) {
        return null;
    }

    // Determine layout based on banner sizes
    const firstBanner = banners[0];

    // Full width banner
    if (firstBanner.size === 'full') {
        return (
            <View className="px-4 mt-4">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handlePress(firstBanner.link)}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        width: BANNER_FULL_WIDTH,
                        height: BANNER_FULL_HEIGHT,
                        backgroundColor: '#ffffff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Image
                        source={{ uri: firstBanner.image_url }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={200}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    // Square banners (2 side by side)
    if (firstBanner.size === 'square') {
        const secondBanner = banners[1];
        return (
            <View className="px-4 mt-4 flex-row gap-4">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handlePress(firstBanner.link)}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        width: BANNER_SQUARE_SIZE,
                        height: BANNER_SQUARE_HEIGHT,
                        backgroundColor: '#ffffff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Image
                        source={{ uri: firstBanner.image_url }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={200}
                    />
                </TouchableOpacity>

                {secondBanner && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handlePress(secondBanner.link)}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            width: BANNER_SQUARE_SIZE,
                            height: BANNER_SQUARE_HEIGHT,
                            backgroundColor: '#ffffff',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            source={{ uri: secondBanner.image_url }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                            transition={200}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    // Half width banners (2 side by side rectangles)
    if (firstBanner.size === 'half') {
        const secondBanner = banners[1];
        return (
            <View className="px-4 mt-4 flex-row gap-4">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handlePress(firstBanner.link)}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        width: BANNER_HALF_WIDTH,
                        height: BANNER_HALF_HEIGHT,
                        backgroundColor: '#ffffff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Image
                        source={{ uri: firstBanner.image_url }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={200}
                    />
                </TouchableOpacity>

                {secondBanner && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handlePress(secondBanner.link)}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            width: BANNER_HALF_WIDTH,
                            height: BANNER_HALF_HEIGHT,
                            backgroundColor: '#ffffff',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            source={{ uri: secondBanner.image_url }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                            transition={200}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return null;
};
