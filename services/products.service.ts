/**
 * Products Service
 * خدمة المنتجات - تحتوي على جميع استدعاءات Supabase المتعلقة بالمنتجات
 */

import { supabase } from '../lib/supabase';
import type { Product, ProductFilters, SortOption } from '../shared/types';

/**
 * جلب جميع المنتجات النشطة
 */
export const getProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

/**
 * جلب منتج واحد بواسطة الـ ID
 */
export const getProductById = async (id: string): Promise<Product> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * جلب المنتجات حسب الفئة
 */
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true);

    if (error) throw error;
    return data || [];
};

/**
 * نتيجة العروض الخاصة مع تاريخ الانتهاء
 */
export interface SpecialOffersResult {
    products: (Product & { discount_percentage?: number; original_price?: number })[];
    offerEndDate: string | null;
    offerName: string | null;
}

/**
 * جلب العروض الخاصة من جدول العروض الجديد
 * إذا لم توجد عروض نشطة، يتم إرجاع منتجات عشوائية كـ "عروض اليوم"
 */
export const getSpecialOffers = async (limit: number = 6): Promise<SpecialOffersResult> => {
    const now = new Date().toISOString();

    // جلب العرض النشط الحالي
    const { data: activeOffer, error: offerError } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (offerError || !activeOffer) {
        // Fallback: إذا لم يوجد عرض نشط، أرجع منتجات عشوائية كـ "عروض اليوم"
        const randomProducts = await getRandomProducts(limit);
        
        // إضافة خصم وهمي للعرض (10-30%)
        const productsWithFakeDiscount = randomProducts.map(product => {
            const discountPercent = Math.floor(Math.random() * 21) + 10; // 10-30%
            const originalPrice = product.price_iqd;
            const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
            
            return {
                ...product,
                original_price: originalPrice,
                price_iqd: discountedPrice,
                discount_percentage: discountPercent
            };
        });
        
        return {
            products: productsWithFakeDiscount,
            offerEndDate: null,
            offerName: 'عروض اليوم'
        };
    }

    // جلب منتجات العرض
    const { data: offerProducts, error: productsError } = await supabase
        .from('offer_products')
        .select(`
            product_id,
            products (*)
        `)
        .eq('offer_id', activeOffer.id)
        .limit(limit);

    if (productsError) throw productsError;

    // تطبيق الخصم على المنتجات
    const productsWithDiscount = (offerProducts || [])
        .map((op: any) => op.products)
        .filter(Boolean)
        .map((product: Product) => {
            const originalPrice = product.price_iqd;
            let discountedPrice = originalPrice;

            if (activeOffer.discount_type === 'percentage') {
                discountedPrice = originalPrice - (originalPrice * activeOffer.discount_value / 100);
            } else {
                discountedPrice = Math.max(0, originalPrice - activeOffer.discount_value);
            }

            return {
                ...product,
                original_price: originalPrice,
                price_iqd: Math.round(discountedPrice),
                discount_percentage: activeOffer.discount_type === 'percentage'
                    ? activeOffer.discount_value
                    : Math.round((1 - discountedPrice / originalPrice) * 100)
            };
        });

    return {
        products: productsWithDiscount,
        offerEndDate: activeOffer.end_date,
        offerName: activeOffer.name_ar
    };
};

/**
 * جلب الأكثر مبيعاً
 * إذا لم توجد مبيعات، يتم إرجاع منتجات عشوائية
 */
export const getBestSellers = async (limit: number = 6): Promise<Product[]> => {
    // أولاً: محاولة جلب المنتجات الأكثر مبيعاً
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .gt('sales_count', 0)
        .order('sales_count', { ascending: false })
        .limit(limit);

    if (error) throw error;
    
    // إذا وجدت منتجات مبيعة، أرجعها
    if (data && data.length > 0) {
        return data;
    }
    
    // Fallback: إذا لم توجد مبيعات، أرجع منتجات عشوائية
    return getRandomProducts(limit);
};

/**
 * جلب المنتجات الجديدة (وصل حديثاً)
 */
export const getNewArrivals = async (limit: number = 6): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data || [];
};

/**
 * جلب منتجات عشوائية
 * تستخدم كـ fallback عندما لا توجد بيانات في الأقسام الأخرى
 */
export const getRandomProducts = async (limit: number = 6): Promise<Product[]> => {
    // جلب عدد أكبر ثم اختيار عشوائي
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(50);

    if (error) throw error;
    if (!data || data.length === 0) return [];
    
    // خلط المنتجات عشوائياً
    const shuffled = data.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
};

