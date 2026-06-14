/**
 * migrate-pg.mjs
 * ──────────────────────────────────────────────────────────────
 * يتصل بـ PostgreSQL القديم مباشرةً (يتجاوز حظر REST/Storage)
 * ويرفع البيانات للمشروع الجديد عبر service_role key.
 *
 * كيفية التشغيل:
 *   OLD_DB_PASS=كلمة_السر node scripts/migrate-pg.mjs
 *
 * أين تجد OLD_DB_PASS ؟
 *   المشروع القديم → Settings → Database
 *   → Connection string → URI
 *   ستجد شيئاً مثل: postgresql://postgres:[HERE]@db.xxx.supabase.co
 */

import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

// ── إعدادات المشروع القديم ─────────────────────────────────────
const OLD_PROJECT  = 'asxynodsnmrymmdspprn';
const OLD_DB_PASS  = process.env.OLD_DB_PASS;

if (!OLD_DB_PASS) {
  console.error('❌  يرجى تمرير كلمة سر قاعدة البيانات القديمة:');
  console.error('    OLD_DB_PASS=كلمة_السر node scripts/migrate-pg.mjs');
  process.exit(1);
}

// ── إعدادات المشروع الجديد ─────────────────────────────────────
const NEW_URL      = 'https://ulngcxjaxfpyadwqmukz.supabase.co';
const NEW_SR_KEY   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbmdjeGpheGZweWFkd3FtdWt6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg1NjQ5MSwiZXhwIjoyMDk2NDMyNDkxfQ.QNkJr4cqVfAl9jlLpcWZ2RUjS0tZtlqQElpzMe2y7ms';

const newSupabase = createClient(NEW_URL, NEW_SR_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── اتصال PostgreSQL بالمشروع القديم ───────────────────────────
const oldPool = new pg.Pool({
  host:     `db.${OLD_PROJECT}.supabase.co`,
  port:     5432,
  database: 'postgres',
  user:     'postgres',
  password: OLD_DB_PASS,
  ssl:      { rejectUnauthorized: false },
  max:      3,
  connectionTimeoutMillis: 15000,
});

// ── مساعدات ────────────────────────────────────────────────────
const BATCH = 500;

async function queryOld(sql, params = []) {
  const { rows } = await oldPool.query(sql, params);
  return rows;
}

async function upsertNew(table, rows, conflictKey = 'id') {
  if (rows.length === 0) return;
  // Supabase upsert — يتجاهل التعارضات
  const { error } = await newSupabase
    .from(table)
    .upsert(rows, { onConflict: conflictKey, ignoreDuplicates: false });
  if (error) throw new Error(`upsert ${table}: ${error.message}`);
}

async function migrateTable(table, orderBy = 'created_at') {
  console.log(`\n📋  ${table} …`);
  let offset = 0;
  let total  = 0;

  // إجمالي الصفوف
  const [{ count }] = await queryOld(
    `SELECT COUNT(*)::int AS count FROM public.${table}`
  );
  console.log(`    إجمالي الصفوف: ${count}`);

  while (true) {
    const rows = await queryOld(
      `SELECT * FROM public.${table} ORDER BY ${orderBy} LIMIT $1 OFFSET $2`,
      [BATCH, offset]
    );
    if (rows.length === 0) break;

    await upsertNew(table, rows);
    offset += rows.length;
    total  += rows.length;
    process.stdout.write(`\r    ✔  ${total}/${count}`);
  }
  console.log(`\n    اكتمل.`);
}

// ── التنفيذ الرئيسي ─────────────────────────────────────────────
(async () => {
  console.log('🚀  بدء نقل البيانات …\n');

  try {
    // 1. اختبار الاتصال
    await queryOld('SELECT 1');
    console.log('✅  اتصال PostgreSQL ناجح');

    // 2. الجداول بدون مفاتيح خارجية أولاً
    await migrateTable('categories',    'sort_order');
    await migrateTable('banners',       'created_at');
    await migrateTable('home_sections', 'sort_order');
    await migrateTable('promo_banners', 'created_at');

    // 3. المنتجات (تعتمد على categories)
    await migrateTable('products', 'created_at');

    // 4. العروض
    await migrateTable('offers',         'created_at');
    await migrateTable('offer_products', 'created_at');

    // 5. الكوبونات
    await migrateTable('coupons', 'created_at');

    // 6. الإشعارات العامة (بدون user)
    // الإشعارات المرتبطة بمستخدمين تُنقل بعد نقل المستخدمين
    // await migrateTable('notifications', 'created_at');

    console.log('\n\n🎉  اكتمل نقل البيانات الرئيسية بنجاح!');
    console.log('');
    console.log('ℹ️   الجداول التالية تحتاج مستخدمين (auth.users) لنقلها:');
    console.log('    - orders / order_items');
    console.log('    - profiles / addresses / wishlist / reviews');
    console.log('    - notifications');
    console.log('    انقلها يدوياً عبر SQL Editor بعد إنشاء المستخدمين.');

  } catch (err) {
    console.error('\n❌  خطأ:', err.message);
    if (err.message.includes('password') || err.message.includes('auth')) {
      console.error('    تأكد أن OLD_DB_PASS صحيحة.');
    }
    process.exit(1);
  } finally {
    await oldPool.end();
    console.log('\n🔌  تم إغلاق الاتصال.');
  }
})();
