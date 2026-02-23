/**
 * Shared Types for Al-Amal Center
 * هذا الملف يحتوي على الأنواع المشتركة بين التطبيق والـ Admin
 */

// =============================================================================
// Database Schema Types (Generated from Supabase)
// =============================================================================

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string;
                    name: string;
                    name_ar: string;
                    description: string;
                    description_ar: string;
                    price_iqd: number;
                    price_usd: number;
                    original_price?: number;
                    image_url: string;
                    category_id: string;
                    stock_quantity: number;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['products']['Insert']>;
            };
            categories: {
                Row: {
                    id: string;
                    name: string;
                    name_ar: string;
                    icon: string;
                    image_url: string | null;
                    parent_id: string | null;
                    sort_order: number;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['categories']['Insert']>;
            };
            orders: {
                Row: {
                    id: string;
                    user_id: string;
                    total_iqd: number;
                    total_usd: number;
                    delivery_cost_iqd: number;
                    status: OrderStatus;
                    payment_method: PaymentMethod;
                    payment_status: PaymentStatus;
                    delivery_type: DeliveryType;
                    delivery_address: string;
                    delivery_phone: string;
                    customer_name: string | null;
                    customer_notes: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['orders']['Insert']>;
            };
            order_items: {
                Row: {
                    id: string;
                    order_id: string;
                    product_id: string;
                    quantity: number;
                    price_iqd: number;
                    price_usd: number;
                    product_snapshot: Record<string, unknown>;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
            };
            reviews: {
                Row: {
                    id: string;
                    product_id: string;
                    user_id: string;
                    rating: number;
                    comment: string | null;
                    is_approved: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
            };
            coupons: {
                Row: {
                    id: string;
                    code: string;
                    discount_type: 'percentage' | 'fixed';
                    discount_value: number;
                    min_order_amount: number;
                    max_discount_amount: number | null;
                    usage_limit: number | null;
                    used_count: number;
                    is_active: boolean;
                    starts_at: string;
                    expires_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['coupons']['Row'], 'id' | 'created_at' | 'updated_at' | 'used_count'>;
                Update: Partial<Database['public']['Tables']['coupons']['Insert']>;
            };
            coupon_usages: {
                Row: {
                    id: string;
                    coupon_id: string;
                    user_id: string;
                    order_id: string | null;
                    discount_amount: number;
                    used_at: string;
                };
                Insert: Omit<Database['public']['Tables']['coupon_usages']['Row'], 'id' | 'used_at'>;
                Update: Partial<Database['public']['Tables']['coupon_usages']['Insert']>;
            };
            profiles: {
                Row: {
                    id: string;
                    full_name: string | null;
                    phone: string | null;
                    avatar_url: string | null;
                    role: string;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    full_name?: string | null;
                    phone?: string | null;
                    avatar_url?: string | null;
                    role?: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
            };
            wishlist: {
                Row: {
                    id: string;
                    user_id: string;
                    product_id: string;
                    created_at: string;
                };
                Insert: {
                    user_id: string;
                    product_id: string;
                };
                Update: Partial<Database['public']['Tables']['wishlist']['Insert']>;
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
}

// =============================================================================
// Derived Types from Database
// =============================================================================

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];

export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Wishlist = Database['public']['Tables']['wishlist']['Row'];
export type WishlistInsert = Database['public']['Tables']['wishlist']['Insert'];

// =============================================================================
// Enums and Status Types
// =============================================================================

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'awaiting_payment';
export type DeliveryType = 'scheduled' | 'express' | 'electronics';

// =============================================================================
// Extended Types (with relations)
// =============================================================================

export interface ProductWithCategory extends Product {
    categories?: {
        name_ar: string;
    } | null;
}

export interface OrderItemWithSnapshot {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_iqd: number;
    price_usd: number;
    created_at: string;
    product_snapshot: {
        name_ar: string;
        image_url?: string;
    };
}

export interface OrderWithItems extends Order {
    order_items?: OrderItem[];
}

export interface ReviewWithUser extends Review {
    user?: {
        name: string;
        avatar_url?: string;
    };
}

// =============================================================================
// User Types
// =============================================================================

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

// =============================================================================
// API Response Types
// =============================================================================

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

// =============================================================================
// Filter Types
// =============================================================================

export interface ProductFilters {
    category_id?: string;
    subcategory_id?: string;
    min_price?: number;
    max_price?: number;
    in_stock?: boolean;
    search?: string;
}

export type SortOption = 'newest' | 'oldest' | 'price_low' | 'price_high' | 'name_az' | 'name_za';

export interface CategoryWithSubcategories extends Category {
    subcategories?: Category[];
}

export interface OrderFilters {
    status?: OrderStatus;
    payment_status?: PaymentStatus;
    date_from?: string;
    date_to?: string;
}
