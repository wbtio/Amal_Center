/**
 * سكريبت هجرة الصور من Supabase Storage إلى ImageKit
 *
 * شغّله بعد ما يرد Supabase Support ويفتحون الخدمة:
 *   SUPABASE_SERVICE_ROLE_KEY=xxxx IMAGEKIT_PRIVATE_KEY=xxxx node scripts/migrate-to-imagekit.mjs
 *
 * ما يحتاج أي تثبيت إضافي — يستخدم fetch و FormData المدمجَين في Node 18+
 */

import { createClient } from '@supabase/supabase-js';

// ── إعدادات ──────────────────────────────────────────────────────────────
const SUPABASE_URL        = 'https://asxynodsnmrymmdspprn.supabase.co';
const SUPABASE_KEY        = process.env.SUPABASE_SERVICE_ROLE_KEY;
const IMAGEKIT_PRIVATE    = process.env.IMAGEKIT_PRIVATE_KEY;   // private_6xx0...
const IMAGEKIT_UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload';
const CONCURRENT          = 5;   // طلبات متوازية في نفس الوقت
const BUCKETS             = ['products', 'categories', 'banners', 'promo-banners', 'avatars'];
// ─────────────────────────────────────────────────────────────────────────

if (!SUPABASE_KEY || !IMAGEKIT_PRIVATE) {
  console.error('❌  مطلوب: SUPABASE_SERVICE_ROLE_KEY و IMAGEKIT_PRIVATE_KEY كـ env vars');
  console.error('    مثال: SUPABASE_SERVICE_ROLE_KEY=xxx IMAGEKIT_PRIVATE_KEY=xxx node scripts/migrate-to-imagekit.mjs');
  process.exit(1);
}

const supabase   = createClient(SUPABASE_URL, SUPABASE_KEY);
const IK_AUTH    = 'Basic ' + Buffer.from(IMAGEKIT_PRIVATE + ':').toString('base64');

// ── مساعدات ──────────────────────────────────────────────────────────────

/** جلب جميع ملفات bucket بشكل تعاودي (recursive) */
async function listAllFiles(bucket, prefix = '') {
  const files = [];
  let offset  = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix || undefined, { limit: 100, offset });

    if (error)           { console.warn(`  ⚠ list error in ${bucket}/${prefix}:`, error.message); break; }
    if (!data?.length)   break;

    for (const item of data) {
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (!item.id) {
        // مجلد فرعي — تعاود
        const sub = await listAllFiles(bucket, fullPath);
        files.push(...sub);
      } else {
        files.push(fullPath);
      }
    }

    offset += data.length;
    if (data.length < 100) break;
  }

  return files;
}

/** تحميل ملف من Supabase وإرجاعه كـ ArrayBuffer */
async function downloadFile(bucket, filePath) {
  const { data, error } = await supabase.storage.from(bucket).download(filePath);
  if (error || !data) throw new Error(error?.message ?? 'download failed');
  return data.arrayBuffer();
}

/** رفع ملف إلى ImageKit */
async function uploadToImageKit(buffer, fileName, folder) {
  const form = new FormData();
  form.append('file',             new Blob([buffer]));
  form.append('fileName',         fileName);
  form.append('folder',           folder);
  form.append('useUniqueFileName','false');

  const res  = await fetch(IMAGEKIT_UPLOAD_URL, {
    method : 'POST',
    headers: { Authorization: IK_AUTH },
    body   : form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`ImageKit ${res.status}: ${txt}`);
  }
  return res.json();
}

/** تشغيل قائمة promises بحجم متزامن محدود */
async function pool(tasks, concurrency) {
  const results = [];
  for (let i = 0; i < tasks.length; i += concurrency) {
    const chunk = tasks.slice(i, i + concurrency);
    results.push(...(await Promise.allSettled(chunk.map(fn => fn()))));
  }
  return results;
}

// ── الهجرة الرئيسية ───────────────────────────────────────────────────────

async function migrate() {
  console.log('🚀  بدء هجرة الصور من Supabase → ImageKit\n');

  // اختبار أولي للتحقق أن Supabase يعمل
  const { error: pingErr } = await supabase.storage.from('products').list('', { limit: 1 });
  if (pingErr) {
    console.error('❌  Supabase Storage لا يزال مقيّداً:', pingErr.message);
    console.error('    انتظر رد Support ثم أعد تشغيل السكريبت.');
    process.exit(1);
  }

  let totalOk = 0, totalFail = 0;

  for (const bucket of BUCKETS) {
    console.log(`\n📦  Bucket: ${bucket}`);

    const allFiles = await listAllFiles(bucket);

    // تجاهل مجلد thumbs/ — ImageKit يولّدها تلقائياً عبر URL
    const files = allFiles.filter(f => !f.startsWith('thumbs/') && !f.includes('/thumbs/'));
    console.log(`    ${files.length} ملف (تجاهلنا ${allFiles.length - files.length} thumbnail قديم)`);

    let ok = 0, fail = 0;

    const tasks = files.map((filePath, idx) => async () => {
      try {
        const buffer   = await downloadFile(bucket, filePath);
        const fileName = filePath.split('/').pop();
        const dirParts = filePath.split('/').slice(0, -1);
        const folder   = ['/' + bucket, ...dirParts].join('/');

        await uploadToImageKit(buffer, fileName, folder);

        ok++;
        if ((ok + fail) % 50 === 0 || ok + fail === files.length) {
          process.stdout.write(`\r    ✅ ${ok + fail}/${files.length} (${ok} نجح، ${fail} فشل)`);
        }
      } catch (err) {
        fail++;
        console.log(`\n    ❌ ${filePath}: ${err.message}`);
      }
    });

    await pool(tasks, CONCURRENT);

    console.log(`\n    اكتمل: ${ok} نجح، ${fail} فشل`);
    totalOk   += ok;
    totalFail += fail;
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅  الهجرة انتهت: ${totalOk} نجح | ${totalFail} فشل`);
  console.log(`\nالخطوة التالية: deploy الكود المحدَّث ليستخدم ImageKit URLs`);
}

migrate().catch(err => { console.error('💥', err); process.exit(1); });
