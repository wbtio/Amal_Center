-- ============================================================
-- الأمل سنتر — Schema الكامل للمشروع الجديد
-- الخطوة: الصق هذا الملف كاملاً في SQL Editor في المشروع الجديد
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- ── 1. Extensions ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 2. Tables ────────────────────────────────────────────────

-- categories (يجب قبل products و home_sections)
CREATE TABLE IF NOT EXISTS public.categories (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  name_ar             text NOT NULL,
  icon                text,
  image_url           text,
  sort_order          integer DEFAULT 0,
  is_active           boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  parent_id           uuid REFERENCES public.categories(id),
  image_thumbnail_url text,
  image_medium_url    text,
  image_webp_url      text
);

-- products
CREATE TABLE IF NOT EXISTS public.products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  name_ar             text NOT NULL,
  description         text,
  description_ar      text,
  price_iqd           numeric NOT NULL CHECK (price_iqd >= 0),
  price_usd           numeric NOT NULL CHECK (price_usd >= 0),
  image_url           text NOT NULL,
  category_id         uuid REFERENCES public.categories(id),
  stock_quantity      integer DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active           boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  sales_count         integer DEFAULT 0,
  image_thumbnail_url text,
  image_medium_url    text,
  image_webp_url      text,
  original_price      numeric
);

-- coupons
CREATE TABLE IF NOT EXISTS public.coupons (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code                text NOT NULL UNIQUE,
  discount_type       text NOT NULL DEFAULT 'percentage'
                      CHECK (discount_type IN ('percentage','fixed')),
  discount_value      numeric NOT NULL CHECK (discount_value > 0),
  min_order_amount    numeric DEFAULT 0,
  max_discount_amount numeric,
  usage_limit         integer,
  used_count          integer DEFAULT 0,
  is_active           boolean DEFAULT true,
  starts_at           timestamptz DEFAULT now(),
  expires_at          timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- orders
CREATE TABLE IF NOT EXISTS public.orders (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users(id),
  total_iqd           numeric NOT NULL CHECK (total_iqd >= 0),
  total_usd           numeric NOT NULL CHECK (total_usd >= 0),
  status              text NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','confirmed','preparing','ready','delivered','cancelled')),
  payment_method      text NOT NULL DEFAULT 'cash'
                      CHECK (payment_method IN ('cash','card','cod','wallet')),
  payment_status      text NOT NULL DEFAULT 'pending'
                      CHECK (payment_status IN ('pending','paid','failed','awaiting_payment')),
  delivery_address    text NOT NULL,
  delivery_phone      text NOT NULL,
  customer_notes      text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  delivery_cost_iqd   numeric DEFAULT 0,
  delivery_type       text DEFAULT 'scheduled',
  customer_name       text,
  coupon_id           uuid REFERENCES public.coupons(id),
  coupon_code         text,
  discount_amount     numeric DEFAULT 0,
  delivery_latitude   numeric,
  delivery_longitude  numeric
);

-- order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id         uuid REFERENCES public.orders(id),
  product_id       uuid REFERENCES public.products(id),
  quantity         integer NOT NULL CHECK (quantity > 0),
  price_iqd        numeric NOT NULL CHECK (price_iqd >= 0),
  price_usd        numeric NOT NULL CHECK (price_usd >= 0),
  product_snapshot jsonb NOT NULL,
  created_at       timestamptz DEFAULT now()
);

-- profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name  text,
  phone      text,
  avatar_url text,
  role       text DEFAULT 'customer',
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id),
  name       text NOT NULL,
  city       text NOT NULL,
  area       text NOT NULL,
  street     text NOT NULL,
  details    text,
  phone      text NOT NULL,
  type       text DEFAULT 'home',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc', now()),
  latitude   numeric,
  longitude  numeric
);

-- wishlist
CREATE TABLE IF NOT EXISTS public.wishlist (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id),
  product_id uuid NOT NULL REFERENCES public.products(id),
  created_at timestamptz DEFAULT timezone('utc', now()),
  UNIQUE (user_id, product_id)
);

-- reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid REFERENCES public.products(id),
  user_id     uuid REFERENCES auth.users(id),
  rating      integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     text,
  is_approved boolean DEFAULT false,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  UNIQUE (product_id, user_id)
);

