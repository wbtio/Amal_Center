import { supabase } from '@/lib/supabase';
import {
  optimizeImageForStorage,
  PRODUCT_THUMBNAIL_OPTIONS,
  STORAGE_IMAGE_CACHE_CONTROL,
} from '@/lib/image-optimizer';
import { getThumbnailStoragePath } from '@/lib/imageUrl';

/**
 * يولّد نسخة مصغّرة (~400px webp) من الصورة المرفوعة ويرفعها إلى products/thumbs/<نفس الاسم>.
 * تُستخدم النسخة المصغّرة في القوائم والشبكات لتقليل الـ egress بشكل كبير.
 *
 * لا يرمي خطأً عند الفشل — فشل المصغّر لا يجب أن يمنع حفظ المنتج،
 * لأن واجهات العرض ترجع تلقائياً للصورة الأصلية عند غياب المصغّر.
 *
 * @param filePath مسار الصورة الأصلية داخل bucket المنتجات، مثل: products/123.webp
 * @param sourceBlob محتوى الصورة المصدر لتوليد المصغّر منها
 */
export async function uploadProductThumbnail(
  filePath: string,
  sourceBlob: Blob | File
): Promise<void> {
  try {
    const thumb = await optimizeImageForStorage(sourceBlob, PRODUCT_THUMBNAIL_OPTIONS);
    const thumbPath = getThumbnailStoragePath(filePath);

    await supabase.storage.from('products').upload(thumbPath, thumb.file, {
      upsert: true,
      cacheControl: STORAGE_IMAGE_CACHE_CONTROL,
      contentType: 'image/webp',
    });
  } catch (error) {
    console.warn('Thumbnail generation skipped:', error);
  }
}
