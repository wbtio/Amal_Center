-- Add location coordinates to orders table
ALTER TABLE orders 
ADD COLUMN delivery_latitude DECIMAL(10, 8),
ADD COLUMN delivery_longitude DECIMAL(11, 8);

-- Add location coordinates to addresses table
ALTER TABLE addresses 
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8);

-- Add comments for clarity
COMMENT ON COLUMN orders.delivery_latitude IS 'Delivery location latitude coordinate';
COMMENT ON COLUMN orders.delivery_longitude IS 'Delivery location longitude coordinate';
COMMENT ON COLUMN addresses.latitude IS 'Address latitude coordinate';
COMMENT ON COLUMN addresses.longitude IS 'Address longitude coordinate';
