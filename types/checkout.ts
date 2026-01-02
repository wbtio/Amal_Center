import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(3, 'الاسم مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  address: z.string().min(5, 'العنوان مطلوب'),
  city: z.string().optional(),
  type: z.enum(['home', 'work']),
  notes: z.string().optional(),
});

export type AddressData = z.infer<typeof addressSchema>;

export type DeliveryType = 'scheduled' | 'express' | 'electronics';

export type PaymentMethod = 'cod' | 'card' | 'wallet';

export interface CheckoutState {
  step: number;
  address: AddressData | null;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
}
