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
    const { data } = await supabase
      .from("players")
      .select("team_group")
      .not("team_group", "is", null)
      .order("team_group", { ascending: false });
    const groups = [
      ...new Set(
        (data || []).map((r) => r.team_group).filter((g) => g != null)
      ),
    ];
    return res.status(200).json({ data: groups });
  } catch (err) {
    const msg = err?.message || "Server error";
    console.error("[Vercel API /api/players/groups]", msg);
    return res.status(500).json({ error: msg });
  }
}
