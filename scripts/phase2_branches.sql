-- ═══════════════════════════════════════════════════════════════════════════
--  المرحلة ٢ — الفروع  |  الأمل سنتر
--  يضيف جدول الفروع ويزرع الأربعة الحالية، ويربط الموظفين والطلبات بفروعهم.
--  آمن للتشغيل أكثر من مرة.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── ١) جدول الفروع ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.branches (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar    text NOT NULL,
  name_en    text NOT NULL DEFAULT '',
  phone      text,
  address_ar text,
  latitude   numeric,
  longitude  numeric,
  is_active  boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS branches_active_idx ON public.branches (is_active, sort_order);

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS branches_read_all   ON public.branches;
DROP POLICY IF EXISTS branches_write_admin ON public.branches;

-- التطبيق يعرض الفروع للزبائن (مواقع ودوام)
CREATE POLICY branches_read_all ON public.branches
  FOR SELECT USING (is_active = true OR public.is_staff());

CREATE POLICY branches_write_admin ON public.branches
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٢) زرع الفروع الأربعة الحالية ──────────────────────────────────────────
--  الإحداثيات مأخوذة من إعدادات التطبيق الحالية (app_settings.branches).

INSERT INTO public.branches (name_ar, name_en, latitude, longitude, sort_order)
SELECT * FROM (VALUES
  ('الأمل 1', 'Al Amal 1', 30.426891326904297, 47.788196563720700, 1),
  ('الأمل 2', 'Al Amal 2', 30.524108886718750, 47.756851196289060, 2),
  ('الأمل 3', 'Al Amal 3', 30.527002334594727, 47.765304565429690, 3),
  ('الأمل 4', 'Al Amal 4', 30.538890838623047, 47.800296783447266, 4)
) AS seed(name_ar, name_en, latitude, longitude, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.branches);


-- ─── ٣) ربط الموظف بفرعه ────────────────────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS profiles_branch_idx ON public.profiles (branch_id);


-- ─── ٤) ربط الطلب بالفرع الذي نفّذه ─────────────────────────────────────────
--  الطلبات القديمة تبقى بلا فرع (NULL) — تظهر كـ "غير محدد" في التقارير.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS orders_branch_idx ON public.orders (branch_id);


-- ─── ٥) تسجيل تعديلات الفروع في سجل التدقيق ─────────────────────────────────

DROP TRIGGER IF EXISTS trg_log_branches ON public.branches;

CREATE TRIGGER trg_log_branches
  AFTER INSERT OR UPDATE OR DELETE ON public.branches
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();


-- ─── ٦) التحقق ──────────────────────────────────────────────────────────────

SELECT name_ar AS "الفرع", latitude AS "خط العرض", longitude AS "خط الطول",
       CASE WHEN is_active THEN 'نشط' ELSE 'معطل' END AS "الحالة"
FROM public.branches ORDER BY sort_order;
