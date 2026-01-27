import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCategoryWithSubcategories, useProductsWithFilters } from '../../../hooks/useSupabase';
import type { SortOption, Category } from '../../../shared/types';
import { useCartStore } from '../../../store/cartStore';
import { useLanguage } from '../../../contexts';
import { ProductCard } from '../../../components/ui/ProductCard';
import { BottomSheet } from '../../../components/ui/BottomSheet';
import { PriceSlider } from '../../../components/ui/PriceSlider';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { language, isRTL, t } = useLanguage();
  const insets = useSafeAreaInsets();
  
  // State للفلترة والترتيب
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(500);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // جلب القسم مع أقسامه الفرعية
  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryWithSubcategories(id as string);
  
  // التحقق من وجود أقسام فرعية
  const hasSubcategories = categoryData?.subcategories && categoryData.subcategories.length > 0;
  
  // جلب المنتجات مع الفلترة
  const { data: products, isLoading: isProductsLoading } = useProductsWithFilters(
    id as string,
    [],
    {
      sortBy,
      minPrice: minPrice > 500 ? minPrice : undefined,
      maxPrice: maxPrice < 500000 ? maxPrice : undefined,
      inStock: inStockOnly,
    }
  );
  
  const categoryName = categoryData 
    ? (language === 'ar' ? categoryData.name_ar : (categoryData.name || categoryData.name_ar))
    : '';

  const getSubcategoryName = (sub: Category) => {
    return language === 'ar' ? sub.name_ar : (sub.name || sub.name_ar);
  };

  // خيارات الترتيب
  const sortOptions: { value: SortOption; labelAr: string; labelEn: string; icon: string }[] = [
    { value: 'newest', labelAr: 'الأحدث', labelEn: 'Newest', icon: 'time-outline' },
    { value: 'oldest', labelAr: 'الأقدم', labelEn: 'Oldest', icon: 'time' },
    { value: 'price_low', labelAr: 'السعر: من الأقل للأعلى', labelEn: 'Price: Low to High', icon: 'trending-up-outline' },
    { value: 'price_high', labelAr: 'السعر: من الأعلى للأقل', labelEn: 'Price: High to Low', icon: 'trending-down-outline' },
    { value: 'name_az', labelAr: 'الاسم: أ - ي', labelEn: 'Name: A - Z', icon: 'text-outline' },
    { value: 'name_za', labelAr: 'الاسم: ي - أ', labelEn: 'Name: Z - A', icon: 'text' },
  ];

  const getCurrentSortLabel = () => {
    const current = sortOptions.find(o => o.value === sortBy);
    return language === 'ar' ? current?.labelAr : current?.labelEn;
  };

  const resetFilters = () => {
    setMinPrice(500);
    setMaxPrice(500000);
    setInStockOnly(false);
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const hasActiveFilters = minPrice > 500 || maxPrice < 500000 || inStockOnly;

  // عدد الفلاتر النشطة
  const activeFiltersCount = (minPrice > 500 || maxPrice < 500000 ? 1 : 0) + 
    (inStockOnly ? 1 : 0);

  // عنصر القسم الفرعي
  const renderSubcategoryItem = (sub: Category, isViewAll: boolean = false) => (
    <TouchableOpacity
      key={isViewAll ? 'view-all' : sub.id}
      activeOpacity={0.7}
      onPress={() => {
        if (isViewAll) {
          // عرض جميع المنتجات - يمكن إضافة صفحة خاصة لاحقاً
        } else {
          router.push(`/(tabs)/category/${sub.id}` as any);
        }
      }}
      className="flex-row items-center bg-white"
      style={{
        height: 55,
        paddingHorizontal: 16,
        flexDirection: isRTL ? 'row' : 'row-reverse',
      }}
    >
      {/* سهم التنقل */}
      <Ionicons 
        name={isRTL ? "chevron-back" : "chevron-forward"} 
        size={18} 
        color="#BDBDBD" 
      />

      {/* نص القسم */}
      <View className="flex-1 px-3">
        <Text
          className="font-cairo text-[14px]"
          style={{ 
            color: '#424242',
            textAlign: isRTL ? 'right' : 'left',
          }}
          numberOfLines={1}
        >
          {isViewAll ? (language === 'ar' ? 'عرض الكل' : 'View All') : getSubcategoryName(sub)}
        </Text>
      </View>

      {/* الأيقونة/الصورة */}
      <View 
        className="items-center justify-center"
        style={{ width: 40, height: 40 }}
      >
        {isViewAll ? (
          <Ionicons name="apps-outline" size={24} color="#3F51B5" />
        ) : sub.image_url ? (
          <Image
            source={{ uri: sub.image_url }}
            style={{ width: 35, height: 35 }}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <Ionicons name="folder-outline" size={22} color="#9E9E9E" />
        )}
      </View>
    </TouchableOpacity>
  );

  if (isCategoryLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />

      {/* Custom Header - Green with Back Button and Safe Area */}
      <View 
        style={{ 
          backgroundColor: '#2E7D32',
          paddingTop: insets.top + 8,
          paddingBottom: 8,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" translucent />
        <View 
          className={`flex-row items-center h-12 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <TouchableOpacity 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/categories');
              }
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
            className="w-11 h-11 items-center justify-center rounded-2xl bg-white/20 border border-white/10 shadow-sm"
          >
            <Ionicons 
              name={isRTL ? "chevron-forward" : "chevron-back"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          
          <Text 
            className="flex-1 font-cairo-bold text-[18px] text-white text-center px-2"
            numberOfLines={1}
            style={{ includeFontPadding: false }}
          >
            {categoryName || t('home.products')}
          </Text>
          
          <View className="w-10" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* قائمة الأقسام الفرعية */}
        {hasSubcategories && (
          <View className="bg-white">
            {categoryData?.subcategories?.map((sub) => (
              <View key={sub.id}>
                {renderSubcategoryItem(sub)}
                <View style={{ height: 1, backgroundColor: '#F5F5F5', marginLeft: isRTL ? 0 : 60, marginRight: isRTL ? 60 : 0 }} />
              </View>
            ))}
            
            {/* زر عرض الكل */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                // يمكن إضافة منطق خاص هنا
              }}
              className="flex-row items-center bg-white"
              style={{
                height: 50,
                paddingHorizontal: 16,
                flexDirection: isRTL ? 'row' : 'row-reverse',
                justifyContent: 'flex-end',
              }}
            >
              <Ionicons 
                name={isRTL ? "chevron-back" : "chevron-forward"} 
                size={16} 
                color="#3F51B5" 
              />
              <Text
                className="font-cairo-semibold text-[13px]"
                style={{ 
                  color: '#3F51B5',
                  marginHorizontal: 4,
                }}
              >
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* قسم المنتجات - إذا لم تكن هناك أقسام فرعية */}
        {!hasSubcategories && (
          <>
            {/* شريط الترتيب والفلترة - تصميم عصري وكبير جداً */}
            <View className={`flex-row bg-white px-4 py-4 border-b border-gray-100 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TouchableOpacity 
                onPress={() => setShowSortModal(true)}
                activeOpacity={0.7}
                className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <View className="w-10 h-10 rounded-xl bg-white items-center justify-center shadow-sm mr-2 ml-2">
                  <Ionicons name="swap-vertical" size={20} color="#2E7D32" />
                </View>
                <Text className="font-cairo-bold text-[15px] text-gray-800" numberOfLines={1}>
                  {getCurrentSortLabel()}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setShowFilterModal(true)}
                activeOpacity={0.7}
                className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl ${hasActiveFilters ? 'bg-white border border-gray-300 shadow-md' : 'bg-gray-50 border border-gray-200 shadow-sm'} ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <View className={`w-10 h-10 rounded-xl items-center justify-center shadow-sm mr-2 ml-2 ${hasActiveFilters ? 'bg-primary' : 'bg-white'}`}>
                  <Ionicons name="options-outline" size={20} color={hasActiveFilters ? 'white' : '#6B7280'} />
                </View>
                <Text className={`font-cairo-bold text-[15px] ${hasActiveFilters ? 'text-primary' : 'text-gray-800'}`}>
                  {language === 'ar' ? 'تصفية' : 'Filter'}
                </Text>
                {activeFiltersCount > 0 && (
                  <View className={`bg-red-600 w-6 h-6 rounded-full items-center justify-center absolute -top-1.5 -right-1.5 border-2 border-white shadow-md`}>
                    <Text className="text-white text-[11px] font-bold">{activeFiltersCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* قائمة المنتجات */}
            {isProductsLoading ? (
              <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator size="large" color="#3F51B5" />
              </View>
            ) : products && products.length > 0 ? (
              <View className="flex-row flex-wrap p-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {products.map((item) => (
                  <View key={item.id} style={{ width: '48%', marginBottom: 12, marginHorizontal: '1%' }}>
                    <ProductCard product={item} width="100%" />
                  </View>
                ))}
              </View>
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
                  <Ionicons name="basket-outline" size={48} color="#D1D5DB" />
                </View>
                <Text className="font-cairo-bold text-gray-400 text-base">
                  {t('category.noProducts')}
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* BottomSheet الترتيب */}
      <BottomSheet
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        maxHeight="60%"
      >
        {/* Header */}
        <View className={`px-4 pb-4 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className="font-cairo-bold text-lg text-[#1B4D2E]">
            {language === 'ar' ? 'ترتيب حسب' : 'Sort by'}
          </Text>
        </View>
        
        {/* Options */}
        <View className="px-4 pb-8">
          {sortOptions.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                setSortBy(option.value);
                setShowSortModal(false);
              }}
              className={`flex-row items-center py-3.5 ${index !== sortOptions.length - 1 ? 'border-b border-gray-100' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                sortBy === option.value ? 'bg-primary' : 'bg-gray-100'
              }`}>
                <Ionicons 
                  name={option.icon as any} 
                  size={20} 
                  color={sortBy === option.value ? 'white' : '#6B7280'} 
                />
              </View>
              <Text className={`font-cairo-semibold text-base flex-1 ${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'} ${
                sortBy === option.value ? 'text-primary' : 'text-gray-700'
              }`}>
                {language === 'ar' ? option.labelAr : option.labelEn}
              </Text>
              {sortBy === option.value && (
                <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>

      {/* BottomSheet الفلترة */}
      <BottomSheet
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        maxHeight="80%"
      >
        {/* Header */}
        <View className={`px-4 pb-3 border-b border-gray-100 ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className="font-cairo-bold text-lg text-[#1B4D2E]">
            {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
          </Text>
        </View>
        
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          {/* نطاق السعر */}
          <View className="py-3 border-b border-gray-100">
            <Text className={`font-cairo-bold text-sm text-[#1B4D2E] mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
            </Text>
            
            <PriceSlider
              minValue={500}
              maxValue={500000}
              currentMin={minPrice}
              currentMax={maxPrice}
              onValuesChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              step={500}
              isRTL={isRTL}
              language={language}
            />
          </View>
          
          {/* المتوفر فقط */}
          <TouchableOpacity 
            onPress={() => setInStockOnly(!inStockOnly)}
            className={`flex-row items-center py-3 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <View className={`w-5 h-5 rounded-lg border-2 items-center justify-center ${
              inStockOnly ? 'bg-primary border-primary' : 'border-gray-300'
            }`}>
              {inStockOnly && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </View>
            <View className={`flex-1 ${isRTL ? 'mr-2.5' : 'ml-2.5'}`}>
              <Text className={`font-cairo-semibold text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'المتوفر فقط' : 'In Stock Only'}
              </Text>
              <Text className={`font-cairo text-[10px] text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'إخفاء المنتجات غير المتوفرة' : 'Hide out of stock products'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View className="h-3" />
        </ScrollView>
        
        {/* أزرار التطبيق وإعادة التعيين */}
        <View className={`flex-row px-4 pt-4 pb-8 border-t border-gray-100 bg-white ${isRTL ? 'flex-row-reverse' : ''}`}>
          <TouchableOpacity 
            onPress={resetFilters}
            className="flex-1 py-3.5 border border-gray-300 rounded-xl items-center"
            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
          >
            <Text className="font-cairo-bold text-sm text-gray-600">
              {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={applyFilters}
            className="flex-1 py-3.5 bg-primary rounded-xl items-center"
            style={{ marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }}
          >
            <Text className="font-cairo-bold text-sm text-white">
              {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}
