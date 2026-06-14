/**
 * تحويل روابط Supabase Storage إلى روابط ImageKit.
 * يُستخدم في admin panel لعرض الصور بعد الهجرة.
 */

const SUPABASE_BASE = 'https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/';
const IMAGEKIT_BASE = 'https://ik.imagekit.io/amalcenter/';

function toImageKit(url: string, transform?: string): string {
  if (!url) return url;
  if (!url.startsWith(SUPABASE_BASE)) return url;

  const path = url.slice(SUPABASE_BASE.length).replace(/\/thumbs\//, '/');
  if (transform) return `${IMAGEKIT_BASE}tr:${transform}/${path}`;
  return `${IMAGEKIT_BASE}${path}`;
}

export function getProductThumbnailUrl(url: string | undefined | null): string | undefined {
  if (!url) return url ?? undefined;
  return toImageKit(url, 'w-300,h-300,c-at_max,f-webp,q-65');
}

/**
 * مسار التخزين الخاص بالـ thumbnail داخل bucket.
 * @deprecated ImageKit يتولى التصغير — يُبقى للتوافق مع كود الرفع القديم.
 */
export function getThumbnailStoragePath(filePath: string): string {
  const withoutBucket = filePath.replace(/^products\//, '');
  return `thumbs/${withoutBucket}`;
}
