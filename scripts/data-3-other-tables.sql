-- ── Banners (4 سجل) ──────────────────────────────────────────────
INSERT INTO public.banners (id,image_url,title,subtitle,discount,active,created_at,link,image_thumbnail_url,image_medium_url,image_webp_url) VALUES
('97d122f1-16e4-47cf-b939-b3a0a3605b83','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/or43hue3aho.png','عنوان جديد','','',true,'2025-12-26 01:46:01.735352+00','/(tabs)/category/89c032a3-7f00-4631-b5e0-5090db23b0be','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/or43hue3aho.png?width=300&height=200&quality=75&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/or43hue3aho.png?width=800&height=450&quality=80&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/or43hue3aho.png?quality=85&format=webp'),
('3f0dc259-9031-49fa-83c8-2584329f12d7','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/33mscoo86v6.png','Banner','','',true,'2025-12-26 09:59:12.925697+00','/(tabs)/category/ff2b4d65-2c75-474b-8ac5-893453c61105','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/33mscoo86v6.png?width=300&height=200&quality=75&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/33mscoo86v6.png?width=800&height=450&quality=80&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/33mscoo86v6.png?quality=85&format=webp'),
('a754f380-bc86-4895-91a6-0227221fe05a','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/fiac302z0n.png','','','',true,'2026-03-07 03:42:17.495698+00','/(tabs)/category/55cc4070-83f8-42d4-aba6-05a15a9ee7b6','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/fiac302z0n.png?width=300&height=200&quality=75&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/fiac302z0n.png?width=800&height=450&quality=80&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/fiac302z0n.png?quality=85&format=webp'),
('4ed71ef9-e2fa-43b6-a00d-d8ec6d8e9035','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/ibyjeu50d6l.png','','','',true,'2026-03-07 03:48:46.357391+00','/(tabs)/category/f7b92a21-c123-4d49-ac66-b2b985b78974','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/ibyjeu50d6l.png?width=300&height=200&quality=75&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/ibyjeu50d6l.png?width=800&height=450&quality=80&format=webp&resize=cover','https://asxynodsnmrymmdspprn.supabase.co/storage/v1/object/public/banners/ibyjeu50d6l.png?quality=85&format=webp')
ON CONFLICT (id) DO NOTHING;

-- ── Home Sections (6 سجل) ────────────────────────────────────────
INSERT INTO public.home_sections (id,type,title,active,order_index,created_at,category_id,icon,description,image_thumbnail_url,image_medium_url,image_webp_url) VALUES
('a39a0501-1928-4939-9ea9-d26ac81fea49','categories','التصنيفات',true,0,'2025-12-26 01:30:06.553319+00',NULL,NULL,NULL,NULL,NULL,NULL),
('fe9bd3aa-923c-4987-99da-9fb440d08308','special_offers','عروض خاصة',true,3,'2025-12-26 01:30:06.553319+00',NULL,NULL,NULL,NULL,NULL,NULL),
('8dec3e37-cf15-432d-8fb1-19c17bb364be','best_sellers','الأكثر مبيعاً',true,4,'2025-12-26 01:30:06.553319+00',NULL,NULL,NULL,NULL,NULL,NULL),
('63886e11-fc8c-423c-8227-62b18606aa8b','trending','منتجات رائجة',true,5,'2025-12-26 01:30:06.553319+00',NULL,NULL,NULL,NULL,NULL,NULL),
('306bf4dc-5d2f-43a0-b996-a5cc696c59c1','category_products','مستلزمات السوبر ماركت',true,2,'2026-01-01 22:32:21.087812+00',NULL,NULL,NULL,NULL,NULL,NULL),
('892faaf0-d60c-46ea-ad67-2ba6fe2907d3','category_products','الحفاضات',true,1,'2026-01-27 07:21:16.513842+00','606ff0dc-02f4-48ff-ad6a-df52f681bdc3',NULL,NULL,NULL,NULL,NULL)
ON CONFLICT (id) DO NOTHING;

-- ── Coupons (5 سجل) ─────────────────────────────────────────────
INSERT INTO public.coupons (id,code,discount_type,discount_value,min_order_amount,max_discount_amount,usage_limit,used_count,is_active,starts_at,expires_at,created_at,updated_at) VALUES
('06aabce5-e871-4b22-8a72-c497c2ef5559','SAVE10','percentage',10,10000,50000,NULL,0,true,'2025-12-29 14:15:45.068602+00','2025-12-31 23:59:59+00','2025-12-29 14:15:45.068602+00','2025-12-29 14:15:45.068602+00'),
('d5bf9c62-0a66-4f39-9554-8abb78527565','SAVE20','percentage',20,25000,100000,100,0,true,'2025-12-29 14:15:45.068602+00','2025-12-31 23:59:59+00','2025-12-29 14:15:45.068602+00','2025-12-29 14:15:45.068602+00'),
('5eb808a1-4d89-478a-bc37-9aecbc0075ff','WELCOME','percentage',15,0,30000,NULL,0,true,'2025-12-29 14:15:45.068602+00',NULL,'2025-12-29 14:15:45.068602+00','2025-12-29 14:15:45.068602+00'),
('847d7bcc-f8f4-4717-a673-2a20cfbf130b','FLAT5000','fixed',5000,20000,NULL,50,0,true,'2025-12-29 14:15:45.068602+00','2025-12-31 23:59:59+00','2025-12-29 14:15:45.068602+00','2025-12-29 14:15:45.068602+00'),
('6ed17385-6518-4603-89d1-6fff93dcf579','NEWYEAR25','percentage',25,30000,7500,50,0,true,'2026-01-07 11:43:08.583602+00',NULL,'2026-01-07 11:43:08.583602+00','2026-01-07 11:43:08.583602+00')
ON CONFLICT (id) DO NOTHING;

-- ── promo_banners / offers / offer_products = فارغة ─────────────
-- لا يوجد بيانات لنقلها