/**
 * جلب المنتجات الرائجة (Trending)
 * يعتمد على المشاهدات أو المبيعات الأخيرة
 * إذا لم توجد بيانات، يرجع منتجات عشوائية
 */
export const getTrendingProducts = async (limit: number = 6): Promise<Product[]> => {
    // محاولة جلب المنتجات بناءً على المشاهدات أو المبيعات
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .gt('sales_count', 0)
        .order('sales_count', { ascending: false })
        .limit(limit);

    if (error) throw error;
    
    if (data && data.length > 0) {
        return data;
    }
    
    // Fallback: منتجات عشوائية
    return getRandomProducts(limit);
};


/**
 * جلب المنتجات المشابهة
 */
export const getSimilarProducts = async (
    categoryId: string,
    excludeProductId: string,
    limit: number = 6
): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .neq('id', excludeProductId)
        .eq('is_active', true)
        .limit(limit);

    if (error) throw error;
    return data || [];
};

/**
 * البحث في المنتجات
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%,description.ilike.%${query}%,description_ar.ilike.%${query}%`);

    if (error) throw error;
    return data || [];
};

/**
 * جلب المنتجات مع فلترة
 */
export const getFilteredProducts = async (filters: ProductFilters): Promise<Product[]> => {
    let query = supabase.from('products').select('*').eq('is_active', true);

    if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
    }

    if (filters.min_price !== undefined) {
        query = query.gte('price_iqd', filters.min_price);
    }

    if (filters.max_price !== undefined) {
        query = query.lte('price_iqd', filters.max_price);
    }

    if (filters.in_stock) {
        query = query.gt('stock_quantity', 0);
    }

    if (filters.search) {
        query = query.or(
            `name.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%`
        );
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

/**
 * جلب المنتجات حسب الفئة مع الفلترة والترتيب
 */
export const getProductsByCategoryWithFilters = async (
    categoryId: string,
    options?: {
        subcategoryId?: string;
        sortBy?: SortOption;
        minPrice?: number;
        maxPrice?: number;
        inStock?: boolean;
    }
): Promise<Product[]> => {
    let query = supabase.from('products').select('*').eq('is_active', true);

    // إذا كان هناك قسم فرعي محدد، استخدمه، وإلا استخدم القسم الرئيسي
    if (options?.subcategoryId) {
        query = query.eq('category_id', options.subcategoryId);
    } else {
        query = query.eq('category_id', categoryId);
    }

    // فلترة السعر
    if (options?.minPrice !== undefined) {
        query = query.gte('price_iqd', options.minPrice);
    }
    if (options?.maxPrice !== undefined) {
        query = query.lte('price_iqd', options.maxPrice);
    }

    // فلترة المخزون
    if (options?.inStock) {
        query = query.gt('stock_quantity', 0);
    }

    // الترتيب
    switch (options?.sortBy) {
        case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
        case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
        case 'price_low':
            query = query.order('price_iqd', { ascending: true });
            break;
        case 'price_high':
            query = query.order('price_iqd', { ascending: false });
            break;
        case 'name_az':
            query = query.order('name_ar', { ascending: true });
            break;
        case 'name_za':
            query = query.order('name_ar', { ascending: false });
            break;
        default:
            query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

/**
 * جلب المنتجات لقسم رئيسي وجميع أقسامه الفرعية
 */
export const getProductsByMainCategory = async (
    categoryId: string,
    subcategoryIds: string[],
    options?: {
        sortBy?: SortOption;
        minPrice?: number;
        maxPrice?: number;
        inStock?: boolean;
    }
): Promise<Product[]> => {
    const allCategoryIds = [categoryId, ...subcategoryIds];

    let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .in('category_id', allCategoryIds);

    // فلترة السعر
    if (options?.minPrice !== undefined) {
        query = query.gte('price_iqd', options.minPrice);
    }
    if (options?.maxPrice !== undefined) {
        query = query.lte('price_iqd', options.maxPrice);
    }

    // فلترة المخزون
    if (options?.inStock) {
        query = query.gt('stock_quantity', 0);
    }

    // الترتيب
    switch (options?.sortBy) {
        case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
        case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
        case 'price_low':
            query = query.order('price_iqd', { ascending: true });
            break;
        case 'price_high':
            query = query.order('price_iqd', { ascending: false });
            break;
        case 'name_az':
            query = query.order('name_ar', { ascending: true });
            break;
        case 'name_za':
            query = query.order('name_ar', { ascending: false });
            break;
        default:
            query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};
