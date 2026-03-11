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
    throw new Error("Missing Supabase URL or anon key in Vercel env");
  }
  return createClient(url, key);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const supabase = getSupabase();
    const { period, year } = req.query;

    let query = supabase
      .from("payment_logs")
      .select("player_id, paid_for, paid_at");

    if (period && typeof period === "string") {
      query = query.eq("paid_for", period);
    } else if (year && typeof year === "string") {
      query = query.like("paid_for", `% ${year}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Vercel API /api/players/payments]", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data: data || [] });
  } catch (err) {
    const msg = err?.message || "Server error";
    console.error("[Vercel API /api/players/payments]", msg);
    return res.status(500).json({ error: msg });
  }
}
