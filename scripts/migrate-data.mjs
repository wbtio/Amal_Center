/**
 * سكريبت نقل البيانات من المشروع القديم إلى الجديد
 *
 * الاستخدام:
 *   OLD_KEY=service_role_key_القديم \
 *   NEW_URL=https://NEWID.supabase.co \
 *   NEW_KEY=service_role_key_الجديد \
 *   node scripts/migrate-data.mjs
 *
 * ملاحظة: يجب تشغيل schema.sql أولاً في المشروع الجديد
 */

import { createClient } from '@supabase/supabase-js';

// ── إعدادات ──────────────────────────────────────────────────
const OLD_URL = 'https://asxynodsnmrymmdspprn.supabase.co';
const OLD_KEY = process.env.OLD_KEY;   // service role القديم
const NEW_URL = process.env.NEW_URL;   // https://NEWID.supabase.co
const NEW_KEY = process.env.NEW_KEY;   // service role الجديد
const BATCH   = 200;                   // عدد السجلات لكل دفعة
// ─────────────────────────────────────────────────────────────

if (!OLD_KEY || !NEW_URL || !NEW_KEY) {
  console.error('❌  مطلوب: OLD_KEY و NEW_URL و NEW_KEY');
  console.error('    مثال:');
  console.error('    OLD_KEY=xxx NEW_URL=https://abc.supabase.co NEW_KEY=yyy node scripts/migrate-data.mjs');
  process.exit(1);
}

const src = createClient(OLD_URL, OLD_KEY, { auth: { persistSession: false } });
const dst = createClient(NEW_URL, NEW_KEY, { auth: { persistSession: false } });

// ── مساعد: نقل جدول كامل بدفعات ──────────────────────────────
async function migrateTable(table, { orderBy = 'created_at', filter } = {}) {
  console.log(`\n📋  ${table}`);
  let total = 0, offset = 0;

  while (true) {
    let query = src.from(table).select('*').order(orderBy).range(offset, offset + BATCH - 1);
    if (filter) query = query.filter(...filter);

    const { data, error } = await query;
    if (error) { console.error(`  ❌ قراءة: ${error.message}`); break; }
    if (!data?.length) break;

    const { error: insertErr } = await dst.from(table).upsert(data, { onConflict: 'id' });
    if (insertErr) {
      console.error(`  ❌ كتابة (offset ${offset}): ${insertErr.message}`);
    } else {
      total += data.length;
      process.stdout.write(`\r  ✅ ${total} سجل`);
    }

    offset += data.length;
    if (data.length < BATCH) break;
  }

  console.log(`\r  ✅ ${total} سجل (اكتمل)`);
  return total;
}

// ── الهجرة الرئيسية ───────────────────────────────────────────
async function migrate() {
  console.log('🚀  بدء نقل البيانات\n');
  console.log(`    المصدر : ${OLD_URL}`);
  console.log(`    الهدف  : ${NEW_URL}\n`);

  // اختبار الاتصال
  const { error: pingErr } = await src.from('categories').select('id').limit(1);
  if (pingErr) {
    console.error('❌  تعذّر الاتصال بالمشروع القديم:', pingErr.message);
    process.exit(1);
  }
  const { error: dstErr } = await dst.from('categories').select('id').limit(1);
  if (dstErr) {
    console.error('❌  تعذّر الاتصال بالمشروع الجديد:', dstErr.message);
    console.error('    تأكد أنك شغّلت schema.sql أولاً.');
    process.exit(1);
  }

  // الترتيب مهم — الجداول بدون foreign keys أولاً
  await migrateTable('categories',   { orderBy: 'sort_order' });
  await migrateTable('coupons',      { orderBy: 'created_at' });
  await migrateTable('banners',      { orderBy: 'created_at' });
  await migrateTable('home_sections',{ orderBy: 'order_index' });
  await migrateTable('promo_banners',{ orderBy: 'created_at' });
  await migrateTable('offers',       { orderBy: 'created_at' });

  // المنتجات — الأكبر
  await migrateTable('products', { orderBy: 'created_at' });
  await migrateTable('offer_products', { orderBy: 'created_at' });

  // بيانات المستخدمين — تحتاج auth.users موجودة
  console.log('\n⚠️   الجداول التالية تحتاج مستخدمين في auth.users');
  console.log('    إذا كانت فارغة أو أخطأت، هذا طبيعي — يمكن نقلها لاحقاً بعد تسجيل المستخدمين');

  await migrateTable('profiles',  { orderBy: 'created_at' });
  await migrateTable('addresses', { orderBy: 'created_at' });
  await migrateTable('orders',    { orderBy: 'created_at' });
  await migrateTable('order_items',{ orderBy: 'created_at' });
  await migrateTable('wishlist',  { orderBy: 'created_at' });
  await migrateTable('reviews',   { orderBy: 'created_at' });
  await migrateTable('coupon_usages', { orderBy: 'used_at' });
  await migrateTable('notifications', { orderBy: 'created_at' });

  console.log('\n' + '─'.repeat(50));
  console.log('✅  اكتملت هجرة البيانات!');
  console.log('\nالخطوات التالية:');
  console.log('  1. حدّث EXPO_PUBLIC_SUPABASE_URL و EXPO_PUBLIC_SUPABASE_ANON_KEY في .env');
  console.log('  2. حدّث نفس المتغيرات في Vercel (web app) و Admin panel');
  console.log('  3. ابنِ وانشر التطبيق من جديد');
}

migrate().catch(err => { console.error('💥', err); process.exit(1); });
