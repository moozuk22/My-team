"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Loader2 } from "lucide-react";

type ActionType = "reminder_25" | "overdue_1st";

export function DemoActions() {
  const [pending, setPending] = useState<ActionType | null>(null);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);

  async function handleAction(type: ActionType) {
    setPending(type);
    setToast(null);

    try {
      const res = await fetch("/api/debug/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, isDemo: true }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setToast({ message: data.error || "Грешка при изпращане", color: "text-[#ff4d4d]" });
      } else {
        const summary = data.actions?.join("; ") || "Готово";
        setToast({ message: summary, color: "text-[#32cd32]" });
      }
    } catch {
      setToast({ message: "Неуспешна връзка със сървъра", color: "text-[#ff4d4d]" });
    }

    setPending(null);
    setTimeout(() => setToast(null), 5000);
  }

  return (
    <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-white/35">
        DEMO ACTIONS
      </p>
      <div className="flex flex-col gap-2">
        <button
          disabled={pending !== null}
          onClick={() => handleAction("reminder_25")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#f5b000]/30 bg-[#f5b000]/15 px-4 py-2.5 text-sm font-semibold text-[#f5b000] transition-colors hover:bg-[#f5b000]/25 disabled:opacity-40"
        >
          {pending === "reminder_25" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          Симулирай Напомняне (25-то число)
        </button>
        <button
          disabled={pending !== null}
          onClick={() => handleAction("overdue_1st")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff4d4d]/30 bg-[#ff4d4d]/15 px-4 py-2.5 text-sm font-semibold text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d]/25 disabled:opacity-40"
        >
          {pending === "overdue_1st" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          Симулирай Просрочие (1-во число)
        </button>
      </div>
      {toast && (
        <p className={`mt-3 text-center text-sm font-medium ${toast.color}`}>
          {toast.message}
        </p>
      )}
    </div>
  );
}
