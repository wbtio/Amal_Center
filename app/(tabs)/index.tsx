import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Dimensions, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCategories, useSpecialOffers, useBestSellers, useBanners, useHomeSections, useMainCategories, useNewArrivals, usePromoBanners, useTrendingProducts, HomeSection } from '../../hooks/useSupabase';
import { ProductCardSkeleton, Skeleton } from '../../components/ui/Skeleton';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ProductCard } from '../../components/ui/ProductCard';
import { MainHeader } from '../../components/ui/MainHeader';
import { PromoBannerSlot } from '../../components/ui/PromoBannerSlot';
import { CategoryProductsSection } from '../../components/ui/CategoryProductsSection';
import { BannerSlider } from '../../components/ui/BannerSlider';
import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../contexts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;
const BANNER_HEIGHT = BANNER_WIDTH / 3.2;

export default function HomeScreen() {
  const router = useRouter();
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: refetchCategories } = useMainCategories();
  const { data: specialOffers, isLoading: isOffersLoading, error: offersError, refetch: refetchOffers } = useSpecialOffers();
  const { data: bestSellers, isLoading: isBestSellersLoading, error: bestSellersError, refetch: refetchBestSellers } = useBestSellers();
  const { data: newArrivals, isLoading: isNewArrivalsLoading, error: newArrivalsError, refetch: refetchNewArrivals } = useNewArrivals();
  const { data: trendingProducts, isLoading: isTrendingLoading, error: trendingError, refetch: refetchTrending } = useTrendingProducts();
  const { data: banners, isLoading: isBannersLoading, error: bannersError, refetch: refetchBanners } = useBanners();
  const { data: promoBanners, isLoading: isPromoBannersLoading, refetch: refetchPromoBanners } = usePromoBanners();
  const { data: homeSections, isLoading: isSectionsLoading, refetch: refetchSections } = useHomeSections();
  const { t, language, isRTL } = useLanguage();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchCategories(),
        refetchOffers(),
        refetchBestSellers(),
        refetchNewArrivals(),
        refetchTrending(),
        refetchBanners(),
        refetchPromoBanners(),
        refetchSections()
      ]);
    } catch (error) {
      Alert.alert(
        t('common.error'),
        t('errors.refreshError'),
        [
          { text: t('common.ok'), style: 'cancel' },
          { text: t('common.retry'), onPress: onRefresh }
        ]
      );
    } finally {
      setRefreshing(false);
    }
  }, [t]);

  const getCategoryName = (item: any) => {
    return language === 'ar' ? item.name_ar : (item.name || item.name_ar);
  };

  const getSectionTitle = (section: any) => {
    return section.title || '';
  };

  const getTitle = (section: any, fallbackKey: string) => {
    if (section.title) {
      return getSectionTitle(section);
    }
    return t(fallbackKey);
  };

  const activeSortedSections = useMemo(() => {
    if (homeSections && homeSections.length > 0) {
      return [...homeSections].filter(s => s.active).sort((a, b) => a.order_index - b.order_index);
    }
    return [
      { id: 'default_cat', type: 'categories', active: true, order_index: 1 },
      { id: 'default_offers', type: 'special_offers', active: true, order_index: 2 },
      { id: 'default_best', type: 'best_sellers', active: true, order_index: 3 },
      { id: 'default_new', type: 'new_arrivals', active: true, order_index: 4 },
    ];
  }, [homeSections]);

  // Error state component
  const ErrorState = ({ onRetry, icon = 'alert-circle-outline', fullWidth = true }: { onRetry: () => void; icon?: string; fullWidth?: boolean }) => (
    <View
      className="items-center justify-center py-8 mx-4"
      style={fullWidth ? { width: SCREEN_WIDTH - 32 } : { minWidth: SCREEN_WIDTH - 32 }}
    >
      <Ionicons name={icon as any} size={40} color="#EF4444" />
      <Text className="font-ibm-regular text-text-secondary mt-2">{t('errors.loadError')}</Text>
      <TouchableOpacity
        onPress={() => onRetry()}
        className="mt-3 bg-primary px-6 py-2 rounded-lg"
      >
        <Text className="font-ibm-semibold text-white">{t('common.retry')}</Text>
      </TouchableOpacity>
    </View>
  );

  // Empty state component
  const EmptyState = ({ icon, message }: { icon: string; message: string }) => (
    <View
      className="items-center justify-center py-8 mx-4"
      style={{ width: SCREEN_WIDTH - 32 }}
    >
      <Ionicons name={icon as any} size={40} color="#E0E0E0" />
      <Text className="font-ibm-regular text-text-secondary mt-2">{message}</Text>
    </View>
  );

  // Render a section based on its type
  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'categories':
        const CategoryItem = ({ item }: { item: any }) => (
          <TouchableOpacity
            key={item.id}
            className="items-center"
            activeOpacity={0.7}
            style={{ width: 80 }}
            onPress={() => router.push(`/(tabs)/category/${item.id}` as any)}
          >
            <View className="bg-white rounded-2xl w-[70px] h-[70px] items-center justify-center border border-gray-200 overflow-hidden" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}>
              {item.image_url ? (
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 50, height: 50, backgroundColor: 'transparent' }}
                  contentFit="contain"
                  transition={200}
                />
              ) : (
                <Ionicons name="grid-outline" size={32} color="#2E7D32" />
              )}
            </View>
            <Text
              className="font-ibm-semibold text-[10px] text-text-primary text-center mt-1 w-[70px]"
              numberOfLines={2}
            >
              {getCategoryName(item)}
            </Text>
          </TouchableOpacity>
        );

        // Split categories into two rows
        const firstRowCategories = categories?.filter((_, i) => i % 2 === 0) || [];
        const secondRowCategories = categories?.filter((_, i) => i % 2 === 1) || [];

        return (
          <View key={section.id} className="py-4 bg-white">
            <SectionHeader
              title={getTitle(section, 'common.categories')}
              icon="grid"
              onSeeAll={() => router.push('/(tabs)/categories')}
            />
            {isCategoriesLoading ? (
              <View style={{ gap: 12 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} width={70} height={70} borderRadius={16} />
                  ))}
                </ScrollView>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} width={70} height={70} borderRadius={16} />
                  ))}
                </ScrollView>
              </View>
            ) : categoriesError ? (
              <ErrorState onRetry={() => refetchCategories()} icon="grid-outline" fullWidth={false} />
            ) : categories && categories.length > 0 ? (
              <View style={{ gap: 8 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 8 }}
                >
                  {firstRowCategories.map((item) => (
                    <CategoryItem key={item.id} item={item} />
                  ))}
                </ScrollView>
                {secondRowCategories.length > 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 8 }}
                  >
                    {secondRowCategories.map((item) => (
                      <CategoryItem key={item.id} item={item} />
                    ))}
                  </ScrollView>
                )}
              </View>
            ) : (
              <EmptyState icon="grid-outline" message={t('home.noCategories')} />
            )}
          </View>
        );

      case 'special_offers':
        const getOfferTimeRemaining = () => {
          if (!specialOffers?.offerEndDate) return 0;
          const end = new Date(specialOffers.offerEndDate);
          const now = new Date();
          const secondsRemaining = Math.floor((end.getTime() - now.getTime()) / 1000);
          return Math.max(0, secondsRemaining);
        };

        if (!isOffersLoading && !offersError && (!specialOffers?.products || specialOffers.products.length === 0)) {
          return null;
        }

        return (
          <View key={section.id} className="py-4 bg-white">
            <SectionHeader
              title={specialOffers?.offerName || getTitle(section, 'home.specialOffers')}
              hasTimer={!!specialOffers?.offerEndDate}
              timerSeconds={getOfferTimeRemaining()}
              onSeeAll={() => router.push('/(tabs)/categories')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
            >
              {isOffersLoading ? (
                [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
              ) : offersError ? (
                <ErrorState onRetry={() => refetchOffers()} icon="gift-outline" />
              ) : specialOffers?.products && specialOffers.products.length > 0 ? (
                specialOffers.products.map((item: any) => (
                  <ProductCard key={item.id} product={item} showDiscount={true} />
                ))
              ) : (
                <EmptyState icon="gift-outline" message={t('home.noSpecialOffers')} />
              )}
            </ScrollView>
          </View>
        );

      case 'best_sellers':
        if (!isBestSellersLoading && !bestSellersError && (!bestSellers || bestSellers.length === 0)) {
          return null;
        }

        return (
          <View key={section.id} className="py-4 bg-white">
            <SectionHeader
              title={getTitle(section, 'home.bestSellers')}
              icon="flame"
              onSeeAll={() => router.push('/(tabs)/categories')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
            >
              {isBestSellersLoading ? (
                [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
              ) : bestSellersError ? (
                <ErrorState onRetry={() => refetchBestSellers()} icon="flame-outline" />
              ) : bestSellers && bestSellers.length > 0 ? (
                bestSellers.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))
              ) : (
                <EmptyState icon="flame-outline" message={t('home.noBestSellers')} />
              )}
            </ScrollView>
          </View>
        );

      case 'new_arrivals':
        if (!isNewArrivalsLoading && !newArrivalsError && (!newArrivals || newArrivals.length === 0)) {
          return null;
        }

        return (
          <View key={section.id} className="py-4 bg-white">
            <SectionHeader
              title={getTitle(section, 'home.newArrivals')}
              icon="sparkles"
              onSeeAll={() => router.push('/(tabs)/categories')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
            >
              {isNewArrivalsLoading ? (
                [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
              ) : newArrivalsError ? (
                <ErrorState onRetry={() => refetchNewArrivals()} icon="sparkles-outline" />
              ) : newArrivals && newArrivals.length > 0 ? (
                newArrivals.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))
              ) : (
                <EmptyState icon="sparkles-outline" message={t('home.noNewArrivals')} />
              )}
            </ScrollView>
          </View>
        );

      case 'trending':
        // Trending products - uses dedicated hook with fallback to random products
        return (
          <View key={section.id} className="py-4 bg-white">
            <SectionHeader
              title={getTitle(section, 'home.trending')}
              icon="trending-up"
              onSeeAll={() => router.push('/(tabs)/categories')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingStart: 16, paddingEnd: 32, gap: 12 }}
            >
              {isTrendingLoading ? (
                [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
              ) : trendingError ? (
                <ErrorState onRetry={() => refetchTrending()} icon="trending-up-outline" />
              ) : trendingProducts && trendingProducts.length > 0 ? (
                trendingProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))
              ) : (
                <EmptyState icon="trending-up-outline" message={t('home.noTrending')} />
              )}
            </ScrollView>
          </View>
        );

      case 'category_products':
        // Render category products section using the dedicated component
        if (!section.category_id) return null;
        return (
          <CategoryProductsSection
            key={section.id}
            sectionId={section.id}
            title={section.title || t('home.products')}
            categoryId={section.category_id}
            icon={section.icon}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <MainHeader />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2E7D32']}
            tintColor="#2E7D32"
          />
        }
      >
        {/* Main Banner Slider */}
        <BannerSlider
          banners={banners}
          isLoading={isBannersLoading}
          error={bannersError}
          onRetry={refetchBanners}
          t={t}
        />

        {/* Dynamic Sections with Promo Banners */}
        {isSectionsLoading ? (
          <View className="px-4 mt-4">
            <Skeleton width="100%" height={200} borderRadius={20} />
            <View style={{ height: 24 }} />
            <Skeleton width="100%" height={200} borderRadius={20} />
          </View>
        ) : (
          activeSortedSections.map((section, index) => {
            const content = renderSection(section, index);

            // Add promo banners after specific sections
            const showPromoAfter = (sectionType: string, slotName: string) => {
              if (section.type === sectionType && promoBanners?.[slotName]) {
                return (
                  <PromoBannerSlot
                    key={`promo-${slotName}`}
                    banners={promoBanners[slotName]}
                    isLoading={isPromoBannersLoading}
                  />
                );
              }
              return null;
            };

            return (
              <View key={section.id}>
                {content}
                {/* Promo Banner after Categories */}
                {showPromoAfter('categories', 'slot_1')}
                {/* Promo Banner after Special Offers */}
                {showPromoAfter('special_offers', 'slot_2')}
                {/* Promo Banner after Best Sellers */}
                {showPromoAfter('best_sellers', 'slot_3')}
                {/* Promo Banner after New Arrivals */}
                {showPromoAfter('new_arrivals', 'slot_4')}
              </View>
            );
          })
        )}

        {/* Final Promo Banner Slot at Bottom */}
        <PromoBannerSlot
          banners={promoBanners?.['slot_5']}
          isLoading={isPromoBannersLoading}
        />

        {/* Extra spacing at bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
