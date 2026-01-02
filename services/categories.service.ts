/**
 * Categories Service
 * خدمة الفئات - تحتوي على جميع استدعاءات Supabase المتعلقة بالفئات
 */

import { supabase } from '../lib/supabase';
import type { Category, CategoryWithSubcategories } from '../shared/types';

/**
 * جلب جميع الفئات النشطة
 */
export const getCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * جلب فئة واحدة بواسطة الـ ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * جلب جميع الفئات (بما في ذلك غير النشطة) - للـ Admin
 */
export const getAllCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * جلب الفئات الرئيسية فقط (التي ليس لها parent_id)
 */
export const getMainCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * جلب الأقسام الفرعية لقسم معين
 */
export const getSubcategories = async (parentId: string): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', parentId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * جلب جميع الفئات الرئيسية مع أقسامها الفرعية
 */
export const getMainCategoriesWithSubcategories = async (): Promise<CategoryWithSubcategories[]> => {
    // جلب الفئات الرئيسية
    const { data: mainCategories, error: mainError } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (mainError) throw mainError;

    // جلب جميع الأقسام الفرعية
    const { data: allSubcategories, error: subError } = await supabase
        .from('categories')
        .select('*')
        .not('parent_id', 'is', null)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (subError) throw subError;

    // دمج الأقسام الفرعية مع الرئيسية
    return (mainCategories || []).map(category => ({
        ...category,
        subcategories: (allSubcategories || []).filter(sub => sub.parent_id === category.id)
    }));
};

/**
 * جلب فئة مع أقسامها الفرعية
 */
export const getCategoryWithSubcategories = async (id: string): Promise<CategoryWithSubcategories> => {
    const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (categoryError) throw categoryError;

    const { data: subcategories, error: subError } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (subError) throw subError;

    return {
        ...category,
        subcategories: subcategories || []
    };
};
