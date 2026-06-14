/**
 * Delivery Options — مصدر موحّد لخيارات ورسوم التوصيل
 * يُستخدم في السلة، الدفع، وخطوة اختيار التوصيل لضمان تطابق الرسوم.
 *
 * ملاحظة: عند الرغبة بجعل الرسوم قابلة للتعديل من لوحة التحكم،
 * تُنقل هذه القيم إلى جدول `delivery_options` في Supabase ويُقرأ منها عبر hook.
 */

import type { DeliveryType } from '../types/checkout';

export interface DeliveryOption {
    id: DeliveryType;
    price_iqd: number;
    title_ar: string;
    title_en: string;
    desc_ar: string;
    desc_en: string;
    icon: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
    {
        id: 'scheduled',
        price_iqd: 2000,
        title_ar: 'توصيل عادي',
        title_en: 'Standard',
        desc_ar: '24-48 ساعة',
        desc_en: '24-48 hrs',
        icon: 'bicycle-outline',
    },
    {
        id: 'express',
        price_iqd: 5000,
        title_ar: 'سريع',
        title_en: 'Express',
        desc_ar: 'نفس اليوم',
        desc_en: 'Same day',
        icon: 'flash-outline',
    },
    {
        id: 'electronics',
        price_iqd: 10000,
        title_ar: 'أجهزة',
        title_en: 'Fragile',
        desc_ar: 'عناية فائقة',
        desc_en: 'Extra care',
        icon: 'tv-outline',
    },
];

/** الرسوم الافتراضية (التوصيل العادي) — تُعرض في السلة قبل اختيار نوع التوصيل */
export const DEFAULT_DELIVERY_TYPE: DeliveryType = 'scheduled';

/** إرجاع رسوم التوصيل لنوع معيّن من مصدر واحد */
export const getDeliveryCost = (type: DeliveryType): number => {
    const option = DELIVERY_OPTIONS.find((o) => o.id === type);
    return option?.price_iqd ?? DELIVERY_OPTIONS[0].price_iqd;
};

export const DEFAULT_DELIVERY_FEE_IQD = getDeliveryCost(DEFAULT_DELIVERY_TYPE);
