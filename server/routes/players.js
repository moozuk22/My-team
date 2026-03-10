import express from "express";
import { createClient } from "../../src/lib/supabase/server.js";
import { sendPushToPlayer } from "../../src/actions/notifications.js";
import { BG_MONTHS } from "../../src/lib/constants.js";

const router = express.Router();

// Get all clubs
router.get("/clubs", async (req, res) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("clubs")
      .select("id, name, slug, emblem_url")
      .order("name");

    if (error) {
      console.error("[API /players/clubs] Supabase error:", error.message, error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ data: data || [] });
  } catch (error) {
    console.error("[API /players/clubs] Error:", error.message, error);
    res.status(500).json({ error: error.message });
  }
});

// Get all players
router.get("/", async (req, res) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("players")
      .select(
        "id, full_name, nfc_tag_id, status, jersey_number, birth_date, team_group, last_payment_date, avatar_url"
      )
      .order("full_name");

    if (error) {
      console.error("[API /players] Supabase error:", error.message, error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ data: data || [] });
  } catch (error) {
    console.error("[API /players] Error:", error.message, error);
    res.status(500).json({ error: error.message });
  }
});

// Get player by NFC tag ID
router.get("/tag/:tagId", async (req, res) => {
  try {
    const { tagId } = req.params;
    const supabase = await createClient();

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

    // Get payment logs
    const { data: payments } = await supabase
      .from("payment_logs")
      .select("id, player_id, paid_for, paid_at, recorded_by")
      .eq("player_id", player.id)
      .order("paid_at", { ascending: false });

    res.json({
      data: {
        ...player,
        payments: payments || [],
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team groups
router.get("/groups", async (req, res) => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("players")
      .select("team_group")
      .not("team_group", "is", null)
      .order("team_group", { ascending: false });

    const groups = [
      ...new Set(
        (data || [])
          .map((r) => r.team_group)
          .filter((g) => g !== null)
      ),
    ];

    res.json({ data: groups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update player status
router.patch("/:playerId/status", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { status } = req.body;
    const supabase = await createClient();

    const updateData = { status };
    if (status === "paid") {
      updateData.last_payment_date = new Date().toISOString();
    }

    const { error } = await supabase
      .from("players")
      .update(updateData)
      .eq("id", playerId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark player as paid
router.post("/:playerId/paid", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { playerName } = req.body;
    const supabase = await createClient();

    const now = new Date();

    const { error: updateError } = await supabase
      .from("players")
      .update({
        status: "paid",
        last_payment_date: now.toISOString(),
      })
      .eq("id", playerId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Insert payment log
    const paidFor = `${BG_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
    await supabase.from("payment_logs").insert({
      player_id: playerId,
      paid_for: paidFor,
    });

    // Get player for push notification
    const { data: player } = await supabase
      .from("players")
      .select("nfc_tag_id")
      .eq("id", playerId)
      .single();

    const profileUrl = player?.nfc_tag_id
      ? `${process.env.VITE_APP_URL || "http://localhost:3000"}/p/${player.nfc_tag_id}`
      : undefined;

    sendPushToPlayer(playerId, {
      title: "Smart Club",
      body: `Плащането е успешно! Месечната такса за ${playerName} е отразена.`,
      url: profileUrl,
    }).catch(() => {});

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment logs for a period
router.get("/payments", async (req, res) => {
  try {
    const { period, year } = req.query;
    const supabase = await createClient();

    let query = supabase.from("payment_logs").select("player_id, paid_for, paid_at");

    if (period) {
      query = query.eq("paid_for", period);
    } else if (year) {
      query = query.like("paid_for", `% ${year}`);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ data: data || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
