"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SmartRedirect } from "@/components/shared/smart-redirect";
import { RealtimeStatusCard } from "@/components/shared/realtime-status-card";
import { EnableNotificationsButton } from "@/components/shared/enable-notifications-button";
import { PaymentHistory } from "@/components/shared/payment-history";
import type { PlayerWithClub, PaymentLog } from "@/types/database";

export function ProfilePage() {
  const { tagId } = useParams<{ tagId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerWithClub | null>(null);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tagId) {
      setError("Invalid tag ID");
      setLoading(false);
      return;
    }

    async function fetchPlayer() {
      try {
        const response = await fetch(`/api/players/tag/${tagId}`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate("/404");
            return;
          }
          throw new Error("Failed to fetch player");
        }
        const result = await response.json();
        setPlayer(result.data);
        setPayments(result.data.payments || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load player");
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

  if (error || !player) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0a0a0a]">
        <p className="text-white/50">{error || "Player not found"}</p>
      </div>
    );
  }

  return (
    <SmartRedirect tagId={tagId!}>
      <main className="flex min-h-dvh items-center justify-center bg-[#0a0a0a] p-4">
        <div className="w-full max-w-[420px]">
          <RealtimeStatusCard
            playerId={player.id}
            playerName={player.full_name}
            clubName={player.clubs.name}
            initialStatus={player.status}
            jerseyNumber={player.jersey_number}
            birthDate={player.birth_date}
            teamGroup={player.team_group}
            lastPaymentDate={player.last_payment_date}
            avatarUrl={player.avatar_url}
            emblemUrl={player.clubs.emblem_url}
          />
          <div className="mt-3">
            <EnableNotificationsButton playerId={player.id} />
          </div>
          <p className="mt-2 text-center text-[10px] text-white/25">
            Получавайте push известия дори когато браузърът е затворен.
          </p>
          <PaymentHistory
            payments={payments}
            playerName={player.full_name}
            clubName={player.clubs.name}
          />
        </div>
      </main>
    </SmartRedirect>
  );
}
