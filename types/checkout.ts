import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  city: z.string().min(1, 'المدينة مطلوبة'),
  area: z.string().optional(), // المنطقة
  street: z.string().optional(), // الشارع وتفاصيل العنوان
  nearestLandmark: z.string().optional(), // أقرب نقطة دالة
  type: z.enum(['home', 'work']),
  notes: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// قائمة المحافظات العراقية
export const IRAQI_CITIES = [
  { id: 'baghdad', name_ar: 'بغداد', name_en: 'Baghdad' },
  { id: 'basra', name_ar: 'البصرة', name_en: 'Basra' },
  { id: 'mosul', name_ar: 'الموصل', name_en: 'Mosul' },
  { id: 'erbil', name_ar: 'أربيل', name_en: 'Erbil' },
  { id: 'sulaymaniyah', name_ar: 'السليمانية', name_en: 'Sulaymaniyah' },
  { id: 'najaf', name_ar: 'النجف', name_en: 'Najaf' },
  { id: 'karbala', name_ar: 'كربلاء', name_en: 'Karbala' },
  { id: 'kirkuk', name_ar: 'كركوك', name_en: 'Kirkuk' },
  { id: 'diyala', name_ar: 'ديالى', name_en: 'Diyala' },
  { id: 'anbar', name_ar: 'الأنبار', name_en: 'Anbar' },
  { id: 'babylon', name_ar: 'بابل', name_en: 'Babylon' },
  { id: 'wasit', name_ar: 'واسط', name_en: 'Wasit' },
  { id: 'maysan', name_ar: 'ميسان', name_en: 'Maysan' },
  { id: 'dhi_qar', name_ar: 'ذي قار', name_en: 'Dhi Qar' },
  { id: 'muthanna', name_ar: 'المثنى', name_en: 'Muthanna' },
  { id: 'qadisiyyah', name_ar: 'القادسية', name_en: 'Qadisiyyah' },
  { id: 'saladin', name_ar: 'صلاح الدين', name_en: 'Saladin' },
  { id: 'duhok', name_ar: 'دهوك', name_en: 'Duhok' },
];

export type AddressData = z.infer<typeof addressSchema>;

export type DeliveryType = 'scheduled' | 'express' | 'electronics';

export type PaymentMethod = 'cod' | 'card' | 'wallet';

export interface CheckoutState {
  step: number;
  address: AddressData | null;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
}
