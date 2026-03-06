"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminGuard } from "@/components/shared/admin-guard";
import { PlayerAdminCard } from "@/app/admin/[tagId]/player-admin-card";
import type { Player } from "@/types/database";

export function AdminPlayerPage() {
  const { tagId } = useParams<{ tagId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tagId) {
      navigate("/admin/players");
      return;
    }

    async function fetchPlayer() {
      try {
        const response = await fetch(`/api/players/tag/${tagId}`);
        if (!response.ok) {
          navigate("/admin/players");
          return;
        }
        const result = await response.json();
        setPlayer(result.data);
      } catch (error) {
        console.error("Failed to fetch player:", error);
        navigate("/admin/players");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [tagId, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0a0a0a]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#32cd32] border-t-transparent" />
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return (
    <AdminGuard>
      <main className="flex min-h-dvh items-center justify-center bg-[#0a0a0a] p-4">
        <PlayerAdminCard player={player} />
      </main>
    </AdminGuard>
  );
}
