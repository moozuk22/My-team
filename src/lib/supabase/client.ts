import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createMockClient, USE_LOCAL_DB } from "@/lib/local-db/mock-supabase";

export function createClient() {
  // Use local database if enabled or if Supabase URL is not configured
  if (USE_LOCAL_DB) {
    return createMockClient() as any;
  }

  // Client-side Supabase client
  return createSupabaseClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );
}
