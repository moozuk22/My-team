# Deploying to Vercel with Supabase

The app uses **Vercel serverless functions** for `/api/players`, `/api/players/clubs`, and `/api/players/groups` so the admin page can load Supabase data in production.

## 1. Set environment variables in Vercel

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value | Environments |
|------|--------|----------------|
| `VITE_SUPABASE_URL` | `https://xxjalhbspqohkhofsoga.supabase.co` | Production, Preview |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon (public) key | Production, Preview |

You can also use `SUPABASE_URL` / `SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_*`); the serverless API reads any of these.

### Demo buttons / notifications (Admin “DEMO ACTIONS”)

If you want the admin “DEMO ACTIONS” buttons to work in **production**, add:

| Name | Value | Environments |
|------|--------|-------------|
| `SERVICE_ROLE_KEY` | Supabase **service role** key (server-side only) | Production, Preview |

This is required for `/api/debug/notify` to call the Supabase Edge Function `cron-billing`.
Do **not** expose the service role key in client-side env vars (never prefix it with `VITE_`).

## 2. Redeploy

After saving the variables, trigger a new deployment (e.g. **Deployments → … → Redeploy**) so the build picks them up. The admin page should then show clubs and players from Supabase.

## 3. If you still don’t see data

- In Vercel, open **Deployments → your deployment → Functions** and check logs for `/api/players` or `/api/players/clubs` (e.g. “Missing Supabase URL or anon key”).
- In the browser, open DevTools → Network and confirm `/api/players` and `/api/players/clubs` return JSON (status 200), not HTML.
