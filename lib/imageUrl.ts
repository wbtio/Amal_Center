/**
 * تحويل روابط Supabase Storage إلى روابط ImageKit مع transformations تلقائية.
 *
 * ImageKit يجلب الصورة من Supabase مرة واحدة ويكاشها دائماً،
 * مما يلغي الـ egress على Supabase تماماً.
 *
 * تحويل URL:
 *   Supabase: https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/{bucket}/{path}
 *   ImageKit:  https://ik.imagekit.io/amalcenter/tr:{transform}/{bucket}/{path}
 */

const SUPABASE_BASE = 'https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/';
const IMAGEKIT_BASE = 'https://ik.imagekit.io/amalcenter/';

const THUMB_TR = 'w-300,h-300,c-at_max,f-webp,q-65'; // بطاقات المنتجات والقوائم
const FULL_TR  = 'w-900,h-900,c-at_max,f-webp,q-78'; // صفحة تفاصيل المنتج

function toImageKit(url: string, transform: string): string {
  if (!url) return url;
  if (!url.startsWith(SUPABASE_BASE)) return url; // روابط خارجية تبقى كما هي

  // إزالة مجلد thumbs/ القديم إن وُجد
  const path = url.slice(SUPABASE_BASE.length).replace(/\/thumbs\//, '/');
  return `${IMAGEKIT_BASE}tr:${transform}/${path}`;
}

/** رابط الصورة المصغّرة للقوائم وبطاقات المنتجات (300×300 webp) */
export function getProductThumbnailUrl(url: string | undefined | null): string | undefined {
  if (!url) return url ?? undefined;
  return toImageKit(url, THUMB_TR);
}

/** رابط الصورة الكاملة لصفحة تفاصيل المنتج (900×900 webp) */
export function getProductFullUrl(url: string | undefined | null): string | undefined {
  if (!url) return url ?? undefined;
  return toImageKit(url, FULL_TR);
}

/** @deprecated ImageKit يتولى التصغير الآن — يُبقى للتوافق مع admin */
export function getThumbnailStoragePath(filePath: string): string {
  const withoutBucket = filePath.replace(/^products\//, '');
  return `thumbs/${withoutBucket}`;
}
