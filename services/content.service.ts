
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

// كاش المحتوى الثابت — لا يتغير في الجلسات القصيرة
let _bannersCache: { ts: number; data: Banner[] } | null = null;
let _sectionsCache: { ts: number; data: HomeSection[] } | null = null;
let _promoCache: { ts: number; data: Record<string, PromoBanner[]> } | null = null;
const CONTENT_TTL = 5 * 60 * 1000; // 5 دقائق

/**
 * Get active banners
 */
export const getActiveBanners = async (): Promise<Banner[]> => {
    try {
        if (_bannersCache && Date.now() - _bannersCache.ts < CONTENT_TTL) {
            return _bannersCache.data;
        }
        const { data, error } = await supabase
            .from('banners')
            .select('id, image_url, title, subtitle, discount, active, link')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching banners:', error);
            return _bannersCache?.data || [];
        }

        const arr = (data || []) as Banner[];
        _bannersCache = { ts: Date.now(), data: arr };
        return arr;
    } catch (e) {
        console.error('Exception fetching banners:', e);
        return _bannersCache?.data || [];
    }
};

/**
 * Get home sections configuration
 */
export const getHomeSections = async (): Promise<HomeSection[]> => {
    try {
        if (_sectionsCache && Date.now() - _sectionsCache.ts < CONTENT_TTL) {
            return _sectionsCache.data;
        }
        const { data, error } = await supabase
            .from('home_sections')
            .select('id, type, title, active, order_index, category_id, icon, description')
            .eq('active', true)
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching home sections:', error);
            return _sectionsCache?.data || [];
        }

        const arr = (data || []) as HomeSection[];
        _sectionsCache = { ts: Date.now(), data: arr };
        return arr;
    } catch (e) {
        console.error('Exception fetching home sections:', e);
        return _sectionsCache?.data || [];
    }
};

/**
 * Get promo banners by slot
 */
export const getPromoBanners = async (slot?: string): Promise<PromoBanner[]> => {
    const all = await getAllPromoBanners();
    if (!slot) return Object.values(all).flat();
    return all[slot] || [];
};

/**
 * Get all promo banners (grouped by slot)
 */
export const getAllPromoBanners = async (): Promise<Record<string, PromoBanner[]>> => {
    try {
        if (_promoCache && Date.now() - _promoCache.ts < CONTENT_TTL) {
            return _promoCache.data;
        }
        const { data, error } = await supabase
            .from('promo_banners')
            .select('id, slot, position, size, image_url, link, title, active')
            .eq('active', true)
            .order('slot', { ascending: true })
            .order('position', { ascending: true });

        if (error) {
            console.error('Error fetching all promo banners:', error);
            return _promoCache?.data || {};
        }

        const grouped: Record<string, PromoBanner[]> = {};
        (data || []).forEach((banner: PromoBanner) => {
            if (!grouped[banner.slot]) grouped[banner.slot] = [];
            grouped[banner.slot].push(banner);
        });

        _promoCache = { ts: Date.now(), data: grouped };
        return grouped;
    } catch (e) {
        console.error('Exception fetching all promo banners:', e);
        return _promoCache?.data || {};
    }
};

