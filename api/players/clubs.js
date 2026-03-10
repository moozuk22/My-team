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
    const { data, error } = await supabase
      .from("clubs")
      .select("id, name, slug, emblem_url")
      .order("name");
    if (error) {
      console.error("[Vercel API /api/players/clubs]", error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ data: data || [] });
  } catch (err) {
    console.error("[Vercel API /api/players/clubs]", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
