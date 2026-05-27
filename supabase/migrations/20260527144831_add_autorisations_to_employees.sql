/*
  # Add autorisations column to employees table

  1. Changes
    - Add `autorisations` column (text[]) to employees table
    - Stores employee authorizations as an array of text values
    - Default value is an empty array

  2. Security
    - No changes to existing RLS policies
    - Column is readable publicly for badge verification

  3. Notes
    - The column stores multiple authorizations as an array
    - Examples: ['Accès Bureau', 'Accès Serveur', 'Zone Sensible']
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'employees' AND column_name = 'autorisations'
  ) THEN
    ALTER TABLE employees ADD COLUMN autorisations text[] DEFAULT '{}';
  END IF;
END $$;
