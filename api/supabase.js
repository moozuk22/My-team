import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    const msg = "Missing Supabase URL or anon key in Vercel env (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)";
    throw new Error(msg);
  }
  return createClient(url, key);
}

export { getSupabase };
