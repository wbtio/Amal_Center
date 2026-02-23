/**
 * Supabase Hooks
 * هذا الملف يحتوي على React Query hooks للتعامل مع البيانات
 * يستخدم الـ Services للاتصال بـ Supabase
 */

import { useQuery } from '@tanstack/react-query';
import type { Product, Category, CategoryWithSubcategories, SortOption } from '../shared/types';

// Import services
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  getSpecialOffers,
  getBestSellers,
  getSimilarProducts,
  getNewArrivals,
  getTrendingProducts,
  getRandomProducts,
} from '../services/products.service';

import {
  getCategories,
  getCategoryById,
  getSubcategories,
  getCategoryWithSubcategories,
  getMainCategories,
  getMainCategoriesWithSubcategories,
} from '../services/categories.service';
import { getProductsByMainCategory } from '../services/products.service';
import { getActiveBanners, getHomeSections, getAllPromoBanners } from '../services/content.service';
export type { Banner, HomeSection, PromoBanner } from '../services/content.service';

// Re-export types for backward compatibility
export type { Product, Category, CategoryWithSubcategories, SortOption } from '../shared/types';

/**
 * جلب جميع الفئات النشطة
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

/**
 * جلب الفئات الرئيسية فقط (بدون الفرعية)
 */
export const useMainCategories = () => {
  return useQuery({
    queryKey: ['mainCategories'],
    queryFn: getMainCategories,
  });
};

/**
 * جلب الفئات الرئيسية مع أقسامها الفرعية
 */
export const useMainCategoriesWithSubcategories = () => {
  return useQuery({
    queryKey: ['mainCategoriesWithSubs'],
    queryFn: getMainCategoriesWithSubcategories,
  });
};

/**
 * جلب فئة واحدة بواسطة المعرف
 */
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

/**
 * جلب فئة مع أقسامها الفرعية
 */
export const useCategoryWithSubcategories = (id: string) => {
  return useQuery({
    queryKey: ['categoryWithSubs', id],
    queryFn: () => getCategoryWithSubcategories(id),
    enabled: !!id,
  });
};

/**
 * جلب الأقسام الفرعية لقسم معين
 */
export const useSubcategories = (parentId: string) => {
  return useQuery({
    queryKey: ['subcategories', parentId],
    queryFn: () => getSubcategories(parentId),
    enabled: !!parentId,
  });
};

/**
 * جلب المنتجات لقسم رئيسي وجميع أقسامه الفرعية مع الفلترة والترتيب
 */
export const useProductsWithFilters = (
  categoryId: string,
  subcategoryIds: string[],
  options?: {
    sortBy?: SortOption;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }
) => {
  return useQuery({
    queryKey: ['productsFiltered', categoryId, subcategoryIds, options],
    queryFn: () => getProductsByMainCategory(categoryId, subcategoryIds, options),
    enabled: !!categoryId,
  });
};

/**
 * جلب العروض الخاصة مع تاريخ الانتهاء
 */
export const useSpecialOffers = () => {
  return useQuery({
    queryKey: ['specialOffers'],
    queryFn: () => getSpecialOffers(6),
    select: (data) => ({
      products: data.products,
      offerEndDate: data.offerEndDate,
      offerName: data.offerName,
    }),
  });
};

/**
 * جلب المنتجات حسب الفئة
 */
export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
};

/**
 * جلب الأكثر مبيعاً
 */
export const useBestSellers = () => {
  return useQuery({
    queryKey: ['bestSellers'],
    queryFn: () => getBestSellers(6),
  });
};

/**
 * جلب المنتجات الجديدة (وصل حديثاً)
 */
export const useNewArrivals = () => {
  return useQuery({
    queryKey: ['newArrivals'],
    queryFn: () => getNewArrivals(6),
  });
};

/**
 * جلب المنتجات المشابهة
 */
export const useSimilarProducts = (categoryId: string, currentProductId: string) => {
  return useQuery({
    queryKey: ['similarProducts', categoryId, currentProductId],
    queryFn: () => getSimilarProducts(categoryId, currentProductId, 6),
    enabled: !!categoryId && !!currentProductId,
  });
};

/**
 * جلب منتج واحد
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

/**
 * جلب البنرات النشطة
 */
export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: getActiveBanners,
  });
};

/**
 * جلب أقسام الصفحة الرئيسية
 */
export const useHomeSections = () => {
  return useQuery({
    queryKey: ['homeSections'],
    queryFn: getHomeSections,
  });
};

/**
 * جلب البنرات الترويجية (مجمعة حسب الـ slot)
 */
export const usePromoBanners = () => {
  return useQuery({
    queryKey: ['promoBanners'],
    queryFn: getAllPromoBanners,
  });
};

/**
 * جلب المنتجات الرائجة (Trending)
 * يعتمد على المبيعات، وإذا لم توجد يرجع منتجات عشوائية
 */
export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ['trendingProducts'],
    queryFn: () => getTrendingProducts(6),
  });
};

/**
 * جلب منتجات عشوائية
 */
export const useRandomProducts = (limit: number = 6) => {
  return useQuery({
    queryKey: ['randomProducts', limit],
    queryFn: () => getRandomProducts(limit),
  });
};
