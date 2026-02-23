// Base entity interface
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Product interfaces
export interface Product extends BaseEntity {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price_iqd: number;
  price_usd: number;
  image_url: string;
  category_id: string;
  stock_quantity: number;
  is_active: boolean;
}

export interface ProductCreateInput {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price_iqd: number;
  price_usd: number;
  image_url: string;
  category_id: string;
  stock_quantity: number;
  is_active?: boolean;
}

export interface ProductUpdateInput {
  name?: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price_iqd?: number;
  price_usd?: number;
  image_url?: string;
  category_id?: string;
  stock_quantity?: number;
  is_active?: boolean;
}

// Category interfaces
export interface Category extends BaseEntity {
  name: string;
  name_ar: string;
  icon: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface CategoryCreateInput {
  name: string;
  name_ar: string;
  icon: string;
  image_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

export interface CategoryUpdateInput {
  name?: string;
  name_ar?: string;
  icon?: string;
  image_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

// Order interfaces
export interface Order extends BaseEntity {
  user_id: string;
  total_iqd: number;
  total_usd: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  delivery_address: string;
  delivery_phone: string;
  customer_notes: string | null;
  order_items?: OrderItem[];
}

export interface OrderCreateInput {
  user_id: string;
  total_iqd: number;
  total_usd: number;
  payment_method: PaymentMethod;
  delivery_address: string;
  delivery_phone: string;
  customer_notes?: string | null;
}

export interface OrderUpdateInput {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  customer_notes?: string | null;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

// Order Item interfaces
export interface OrderItem extends BaseEntity {
  order_id: string;
  product_id: string;
  quantity: number;
  price_iqd: number;
  price_usd: number;
  product_snapshot: Product;
}

export interface OrderItemCreateInput {
  order_id: string;
  product_id: string;
  quantity: number;
  price_iqd: number;
  price_usd: number;
  product_snapshot: Product;
}

// Review interfaces
export interface Review extends BaseEntity {
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  user?: {
    name: string;
    avatar_url?: string;
  };
}

export interface ReviewCreateInput {
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string | null;
}

export interface ReviewUpdateInput {
  rating?: number;
  comment?: string | null;
  is_approved?: boolean;
}

// User interfaces (for auth)
export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  name_ar?: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreateInput {
  email: string;
  phone?: string;
  name?: string;
  name_ar?: string;
  password: string;
}

export interface UserUpdateInput {
  phone?: string;
  name?: string;
  name_ar?: string;
  avatar_url?: string;
  is_active?: boolean;
}

// Auth interfaces
export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  name?: string;
  name_ar?: string;
  phone?: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filter and Search interfaces
export interface ProductFilters {
  category_id?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  search?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  date_from?: string;
  date_to?: string;
}

// App Navigation types
export type RootStackParamList = {
  '(tabs)': undefined;
  'product/[id]': { id: string };
  'category/[id]': { id: string };
  'cart': undefined;
  'checkout': undefined;
  'orders': undefined;
  'order/[id]': { id: string };
  'profile': undefined;
  'auth': undefined;
  'search': undefined;
};

export type TabParamList = {
  home: undefined;
  categories: undefined;
  cart: undefined;
  orders: undefined;
  profile: undefined;
};

// Form types
export interface CheckoutFormData {
  delivery_address: string;
  delivery_phone: string;
  payment_method: PaymentMethod;
  customer_notes?: string;
}

export interface ProfileFormData {
  name: string;
  name_ar: string;
  phone: string;
  email: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
