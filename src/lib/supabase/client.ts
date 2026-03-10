import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createMockClient, USE_LOCAL_DB } from "@/lib/local-db/mock-supabase";

function getSupabaseUrl() {
  return (
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  );
}
function getSupabaseAnonKey() {
  return (
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function createClient() {
  // Use local database if enabled or if Supabase URL is not configured
  if (USE_LOCAL_DB) {
    return createMockClient() as any;
  }

  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    throw new Error("Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* equivalents)");
  }

  return createSupabaseClient(url, key);
}
