"use client";

import { useEffect, useState } from "react";
import { PlayersListDashboard } from "@/app/admin/players/players-list";
import { TeamSelection } from "@/app/admin/players/team-selection";
import { ReportsCenter } from "@/app/admin/players/reports-center";
import { DemoActions } from "@/app/admin/players/demo-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Player, Club } from "@/types/database";

export function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [groups, setGroups] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersRes, clubsRes, groupsRes] = await Promise.all([
          fetch("/api/players"),
          fetch("/api/players/clubs"),
          fetch("/api/players/groups"),
        ]);

        if (!playersRes.ok) {
          console.error("Failed to fetch players:", playersRes.status);
        }
        if (!clubsRes.ok) {
          console.error("Failed to fetch clubs:", clubsRes.status, clubsRes.statusText);
        }
        if (!groupsRes.ok) {
          console.error("Failed to fetch groups:", groupsRes.status);
        }

        const playersData = await playersRes.json();
        const clubsData = await clubsRes.json();
        const groupsData = await groupsRes.json();

        console.log("Fetched data:", {
          players: playersData.data?.length || 0,
          clubs: clubsData.data?.length || 0,
          groups: groupsData.data?.length || 0,
        });

        setPlayers(playersData.data || []);
        setClubs(clubsData.data || []);
        setGroups(groupsData.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#0d0d0d]">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#32cd32]/20 border-t-[#32cd32] shadow-[0_0_20px_rgba(50,205,50,0.3)]" />
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-2 border-[#32cd32]/30" />
        </div>
      </div>
    );
  }

  const selectedClub = clubs.find(c => c.id === selectedClubId);
  const filteredPlayers = selectedClubId 
    ? players.filter(p => p.club_id === selectedClubId)
    : [];

  return (
    <main className="min-h-dvh bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#0d0d0d] px-4 py-10 relative">
      {/* Subtle background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Enhanced title */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black text-luxury-gradient tracking-tight">
            Списък играчи
          </h1>
          <p className="text-sm text-white/60 font-medium">
            Търсене, филтриране и ръчно отбелязване на плащания
          </p>
          <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-[#32cd32] to-transparent rounded-full" />
        </div>

        {!selectedClubId ? (
          // Step 1: Show Team Selection
          <>
            <ReportsCenter players={players} groups={groups} />
            <DemoActions />
            <TeamSelection 
              clubs={clubs} 
              onSelectClub={setSelectedClubId} 
            />
          </>
        ) : (
          // Step 2: Show Players for Selected Team
          <>
            <div className="mb-6 flex items-center gap-4">
              <button
                onClick={() => setSelectedClubId(null)}
                className="group flex items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#32cd32]/50 hover:bg-gradient-to-r hover:from-[#1f1f1f] hover:to-[#252525] hover:shadow-[0_0_20px_rgba(50,205,50,0.2)] hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Назад към отбори
              </button>
              {selectedClub && (
                <div className="flex items-center gap-3">
                  {selectedClub.emblem_url ? (
                    <img
                      src={selectedClub.emblem_url}
                      alt={selectedClub.name}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center">
                      <span className="text-xs text-white/40">🏆</span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-white">
                    {selectedClub.name}
                  </h2>
                </div>
              )}
            </div>
            <PlayersListDashboard 
              players={filteredPlayers} 
              groups={groups} 
            />
          </>
        )}
      </div>
    </main>
  );
}
