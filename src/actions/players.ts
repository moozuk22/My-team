// Server actions converted to API routes - this file is kept for reference
// Functions are now called via Express API endpoints
import { createClient } from "@/lib/supabase/server";
import { sendPushToPlayer } from "@/actions/notifications";
import { BG_MONTHS } from "@/lib/constants";
import type { PlayerStatus } from "@/types/database";

export async function updatePlayerStatus(
  playerId: string,
  status: PlayerStatus
) {
  const supabase = await createClient();

  const updateData: { status: PlayerStatus; last_payment_date?: string } = { status };
  if (status === "paid") {
    updateData.last_payment_date = new Date().toISOString();
  }

  const { error } = await supabase
    .from("players")
    .update(updateData)
    .eq("id", playerId);

  if (error) {
    return { error: error.message };
  }

  if (status === "paid") {
    const { data: player } = await supabase
      .from("players")
      .select("nfc_tag_id")
      .eq("id", playerId)
      .single();

    const profileUrl = player?.nfc_tag_id
      ? `${process.env.VITE_APP_URL || process.env.APP_URL || "http://localhost:3000"}/p/${player.nfc_tag_id}`
      : undefined;

    sendPushToPlayer(playerId, {
      title: "Smart Club",
      body: "Плащането е успешно! Месечната такса е отчетенa.",
      url: profileUrl,
    }).catch(() => {});
  }

  // Cache revalidation not needed in Vite
  return { success: true };
}

export async function createPlayer(data: {
  id: string; // Blind Insert: client generates UUID
  club_id: string;
  full_name: string;
  nfc_tag_id: string;
  status: PlayerStatus;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("players").insert(data);

  if (error) {
    return { error: error.message };
  }

  // Cache revalidation not needed in Vite
  return { success: true };
}

export async function markPlayerPaid(playerId: string, playerName: string) {
  const supabase = await createClient();

  const now = new Date();

  const { error } = await supabase
    .from("players")
    .update({
      status: "paid" as PlayerStatus,
      last_payment_date: now.toISOString(),
    })
    .eq("id", playerId);

  if (error) {
    return { error: error.message };
  }

  // Insert payment log for the receipt history
  const paidFor = `${BG_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  await supabase.from("payment_logs").insert({
    player_id: playerId,
    paid_for: paidFor,
  });

  const { data: player } = await supabase
    .from("players")
    .select("nfc_tag_id")
    .eq("id", playerId)
    .single();

  const profileUrl = player?.nfc_tag_id
    ? `${process.env.VITE_APP_URL || process.env.APP_URL || "http://localhost:3000"}/p/${player.nfc_tag_id}`
    : undefined;

  sendPushToPlayer(playerId, {
    title: "Smart Club",
    body: `Плащането е успешно! Месечната такса за ${playerName} е отразена.`,
    url: profileUrl,
  }).catch(() => {});

  // Cache revalidation not needed in Vite
  return { success: true };
}

export async function deletePlayer(playerId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", playerId);

  if (error) {
    return { error: error.message };
  }

  // Cache revalidation not needed in Vite
  return { success: true };
}
