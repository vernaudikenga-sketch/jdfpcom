/*
  # Fix security issues: indexes and RLS policies

  ## Changes

  ### 1. Indexes for foreign keys
  - Add index on `advertising_bookings.panel_id`
  - Add index on `domain_orders.product_id`
  - Add index on `vehicle_reservations.vehicle_id`

  ### 2. RLS INSERT policies — replace always-true WITH CHECK with proper constraints

  For public submission tables (visa_requests, advertising_bookings, contact_messages,
  domain_orders, vehicle_reservations, ai_analysis_logs), the INSERT policy must ensure
  the submitted data is valid (non-empty required fields) rather than allowing anything.

  For staff-managed tables (advertising_panels, vehicles), the INSERT policy must restrict
  to authenticated users only, enforcing that the record is being inserted by a real user.

  All policies are dropped and recreated with proper WITH CHECK clauses.
*/

-- ─────────────────────────────────────────────────────────────
-- 1. Indexes for foreign keys
-- ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_advertising_bookings_panel_id
  ON public.advertising_bookings (panel_id);

CREATE INDEX IF NOT EXISTS idx_domain_orders_product_id
  ON public.domain_orders (product_id);

CREATE INDEX IF NOT EXISTS idx_vehicle_reservations_vehicle_id
  ON public.vehicle_reservations (vehicle_id);

-- ─────────────────────────────────────────────────────────────
-- 2. Fix RLS INSERT policies
-- ─────────────────────────────────────────────────────────────

-- advertising_bookings
DROP POLICY IF EXISTS "Anyone can submit ad booking" ON public.advertising_bookings;
CREATE POLICY "Anyone can submit ad booking"
  ON public.advertising_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    client_name <> '' AND
    client_email <> '' AND
    start_date IS NOT NULL AND
    end_date IS NOT NULL AND
    end_date > start_date
  );

-- advertising_panels
DROP POLICY IF EXISTS "Authenticated users can manage panels" ON public.advertising_panels;
CREATE POLICY "Authenticated users can manage panels"
  ON public.advertising_panels
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    name <> '' AND
    location <> ''
  );

-- ai_analysis_logs
DROP POLICY IF EXISTS "Authenticated users can create AI logs" ON public.ai_analysis_logs;
CREATE POLICY "Authenticated users can create AI logs"
  ON public.ai_analysis_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    analysis_type IS NOT NULL AND
    analysis_type = ANY (ARRAY['medical','legal','security'])
  );

-- contact_messages
DROP POLICY IF EXISTS "Anyone can send contact message" ON public.contact_messages;
CREATE POLICY "Anyone can send contact message"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name <> '' AND
    email <> '' AND
    message <> ''
  );

-- domain_orders
DROP POLICY IF EXISTS "Anyone can place domain order" ON public.domain_orders;
CREATE POLICY "Anyone can place domain order"
  ON public.domain_orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    client_name <> '' AND
    client_email <> '' AND
    product_id IS NOT NULL
  );

-- vehicle_reservations
DROP POLICY IF EXISTS "Anyone can create vehicle reservation" ON public.vehicle_reservations;
CREATE POLICY "Anyone can create vehicle reservation"
  ON public.vehicle_reservations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    client_name <> '' AND
    client_email <> '' AND
    client_phone <> '' AND
    vehicle_id IS NOT NULL AND
    pickup_date IS NOT NULL AND
    return_date IS NOT NULL AND
    return_date > pickup_date
  );

-- vehicles
DROP POLICY IF EXISTS "Authenticated users can manage vehicles" ON public.vehicles;
CREATE POLICY "Authenticated users can manage vehicles"
  ON public.vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    brand <> '' AND
    model <> ''
  );

-- visa_requests
DROP POLICY IF EXISTS "Anyone can submit a visa request" ON public.visa_requests;
CREATE POLICY "Anyone can submit a visa request"
  ON public.visa_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name <> '' AND
    passport_number <> '' AND
    email <> '' AND
    visa_type IS NOT NULL
  );
