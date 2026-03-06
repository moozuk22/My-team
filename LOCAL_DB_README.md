# Local Database Setup

This project includes a temporary local database implementation for testing without Supabase.

## How It Works

The local database:
- Uses in-memory storage with JSON file persistence (`local-db.json`)
- Automatically seeds with test data on first run
- Provides a Supabase-compatible API
- Supports real-time updates via event emitters
- Can be easily switched back to Supabase

## Enabling Local Database

The local database is **automatically enabled** if:
1. `USE_LOCAL_DB=true` is set in `.env.local`, OR
2. `NEXT_PUBLIC_SUPABASE_URL` is not set

### Option 1: Explicit Enable

Create `.env.local`:
```bash
USE_LOCAL_DB=true
```

### Option 2: Leave Supabase URL Empty

Create `.env.local`:
```bash
# Leave these empty to use local database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Test Data

The local database automatically seeds with:
- 1 club: "ФК Вихър Войводиново"
- 5 demo players with different statuses:
  - `vihar_01` - Демо Играч (paid)
  - `vihar-2016-10` - Иван Петров (warning)
  - `vihar-2015-7` - Мария Георгиева (overdue)
  - `vihar-2017-5` - Георги Стоянов (paid)
  - `vihar-2016-9` - Анна Димитрова (warning)

## Testing

### Player Profiles
Visit these URLs to test player profiles:
- http://localhost:3000/p/vihar_01
- http://localhost:3000/p/vihar-2016-10
- http://localhost:3000/p/vihar-2015-7

### Admin Dashboard
1. Visit: http://localhost:3000/?access=your-secret-admin-key-here
2. Or set `NEXT_PUBLIC_ADMIN_ACCESS_KEY` in `.env.local`
3. Access admin at: http://localhost:3000/admin/players

## Database File

Data is persisted to `local-db.json` in the project root. This file:
- Is automatically created on first run
- Is gitignored (not committed)
- Can be deleted to reset the database
- Will be automatically re-seeded if empty

## Switching Back to Supabase

To use real Supabase:
1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
2. Remove or set `USE_LOCAL_DB=false`
3. Restart the dev server

## Limitations

The local database implementation:
- ✅ Supports all basic CRUD operations
- ✅ Supports real-time updates (via event emitters)
- ✅ Supports query filters (eq, neq, like, in, etc.)
- ✅ Supports joins (players with clubs)
- ⚠️ Push notifications won't work (requires VAPID keys)
- ⚠️ Storage (avatars) uses URLs directly (no upload)
- ⚠️ Some advanced Supabase features may not be fully implemented

## File Structure

```
src/lib/local-db/
├── database.ts      # Core database implementation
├── mock-supabase.ts # Supabase-compatible API
├── seed.ts          # Test data seeding
└── init.ts          # Initialization logic
```

## Troubleshooting

### Database not seeding
- Check that `local-db.json` doesn't already exist with data
- Delete `local-db.json` and restart the server
- Check server console for seed messages

### Real-time updates not working
- Real-time uses event emitters, should work automatically
- Check browser console for errors
- Ensure you're using the mock client (check console for "[local-db]" messages)

### Data not persisting
- Check that `local-db.json` is writable
- Check server console for save errors
- Ensure you're in the project root directory
