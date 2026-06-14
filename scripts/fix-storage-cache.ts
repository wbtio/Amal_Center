// السكريبت التالي يُشغّل مرة واحدة لتحديث cache-control على جميع الصور القديمة
// شغّله من Vercel/Next.js Server Action أو من tsx:
// npx tsx scripts/fix-storage-cache.ts
//
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
//
// const buckets = ['products', 'categories', 'banners', 'promo_banners', 'avatars'];
//
// for (const bucket of buckets) {
//   // جلب قائمة بكل الملفات
//   let offset = 0;
//   const limit = 100;
//   while (true) {
//     const { data: files, error } = await supabase.storage
//       .from(bucket)
//       .list('', { limit, offset, sortBy: { column: 'name', order: 'asc' } });
//
//     if (error || !files || files.length === 0) break;
//
//     for (const file of files) {
//       if (file.name && !file.name.endsWith('/')) {
//         const { data: existing } = await supabase.storage
//           .from(bucket)
//           .download(file.name);
//         if (!existing) continue;
//
//         await supabase.storage
//           .from(bucket)
//           .upload(file.name, existing, {
//             upsert: true,
//             contentType: existing.type || 'image/webp',
//             cacheControl: '31536000', // سنة كاملة
//           });
//       }
//     }
//
//     offset += limit;
//     if (files.length < limit) break;
//   }
//   console.log(`✅ Updated cache-control for bucket: ${bucket}`);
// }

export {};
