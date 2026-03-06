import webPush from "web-push";

const vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webPush.setVapidDetails(
    "mailto:noreply@smartclub.app",
    vapidPublicKey,
    vapidPrivateKey
  );
}

export { webPush };
