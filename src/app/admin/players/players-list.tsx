"use client";

import { useState, useEffect } from "react";
import { markPlayerPaid } from "@/api/players";
import { PlayerAvatar } from "@/components/shared/player-avatar";
import { PaymentHistory } from "@/components/shared/payment-history";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, CheckCircle, Loader2, Users, X, Calendar, User } from "lucide-react";
import type { Player, PlayerStatus, PaymentLog } from "@/types/database";

const STATUS_BADGE: Record<PlayerStatus, { className: string; label: string }> =
  {
    paid: {
      className: "bg-[#32cd32]/20 text-[#32cd32] border-[#32cd32]/30",
      label: "Платено",
    },
    warning: {
      className: "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30",
      label: "Напомняне",
    },
    overdue: {
      className: "bg-[#ff4d4d]/20 text-[#ff4d4d] border-[#ff4d4d]/30",
      label: "Просрочено",
    },
  };

const MIN_SEARCH_LENGTH = 2;

interface PlayersListDashboardProps {
  players: Player[];
  groups: number[];
}

export function PlayersListDashboard({
  players,
  groups,
}: PlayersListDashboardProps) {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<number | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [optimisticPlayers, setOptimisticPlayers] = useState(players);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerPayments, setPlayerPayments] = useState<PaymentLog[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  // Update optimistic players when props change
  useEffect(() => {
    setOptimisticPlayers(players);
  }, [players]);

  const hasActiveFilter =
    groupFilter !== null || search.length >= MIN_SEARCH_LENGTH;

  // Always filter players, but show all when no filter is active
  const filtered = optimisticPlayers.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      search.length < MIN_SEARCH_LENGTH ||
      p.full_name.toLowerCase().includes(q) ||
      (p.jersey_number && p.jersey_number.toLowerCase().includes(q));
    const matchesGroup =
      groupFilter === null || p.team_group === groupFilter;
    return matchesSearch && matchesGroup;
  });

  function handleGroupToggle(group: number) {
    setGroupFilter((prev) => (prev === group ? null : group));
  }

  async function handleMarkPaid(player: Player) {
    setPendingId(player.id);

    setOptimisticPlayers((prev) =>
      prev.map((p) =>
        p.id === player.id
          ? { ...p, status: "paid" as PlayerStatus, last_payment_date: new Date().toISOString() }
          : p
      )
    );

    const result = await markPlayerPaid(player.id, player.full_name);

    if (result.error) {
      setOptimisticPlayers((prev) =>
        prev.map((p) =>
          p.id === player.id ? { ...p, status: player.status, last_payment_date: player.last_payment_date } : p
        )
      );
      alert(`Грешка: ${result.error}`);
    } else {
      // Refresh payments if this player is selected
      if (selectedPlayer?.id === player.id) {
        fetchPlayerPayments(player.id);
      }
    }

    setPendingId(null);
  }

  async function fetchPlayerPayments(playerId: string) {
    setLoadingPayments(true);
    try {
      const player = optimisticPlayers.find(p => p.id === playerId);
      if (!player?.nfc_tag_id) {
        console.error("Player NFC tag ID not found");
        setPlayerPayments([]);
        setLoadingPayments(false);
        return;
      }

      const response = await fetch(`/api/players/tag/${player.nfc_tag_id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const result = await response.json();
      setPlayerPayments(result.data?.payments || []);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPlayerPayments([]);
    } finally {
      setLoadingPayments(false);
    }
  }

  function handlePlayerClick(player: Player) {
    setSelectedPlayer(player);
    fetchPlayerPayments(player.id);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Group buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setGroupFilter(null)}
          className={`rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 ${
            groupFilter === null
              ? "bg-gradient-to-r from-[#32cd32] to-[#2db82d] text-black shadow-[0_0_25px_rgba(50,205,50,0.4)] scale-105"
              : "border border-white/20 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] text-white/70 hover:border-[#32cd32]/40 hover:text-white hover:shadow-[0_0_15px_rgba(50,205,50,0.2)] hover:scale-105"
          }`}
        >
          Всички
        </button>
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => handleGroupToggle(g)}
            className={`rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 ${
              groupFilter === g
                ? "bg-gradient-to-r from-[#32cd32] to-[#2db82d] text-black shadow-[0_0_25px_rgba(50,205,50,0.4)] scale-105"
                : "border border-white/20 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] text-white/70 hover:border-[#32cd32]/40 hover:text-white hover:shadow-[0_0_15px_rgba(50,205,50,0.2)] hover:scale-105"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 z-10" />
        <Input
          placeholder="Търси по име или номер..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-white/20 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] pl-10 text-white placeholder:text-white/40 focus-visible:ring-[#32cd32]/50 focus-visible:border-[#32cd32]/50 focus-visible:shadow-[0_0_15px_rgba(50,205,50,0.2)] transition-all duration-300"
        />
      </div>

      {/* Player list or placeholder */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <Users className="h-12 w-12 text-[#32cd32]/30" />
          <p className="max-w-xs text-center text-sm text-white/40">
            {optimisticPlayers.length === 0
              ? "Няма заредени играчи. Проверете връзката със сървъра."
              : hasActiveFilter
              ? "Няма намерени играчи с избраните филтри."
              : "Моля, изберете набор или потърсете играч по име/номер."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((player) => {
            const badge = STATUS_BADGE[player.status];
            const isPending = pendingId === player.id;

            return (
              <Card 
                key={player.id} 
                className="group cursor-pointer border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#151515] transition-all duration-300 hover:border-[#32cd32]/40 hover:shadow-[0_0_25px_rgba(50,205,50,0.15)] hover:scale-[1.01] relative overflow-hidden"
                onClick={() => handlePlayerClick(player)}
              >
                {/* Subtle shimmer */}
                <div className="absolute inset-0 luxury-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="relative flex items-center gap-4 p-5 z-10">
                  {/* Avatar with premium border */}
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 group-hover:border-[#32cd32]/50 transition-all duration-300 shadow-lg">
                    <PlayerAvatar
                      src={player.avatar_url}
                      alt={player.full_name}
                      size={48}
                      className="h-full w-full rounded-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <span className="truncate font-bold text-white">
                      {player.full_name}
                    </span>
                    <div className="flex items-center gap-2">
                      {player.jersey_number && (
                        <Badge
                          variant="outline"
                          className="border-[#32cd32]/30 bg-[#32cd32]/10 text-[#32cd32]"
                        >
                          #{player.jersey_number}
                        </Badge>
                      )}
                      <Badge variant="outline" className={badge.className}>
                        {badge.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Action */}
                  {player.status === "paid" ? (
                    <CheckCircle className="h-6 w-6 shrink-0 text-[#32cd32]" />
                  ) : (
                    <Button
                      size="sm"
                      disabled={isPending}
                      className="shrink-0 gap-1.5 bg-[#32cd32] font-bold text-black hover:bg-[#2db82d] disabled:opacity-40"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkPaid(player);
                      }}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      Платено
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Player Stats Dialog */}
      <Dialog open={selectedPlayer !== null} onOpenChange={(open) => !open && setSelectedPlayer(null)}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] overflow-y-auto border-white/20 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] text-white luxury-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          showCloseButton={false}
        >
          {/* Backdrop blur effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#32cd32]/5 to-transparent pointer-events-none" />
          
          {selectedPlayer && (
            <>
              <DialogTitle className="relative flex items-center justify-between text-xl font-bold text-white mb-4 z-10">
                <span className="text-luxury-gradient">Статистика - {selectedPlayer.full_name}</span>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Затвори"
                >
                  <X className="h-5 w-5" />
                </button>
              </DialogTitle>
              
              <div className="relative space-y-6 z-10">
                {/* Player Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-white/20 bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-5 shadow-lg luxury-glow">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-white/40 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-white/40">Име</p>
                      <p className="font-semibold text-white truncate">{selectedPlayer.full_name}</p>
                    </div>
                  </div>
                  {selectedPlayer.jersey_number && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">Номер:</span>
                      <Badge variant="outline" className="border-[#32cd32]/30 bg-[#32cd32]/10 text-[#32cd32]">
                        {selectedPlayer.jersey_number}
                      </Badge>
                    </div>
                  )}
                  {selectedPlayer.team_group && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">Набор:</span>
                      <span className="font-semibold text-white">{selectedPlayer.team_group}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Статус:</span>
                    <Badge variant="outline" className={STATUS_BADGE[selectedPlayer.status].className}>
                      {STATUS_BADGE[selectedPlayer.status].label}
                    </Badge>
                  </div>
                  {selectedPlayer.last_payment_date && (
                    <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                      <Calendar className="h-4 w-4 text-white/40 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">Последно плащане</p>
                        <p className="font-semibold text-white">
                          {new Date(selectedPlayer.last_payment_date).toLocaleDateString("bg-BG", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment History */}
                {loadingPayments ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-[#32cd32]" />
                  </div>
                ) : (
                  <PaymentHistory
                    payments={playerPayments}
                    playerName={selectedPlayer.full_name}
                    clubName={(selectedPlayer as any).clubs?.name || "Клуб"}
                  />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
