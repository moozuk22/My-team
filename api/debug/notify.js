export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { type, isDemo } = body || {};

    if (!["reminder_25", "reminder_29", "overdue_1st"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const supabaseUrl =
      process.env.VITE_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Needs service role to invoke Edge Function in production
    const serviceRoleKey =
      process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      return res.status(500).json({ error: "Missing SUPABASE_URL env var" });
    }
    if (!serviceRoleKey) {
      return res.status(500).json({ error: "Missing SERVICE_ROLE_KEY env var" });
    }

    const fnUrl = `${supabaseUrl}/functions/v1/cron-billing`;
    const forward = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ type, isDemo: isDemo === true }),
    });

    const text = await forward.text();
    let data = {};
    if (text.trim()) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }
    }

    return res.status(forward.status).json(data);
  } catch (err) {
    const msg = err?.message || "Server error";
    console.error("[Vercel API /api/debug/notify]", msg);
    return res.status(500).json({ error: msg });
  }
}

