import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

export { Database } from '../shared/types';
export type {
  Product,
  Category,
  Order,
  OrderItem,
  Review,
  OrderStatus,
  PaymentMethod,
  PaymentStatus
} from '../shared/types';

let _client: SupabaseClient | null = null;
let _initAttempted = false;

function ensureClient(): SupabaseClient {
  if (_client) return _client;
  if (_initAttempted) throw new Error('Supabase initialization failed previously');

  _initAttempted = true;

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
    const msg = 'EXPO_PUBLIC_SUPABASE_URL is missing or invalid. Check your .env file.';
    console.error('[Supabase] ' + msg);
    throw new Error(msg);
  }
  if (!supabaseAnonKey || supabaseAnonKey.length < 20) {
    const msg = 'EXPO_PUBLIC_SUPABASE_ANON_KEY is missing or invalid. Check your .env file.';
    console.error('[Supabase] ' + msg);
    throw new Error(msg);
  }

  _client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });

  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_client) ensureClient();
    return (_client as any)[prop];
  },
  set(_, prop, value) {
    if (!_client) ensureClient();
    (_client as any)[prop] = value;
    return true;
  },
});
