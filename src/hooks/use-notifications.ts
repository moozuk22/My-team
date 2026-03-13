import { useCallback, useEffect, useRef, useState } from "react";
import { subscribeToPush, isIOS, isStandalone } from "@/lib/push";

export type NotificationState =
  | "idle"
  | "loading"
  | "subscribed"
  | "denied"
  | "ios-install"
  | "unsupported";

interface UseNotificationsResult {
  mounted: boolean;
  state: NotificationState;
  errorMsg: string | null;
  subscribe: () => Promise<void>;
}

export function useNotifications(playerId: string): UseNotificationsResult {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<NotificationState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const subscribingRef = useRef(false);

  const subscribe = useCallback(async () => {
    if (subscribingRef.current) {
      console.log("[notifications] Subscribe already in progress, skipping");
      return;
    }
    subscribingRef.current = true;
    setState("loading");
    setErrorMsg(null);

    try {
      const result = await subscribeToPush(playerId);
      if (result.ok) {
        setState("subscribed");
      } else {
        console.warn("[notifications] subscribeToPush failed:", result.error);
        setErrorMsg(result.error ?? "Unknown error");
        setState("denied");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("[notifications] Exception during subscribe:", msg);
      setErrorMsg(msg);
      setState("denied");
    } finally {
      subscribingRef.current = false;
    }
  }, [playerId]);

  useEffect(() => {
    setMounted(true);

    // iOS + not installed as PWA → show installation guide
    if (isIOS() && !isStandalone()) {
      setState("ios-install");
      return;
    }

    // Browser doesn't support push at all (non-iOS)
    if (typeof window !== "undefined") {
      if (!("Notification" in window) || !("PushManager" in window)) {
        setState("unsupported");
        return;
      }

      if (Notification.permission === "denied") {
        setState("denied");
        return;
      }

      if (Notification.permission === "granted") {
        void subscribe();
      }
    }
  }, [playerId, subscribe]);

  return { mounted, state, errorMsg, subscribe };
}

