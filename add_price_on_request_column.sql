-- Add price_on_request column to properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS price_on_request BOOLEAN DEFAULT FALSE;
