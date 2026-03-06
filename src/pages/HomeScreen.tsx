"use client";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield } from "lucide-react";

const ACCESS_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY || "";

export function HomeScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    // 1. Check for secret activation key
    if (ACCESS_KEY && searchParams.get("access") === ACCESS_KEY) {
      localStorage.setItem("isAdmin", "true");
      window.history.replaceState(null, "", "/");
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }

    // 2. Redirect admins straight to player list
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/admin/players", { replace: true });
      return;
    }

    // 3. Non-admin: resolve the last player ID from multiple sources
    //    Priority: localStorage → URL ?tag= param → cookie (iOS bridge)
    let resolvedId = localStorage.getItem("lastPlayerId");

    if (!resolvedId) {
      const tagFromUrl = searchParams.get("tag");
      if (tagFromUrl) {
        resolvedId = tagFromUrl;
        window.history.replaceState(null, "", "/");
      }
    }

    if (!resolvedId) {
      const match = document.cookie.match(/lastPlayerId=([^;]+)/);
      if (match) {
        resolvedId = match[1];
      }
    }

    if (resolvedId) {
      // Lock into this context's localStorage so future opens are instant
      localStorage.setItem("lastPlayerId", resolvedId);
      navigate(`/p/${resolvedId}`, { replace: true });
      return;
    }

    // 4. No saved profile — show the welcome screen
    setReady(true);
  }, [searchParams, navigate]);

  // Show nothing while checking role (prevents flash)
  if (!ready) {
    return <div className="min-h-dvh bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#0d0d0d]" />;
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#0d0d0d] p-8 text-center relative">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="relative z-10">
        <div className="mb-6 relative">
          <Shield className="h-20 w-20 text-[#32cd32] mx-auto drop-shadow-[0_0_20px_rgba(50,205,50,0.3)]" />
          <div className="absolute inset-0 h-20 w-20 mx-auto animate-ping rounded-full border-2 border-[#32cd32]/30" />
        </div>

        <h1 className="mb-3 text-4xl font-black text-luxury-gradient tracking-tight">
          Добре дошли в Smart Club
        </h1>
        <p className="mb-6 max-w-sm text-white/50">
          Система за управление на членски внос с NFC профили в реално време.
        </p>
        <p className="max-w-xs text-sm text-white/30">
          Сканирайте вашата NFC карта, за да видите клубния си профил.
        </p>
      </div>

      <footer className="absolute bottom-6 text-[11px] text-white/20">
        Smart Club &copy; {new Date().getFullYear()} &middot; Powered by Mozyk
      </footer>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[fadeSlideUp_0.3s_ease-out] rounded-xl border border-[#32cd32]/50 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] px-6 py-3 shadow-[0_0_30px_rgba(50,205,50,0.3)] backdrop-blur-sm">
          <p className="whitespace-nowrap text-sm font-semibold text-luxury-gradient">
            Администраторският достъп е активиран успешно!
          </p>
        </div>
      )}
    </main>
  );
}
