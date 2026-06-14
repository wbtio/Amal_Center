/**
 * Categories Service
 * خدمة الفئات - تحتوي على جميع استدعاءات Supabase المتعلقة بالفئات
 */

import { supabase } from '../lib/supabase';
import type { Category, CategoryWithSubcategories } from '../shared/types';

const CATEGORY_LIST_FIELDS = 'id, name, name_ar, icon, image_url, parent_id, sort_order, is_active';

// كاش في الذاكرة للفئات — لا تتغير غالباً
let _categoriesCache: { ts: number; data: Category[] } | null = null;
const CATEGORIES_TTL = 10 * 60 * 1000;

/**
 * جلب جميع الفئات النشطة
 */
export const getCategories = async (): Promise<Category[]> => {
    if (_categoriesCache && Date.now() - _categoriesCache.ts < CATEGORIES_TTL) {
        return _categoriesCache.data;
    }
    const { data, error } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    // CATEGORY_LIST_FIELDS يحتوي على الأعمدة الأساسية فقط، created_at/updated_at تُجلب عند الحاجة
    const arr = (data || []) as unknown as Category[];
    _categoriesCache = { ts: Date.now(), data: arr };
    return arr;
};

/**
 * جلب فئة واحدة بواسطة الـ ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
    const { data, error } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Category;
};

/**
 * جلب جميع الفئات (بما في ذلك غير النشطة) - للـ Admin
 */
export const getAllCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, name_ar, icon, image_url, parent_id, sort_order, is_active')
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data || []) as Category[];
};

/**
 * جلب الفئات الرئيسية فقط (التي ليس لها parent_id)
 */
export const getMainCategories = async (): Promise<Category[]> => {
    if (_categoriesCache && Date.now() - _categoriesCache.ts < CATEGORIES_TTL) {
        return _categoriesCache.data.filter(c => !c.parent_id);
    }
    const { data, error } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .is('parent_id', null)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data || []) as Category[];
};

/**
 * جلب الأقسام الفرعية لقسم معين
 */
export const getSubcategories = async (parentId: string): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('parent_id', parentId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data || []) as Category[];
};

/**
 * جلب جميع الفئات الرئيسية مع أقسامها الفرعية
 */
export const getMainCategoriesWithSubcategories = async (): Promise<CategoryWithSubcategories[]> => {
    // استعلام واحد فقط بدلاً من 2 — جلب الكل ثم الفلترة في الذاكرة
    if (_categoriesCache && Date.now() - _categoriesCache.ts < CATEGORIES_TTL) {
        const all = _categoriesCache.data;
        const main = all.filter(c => !c.parent_id);
        return main.map(c => ({
            ...c,
            subcategories: all.filter(s => s.parent_id === c.id)
        }));
    }

    const { data: allCategories, error } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;

    _categoriesCache = { ts: Date.now(), data: (allCategories || []) as Category[] };

    const main = (allCategories || []).filter((c: any) => !c.parent_id);
    return main.map((category: any) => ({
        ...category,
        subcategories: (allCategories || []).filter((sub: any) => sub.parent_id === category.id)
    }));
};

/**
 * جلب فئة مع أقسامها الفرعية
 */
export const getCategoryWithSubcategories = async (id: string): Promise<CategoryWithSubcategories> => {
    const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('id', id)
        .single();

    if (categoryError) throw categoryError;

    const { data: subcategories, error: subError } = await supabase
        .from('categories')
        .select(CATEGORY_LIST_FIELDS)
        .eq('parent_id', id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (subError) throw subError;

    return {
        ...category,
        subcategories: (subcategories || []) as Category[]
    } as CategoryWithSubcategories;
};
