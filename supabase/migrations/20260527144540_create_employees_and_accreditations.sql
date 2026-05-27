/*
  # Create employees and accreditations system

  1. New Tables
    - `employees` - Employee records with matricule
      - `id` (uuid, primary key)
      - `matricule` (text, unique, indexed)
      - `full_name` (text)
      - `position` (text)
      - `pole` (text) - Department/pole
      - `status` (text) - Active/Inactive
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `accreditations` - Employee accreditations/credentials
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key to employees)
      - `accreditation_type` (text)
      - `expiry_date` (date, nullable)
      - `issued_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public READ policy for employees (by matricule verification use case)
    - Public READ policy for accreditations (linked to employee verification)
    - Authenticated users can INSERT/UPDATE/DELETE employee data
    - Authenticated users can manage accreditations

  3. Indexes
    - Index on employees.matricule for fast lookups
    - Index on accreditations.employee_id for joins
*/

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  matricule text UNIQUE NOT NULL,
  full_name text NOT NULL,
  position text NOT NULL,
  pole text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS accreditations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  accreditation_type text NOT NULL,
  expiry_date date,
  issued_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_matricule ON employees(matricule);
CREATE INDEX IF NOT EXISTS idx_accreditations_employee_id ON accreditations(employee_id);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE accreditations ENABLE ROW LEVEL SECURITY;

-- Public read access for employee verification (badge check)
CREATE POLICY "Public can view employees by matricule"
  ON employees FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can manage employees
CREATE POLICY "Authenticated users can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND matricule <> '' AND full_name <> '' AND position <> '' AND pole <> '');

CREATE POLICY "Authenticated users can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL AND matricule <> '' AND full_name <> '' AND position <> '' AND pole <> '');

CREATE POLICY "Authenticated users can delete employees"
  ON employees FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Public read access for accreditations
CREATE POLICY "Public can view accreditations"
  ON accreditations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can manage accreditations
CREATE POLICY "Authenticated users can insert accreditations"
  ON accreditations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND employee_id IS NOT NULL AND accreditation_type <> '');

CREATE POLICY "Authenticated users can update accreditations"
  ON accreditations FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL AND employee_id IS NOT NULL AND accreditation_type <> '');

CREATE POLICY "Authenticated users can delete accreditations"
  ON accreditations FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
