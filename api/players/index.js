import { getSupabase } from "../supabase.js";

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
    const { data, error } = await supabase
      .from("players")
      .select(
        "id, club_id, full_name, nfc_tag_id, status, jersey_number, birth_date, team_group, last_payment_date, avatar_url"
      )
      .order("full_name");
    if (error) {
      console.error("[Vercel API /api/players]", error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ data: data || [] });
  } catch (err) {
    const msg = err?.message || "Server error";
    console.error("[Vercel API /api/players]", msg);
    return res.status(500).json({ error: msg });
  }
}
