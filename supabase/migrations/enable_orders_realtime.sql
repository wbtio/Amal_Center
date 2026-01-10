-- Enable Realtime for orders table
-- This migration enables realtime subscriptions for the orders table

-- First, ensure the orders table has the replica identity set to FULL
-- This is required for realtime to send the full row data on updates
ALTER TABLE orders REPLICA IDENTITY FULL;

-- Enable RLS on orders table if not already enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own orders
CREATE POLICY IF NOT EXISTS "Users can view their own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow authenticated users to insert their own orders  
CREATE POLICY IF NOT EXISTS "Users can insert their own orders" ON orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow admins to update any order
-- Note: This requires a profiles table with role column
CREATE POLICY IF NOT EXISTS "Admins can update any order" ON orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policy to allow service role to do anything (for admin panel)
-- This is needed because the admin panel uses anon key
-- IMPORTANT: You need to set up proper admin authentication

-- Alternative: Allow authenticated users to update orders (less secure but simpler)
CREATE POLICY IF NOT EXISTS "Authenticated can update orders" ON orders
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Add publication for realtime
-- Note: Run this in Supabase SQL Editor
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
