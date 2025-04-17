// supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase-types"; // use 'Database', not 'SupabaseDatabase'

console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);