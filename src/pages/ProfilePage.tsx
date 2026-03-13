"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SmartRedirect } from "@/components/shared/smart-redirect";
import { RealtimeStatusCard } from "@/components/shared/realtime-status-card";
import { EnableNotificationsButton } from "@/components/shared/enable-notifications-button";
import { PaymentHistory } from "@/components/shared/payment-history";
import type { PlayerWithClub, PaymentLog } from "@/types/database";

/** In-page message for reminder/overdue (shown on profile when status is warning/overdue). */
const STATUS_MESSAGES: Record<string, { body: string; className: string }> = {
  warning: {
    body: "Напомняне: Моля, платете месечната такса до края на месеца.",
    className: "border-[#f5b000]/40 bg-[#f5b000]/10 text-[#f5b000]",
  },
  overdue: {
    body: "Просрочено плащане! Дължите две такси.",
    className: "border-[#ff4d4d]/40 bg-[#ff4d4d]/10 text-[#ff4d4d]",
  },
};

export function ProfilePage() {
  const { tagId } = useParams<{ tagId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerWithClub | null>(null);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pushToast, setPushToast] = useState<{ title: string; body: string } | null>(null);

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

  // Listen for push notifications while this tab is open (SW posts message)
  useEffect(() => {
    if (!tagId || typeof navigator === "undefined" || !navigator.serviceWorker) return;
    const expectedPath = `/p/${tagId}`;
    let toastTimeout: ReturnType<typeof setTimeout> | null = null;
    const handler = (event: MessageEvent) => {
      const msg = event.data;
      if (msg?.type === "PUSH_NOTIFICATION" && msg.body) {
        const urlPath = msg.url ? new URL(msg.url, window.location.origin).pathname : "";
        if (urlPath === expectedPath) {
          if (toastTimeout) clearTimeout(toastTimeout);
          setPushToast({ title: msg.title || "Smart Club", body: msg.body });
          toastTimeout = setTimeout(() => setPushToast(null), 8000);
        }
      }
    };
    navigator.serviceWorker.addEventListener("message", handler);
    return () => {
      navigator.serviceWorker.removeEventListener("message", handler);
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [tagId]);

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

  const statusMsg = player.status !== "paid" ? STATUS_MESSAGES[player.status] : null;

  return (
    <SmartRedirect tagId={tagId!}>
      <main className="flex min-h-dvh items-center justify-center bg-[#0a0a0a] p-4">
        <div className="w-full max-w-[420px] space-y-3">
          {pushToast && (
            <div
              className="rounded-xl border p-4 text-sm animate-in fade-in slide-in-from-top-2 duration-300"
              style={{ borderColor: "rgba(50,205,50,0.4)", backgroundColor: "rgba(50,205,50,0.08)", color: "#32cd32" }}
            >
              <p className="font-semibold">{pushToast.title}</p>
              <p className="mt-1 opacity-90">{pushToast.body}</p>
              <button
                type="button"
                onClick={() => setPushToast(null)}
                className="mt-2 text-xs underline opacity-70 hover:opacity-100"
              >
                Затвори
              </button>
            </div>
          )}
          {statusMsg && (
            <div className={`rounded-xl border p-4 text-sm ${statusMsg.className}`}>
              <p className="font-semibold">Smart Club</p>
              <p className="mt-1 opacity-95">{statusMsg.body}</p>
            </div>
          )}
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
