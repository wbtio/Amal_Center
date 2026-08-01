-- ═══════════════════════════════════════════════════════════════════════════
--  إصلاح أمني عاجل  —  قاعدة asxynodsnmrymmdspprn
--
--  المشكلة المكتشفة في ٣١ تموز ٢٠٢٦:
--    • جدول profiles مقروء لأي شخص بلا تسجيل دخول (٨ سجلات)
--      المكشوف: الاسم الكامل · رقم الهاتف · الصورة · الصلاحية (role)
--      ومن ضمنها حساب إداري واحد برقم هاتفه — وهذا يسهّل استهدافه.
--    • جدول coupons مقروء للجميع (٥ أكواد خصم نشطة)
--      أي شخص يستطيع اكتشاف الأكواد واستعمالها.
--
--  المفتاح العام (anon key) مطبوع داخل التطبيق والموقع — أي أنه معروف
--  للجميع بحكم التصميم. فالحماية الحقيقية هي سياسات RLS وحدها، لا سرّية المفتاح.
--
--  ✅ تحقّقتُ أن التطبيق لا يقرأ إلا ملف صاحبه (.eq('id', session.user.id))
--     في كل موضع، فهذا الإصلاح لا يكسر شيئاً.
--
--  التشغيل: لوحة Supabase ← SQL Editor ← الصق ← Run
--  آمن للتشغيل أكثر من مرة.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── دالة التحقق من المدير ──────────────────────────────────────────────────
--  SECURITY DEFINER لتتجاوز RLS ولا تُحدث حلقة لا نهائية داخل سياسة profiles.

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


-- ─── ١) profiles — كل زبون يرى ملفه هو فقط ─────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- إزالة أي سياسة مفتوحة سابقة (الأسماء الشائعة التي تولّدها اللوحة)
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
           WHERE schemaname='public' AND tablename='profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', p.policyname);
  END LOOP;
END $$;

-- قراءة: ملفه هو، أو المدير يرى الكل
CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- إنشاء: ملفه هو فقط (يُستخدم عند التسجيل)
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- تعديل: ملفه هو، أو المدير
CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

-- حذف: ملفه هو (شاشة «حذف حسابي»)، أو المدير
CREATE POLICY profiles_delete_own ON public.profiles
  FOR DELETE TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- ⛔ لا سياسة لدور anon إطلاقاً ← الزائر غير المسجّل لا يرى شيئاً.


-- ─── ٢) coupons — تُقرأ بعد تسجيل الدخول فقط ───────────────────────────────
--  التطبيق يقرأها في شاشة الدفع وهي تتطلّب تسجيل دخول أصلاً،
--  فمنع الزائر المجهول لا يكسر شيئاً ويوقف سحب الأكواد.

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
           WHERE schemaname='public' AND tablename='coupons'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.coupons', p.policyname);
  END LOOP;
END $$;

CREATE POLICY coupons_select_auth ON public.coupons
  FOR SELECT TO authenticated
  USING (is_active = true);

-- تحديث عدّاد الاستخدام (يفعله التطبيق بعد إتمام الطلب)
CREATE POLICY coupons_update_usage ON public.coupons
  FOR UPDATE TO authenticated
  USING (is_active = true) WITH CHECK (is_active = true);

-- الإدارة الكاملة للمدير
CREATE POLICY coupons_admin_all ON public.coupons
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─── ٣) التحقق بعد التشغيل ─────────────────────────────────────────────────
--  يجب أن تظهر السياسات أدناه، وألا يكون أيٌّ منها لدور anon.

SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('profiles', 'coupons')
ORDER BY tablename, policyname;


-- ═══════════════════════════════════════════════════════════════════════════
--  بعد التشغيل، تأكّد من الطرفية أن التسريب أُغلق:
--
--    curl -s "https://asxynodsnmrymmdspprn.supabase.co/rest/v1/profiles?select=*" \
--      -H "apikey: <anon key>" -H "Authorization: Bearer <anon key>"
--
--  يجب أن يُرجع  []  بدل قائمة الزبائن.
-- ═══════════════════════════════════════════════════════════════════════════
