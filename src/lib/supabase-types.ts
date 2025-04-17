import { createClient } from "@supabase/supabase-js";

// ✅ Use your own type — no need for aliasing
export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          user_id: string;
          role: string;
        };
        Insert: {
          user_id: string;
          role: string;
        };
        Update: {
          user_id?: string;
          role?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

// ✅ Supabase client uses the same `Database` type
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Optional: If you still need Json
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
