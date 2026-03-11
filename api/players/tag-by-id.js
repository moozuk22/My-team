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

  const tagId = req.query?.tagId;
  if (!tagId) {
    return res.status(400).json({ error: "Missing tag ID" });
  }

  try {
    const supabase = getSupabase();

    const { data: player, error } = await supabase
      .from("players")
      .select(
        "id, full_name, status, jersey_number, birth_date, team_group, last_payment_date, avatar_url, clubs(name, emblem_url)"
      )
      .eq("nfc_tag_id", tagId)
      .single();

    if (error || !player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const { data: payments } = await supabase
      .from("payment_logs")
      .select("id, player_id, paid_for, paid_at, recorded_by")
      .eq("player_id", player.id)
      .order("paid_at", { ascending: false });

    return res.status(200).json({
      data: {
        ...player,
        payments: payments || [],
      },
    });
  } catch (err) {
    const msg = err?.message || "Server error";
    console.error("[Vercel API /api/players/tag-by-id]", msg);
    return res.status(500).json({ error: msg });
  }
}
