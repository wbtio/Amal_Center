-- ═══════════════════════════════════════════════════════════════════════════
--  إكمال مخطط قاعدة الأمل سنتر  —  asxynodsnmrymmdspprn
--  السبب: القاعدة الجديدة (ulngc) حُذفت، والقاعدة الحيّة الحالية أقدم منها
--          وتفتقد جداول وأعمدة أضافها المبرمج لاحقاً.
--  الأثر:  التطبيق يعمل بدونها (له قيم احتياطية مدمجة)، لكن هذه تُعيد:
--            • تعديل محتوى التطبيق من لوحة التحكم (تواصل/أسئلة/شروط/خصوصية)
--            • عرض السعر قبل الخصم (الشطب)
--            • حفظ مفتاح الإشعارات في القاعدة
--            • الدفع الإلكتروني (Wayl)
--
--  آمن للتشغيل أكثر من مرة (كله IF NOT EXISTS / ON CONFLICT).
--  التشغيل: لوحة Supabase ← SQL Editor ← الصق ← Run
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── ١) أعمدة ناقصة في جداول قائمة ──────────────────────────────────────────

-- السعر قبل الخصم (يُعرض مشطوباً في صفحة المنتج)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS original_price numeric;

-- تفضيل الإشعارات للزبون
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS notifications_enabled boolean NOT NULL DEFAULT true;

-- حقول الدفع الإلكتروني على الطلب
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_url  text,
  ADD COLUMN IF NOT EXISTS payment_code text;


-- ─── ٢) دالة التحقق من المدير (تستخدمها سياسات RLS أدناه) ───────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ─── ٣) app_settings — إعدادات التطبيق القابلة للتعديل من اللوحة ────────────

CREATE TABLE IF NOT EXISTS public.app_settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS app_settings_read_all  ON public.app_settings;
DROP POLICY IF EXISTS app_settings_write_admin ON public.app_settings;

-- الجميع يقرأ (التطبيق يحتاجها قبل تسجيل الدخول)
CREATE POLICY app_settings_read_all ON public.app_settings
  FOR SELECT USING (true);

-- المدير فقط يكتب
CREATE POLICY app_settings_write_admin ON public.app_settings
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٤) faq_items — الأسئلة الشائعة ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.faq_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_ar text NOT NULL,
  question_en text NOT NULL DEFAULT '',
  answer_ar   text NOT NULL,
  answer_en   text NOT NULL DEFAULT '',
  sort_order  integer NOT NULL DEFAULT 0,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS faq_items_sort_idx
  ON public.faq_items (is_active, sort_order);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS faq_items_read_all    ON public.faq_items;
DROP POLICY IF EXISTS faq_items_write_admin ON public.faq_items;

CREATE POLICY faq_items_read_all ON public.faq_items
  FOR SELECT USING (is_active = true);

CREATE POLICY faq_items_write_admin ON public.faq_items
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٥) content_pages — الشروط والخصوصية ومَن نحن ───────────────────────────

CREATE TABLE IF NOT EXISTS public.content_pages (
  slug       text PRIMARY KEY,
  title_ar   text NOT NULL,
  title_en   text NOT NULL DEFAULT '',
  intro_ar   text NOT NULL DEFAULT '',
  intro_en   text NOT NULL DEFAULT '',
  sections   jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active  boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS content_pages_read_all    ON public.content_pages;
DROP POLICY IF EXISTS content_pages_write_admin ON public.content_pages;

CREATE POLICY content_pages_read_all ON public.content_pages
  FOR SELECT USING (is_active = true);

CREATE POLICY content_pages_write_admin ON public.content_pages
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٦) payment_gateway_settings — توكن بوابة الدفع (سرّي) ──────────────────
--  ⚠️ لا يُقرأ من التطبيق أبداً. المدير فقط + دوال Edge بمفتاح service_role.

