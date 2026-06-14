/**
 * توليد نسخ مصغّرة (thumbnails) لكل صور المنتجات الموجودة في Supabase Storage.
 *
 * يقرأ روابط الصور من جدول products، وينشئ لكل صورة نسخة ~400px webp
 * ويرفعها إلى نفس bucket المنتجات تحت مجلد thumbs/ بنفس مسار الملف.
 * هذا يقلّل بايتات الـ egress في القوائم بنسبة 80-90%.
 *
 * التشغيل (من مجلد admin حتى يجد sharp و @supabase/supabase-js):
 *   cd admin && node ../scripts/generate-thumbnails.mjs
 *
 * خيارات بيئية اختيارية:
 *   THUMB_WIDTH=400  THUMB_QUALITY=70  CONCURRENCY=5  DRY_RUN=1
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// sharp و @supabase/supabase-js مثبّتان في admin/node_modules — نحمّلهما من هناك
const requireFromAdmin = createRequire(join(REPO_ROOT, 'admin', 'package.json'));
const sharp = requireFromAdmin('sharp');
const { createClient } = requireFromAdmin('@supabase/supabase-js');

function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(join(REPO_ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  } catch {
    // لا يوجد ملف .env — سنعتمد على process.env
  }
  return env;
}

const fileEnv = loadEnv();
const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  fileEnv.EXPO_PUBLIC_SUPABASE_URL ||
  fileEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  fileEnv.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ لم يتم العثور على SUPABASE_URL / KEY. تأكد من ملف .env في جذر المشروع.');
  process.exit(1);
}

const THUMB_WIDTH = Number(process.env.THUMB_WIDTH || 400);
const THUMB_QUALITY = Number(process.env.THUMB_QUALITY || 70);
const CONCURRENCY = Number(process.env.CONCURRENCY || 5);
const DRY_RUN = process.env.DRY_RUN === '1';
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : 0;

const PUBLIC_PREFIX = '/storage/v1/object/public/products/';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/** يستخرج مسار الملف داخل bucket المنتجات من رابطه العام، أو null إن لم يكن صورة منتج. */
function toStoragePath(url) {
  if (!url || !url.includes(PUBLIC_PREFIX)) return null;
  let rest = url.slice(url.indexOf(PUBLIC_PREFIX) + PUBLIC_PREFIX.length);
  rest = rest.split('?')[0].split('#')[0];
  if (!rest || rest.startsWith('thumbs/')) return null;
  return rest;
}

async function fetchAllImageUrls() {
  const urls = new Set();
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('products')
      .select('image_url')
      .not('image_url', 'is', null)
      .range(from, from + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const row of data) if (row.image_url) urls.add(row.image_url);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return [...urls];
}

async function thumbExists(thumbPath) {
  const { data } = supabase.storage.from('products').getPublicUrl(thumbPath);
  try {
    const res = await fetch(data.publicUrl, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

const stats = { total: 0, created: 0, skipped: 0, failed: 0 };

async function processOne(url) {
  const path = toStoragePath(url);
  if (!path) {
    stats.skipped++;
    return;
  }
  const thumbPath = `thumbs/${path}`;

  if (await thumbExists(thumbPath)) {
    stats.skipped++;
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());

    const thumb = await sharp(input)
      .resize({ width: THUMB_WIDTH, height: THUMB_WIDTH, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toBuffer();

    if (DRY_RUN) {
      console.log(`[dry-run] would create thumbs/${path} (${(thumb.length / 1024).toFixed(0)}KB)`);
      stats.created++;
      return;
    }

    const { error } = await supabase.storage.from('products').upload(thumbPath, thumb, {
      contentType: 'image/webp',
      cacheControl: '31536000',
      upsert: true,
    });
    if (error) throw error;
    stats.created++;
  } catch (err) {
    stats.failed++;
    console.warn(`⚠️  ${path}: ${err.message}`);
  }
}

async function runPool(items, worker, size) {
  let i = 0;
  const runners = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx]);
      if ((stats.created + stats.skipped + stats.failed) % 100 === 0) {
        console.log(
          `… ${stats.created + stats.skipped + stats.failed}/${stats.total} (created ${stats.created}, skipped ${stats.skipped}, failed ${stats.failed})`
        );
      }
    }
  });
  await Promise.all(runners);
}

(async () => {
  console.log('📥 جلب روابط صور المنتجات…');
  let urls = await fetchAllImageUrls();
  if (LIMIT > 0) urls = urls.slice(0, LIMIT);
  stats.total = urls.length;
  console.log(`✅ عدد الصور: ${urls.length} | width=${THUMB_WIDTH} quality=${THUMB_QUALITY} concurrency=${CONCURRENCY}${DRY_RUN ? ' (DRY RUN)' : ''}`);

  await runPool(urls, processOne, CONCURRENCY);

  console.log('—'.repeat(30));
  console.log(`🎉 تم. أُنشئ: ${stats.created} | تخطّي: ${stats.skipped} | فشل: ${stats.failed}`);
})().catch((err) => {
  console.error('❌ خطأ غير متوقع:', JSON.stringify(err, null, 2), err?.message || err);
  process.exit(1);
});
