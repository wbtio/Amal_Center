/**
 * run-migration.mjs
 * ──────────────────────────────────────────────────────────────
 * يتصل بـ PostgreSQL المشروع الجديد (Session Pooler / IPv4)
 * ويشغّل جميع ملفات البيانات تلقائياً.
 *
 * كيفية التشغيل:
 *   NEW_DB_PASS=كلمة_السر_فقط node scripts/run-migration.mjs
 *
 * أين تجد كلمة السر؟
 *   المشروع الجديد → Connect → اختر "Session pooler" → انسخ الـ URI
 *   ستجد: postgresql://postgres.ulngcxjaxfpyadwqmukz:[هنا]@aws-...
 *   انسخ فقط الجزء بين : و @
 *
 *   أو: Settings → General → Reset database password
 */

import pg from 'pg';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── قراءة كلمة السر ──────────────────────────────────────────────
let NEW_DB_PASS = process.env.NEW_DB_PASS || '';

// إذا أدخل المستخدم الرابط الكامل استخرج الكلمة منه تلقائياً
if (NEW_DB_PASS.startsWith('postgresql://') || NEW_DB_PASS.startsWith('postgres://')) {
  const m = NEW_DB_PASS.match(/:\/\/[^:]+:([^@]+)@/);
  if (m) NEW_DB_PASS = decodeURIComponent(m[1]);
}

if (!NEW_DB_PASS || NEW_DB_PASS === '[YOUR-PASSWORD]') {
  console.error('❌  يرجى تمرير كلمة سر قاعدة البيانات:');
  console.error('    NEW_DB_PASS=كلمة_السر node scripts/run-migration.mjs');
  console.error('');
  console.error('    أين تجدها:');
  console.error('    المشروع الجديد → Connect → Session pooler → URI');
  console.error('    انسخ فقط الكلمة بين ":" و "@"');
  process.exit(1);
}

// ── Session Pooler (يدعم IPv4 ← مهم لشبكات الشرق الأوسط) ────────
// الـ host يختلف حسب المنطقة — يمكن تجاوزه بتمرير POOLER_HOST
const POOLER_HOST = process.env.POOLER_HOST || 'aws-0-eu-central-1.pooler.supabase.com';
const PROJECT_REF = 'ulngcxjaxfpyadwqmukz';

console.log(`🔌  Connecting via Session Pooler: ${POOLER_HOST}`);

const pool = new pg.Pool({
  host:     POOLER_HOST,
  port:     5432,
  database: 'postgres',
  user:     `postgres.${PROJECT_REF}`,  // Session Pooler username format
  password: NEW_DB_PASS,
  ssl:      { rejectUnauthorized: false },
  max:      2,
  connectionTimeoutMillis: 30000,
  statement_timeout:       180000, // 3 دقائق لكل ملف
});

// قائمة الملفات بالترتيب الصحيح
const FILES = [
  'data-1-categories.sql',
  'data-2-products-A.sql',
  'data-2-products-B.sql',
  'data-2-products-C.sql',
  'data-3-other-tables.sql',
];

async function runFile(filename) {
  const path = join(__dirname, filename);
  const sql  = readFileSync(path, 'utf8');
  const start = Date.now();
  console.log(`\n▶  ${filename} …`);
  const client = await pool.connect();
  try {
    await client.query(sql);
    const ms = Date.now() - start;
    console.log(`   ✅  اكتمل في ${(ms/1000).toFixed(1)}ث`);
  } finally {
    client.release();
  }
}

(async () => {
  console.log('🚀  بدء رفع البيانات إلى المشروع الجديد …\n');
  try {
    // اختبار الاتصال
    await pool.query('SELECT 1');
    console.log('✅  اتصال PostgreSQL ناجح\n');

    for (const file of FILES) {
      await runFile(file);
    }

    // تحقق نهائي
    const { rows } = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM public.categories) AS categories,
        (SELECT COUNT(*) FROM public.products)   AS products,
        (SELECT COUNT(*) FROM public.banners)    AS banners,
        (SELECT COUNT(*) FROM public.home_sections) AS home_sections,
        (SELECT COUNT(*) FROM public.coupons)    AS coupons
    `);
    console.log('\n📊  إجمالي السجلات في المشروع الجديد:');
    console.table(rows[0]);
    console.log('\n🎉  اكتملت الهجرة بنجاح!');

  } catch (err) {
    console.error('\n❌  خطأ:', err.message);
    if (err.code === 'ECONNREFUSED' || err.message.includes('timeout')) {
      console.error('    → تحقق من صحة كلمة السر وأنك متصل بالإنترنت');
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