CREATE TABLE IF NOT EXISTS public.payment_gateway_settings (
  provider   text PRIMARY KEY,
  enabled    boolean NOT NULL DEFAULT false,
  env        text NOT NULL DEFAULT 'production',
  api_token  text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payment_gateway_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS pgs_admin_only ON public.payment_gateway_settings;

-- المدير فقط — لا قراءة عامة إطلاقاً (يحتوي التوكن)
CREATE POLICY pgs_admin_only ON public.payment_gateway_settings
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.payment_gateway_settings (provider, enabled, env)
VALUES ('wayl', false, 'production')
ON CONFLICT (provider) DO NOTHING;


-- ─── ٧) زرع الإعدادات بالقيم الحالية المدمجة في التطبيق ─────────────────────
--  حتى تظهر في لوحة التحكم قابلة للتعديل بدل أن تكون فارغة.
--  ⚠️ راجع العنوان: الفروع في البصرة لكن النص الافتراضي يقول بغداد — صحّحه من اللوحة.

INSERT INTO public.app_settings (key, value) VALUES
  ('contact_whatsapp_number',  '"9647801234567"'),
  ('contact_whatsapp_url',     '"https://wa.me/9647801234567"'),
  ('contact_support_email',    '"support@al-amal-center.iq"'),
  ('contact_facebook_url',     '"https://facebook.com/alamalcenter"'),
  ('contact_instagram_url',    '"https://instagram.com/alamalcenter"'),
  ('store_address_ar',         '"بغداد، العراق\nشارع الرشيد، مقابل سوق الشورجة"'),
  ('store_address_en',         '"Baghdad, Iraq\nAl-Rasheed Street, opposite Shorja Market"'),
  ('delivery_fee_standard',    '2000'),
  ('delivery_fee_express',     '5000'),
  ('delivery_fee_electronics', '10000'),
  ('free_delivery_threshold',  '50000'),
  ('payment_wayl_enabled',     'false'),
  ('working_hours', '[
     {"days_ar":"السبت - الخميس","days_en":"Saturday - Thursday","time_ar":"٨ ص - ١٠ م","time_en":"8 AM - 10 PM"},
     {"days_ar":"الجمعة","days_en":"Friday","time_ar":"٢ م - ١٠ م","time_en":"2 PM - 10 PM"}
   ]'),
  ('branches', '[
     {"label_ar":"الأمل 1","label_en":"Al Amal 1","href":"https://maps.google.com/maps?q=30.426891326904297%2C47.7881965637207&z=17&hl=en"},
     {"label_ar":"الأمل 2","label_en":"Al Amal 2","href":"https://maps.google.com/maps?q=30.52410888671875%2C47.75685119628906&z=17&hl=en"},
     {"label_ar":"الأمل 3","label_en":"Al Amal 3","href":"https://maps.google.com/maps?q=30.527002334594727%2C47.76530456542969&z=17&hl=en"},
     {"label_ar":"الأمل 4","label_en":"Al Amal 4","href":"https://maps.google.com/maps?q=30.538890838623047%2C47.800296783447266&z=17&hl=en"}
   ]')
ON CONFLICT (key) DO NOTHING;


-- ─── ٨) صفحتا الشروط والخصوصية (هياكل فارغة يملؤها المدير) ──────────────────
--  التطبيق يعرض نصّه المدمج ما دامت الأقسام فارغة، فلا ضرر.

INSERT INTO public.content_pages (slug, title_ar, title_en, is_active) VALUES
  ('terms',   'الشروط والأحكام', 'Terms & Conditions', true),
  ('privacy', 'سياسة الخصوصية',  'Privacy Policy',     true),
  ('about',   'من نحن',          'About Us',           true)
ON CONFLICT (slug) DO NOTHING;


-- ─── ٩) التحقق ──────────────────────────────────────────────────────────────

SELECT 'app_settings'              AS الجدول, count(*) AS الصفوف FROM public.app_settings
UNION ALL SELECT 'faq_items',                 count(*) FROM public.faq_items
UNION ALL SELECT 'content_pages',             count(*) FROM public.content_pages
UNION ALL SELECT 'payment_gateway_settings',  count(*) FROM public.payment_gateway_settings;
