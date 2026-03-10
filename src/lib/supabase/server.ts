import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createMockClient, USE_LOCAL_DB } from "@/lib/local-db/mock-supabase";

function getSupabaseUrl() {
  return (
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
}
function getSupabaseAnonKey() {
  return (
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function createClient() {
  // Use local database if enabled or if Supabase URL is not configured
  if (USE_LOCAL_DB) {
    return createMockClient() as any;
  }

  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    throw new Error("Missing Supabase URL and anon key (VITE_SUPABASE_*, SUPABASE_*, or NEXT_PUBLIC_SUPABASE_*)");
  }

  return createSupabaseClient(url, key);
}
