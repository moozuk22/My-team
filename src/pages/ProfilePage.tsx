"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SmartRedirect } from "@/components/shared/smart-redirect";
import { RealtimeStatusCard } from "@/components/shared/realtime-status-card";
import { EnableNotificationsButton } from "@/components/shared/enable-notifications-button";
import { PaymentHistory } from "@/components/shared/payment-history";
import { usePushMessage } from "@/hooks/use-push-message";
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
  const [webPopupOpen, setWebPopupOpen] = useState(false);
  const expectedPath = tagId ? `/p/${tagId}` : undefined;
  const { message: pushToast, clear: clearPushToast } = usePushMessage(expectedPath);

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
        // Специален уеб попъп за линка /p/vihar-2019-2
        if (tagId === "vihar-2019-2") {
          setWebPopupOpen(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load player");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [tagId, navigate]);

  // Авто-скриване на in-card popup след няколко секунди
  useEffect(() => {
    if (!pushToast) return;
    const t = setTimeout(() => clearPushToast(), 8000);
    return () => clearTimeout(t);
  }, [pushToast, clearPushToast]);

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
        {webPopupOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-5 text-sm text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                SMART CLUB
              </p>
              <p className="mt-2 text-base font-semibold">
                Уеб попъп за {player.full_name}
              </p>
              <p className="mt-2 text-xs text-white/70">
                Това е тестов уеб попъп за профила на клиента. Тук може да
                показвате важни съобщения, инструкции или потвърждения.
              </p>
              <button
                type="button"
                onClick={() => setWebPopupOpen(false)}
                className="mt-4 w-full rounded-lg bg-[#32cd32]/80 px-3 py-2 text-sm font-semibold text-black hover:bg-[#32cd32]"
              >
                Разбрах
              </button>
            </div>
          </div>
        )}
        <div className="w-full max-w-[420px] space-y-3">
          {statusMsg && (
            <div className={`rounded-xl border p-4 text-sm ${statusMsg.className}`}>
              <p className="font-semibold">Smart Club</p>
              <p className="mt-1 opacity-95">{statusMsg.body}</p>
            </div>
          )}
          <div className="relative">
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
            {pushToast && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="mx-4 rounded-xl border border-[#32cd32]/40 bg-[#0b1c0b]/95 p-4 text-sm text-[#d9ffd9] shadow-lg shadow-black/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8bff8b]/80">
                    SMART CLUB ИЗВЕСТИЕ
                  </p>
                  <p className="mt-1 font-semibold">{pushToast.title}</p>
                  <p className="mt-1.5 leading-snug">{pushToast.body}</p>
                  <button
                    type="button"
                    onClick={() => setPushToast(null)}
                    className="mt-3 text-xs font-medium text-[#8bff8b] underline underline-offset-2 hover:text-[#b7ffb7]"
                  >
                    Затвори
                  </button>
                </div>
              </div>
            )}
          </div>
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
