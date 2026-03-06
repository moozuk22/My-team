# Database Connection Check

## Current Connection Flow

### 1. Server API Routes (`server/routes/players.js`)
- Uses: `createClient()` from `src/lib/supabase/server.ts`
- Should use: Local DB when `USE_LOCAL_DB=true` or `VITE_SUPABASE_URL` is empty
- Status: ✅ Connected to local DB

### 2. Client-Side Components
- `src/pages/ProfilePage.tsx` → `fetch("/api/players/tag/:tagId")` → Express API → Local DB
- `src/pages/AdminPlayersPage.tsx` → `fetch("/api/players")` → Express API → Local DB
- `src/pages/AdminPlayerPage.tsx` → `fetch("/api/players/tag/:tagId")` → Express API → Local DB
- Status: ✅ All go through API routes to local DB

### 3. Client-Side Direct Queries
- `src/components/shared/realtime-status-card.tsx` → `createClient()` from `client.ts` → Local DB (mock)
- `src/app/admin/players/reports-center.tsx` → `fetch("/api/players/payments")` → Express API → Local DB
- `src/lib/push.ts` → `createClient()` from `client.ts` → Local DB (mock)
- Status: ✅ All use local DB

### 4. Server Actions (Legacy - Not Used in Vite)
- `src/actions/players.ts` → Uses `createClient()` from `server.ts` → Local DB
- `src/actions/notifications.ts` → Uses `createClient()` from `server.ts` → Local DB
- Status: ⚠️ Not used in Vite (replaced by API routes)

## Environment Variable Detection

### Server-Side (`server/index.js`, `server/routes/*.js`)
- Checks: `process.env.USE_LOCAL_DB` or `process.env.VITE_SUPABASE_URL`
- Uses: `process.env` (Node.js)

### Client-Side (`src/lib/supabase/client.ts`)
- Checks: `import.meta.env.VITE_SUPABASE_URL`
- Uses: `import.meta.env` (Vite)

### Mock Client (`src/lib/local-db/mock-supabase.ts`)
- Checks: Both `process.env` (server) and `import.meta.env` (client)
- Uses: `getEnv()` helper function

## Verification Steps

1. ✅ Server API routes use `createClient()` from `server.ts`
2. ✅ `server.ts` checks `USE_LOCAL_DB` and uses mock client
3. ✅ Mock client uses `localDB` from `database.ts`
4. ✅ Client components use `fetch()` to API routes (not direct Supabase)
5. ✅ Client-side Supabase calls use `createClient()` from `client.ts`
6. ✅ `client.ts` checks `USE_LOCAL_DB` and uses mock client

## All Connections Point to Local Database ✅

All database operations flow through:
- Server API → `server.ts` → Mock Client → `localDB` → `database.ts` → `local-db.json`
- Client Components → API Routes → Same flow
- Client Direct Calls → `client.ts` → Mock Client → `localDB` → `localStorage` (client) / `local-db.json` (server)
