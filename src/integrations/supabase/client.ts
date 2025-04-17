// supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase-types"; // use 'Database', not 'SupabaseDatabase'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);