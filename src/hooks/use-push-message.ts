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

/**
 * Слуша за събития от service worker-а с тип "PUSH_NOTIFICATION"
 * и връща последното съобщение. Ако подадеш expectedPath,
 * филтрира само нотификации за дадения URL (например `/p/vihar-2019-1`).
 */
export function usePushMessage(expectedPath?: string): UsePushMessageResult {
  const [message, setMessage] = useState<PushMessage | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.serviceWorker) return;

    const handler = (event: MessageEvent) => {
      const msg = event.data;
      if (!msg || msg.type !== "PUSH_NOTIFICATION" || !msg.body) return;

      const url = msg.url as string | undefined;
      if (expectedPath && url) {
        const path = new URL(url, window.location.origin).pathname;
        if (path !== expectedPath) return;
      }

      setMessage({
        title: msg.title || "Smart Club",
        body: msg.body,
        url,
      });
    };

    navigator.serviceWorker.addEventListener("message", handler);
    return () => navigator.serviceWorker.removeEventListener("message", handler);
  }, [expectedPath]);

  return {
    message,
    clear: () => setMessage(null),
  };
}

