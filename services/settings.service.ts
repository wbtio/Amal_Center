/**
 * Settings & Content Service
 * يقرأ المحتوى القابل للتعديل من لوحة التحكم (app_settings / faq_items / content_pages)
 * مع قيم احتياطية = المحتوى الأصلي حتى يعمل التطبيق لو كانت القاعدة فارغة أو بدون اتصال.
 */

import { supabase } from '../lib/supabase';
import { APP_CONFIG } from '../constants/app';
import { DELIVERY_OPTIONS, getDeliveryCost } from '../constants/delivery';

export interface WorkingHour {
    days_ar: string;
    days_en: string;
    time_ar: string;
    time_en: string;
}

export interface Branch {
    label_ar: string;
    label_en: string;
    href: string;
}

export interface AppSettings {
    contact: {
        whatsappNumber: string;
        whatsappUrl: string;
        supportEmail: string;
        facebookUrl: string;
        instagramUrl: string;
    };
    storeAddressAr: string;
    storeAddressEn: string;
    workingHours: WorkingHour[];
    branches: Branch[];
    delivery: {
        standard: number;
        express: number;
        electronics: number;
        freeThreshold: number;
    };
    payment: {
        waylEnabled: boolean;
    };
}

export interface FaqItem {
    id: string;
    question_ar: string;
    question_en: string;
    answer_ar: string;
    answer_en: string;
}

export interface ContentSection {
    icon?: string;
    title_ar: string;
    title_en: string;
    content_ar: string;
    content_en: string;
}

export interface ContentPage {
    slug: string;
    title_ar: string;
    title_en: string;
    intro_ar: string;
    intro_en: string;
    sections: ContentSection[];
}

// ── القيم الاحتياطية (المحتوى الأصلي) ──────────────────────────────────────
const DEFAULT_SETTINGS: AppSettings = {
    contact: {
        whatsappNumber: APP_CONFIG.WHATSAPP_NUMBER,
        whatsappUrl: APP_CONFIG.WHATSAPP_URL,
        supportEmail: APP_CONFIG.SUPPORT_EMAIL,
        facebookUrl: APP_CONFIG.FACEBOOK_URL,
        instagramUrl: APP_CONFIG.INSTAGRAM_URL,
    },
    storeAddressAr: 'بغداد، العراق\nشارع الرشيد، مقابل سوق الشورجة',
    storeAddressEn: 'Baghdad, Iraq\nAl-Rasheed Street, opposite Shorja Market',
    workingHours: [
        { days_ar: 'السبت - الخميس', days_en: 'Saturday - Thursday', time_ar: '٨ ص - ١٠ م', time_en: '8 AM - 10 PM' },
        { days_ar: 'الجمعة', days_en: 'Friday', time_ar: '٢ م - ١٠ م', time_en: '2 PM - 10 PM' },
    ],
    branches: APP_CONFIG.BRANCH_LOCATIONS.map(b => ({ label_ar: b.label_ar, label_en: b.label_en, href: b.href })),
    delivery: {
        standard: getDeliveryCost('scheduled'),
        express: getDeliveryCost('express'),
        electronics: getDeliveryCost('electronics'),
        freeThreshold: 50000,
    },
    payment: {
        waylEnabled: false,
    },
};

// ── كاش بسيط ───────────────────────────────────────────────────────────────
let _settingsCache: { ts: number; data: AppSettings } | null = null;
const TTL = 5 * 60 * 1000;

/**
 * جلب كل إعدادات التطبيق ودمجها مع القيم الاحتياطية
 */
export const getAppSettings = async (): Promise<AppSettings> => {
    try {
        if (_settingsCache && Date.now() - _settingsCache.ts < TTL) return _settingsCache.data;

        const { data, error } = await supabase.from('app_settings').select('key, value');
        if (error || !data) return _settingsCache?.data || DEFAULT_SETTINGS;

        const map: Record<string, any> = {};
        data.forEach((row: any) => { map[row.key] = row.value; });

        const merged: AppSettings = {
            contact: {
                whatsappNumber: map.contact_whatsapp_number ?? DEFAULT_SETTINGS.contact.whatsappNumber,
                whatsappUrl: map.contact_whatsapp_url ?? DEFAULT_SETTINGS.contact.whatsappUrl,
                supportEmail: map.contact_support_email ?? DEFAULT_SETTINGS.contact.supportEmail,
                facebookUrl: map.contact_facebook_url ?? DEFAULT_SETTINGS.contact.facebookUrl,
                instagramUrl: map.contact_instagram_url ?? DEFAULT_SETTINGS.contact.instagramUrl,
            },
            storeAddressAr: map.store_address_ar ?? DEFAULT_SETTINGS.storeAddressAr,
            storeAddressEn: map.store_address_en ?? DEFAULT_SETTINGS.storeAddressEn,
            workingHours: Array.isArray(map.working_hours) && map.working_hours.length ? map.working_hours : DEFAULT_SETTINGS.workingHours,
            branches: Array.isArray(map.branches) && map.branches.length ? map.branches : DEFAULT_SETTINGS.branches,
            delivery: {
                standard: Number(map.delivery_fee_standard ?? DEFAULT_SETTINGS.delivery.standard),
                express: Number(map.delivery_fee_express ?? DEFAULT_SETTINGS.delivery.express),
                electronics: Number(map.delivery_fee_electronics ?? DEFAULT_SETTINGS.delivery.electronics),
                freeThreshold: Number(map.free_delivery_threshold ?? DEFAULT_SETTINGS.delivery.freeThreshold),
            },
            payment: {
                waylEnabled: map.payment_wayl_enabled === true || map.payment_wayl_enabled === 'true',
            },
        };

        _settingsCache = { ts: Date.now(), data: merged };
        return merged;
    } catch {
        return _settingsCache?.data || DEFAULT_SETTINGS;
    }
};

export { DEFAULT_SETTINGS };

/**
 * جلب الأسئلة الشائعة النشطة
 */
export const getFaqItems = async (): Promise<FaqItem[]> => {
    const { data, error } = await supabase
        .from('faq_items')
        .select('id, question_ar, question_en, answer_ar, answer_en')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data || []) as FaqItem[];
};

/**
 * جلب صفحة محتوى بالـ slug (terms / privacy / about)
 */
export const getContentPage = async (slug: string): Promise<ContentPage | null> => {
    const { data, error } = await supabase
        .from('content_pages')
        .select('slug, title_ar, title_en, intro_ar, intro_en, sections')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

    if (error) throw error;
    return (data as ContentPage) || null;
};
