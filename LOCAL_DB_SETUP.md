# Quick Start: Local Database Testing

## Setup (30 seconds)

1. **Create `.env.local` file** (or leave Supabase vars empty):
```bash
# Option 1: Explicit enable
USE_LOCAL_DB=true

# Option 2: Just leave Supabase empty (auto-enables local DB)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

2. **Start the server**:
```bash
npm run dev
```

3. **That's it!** The database will auto-seed with test data.

## Test URLs

### Player Profiles
- http://localhost:3000/p/vihar_01 (Demo player - paid)
- http://localhost:3000/p/vihar-2016-10 (Warning status)
- http://localhost:3000/p/vihar-2015-7 (Overdue status)

### Admin Access
1. Set admin key: `NEXT_PUBLIC_ADMIN_ACCESS_KEY=test123` in `.env.local`
2. Visit: http://localhost:3000/?access=test123
3. Go to: http://localhost:3000/admin/players

## What Works

✅ All database operations (CRUD)  
✅ Real-time status updates  
✅ Player profiles  
✅ Admin dashboard  
✅ Payment marking  
✅ Payment history  
✅ Search and filters  
✅ Reports  

## What Doesn't Work (Yet)

⚠️ Push notifications (needs VAPID keys)  
⚠️ Avatar uploads (uses URLs directly)  
⚠️ Edge functions (cron jobs)  

## Reset Database

Delete `local-db.json` and restart the server.

## Switch to Supabase

Just set your Supabase credentials in `.env.local` and remove `USE_LOCAL_DB`.
