-- Simplified schema removing unused contact_leads table
-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(200) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  description TEXT,
  features TEXT[],
  image_url TEXT,
  images TEXT[],
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create car brands table for the showcase
CREATE TABLE IF NOT EXISTS public.car_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON public.vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON public.vehicles(year);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON public.vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON public.vehicles(featured);

-- Enable Row Level Security
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_brands ENABLE ROW LEVEL SECURITY;

-- Public read access for vehicles (anyone can view available vehicles)
CREATE POLICY "vehicles_select_all"
  ON public.vehicles FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete vehicles
CREATE POLICY "vehicles_insert_authenticated"
  ON public.vehicles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicles_update_authenticated"
  ON public.vehicles FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicles_delete_authenticated"
  ON public.vehicles FOR DELETE
  USING (auth.role() = 'authenticated');

-- Public read access for car brands
CREATE POLICY "car_brands_select_all"
  ON public.car_brands FOR SELECT
  USING (true);

-- Only authenticated users can manage brands
CREATE POLICY "car_brands_manage_authenticated"
  ON public.car_brands FOR ALL
  USING (auth.role() = 'authenticated');
