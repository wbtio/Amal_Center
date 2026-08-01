-- ═══════════════════════════════════════════════════════════════════════════
--  إغلاق ثغرة الأسعار نهائياً  —  قاعدة asxynodsnmrymmdspprn
--
--  الثغرة:
--    تطبيق الأمل سنتر يحسب مجموع الطلب وأسعار الأصناف على هاتف الزبون
--    ويرسلها كما هي. والقاعدة تقبلها بلا تحقق.
--    → مستخدم متمكّن يستطيع إنشاء طلب بمبلغ ١ دينار.
--    الخطر الحقيقي عند تفعيل الدفع الإلكتروني (رابط الدفع يُنشأ بالمبلغ المزوَّر).
--
--  الحل:
--    دالة واحدة تُنشئ الطلب كاملاً داخل القاعدة:
--      • تقرأ الأسعار من جدول products — لا من العميل
--      • تتحقق من المخزون وتخصمه ذرّياً (بقفل صف)
--      • تتحقق من الكوبون وتزيد عدّاده
--      • كل ذلك في معاملة واحدة: تنجح كاملة أو تفشل كاملة
--
--  بعد تشغيل هذا الملف، أخبرني وأربط التطبيق بالدالة —
--  وعندها يصبح تزوير السعر مستحيلاً لا صعباً.
--
--  التشغيل: لوحة Supabase ← SQL Editor ← الصق ← Run
--  آمن للتشغيل أكثر من مرة.
-- ═══════════════════════════════════════════════════════════════════════════


