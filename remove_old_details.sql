-- SQL Script to remove deprecated fields from the features JSONB column
-- This script assumes 'features' is a JSONB column in the 'properties' table.

-- Remove keys: bedrooms, bathrooms, parking, propertyAge, unitsOnFloor, lifts, waterAvailability
UPDATE properties
SET features = features 
  - 'bedrooms' 
  - 'bathrooms' 
  - 'parking' 
  - 'propertyAge' 
  - 'unitsOnFloor' 
  - 'lifts' 
  - 'waterAvailability';

-- Alternatively, if these were actual columns (unlikely based on codebase, but provided for safety):
-- ALTER TABLE properties DROP COLUMN IF EXISTS bedrooms;
-- ALTER TABLE properties DROP COLUMN IF EXISTS bathrooms;
-- ALTER TABLE properties DROP COLUMN IF EXISTS parking;
-- ALTER TABLE properties DROP COLUMN IF EXISTS property_age;
-- ALTER TABLE properties DROP COLUMN IF EXISTS units_on_floor;
-- ALTER TABLE properties DROP COLUMN IF EXISTS lifts;
-- ALTER TABLE properties DROP COLUMN IF EXISTS water_availability;
