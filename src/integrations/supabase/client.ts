// supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase-types"; // use 'Database', not 'SupabaseDatabase'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);