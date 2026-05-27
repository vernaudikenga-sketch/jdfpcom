/*
  # Create secure employee verification function

  ## Purpose
  The /verify/:matricule route needs to check employee badges without requiring authentication.
  Instead of exposing the entire employees table publicly, we create a secure function that:
  1. Only returns data when a specific matricule is provided
  2. Joins with accreditations for that specific employee only
  3. Does not allow listing or browsing all employees

  ## Security
  - Function is SECURITY DEFINER (runs with table owner privileges)
  - Only returns data for the exact matricule requested
  - Cannot be used to enumerate all employees
  - Returns only necessary fields for verification
*/

CREATE OR REPLACE FUNCTION verify_employee_badge(p_matricule text)
RETURNS TABLE (
  employee_id uuid,
  employee_matricule text,
  employee_full_name text,
  employee_position text,
  employee_pole text,
  employee_status text,
  employee_autorisations text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.matricule,
    e.full_name,
    e."position",
    e.pole,
    e.status,
    e.autorisations
  FROM public.employees e
  WHERE e.matricule = p_matricule;
END;
$$;

-- Grant execution to anon and authenticated
GRANT EXECUTE ON FUNCTION verify_employee_badge(text) TO anon;
GRANT EXECUTE ON FUNCTION verify_employee_badge(text) TO authenticated;