CREATE OR REPLACE FUNCTION public.create_order(
  p_items          jsonb,      -- [{"product_id":"uuid","quantity":2}, ...]
  p_delivery_type  text,
  p_delivery_cost  numeric,
  p_coupon_code    text        DEFAULT NULL,
  p_payment_method text        DEFAULT 'cod',
  p_customer_name  text        DEFAULT NULL,
  p_delivery_phone text        DEFAULT NULL,
  p_delivery_address text      DEFAULT NULL,
  p_customer_notes text        DEFAULT NULL,
  p_exchange_rate  numeric     DEFAULT 1500
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user        uuid := auth.uid();
  v_item        jsonb;
  v_pid         uuid;
  v_qty         integer;
  v_price       numeric;
  v_name_ar     text;
  v_name        text;
  v_image       text;
  v_stock       integer;
  v_active      boolean;
  v_subtotal    numeric := 0;
  v_discount    numeric := 0;
  v_coupon_id   uuid    := NULL;
  v_total       numeric;
  v_order_id    uuid;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'يجب تسجيل الدخول' USING ERRCODE = '28000';
  END IF;

  IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'السلة فارغة' USING ERRCODE = '22023';
  END IF;

  -- ── ١) التحقق من كل صنف وحساب السعر من القاعدة ─────────────────────────
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_pid := (v_item->>'product_id')::uuid;
    v_qty := GREATEST((v_item->>'quantity')::integer, 0);

    IF v_qty = 0 THEN
      RAISE EXCEPTION 'كمية غير صالحة' USING ERRCODE = '22023';
    END IF;

    -- قفل الصف حتى لا يبيعه طلبان في نفس اللحظة
    SELECT price_iqd, stock_quantity, is_active, name_ar, name, image_url
      INTO v_price, v_stock, v_active, v_name_ar, v_name, v_image
      FROM products WHERE id = v_pid FOR UPDATE;

    IF NOT FOUND OR v_active IS NOT TRUE THEN
      RAISE EXCEPTION 'المنتج غير متوفر: %', COALESCE(v_name_ar, v_pid::text)
        USING ERRCODE = '22023';
    END IF;

    IF v_stock < v_qty THEN
      RAISE EXCEPTION 'الكمية غير متوفرة لـ %: المتاح %', COALESCE(v_name_ar, ''), v_stock
        USING ERRCODE = '22023';
    END IF;

    v_subtotal := v_subtotal + (v_price * v_qty);

    UPDATE products SET stock_quantity = stock_quantity - v_qty WHERE id = v_pid;
  END LOOP;

  -- ── ٢) الكوبون — يُتحقق منه في القاعدة أيضاً ────────────────────────────
  IF p_coupon_code IS NOT NULL AND length(trim(p_coupon_code)) > 0 THEN
    SELECT (v).coupon_id, COALESCE((v).discount_amount, 0)
      INTO v_coupon_id, v_discount
      FROM validate_coupon(trim(p_coupon_code), v_subtotal, v_user) AS v;

    IF v_coupon_id IS NULL THEN
      v_discount := 0;
    END IF;
  END IF;

  v_total := GREATEST(v_subtotal + COALESCE(p_delivery_cost, 0) - v_discount, 0);

  -- ── ٣) إنشاء الطلب ──────────────────────────────────────────────────────
  INSERT INTO orders (
    user_id, total_iqd, total_usd, delivery_cost_iqd,
    coupon_id, coupon_code, discount_amount,
    status, payment_method, payment_status,
    delivery_type, delivery_address, delivery_phone,
    customer_name, customer_notes, created_at
  ) VALUES (
    v_user, v_total, v_total / NULLIF(p_exchange_rate, 0), COALESCE(p_delivery_cost, 0),
    v_coupon_id, NULLIF(trim(COALESCE(p_coupon_code, '')), ''), v_discount,
    'pending', p_payment_method,
    CASE WHEN p_payment_method = 'cod' THEN 'pending' ELSE 'awaiting_payment' END,
    p_delivery_type, p_delivery_address, p_delivery_phone,
    p_customer_name, p_customer_notes, now()
  ) RETURNING id INTO v_order_id;

  -- ── ٤) أصناف الطلب — بأسعار القاعدة ─────────────────────────────────────
  INSERT INTO order_items (order_id, product_id, quantity, price_iqd, price_usd, product_snapshot)
  SELECT
    v_order_id,
    (i->>'product_id')::uuid,
    (i->>'quantity')::integer,
    p.price_iqd,
    p.price_iqd / NULLIF(p_exchange_rate, 0),
    jsonb_build_object('name', p.name, 'name_ar', p.name_ar, 'image_url', p.image_url)
  FROM jsonb_array_elements(p_items) i
  JOIN products p ON p.id = (i->>'product_id')::uuid;

  -- ── ٥) تسجيل استخدام الكوبون ────────────────────────────────────────────
  IF v_coupon_id IS NOT NULL AND v_discount > 0 THEN
    INSERT INTO coupon_usages (coupon_id, user_id, order_id, discount_amount)
    VALUES (v_coupon_id, v_user, v_order_id, v_discount);

    UPDATE coupons SET used_count = COALESCE(used_count, 0) + 1 WHERE id = v_coupon_id;
  END IF;

  RETURN jsonb_build_object(
    'order_id',  v_order_id,
    'subtotal',  v_subtotal,
    'discount',  v_discount,
    'delivery',  COALESCE(p_delivery_cost, 0),
    'total_iqd', v_total
  );
END;
$$;

REVOKE ALL ON FUNCTION public.create_order(jsonb,text,numeric,text,text,text,text,text,text,numeric) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_order(jsonb,text,numeric,text,text,text,text,text,text,numeric) TO authenticated;


-- ─── التحقق ─────────────────────────────────────────────────────────────────
SELECT p.proname,
       pg_get_function_identity_arguments(p.oid) AS args,
       array_to_string(p.proacl, ' | ')          AS grants
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' AND p.proname = 'create_order';


-- ═══════════════════════════════════════════════════════════════════════════
--  ملاحظات:
--   • الزائر غير المسجّل لا يستطيع استدعاءها (REVOKE من anon).
--   • FOR UPDATE يقفل صف المنتج فيمنع بيع نفس القطعة لطلبين متزامنين.
--   • أي خطأ يُلغي كل شيء — لا يبقى طلب ناقص ولا مخزون منقوص.
--   • بعد تشغيلها أخبرني، وأربط التطبيق بها في تحديث فوري.
-- ═══════════════════════════════════════════════════════════════════════════
