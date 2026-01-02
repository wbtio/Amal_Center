
import { supabase } from '../lib/supabase';

// Types
export type Banner = {
    id: string;
    image_url: string;
    title: string;
    subtitle?: string;
    discount?: string;
    active: boolean;
    link?: string;
};

export type HomeSection = {
    id: string;
    type: 'categories' | 'special_offers' | 'best_sellers' | 'trending' | 'new_arrivals' | 'category_products' | 'promo_banner' | 'custom';
    title: string;
    active: boolean;
    order_index: number;
    category_id?: string;
    icon?: string;
    description?: string;
    promo_slot?: string;
};

export type PromoBanner = {
    id: string;
    slot: string;
    position: number;
    size: 'full' | 'half' | 'square';
    image_url: string;
    link?: string;
    title?: string;
    active: boolean;
};

/**
 * Get active banners
 */
export const getActiveBanners = async (): Promise<Banner[]> => {
    try {
        const { data, error } = await supabase
            .from('banners')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching banners:', error);
            return [];
        }

        return data || [];
    } catch (e) {
        console.error('Exception fetching banners:', e);
        return [];
    }
};

/**
 * Get home sections configuration
 */
export const getHomeSections = async (): Promise<HomeSection[]> => {
    try {
        const { data, error } = await supabase
            .from('home_sections')
            .select('*')
            .eq('active', true) // Only get active sections for the app
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching home sections:', error);
            // Return empty array instead of throwing - let UI handle fallback
            return [];
        }

        return data || [];
    } catch (e) {
        console.error('Exception fetching home sections:', e);
        return [];
    }
};

/**
 * Get promo banners by slot
 */
export const getPromoBanners = async (slot?: string): Promise<PromoBanner[]> => {
    try {
        let query = supabase
            .from('promo_banners')
            .select('*')
            .eq('active', true)
            .order('position', { ascending: true });

        if (slot) {
            query = query.eq('slot', slot);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching promo banners:', error);
            return [];
        }

        return data || [];
    } catch (e) {
        console.error('Exception fetching promo banners:', e);
        return [];
    }
};

/**
 * Get all promo banners (grouped by slot)
 */
export const getAllPromoBanners = async (): Promise<Record<string, PromoBanner[]>> => {
    try {
        const { data, error } = await supabase
            .from('promo_banners')
            .select('*')
            .eq('active', true)
            .order('slot', { ascending: true })
            .order('position', { ascending: true });

        if (error) {
            console.error('Error fetching all promo banners:', error);
            return {};
        }

        // Group by slot
        const grouped: Record<string, PromoBanner[]> = {};
        (data || []).forEach((banner: PromoBanner) => {
            if (!grouped[banner.slot]) {
                grouped[banner.slot] = [];
            }
            grouped[banner.slot].push(banner);
        });

        return grouped;
    } catch (e) {
        console.error('Exception fetching all promo banners:', e);
        return {};
    }
};

