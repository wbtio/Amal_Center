import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase";
import type {
  Address,
  Category,
  Order,
  OrderItem,
  Product,
  Profile,
} from "@/lib/types";
import type { Banner } from "@/lib/storefront";

type OrderWithItems = Order & {
  order_items?: OrderItem[];
};

export type ProductSortOption =
  | "newest"
  | "price_low"
  | "price_high"
  | "name_az";

type SearchProductsParams = {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: ProductSortOption;
  limit?: number;
  offset?: number;
};

export async function getActiveBanners() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("banners")
    .select("id, image_url, title, subtitle, discount, active, link")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return [] as Banner[];
  }

  return (data ?? []) as Banner[];
}

export async function getFeaturedCategories(limit?: number) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return [] as Category[];
  }

  return data ?? [];
}

export async function getActiveCategories() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return [] as Category[];
  }

  return data ?? [];
}

export async function getOfferProducts(limit = 8) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .not("original_price", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return [] as Product[];
  }

  return ((data ?? []) as Product[]).filter(
    (product) =>
      typeof product.original_price === "number" &&
      product.original_price > product.price_iqd
  );
}

export async function getNewArrivalProducts(limit = 8) {
  return searchActiveProducts({ sort: "newest", limit });
}

export async function searchActiveProducts(params: SearchProductsParams = {}) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("products").select("*").eq("is_active", true);

  if (params.categoryId) {
    query = query.eq("category_id", params.categoryId);
  }

  if (typeof params.minPrice === "number" && !Number.isNaN(params.minPrice)) {
    query = query.gte("price_iqd", params.minPrice);
  }

  if (typeof params.maxPrice === "number" && !Number.isNaN(params.maxPrice)) {
    query = query.lte("price_iqd", params.maxPrice);
  }

  if (params.inStock) {
    query = query.gt("stock_quantity", 0);
  }

  if (params.query?.trim()) {
    const value = params.query.trim();
    query = query.or(
      `name.ilike.%${value}%,name_ar.ilike.%${value}%,description.ilike.%${value}%,description_ar.ilike.%${value}%`
    );
  }

  switch (params.sort) {
    case "price_low":
      query = query.order("price_iqd", { ascending: true });
      break;
    case "price_high":
      query = query.order("price_iqd", { ascending: false });
      break;
    case "name_az":
      query = query.order("name_ar", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  if (params.limit) {
    query = query.limit(params.limit);
  }

  if (params.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 20) - 1);
  }

  const { data, error } = await query;

  if (error) {
    return [] as Product[];
  }

  return data ?? [];
}

export async function getActiveCategoryById(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data as Category;
}

export async function getActiveProductsByCategory(categoryId: string) {
  return searchActiveProducts({
    categoryId,
    sort: "newest",
  });
}

export async function getActiveProductById(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data as Product;
}

export async function getRelatedProducts(categoryId: string, excludeId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    return [] as Product[];
  }

  return data ?? [];
}

export async function requireAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return { supabase, user };
}

export async function getAccountOverview(userId: string) {
  const supabase = await createServerSupabaseClient();
  const [profileRes, ordersRes, addressesRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false }),
  ]);

  return {
    profile: profileRes.data as Profile | null,
    orders: (ordersRes.data ?? []) as Order[],
    addresses: (addressesRes.data ?? []) as Address[],
  };
}

export async function getOrdersForUser(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return [] as Order[];
  }

  return data ?? [];
}

export async function getOrderWithItemsForUser(userId: string, orderId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .eq("user_id", userId)
    .single();

  if (error) {
    return null;
  }

  return data as OrderWithItems;
}

export async function getCheckoutData(userId: string) {
  const supabase = await createServerSupabaseClient();
  const [profileRes, addressesRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false }),
  ]);

  return {
    profile: profileRes.data as Profile | null,
    addresses: (addressesRes.data ?? []) as Address[],
  };
}
