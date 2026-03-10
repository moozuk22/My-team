import { getSupabase } from "../../supabase.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
    console.error("[Vercel API /api/players/groups]", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
