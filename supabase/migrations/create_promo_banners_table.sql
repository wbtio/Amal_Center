-- Create promo_banners table for dynamic promotional banners
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS promo_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot TEXT NOT NULL,           -- 'slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5'
  position INTEGER DEFAULT 0,   -- Order within slot (for multi-banner slots)
  size TEXT NOT NULL DEFAULT 'full',  -- 'full', 'half', 'square'
  image_url TEXT NOT NULL,
  link TEXT,                    -- Internal or external link
  title TEXT,                   -- Optional title/alt text
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries by slot
CREATE INDEX IF NOT EXISTS idx_promo_banners_slot ON promo_banners(slot);
CREATE INDEX IF NOT EXISTS idx_promo_banners_active ON promo_banners(active);

-- Enable RLS
ALTER TABLE promo_banners ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active banners
CREATE POLICY "Allow public read access for active promo banners" 
ON promo_banners FOR SELECT 
USING (active = true);

-- Allow all operations for now (adjust for your auth setup)
CREATE POLICY "Allow all operations on promo banners"
ON promo_banners FOR ALL
USING (true)
WITH CHECK (true);

-- Insert sample data for testing (optional)
-- INSERT INTO promo_banners (slot, position, size, image_url, link, title, active) VALUES
-- ('slot_1', 0, 'full', 'https://via.placeholder.com/800x200', '/categories', 'عروض حصرية', true),
-- ('slot_2', 0, 'square', 'https://via.placeholder.com/400x400', '/categories', 'خصومات', true),
-- ('slot_2', 1, 'square', 'https://via.placeholder.com/400x400', '/categories', 'توصيل مجاني', true);
