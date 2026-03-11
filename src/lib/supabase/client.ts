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

let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (USE_LOCAL_DB) {
    return createMockClient() as any;
  }

  if (!browserClient) {
    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();
    if (!url || !key) {
      throw new Error(
        "Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* equivalents)",
      );
    }
    browserClient = createSupabaseClient(url, key);
  }

  return browserClient;
}
