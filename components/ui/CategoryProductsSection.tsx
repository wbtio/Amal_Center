import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProductsByCategory } from '../../hooks/useSupabase';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './Skeleton';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts';

interface CategoryProductsSectionProps {
    sectionId: string;
    title: string;
    categoryId: string;
    icon?: string;
}

export const CategoryProductsSection: React.FC<CategoryProductsSectionProps> = ({
    sectionId,
    title,
    categoryId,
    icon
}) => {
    const router = useRouter();
    const { t } = useLanguage();
    const { data: products, isLoading, error, refetch } = useProductsByCategory(categoryId);

    // Don't render if no products and not loading
    if (!isLoading && !error && (!products || products.length === 0)) {
        return null;
    }

    return (
        <View key={sectionId} className="py-4 bg-white border-t border-gray-50">
            <SectionHeader
                title={title}
                icon={icon as any || 'grid'}
                onSeeAll={() => router.push(`/(tabs)/category/${categoryId}` as any)}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
            >
                {isLoading ? (
                    [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
                ) : error ? (
                    <View className="items-center justify-center py-8 mx-4" style={{ minWidth: 300 }}>
                        <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
                        <Text className="font-cairo-regular text-text-secondary mt-2">{t('errors.loadError')}</Text>
                        <TouchableOpacity
                            onPress={() => refetch()}
                            className="mt-3 bg-primary px-6 py-2 rounded-lg"
                        >
                            <Text className="font-cairo-semibold text-white">{t('common.retry')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : products && products.length > 0 ? (
                    products.slice(0, 10).map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : null}
            </ScrollView>
        </View>
    );
};
