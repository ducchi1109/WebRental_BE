-- Drop unique constraint on vehicle_model
ALTER TABLE wheelie.vehicle_model
DROP CONSTRAINT IF EXISTS vehicle_model_model_name_brand_id_key;

-- Alter columns to UUID
ALTER TABLE wheelie.vehicle_model
ALTER COLUMN brand_id TYPE UUID USING gen_random_uuid();

ALTER TABLE wheelie.vehicles
ALTER COLUMN model_id TYPE UUID USING gen_random_uuid();

-- Add back unique constraint
ALTER TABLE wheelie.vehicle_model
ADD CONSTRAINT vehicle_model_model_name_brand_id_key UNIQUE (model_name, brand_id);
