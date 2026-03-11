import { useState } from "react";

const EDGE_FUNCTION_URL =
  "https://xxjalhbspqohkhofsoga.supabase.co/functions/v1/hello";

export function TestFunctionsPage() {
  const [name, setName] = useState("Kristiqn");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function callFunction() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const token =
        import.meta.env.VITE_SUPABASE_ANON_KEY ||
        import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!token) {
        setError("Missing Supabase anon key in environment.");
        setLoading(false);
        return;
      }

      const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: token,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          data?.message ||
            data?.error ||
            `Request failed with status ${res.status}`
        );
        return;
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
        <h1 className="text-xl font-semibold">Supabase Edge Function Test</h1>
        <p className="text-sm text-white/60">
          This calls the <code className="bg-white/10 px-1 rounded">hello</code>{" "}
          edge function with your Supabase anon key.
        </p>

        <label className="block text-sm space-y-1">
          <span className="text-white/70">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#32cd32]"
          />
        </label>

        <button
          onClick={callFunction}
          disabled={loading}
          className="w-full rounded-md bg-[#32cd32] py-2 text-sm font-medium text-black hover:bg-[#28b428] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Calling..." : "Call edge function"}
        </button>

        {result && (
          <div className="rounded-md bg-black/40 border border-emerald-500/40 p-3 text-xs font-mono whitespace-pre-wrap">
            {result}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-black/40 border border-red-500/60 p-3 text-xs text-red-300">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}

