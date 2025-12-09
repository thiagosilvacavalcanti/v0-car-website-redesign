-- This script creates a test admin user for development
-- In production, you should create users through Supabase Auth dashboard

-- Note: To create an actual user, go to Supabase Dashboard > Authentication > Users
-- and create a user with email and password.

-- Example credentials for testing (create manually in Supabase):
-- Email: admin@smlveiculos.com
-- Password: (set your own secure password)

-- Add RLS policies for admin operations
CREATE POLICY "authenticated_users_vehicles_insert"
  ON public.vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "authenticated_users_vehicles_update"
  ON public.vehicles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_vehicles_delete"
  ON public.vehicles FOR DELETE
  TO authenticated
  USING (true);

-- Add policies for car brands management
CREATE POLICY "authenticated_users_car_brands_insert"
  ON public.car_brands FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "authenticated_users_car_brands_update"
  ON public.car_brands FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_car_brands_delete"
  ON public.car_brands FOR DELETE
  TO authenticated
  USING (true);

-- Add policies for viewing contact leads
CREATE POLICY "authenticated_users_contact_leads_select"
  ON public.contact_leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_contact_leads_update"
  ON public.contact_leads FOR UPDATE
  TO authenticated
  USING (true);