-- banners
CREATE TABLE IF NOT EXISTS public.banners (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url           text NOT NULL,
  title               text NOT NULL,
  subtitle            text,
  discount            text,
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT timezone('utc', now()),
  link                text,
  image_thumbnail_url text,
  image_medium_url    text,
  image_webp_url      text
);

-- home_sections
CREATE TABLE IF NOT EXISTS public.home_sections (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type                text NOT NULL,
  title               text NOT NULL,
  active              boolean DEFAULT true,
  order_index         integer DEFAULT 0,
  created_at          timestamptz DEFAULT timezone('utc', now()),
  category_id         uuid REFERENCES public.categories(id),
  icon                text,
  description         text,
  image_thumbnail_url text,
  image_medium_url    text,
  image_webp_url      text
);

-- notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id),
  title      text NOT NULL,
  message    text NOT NULL,
  title_ar   text,
  message_ar text,
  type       text DEFAULT 'system',
  is_read    boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- offers
CREATE TABLE IF NOT EXISTS public.offers (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,
  name_ar        text NOT NULL,
  description    text,
  description_ar text,
  discount_type  text NOT NULL CHECK (discount_type IN ('percentage','fixed')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  start_date     timestamptz NOT NULL,
  end_date       timestamptz NOT NULL,
  is_active      boolean DEFAULT true,
  image_url      text,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

-- offer_products
CREATE TABLE IF NOT EXISTS public.offer_products (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id   uuid NOT NULL REFERENCES public.offers(id),
  product_id uuid NOT NULL REFERENCES public.products(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE (offer_id, product_id)
);

-- promo_banners
CREATE TABLE IF NOT EXISTS public.promo_banners (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot                text NOT NULL,
  position            integer DEFAULT 0,
  size                text NOT NULL DEFAULT 'full',
  image_url           text NOT NULL,
  link                text,
  title               text,
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  image_thumbnail_url text,
  image_medium_url    text,
  image_webp_url      text
);

-- coupon_usages
CREATE TABLE IF NOT EXISTS public.coupon_usages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id       uuid NOT NULL REFERENCES public.coupons(id),
  user_id         uuid NOT NULL REFERENCES auth.users(id),
  order_id        uuid REFERENCES public.orders(id),
  discount_amount numeric NOT NULL,
  used_at         timestamptz DEFAULT now(),
  UNIQUE (coupon_id, order_id)
);

-- ── 3. Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_addresses_user_id        ON public.addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id     ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order    ON public.categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_coupon_usages_coupon_id  ON public.coupon_usages(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usages_order_id   ON public.coupon_usages(order_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usages_user_id    ON public.coupon_usages(user_id);
CREATE INDEX IF NOT EXISTS idx_home_sections_category_id ON public.home_sections(category_id);
CREATE INDEX IF NOT EXISTS idx_home_sections_order      ON public.home_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id    ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_offer_products_offer_id  ON public.offer_products(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_products_product_id ON public.offer_products(product_id);
CREATE INDEX IF NOT EXISTS idx_offers_active            ON public.offers(is_active, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id     ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id   ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_coupon_id         ON public.orders(coupon_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at        ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status            ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id           ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id     ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active       ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_price_iqd       ON public.products(price_iqd);
CREATE INDEX IF NOT EXISTS idx_products_name_ar         ON public.products USING gin(to_tsvector('arabic', name_ar));
CREATE INDEX IF NOT EXISTS idx_promo_banners_active     ON public.promo_banners(active);
CREATE INDEX IF NOT EXISTS idx_promo_banners_slot       ON public.promo_banners(slot);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved      ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id       ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id          ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id      ON public.wishlist(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id         ON public.wishlist(user_id);

-- ── 4. Functions ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    'customer'
  );
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrease_product_stock(product_id uuid, quantity integer)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.products
  SET stock_quantity = stock_quantity - quantity,
      updated_at = NOW()
  WHERE id = product_id AND stock_quantity >= quantity;
END;
$$;

CREATE OR REPLACE FUNCTION public.use_coupon(
  p_coupon_id      uuid,
  p_user_id        uuid,
  p_order_id       uuid,
  p_discount_amount numeric
) RETURNS boolean LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.coupon_usages (coupon_id, user_id, order_id, discount_amount)
  VALUES (p_coupon_id, p_user_id, p_order_id, p_discount_amount);

  UPDATE public.coupons
  SET used_count = used_count + 1, updated_at = now()
  WHERE id = p_coupon_id;

  RETURN true;
EXCEPTION
  WHEN OTHERS THEN RETURN false;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_coupon(
  p_code        text,
  p_order_total numeric,
  p_user_id     uuid DEFAULT NULL
) RETURNS TABLE(
  is_valid        boolean,
  coupon_id       uuid,
  discount_type   text,
  discount_value  numeric,
  discount_amount numeric,
  error_message   text
) LANGUAGE plpgsql AS $$
DECLARE
  v_coupon            RECORD;
  v_discount_amount   numeric;
  v_user_usage_count  integer;
BEGIN
  SELECT * INTO v_coupon FROM public.coupons c
  WHERE UPPER(c.code) = UPPER(p_code) AND c.is_active = true;

  IF v_coupon IS NULL THEN
    RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,'كود الخصم غير صالح'::text; RETURN;
  END IF;
  IF v_coupon.starts_at > now() THEN
    RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,'كود الخصم غير متاح بعد'::text; RETURN;
  END IF;
  IF v_coupon.expires_at IS NOT NULL AND v_coupon.expires_at < now() THEN
    RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,'كود الخصم منتهي الصلاحية'::text; RETURN;
  END IF;
  IF p_order_total < v_coupon.min_order_amount THEN
    RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,
      ('الحد الأدنى للطلب هو ' || v_coupon.min_order_amount || ' دينار')::text; RETURN;
  END IF;
  IF v_coupon.usage_limit IS NOT NULL AND v_coupon.used_count >= v_coupon.usage_limit THEN
    RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,'تم استنفاد عدد استخدامات هذا الكوبون'::text; RETURN;
  END IF;
  IF p_user_id IS NOT NULL THEN
    SELECT COUNT(*) INTO v_user_usage_count FROM public.coupon_usages
    WHERE coupon_id = v_coupon.id AND user_id = p_user_id;
    IF v_user_usage_count > 0 THEN
      RETURN QUERY SELECT false,NULL::uuid,NULL::text,NULL::numeric,NULL::numeric,'لقد استخدمت هذا الكوبون من قبل'::text; RETURN;
    END IF;
  END IF;

  IF v_coupon.discount_type = 'percentage' THEN
    v_discount_amount := p_order_total * (v_coupon.discount_value / 100);
    IF v_coupon.max_discount_amount IS NOT NULL AND v_discount_amount > v_coupon.max_discount_amount THEN
      v_discount_amount := v_coupon.max_discount_amount;
    END IF;
  ELSE
    v_discount_amount := v_coupon.discount_value;
  END IF;

  IF v_discount_amount > p_order_total THEN v_discount_amount := p_order_total; END IF;

  RETURN QUERY SELECT true, v_coupon.id, v_coupon.discount_type,
    v_coupon.discount_value, v_discount_amount, NULL::text;
END;
$$;

-- ── 5. Triggers ───────────────────────────────────────────────

-- updated_at على profiles
CREATE OR REPLACE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- تسجيل مستخدم جديد → إنشاء profile تلقائي
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 6. RLS Policies ───────────────────────────────────────────

ALTER TABLE public.categories    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offer_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usages ENABLE ROW LEVEL SECURITY;

-- categories
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Only authenticated users can insert categories"
  ON public.categories FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Only authenticated users can update categories"
  ON public.categories FOR UPDATE
  USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Only authenticated users can delete categories"
  ON public.categories FOR DELETE
  USING ((SELECT auth.role()) = 'authenticated');

-- products
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Only admins can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role = ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Only admins can update products"
  ON public.products FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role = ANY(ARRAY['admin','products_manager'])))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role = ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Only admins can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role = ANY(ARRAY['admin','products_manager'])));

-- orders
CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users or admins can view orders"
  ON public.orders FOR SELECT
  USING ((SELECT auth.uid()) = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));
CREATE POLICY "Users or admins can update orders"
  ON public.orders FOR UPDATE
  USING ((SELECT auth.uid()) = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));

-- order_items
CREATE POLICY "Users can insert order items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE id=order_items.order_id AND user_id=(SELECT auth.uid())));
CREATE POLICY "Users can view order items for their orders"
  ON public.order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE id=order_items.order_id AND user_id=(SELECT auth.uid())));

-- profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile."
  ON public.profiles FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE USING ((SELECT auth.uid()) = id);

-- addresses
CREATE POLICY "Users can view their own addresses"
  ON public.addresses FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can insert their own addresses"
  ON public.addresses FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can update their own addresses"
  ON public.addresses FOR UPDATE USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can delete their own addresses"
  ON public.addresses FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- wishlist
CREATE POLICY "Users or admins can view wishlist"
  ON public.wishlist FOR SELECT
  USING ((SELECT auth.uid()) = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));
CREATE POLICY "Users can insert into their own wishlist"
  ON public.wishlist FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can delete from their own wishlist"
  ON public.wishlist FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- reviews
CREATE POLICY "View approved reviews or own reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = true OR (SELECT auth.uid()) = user_id);
CREATE POLICY "Users can insert their own reviews"
  ON public.reviews FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- banners
CREATE POLICY "Enable load for everyone"
  ON public.banners FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users"
  ON public.banners FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Enable update for authenticated users"
  ON public.banners FOR UPDATE USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Enable delete for authenticated users"
  ON public.banners FOR DELETE USING ((SELECT auth.role()) = 'authenticated');

-- home_sections
CREATE POLICY "Enable load for everyone"
  ON public.home_sections FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users"
  ON public.home_sections FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Enable update for authenticated users"
  ON public.home_sections FOR UPDATE USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Enable delete for authenticated users"
  ON public.home_sections FOR DELETE USING ((SELECT auth.role()) = 'authenticated');

-- notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Other policies are restricted to service role only"
  ON public.notifications FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- offers
CREATE POLICY "Public can view active offers"
  ON public.offers FOR SELECT
  USING ((is_active=true AND now()>=start_date AND now()<=end_date)
    OR EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can insert offers"
  ON public.offers FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can update offers"
  ON public.offers FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can delete offers"
  ON public.offers FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));

-- offer_products
CREATE POLICY "Public can view offer products"
  ON public.offer_products FOR SELECT USING (true);
CREATE POLICY "Admins can insert offer products"
  ON public.offer_products FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can update offer products"
  ON public.offer_products FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can delete offer products"
  ON public.offer_products FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));

-- promo_banners
CREATE POLICY "Public can view active promo banners"
  ON public.promo_banners FOR SELECT USING (active = true);
CREATE POLICY "Admins can insert promo banners"
  ON public.promo_banners FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can update promo banners"
  ON public.promo_banners FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));
CREATE POLICY "Admins can delete promo banners"
  ON public.promo_banners FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role=ANY(ARRAY['admin','products_manager'])));

-- coupons
CREATE POLICY "View coupons"
  ON public.coupons FOR SELECT
  USING (is_active=true OR EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));
CREATE POLICY "Admins can insert coupons"
  ON public.coupons FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));
CREATE POLICY "Admins can update coupons"
  ON public.coupons FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));
CREATE POLICY "Admins can delete coupons"
  ON public.coupons FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id=(SELECT auth.uid()) AND role='admin'));

-- coupon_usages
CREATE POLICY "Users can read own coupon usages"
  ON public.coupon_usages FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Authenticated users can use coupons"
  ON public.coupon_usages FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- ── 7. Storage Buckets ────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('products',     'products',     true, 5242880, ARRAY['image/jpeg','image/png','image/gif','image/webp']),
  ('categories',   'categories',   true, NULL,    NULL),
  ('banners',      'banners',      true, NULL,    NULL),
  ('promo-banners','promo-banners',true, 5242880, ARRAY['image/jpeg','image/png','image/gif','image/webp']),
  ('avatars',      'avatars',      true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies — كل الـ buckets عامة للقراءة، محمية للكتابة
CREATE POLICY "Public read all buckets"
  ON storage.objects FOR SELECT USING (true);

CREATE POLICY "Authenticated upload"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "Authenticated update"
  ON storage.objects FOR UPDATE TO authenticated
  USING ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "Authenticated delete"
  ON storage.objects FOR DELETE TO authenticated
  USING ((SELECT auth.role()) = 'authenticated');

-- ── انتهى ✅ ──────────────────────────────────────────────────
