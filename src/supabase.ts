import { createClient } from '@supabase/supabase-js'

// Módulos ES são executados uma vez só: este arquivo já funciona como um "singleton".
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)