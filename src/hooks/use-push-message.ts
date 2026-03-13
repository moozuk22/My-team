import { useEffect, useState } from "react";

export interface PushMessage {
  title: string;
  body: string;
  url?: string;
}

interface UsePushMessageResult {
  message: PushMessage | null;
  clear: () => void;
}

function normalizePath(p: string): string {
  return p.replace(/\/+$/, "") || "/";
}

/**
 * Слуша за събития от service worker-а с тип "PUSH_NOTIFICATION"
 * и връща последното съобщение. Ако подадеш expectedPath,
 * филтрира само нотификации за дадения URL (напр. `/p/vihar-2019-1`).
 * Ако url липсва или е "/", показва съобщението само когато сме на expectedPath.
 */
export function usePushMessage(expectedPath?: string): UsePushMessageResult {
  const [message, setMessage] = useState<PushMessage | null>(null);

  useEffect(() => {
    const handle = (event: MessageEvent) => {
      const msg = event?.data;
      if (!msg || msg.type !== "PUSH_NOTIFICATION" || !msg.body) return;

      const url = (msg.url as string | undefined)?.trim() || "";
      const expectedNorm = expectedPath ? normalizePath(expectedPath) : "";

      if (expectedNorm) {
        if (url) {
          try {
            const path = normalizePath(new URL(url, window.location.origin).pathname);
            if (path !== expectedNorm) return;
          } catch {
            if (normalizePath(window.location.pathname) !== expectedNorm) return;
          }
        } else {
          if (normalizePath(window.location.pathname) !== expectedNorm) return;
        }
      }

      setMessage({
        title: msg.title || "Smart Club",
        body: msg.body,
        url: url || undefined,
      });
    };

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", handle);
    }
    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel("smartclub-push");
      ch.addEventListener("message", handle);
    } catch (_) {}
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handle);
      if (ch) {
        ch.removeEventListener("message", handle);
        ch.close();
      }
    };
  }, [expectedPath]);

  return {
    message,
    clear: () => setMessage(null),
  };
}

