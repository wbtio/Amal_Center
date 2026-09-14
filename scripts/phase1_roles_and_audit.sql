-- ═══════════════════════════════════════════════════════════════════════════
--  المرحلة ١ — الأدوار وسجل التدقيق  |  الأمل سنتر
--  التشغيل: لوحة Supabase ← SQL Editor ← الصق ← Run
--  آمن للتشغيل أكثر من مرة.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── ١) الأدوار المسموحة ────────────────────────────────────────────────────
--  admin            مديرة عامة — كل شيء
--  branch_manager   مدير فرع
--  products_manager موظف منتجات
--  orders_staff     موظف طلبات
--  accountant       محاسب — قراءة التقارير فقط
--  viewer           مشاهد فقط
--  customer         زبون (الافتراضي)

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check CHECK (
    role IN ('customer','admin','super_admin','branch_manager',
             'products_manager','orders_staff','accountant','viewer')
  );


-- ─── ٢) دوال التحقق من الصلاحية ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin','super_admin')
  );
$$;

-- أي موظف (غير الزبون) — يُستخدم لقراءة بيانات التشغيل
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('admin','super_admin','branch_manager',
                   'products_manager','orders_staff','accountant','viewer')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;


-- ─── ٣) المديرة تقدر تغيّر أدوار الموظفين ───────────────────────────────────
--  بدون هذا لا أحد يستطيع ترقية موظف — كل واحد يعدّل ملفه هو فقط.

DROP POLICY IF EXISTS profiles_admin_update ON public.profiles;

CREATE POLICY profiles_admin_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٤) موظف الطلبات يشوف محتويات الطلبات ───────────────────────────────────
--  (كانت للمدير فقط — الآن لكل موظف تشغيلي)

DROP POLICY IF EXISTS order_items_admin_read ON public.order_items;
DROP POLICY IF EXISTS order_items_staff_read ON public.order_items;

CREATE POLICY order_items_staff_read ON public.order_items
  FOR SELECT TO authenticated
  USING (public.is_staff());


-- ─── ٥) جدول سجل التدقيق ────────────────────────────────────────────────────
--  للإضافة فقط — لا يُعدَّل ولا يُحذف من أحد، حتى المديرة.

CREATE TABLE IF NOT EXISTS public.activity_log (
  id           bigserial PRIMARY KEY,
  actor_id     uuid,
  actor_name   text,
  actor_role   text,
  action       text NOT NULL,
  entity_type  text NOT NULL,
  entity_id    text,
  entity_label text,
  changes      jsonb,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS activity_log_created_idx ON public.activity_log (created_at DESC);
CREATE INDEX IF NOT EXISTS activity_log_actor_idx   ON public.activity_log (actor_id);
CREATE INDEX IF NOT EXISTS activity_log_entity_idx  ON public.activity_log (entity_type, entity_id);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS activity_log_admin_read ON public.activity_log;

-- المديرة فقط تقرأ السجل — ولا سياسة كتابة/حذف إطلاقاً (يكتبه الـ trigger فقط)
CREATE POLICY activity_log_admin_read ON public.activity_log
  FOR SELECT TO authenticated
  USING (public.is_admin());


-- ─── ٦) دالة التسجيل التلقائي ───────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.log_activity()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_actor   uuid := auth.uid();
  v_name    text;
  v_role    text;
  v_label   text;
  v_changes jsonb := '{}'::jsonb;
  v_old     jsonb;
  v_new     jsonb;
  k         text;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_old := to_jsonb(OLD); v_new := '{}'::jsonb;
  ELSIF TG_OP = 'INSERT' THEN
    v_old := '{}'::jsonb;   v_new := to_jsonb(NEW);
  ELSE
    v_old := to_jsonb(OLD); v_new := to_jsonb(NEW);
  END IF;

  SELECT full_name, role INTO v_name, v_role
  FROM public.profiles WHERE id = v_actor;

  -- اسم مفهوم للعنصر
  v_label := COALESCE(
    v_new->>'name_ar', v_old->>'name_ar',
    v_new->>'title',   v_old->>'title',
    v_new->>'code',    v_old->>'code',
    v_new->>'full_name', v_old->>'full_name',
    v_new->>'key',     v_old->>'key',
    LEFT(COALESCE(v_new->>'id', v_old->>'id'), 8)
  );

  IF TG_OP = 'UPDATE' THEN
    FOR k IN SELECT jsonb_object_keys(v_new) LOOP
      IF (v_new->k) IS DISTINCT FROM (v_old->k)
         AND k NOT IN ('updated_at','created_at') THEN
        v_changes := v_changes || jsonb_build_object(
          k, jsonb_build_object('from', v_old->k, 'to', v_new->k));
      END IF;
    END LOOP;

    -- تعديل بلا تغيير فعلي لا يُسجَّل
    IF v_changes = '{}'::jsonb THEN
      RETURN NEW;
    END IF;
  END IF;

  INSERT INTO public.activity_log (
    actor_id, actor_name, actor_role, action,
    entity_type, entity_id, entity_label, changes
  ) VALUES (
    v_actor, v_name, v_role, lower(TG_OP),
    TG_TABLE_NAME, COALESCE(v_new->>'id', v_old->>'id'), v_label,
    NULLIF(v_changes, '{}'::jsonb)
  );

  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END $$;


-- ─── ٧) ربط الـ trigger بالجداول المهمة ─────────────────────────────────────

DROP TRIGGER IF EXISTS trg_log_products      ON public.products;
DROP TRIGGER IF EXISTS trg_log_categories    ON public.categories;
DROP TRIGGER IF EXISTS trg_log_orders        ON public.orders;
DROP TRIGGER IF EXISTS trg_log_coupons       ON public.coupons;
DROP TRIGGER IF EXISTS trg_log_offers        ON public.offers;
DROP TRIGGER IF EXISTS trg_log_profiles      ON public.profiles;
DROP TRIGGER IF EXISTS trg_log_app_settings  ON public.app_settings;
DROP TRIGGER IF EXISTS trg_log_banners       ON public.banners;
DROP TRIGGER IF EXISTS trg_log_home_sections ON public.home_sections;
DROP TRIGGER IF EXISTS trg_log_payment_gw    ON public.payment_gateway_settings;

CREATE TRIGGER trg_log_products      AFTER INSERT OR UPDATE OR DELETE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_categories    AFTER INSERT OR UPDATE OR DELETE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_orders        AFTER UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_coupons       AFTER INSERT OR UPDATE OR DELETE ON public.coupons
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_offers        AFTER INSERT OR UPDATE OR DELETE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_profiles      AFTER UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_app_settings  AFTER INSERT OR UPDATE OR DELETE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_banners       AFTER INSERT OR UPDATE OR DELETE ON public.banners
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_home_sections AFTER INSERT OR UPDATE OR DELETE ON public.home_sections
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER trg_log_payment_gw    AFTER INSERT OR UPDATE OR DELETE ON public.payment_gateway_settings
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();


-- ─── ٨) التحقق ──────────────────────────────────────────────────────────────

SELECT 'الأدوار الحالية' AS "الفحص", role AS "الدور", count(*) AS "العدد"
FROM public.profiles GROUP BY role ORDER BY count(*) DESC;

SELECT count(*) AS "عدد سطور السجل (يبدأ من صفر)" FROM public.activity_log;
