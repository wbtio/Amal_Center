# تفعيل Realtime لجدول الطلبات في Supabase

## المشكلة
عند تغيير حالة الطلب من لوحة التحكم، لا تظهر التغييرات في التطبيق ولا تُحفظ بشكل صحيح.

## الحلول المُطبّقة

### 1. لوحة التحكم (Admin Panel)
✅ إضافة رسائل خطأ/نجاح واضحة عند تحديث الحالة
✅ إضافة مؤشر تحميل أثناء التحديث
✅ تحسين معالجة الأخطاء

### 2. تطبيق الموبايل
✅ إضافة Realtime Subscriptions للتحديثات الفورية
✅ إضافة Pull-to-Refresh للتحديث اليدوي
✅ تحسين إدارة الحالة

## إعداد Supabase (مطلوب)

### الخطوة 1: تفعيل Realtime على جدول orders

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Database** → **Tables**
4. اختر جدول `orders`
5. اضغط على زر ⚙️ (الإعدادات)
6. فعّل **Enable Realtime**

أو نفّذ هذا الأمر SQL في SQL Editor:

```sql
-- تفعيل Realtime على جدول orders
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- تعيين replica identity للحصول على البيانات الكاملة
ALTER TABLE orders REPLICA IDENTITY FULL;
```

### الخطوة 2: التحقق من سياسات RLS

تأكد من وجود سياسة تسمح بالتحديث. نفّذ هذا في SQL Editor:

```sql
-- التحقق من السياسات الحالية
SELECT * FROM pg_policies WHERE tablename = 'orders';

-- إضافة سياسة للسماح بالتحديث (إذا لم تكن موجودة)
CREATE POLICY "Allow all updates on orders" ON orders
  FOR UPDATE
  USING (true);
```

⚠️ **ملاحظة مهمة**: السياسة أعلاه تسمح لأي شخص بالتحديث. للحماية الأفضل، استخدم:

```sql
-- سياسة للأدمن فقط
CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

### الخطوة 3: التحقق من متغيرات البيئة

تأكد من أن ملف `.env.local` في مجلد `admin` يحتوي على:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## اختبار الحل

1. افتح لوحة التحكم وغيّر حالة طلب
2. يجب أن ترى رسالة "تم تحديث حالة الطلب بنجاح!"
3. افتح التطبيق - يجب أن تتحدث الحالة تلقائياً بدون إعادة تحميل

## إذا استمرت المشكلة

### تحقق من Console في المتصفح:
- افتح Developer Tools (F12)
- اذهب إلى Console
- ابحث عن أي رسائل خطأ تبدأ بـ "Error updating order status"

### أسباب محتملة للفشل:
1. **RLS Policy**: لا توجد سياسة تسمح بالتحديث
2. **Network**: مشكلة في الاتصال
3. **Auth**: لوحة التحكم غير مسجلة الدخول بحساب أدمن

### الحل السريع (للتطوير فقط):
```sql
-- تعطيل RLS مؤقتاً (غير آمن للإنتاج!)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

## الملفات المُعدّلة

1. `admin/src/app/(dashboard)/orders/[id]/page.tsx` - تحسين دالة updateStatus
2. `app/orders.tsx` - إضافة Realtime و Pull-to-Refresh
3. `app/order/[id].tsx` - إضافة Realtime للتفاصيل
4. `supabase/migrations/enable_orders_realtime.sql` - سكربتات SQL
