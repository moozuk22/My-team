/**
 * Client-side API functions for player operations
 * These replace Next.js server actions
 */

import type { PlayerStatus } from "@/types/database";

export async function markPlayerPaid(
  playerId: string,
  playerName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/players/${playerId}/paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerName }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Failed to mark as paid" };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updatePlayerStatus(
  playerId: string,
  status: PlayerStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/players/${playerId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Failed to update status" };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deletePlayer(
  playerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/players/${playerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Failed to delete player" };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
