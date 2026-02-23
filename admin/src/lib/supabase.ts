import { createBrowserClient } from '@supabase/ssr';

// Import shared types
export type { Database } from '../../../shared/types';
export type {
  Product,
  ProductWithCategory,
  Category,
  Order,
  OrderItem,
  OrderItemWithSnapshot,
  Review,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Profile
} from '../../../shared/types';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.KX_2';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
