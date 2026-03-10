# Create tables in Supabase

The MCP connection often times out. Use one of these methods to create the tables.

## Option A: Supabase CLI (recommended)

1. **Link the project** (one-time, requires Supabase login):
   ```bash
   npm run db:link
   ```
   Or: `npx supabase link --project-ref xxjalhbspqohkhofsoga`

2. **Apply all migrations** (creates tables, RLS, storage, etc.):
   ```bash
   npm run db:push
   ```
   Or: `npx supabase db push`

3. **Seed sample teams and players**  
   In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor** → New query → paste contents of **`seed_sample_data.sql`** → Run.

## Option B: SQL Editor only

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → project **xxjalhbspqohkhofsoga** → **SQL Editor** → **New query**.

2. Paste and run **`apply_full_schema.sql`** (full file).  
   This creates: `player_status` enum, `clubs`, `players`, `push_subscriptions`, `payment_logs`, RLS, realtime, storage bucket.

3. New query again → paste and run **`seed_sample_data.sql`**.  
   This inserts 5 teams and 31 sample players (+ payment history).

After either option, reload the app; the “Няма налични отбори” / schema cache error should be gone.
