"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ClubLogo } from "@/components/shared/club-logo";
import { ChevronRight } from "lucide-react";
import type { Club } from "@/types/database";

interface TeamSelectionProps {
  clubs: Club[];
  onSelectClub: (clubId: string) => void;
  apiError?: string | null;
}

export function TeamSelection({ clubs, onSelectClub, apiError }: TeamSelectionProps) {
  const isTablesMissing = apiError?.includes("schema cache") ?? false;
  const isNetworkError =
    (apiError?.includes("fetch failed") ||
      apiError?.includes("EAI_AGAIN") ||
      apiError?.includes("getaddrinfo")) ?? false;

  if (clubs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
        {isNetworkError ? (
          <>
            <p className="text-center text-sm font-medium text-amber-400/90 max-w-md">
              Supabase не е достъпен (DNS/мрежа). Проверете интернет връзката или опитайте отново след малко.
            </p>
            <p className="text-center text-xs text-white/50 max-w-md mt-2">
              За локални данни без Supabase: добавете <code className="bg-white/10 px-1 rounded">USE_LOCAL_DB=true</code> в <code className="bg-white/10 px-1 rounded">.env.local</code> и рестартирайте сървъра.
            </p>
          </>
        ) : isTablesMissing ? (
          <>
            <p className="text-center text-sm font-medium text-amber-400/90 max-w-md">
              Таблиците в Supabase липсват. Създайте ги от Supabase Dashboard:
            </p>
            <ol className="text-center text-xs text-white/50 list-decimal list-inside space-y-1 max-w-md">
              <li>SQL Editor → New query</li>
              <li>Пуснете <code className="bg-white/10 px-1 rounded">supabase/apply_full_schema.sql</code></li>
              <li>След това <code className="bg-white/10 px-1 rounded">supabase/seed_sample_data.sql</code></li>
            </ol>
            <p className="text-center text-xs text-white/40 mt-2">
              След това презаредете страницата.
            </p>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-white/40">
              Няма налични отбори. Проверете връзката със сървъра или изчакайте зареждането на данните.
            </p>
            <p className="text-center text-xs text-white/30">
              Ако проблемът продължава, проверете конзолата за грешки.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white mb-2">
        Изберете отбор
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clubs.map((club) => (
          <Card
            key={club.id}
            className="group cursor-pointer border-white/10 bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] transition-all duration-300 hover:border-[#32cd32]/50 hover:bg-gradient-to-br hover:from-[#1f1f1f] hover:via-[#252525] hover:to-[#1f1f1f] hover:shadow-[0_0_30px_rgba(50,205,50,0.2)] hover:scale-[1.02] relative overflow-hidden"
            onClick={() => onSelectClub(club.id)}
          >
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 luxury-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="relative flex items-center gap-4 p-6 z-10">
              {/* Club Emblem/Flag with premium glow */}
              <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg group-hover:shadow-[0_0_20px_rgba(50,205,50,0.3)] transition-all duration-300">
                {club.emblem_url ? (
                  <img
                    src={club.emblem_url}
                    alt={club.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <ClubLogo className="h-12 w-12 text-white/40 group-hover:text-[#32cd32]/60 transition-colors duration-300" />
                )}
              </div>

              {/* Club Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-lg truncate group-hover:text-luxury-gradient transition-all duration-300">
                  {club.name}
                </h3>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  {club.slug}
                </p>
              </div>

              {/* Arrow with animation */}
              <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-[#32cd32] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
