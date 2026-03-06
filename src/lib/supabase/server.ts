import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createMockClient, USE_LOCAL_DB } from "@/lib/local-db/mock-supabase";

export async function createClient() {
  // Use local database if enabled or if Supabase URL is not configured
  if (USE_LOCAL_DB) {
    return createMockClient() as any;
  }

  // Server-side Supabase client (for Express API routes)
  return createSupabaseClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!
  );
}
