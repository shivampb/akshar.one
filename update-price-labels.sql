-- SQL Script to update all property price labels from $ to ₹
-- Run this directly in your Supabase SQL Editor

-- Update all priceLabel fields, replacing $ with ₹
UPDATE properties
SET "priceLabel" = REPLACE("priceLabel", '$', '₹')
WHERE "priceLabel" LIKE '$%';

-- Verify the update
SELECT id, name, "priceLabel" FROM properties;
