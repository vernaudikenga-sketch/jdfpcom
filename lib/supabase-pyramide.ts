import { createClient } from '@supabase/supabase-js';

// Client pointant vers le projet Pyramide-ID pour la vérification des badges
const url = process.env.NEXT_PUBLIC_PYRAMIDE_SUPABASE_URL ?? 'https://fuzjiefcgbfjfuzhfgar.supabase.co';
const key = process.env.NEXT_PUBLIC_PYRAMIDE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1emppZWZjZ2JmamZ1emhmZ2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNzcxMzgsImV4cCI6MjA5NTc1MzEzOH0.nYLvBrpZLaHFb8ZOapsP8yS7B36-pqFwT4TTk05WcoU';

export const supabasePyramide = createClient(url, key);
