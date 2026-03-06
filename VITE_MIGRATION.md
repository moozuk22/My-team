# Migration from Next.js to Vite

This document describes the migration from Next.js to Vite + React Router.

## What Changed

### Architecture
- **Next.js App Router** → **Vite + React Router**
- **Server Actions** → **Express API Routes**
- **Server Components** → **Client Components with API calls**
- **Next.js routing** → **React Router**

### Key Changes

1. **Package.json**
   - Removed Next.js dependencies
   - Added Vite, React Router, Express
   - Updated scripts to run both client and server

2. **Project Structure**
   ```
   Before (Next.js):
   src/app/
     ├── page.tsx
     ├── layout.tsx
     └── [routes]/
   
   After (Vite):
   src/
     ├── pages/          # Page components
     ├── api/            # Client-side API functions
     ├── App.tsx         # Router setup
     └── main.tsx        # Entry point
   server/                # Express API server
     ├── index.js
     └── routes/
   ```

3. **Environment Variables**
   - `NEXT_PUBLIC_*` → `VITE_*` (for client-side)
   - Server-side variables remain unchanged

4. **Routing**
   - Next.js file-based routing → React Router `<Routes>`
   - `useRouter()` → `useNavigate()`
   - `useSearchParams()` → `useSearchParams()` (from react-router-dom)

5. **Data Fetching**
   - Server Actions → Express API endpoints
   - Server Components → Client Components with `useEffect` + `fetch`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local`:
```bash
# Use local database for testing
USE_LOCAL_DB=true

# Or configure Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Other variables
VITE_ADMIN_ACCESS_KEY=your-secret-key
VITE_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

This starts:
- Vite dev server on `http://localhost:3000`
- Express API server on `http://localhost:3001`

### 4. Build for Production

```bash
npm run build
```

Builds the Vite app to `dist/` directory.

## API Routes

All API routes are under `/api`:

- `GET /api/players` - Get all players
- `GET /api/players/tag/:tagId` - Get player by NFC tag
- `GET /api/players/groups` - Get team groups
- `POST /api/players/:playerId/paid` - Mark player as paid
- `GET /api/players/payments` - Get payment logs

## Differences from Next.js

### Server-Side Rendering
- **Before**: Pages were SSR by default
- **After**: All pages are client-side rendered
- **Impact**: Initial page load may be slightly slower, but navigation is faster

### Server Actions
- **Before**: Direct function calls from components
- **After**: HTTP requests to Express API
- **Impact**: Slightly more verbose, but more flexible

### File Structure
- **Before**: File-based routing in `app/` directory
- **After**: Explicit routes in `App.tsx`
- **Impact**: More control over routing, easier to understand

## Migration Checklist

- [x] Update package.json
- [x] Create Vite config
- [x] Set up React Router
- [x] Create Express API server
- [x] Convert server components to client components
- [x] Update environment variables
- [x] Update imports (next/navigation → react-router-dom)
- [x] Update API calls
- [x] Update Supabase clients
- [ ] Test all features
- [ ] Update deployment configuration

## Testing

1. **Player Profiles**: `/p/vihar_01`
2. **Admin Dashboard**: `/admin/players`
3. **Admin Quick Payment**: `/admin/vihar_01`
4. **Payment Actions**: Mark players as paid
5. **Real-time Updates**: Should still work via Supabase Realtime
6. **Reports**: Generate monthly/annual reports

## Known Issues

- PWA manifest needs to be configured in `vite.config.ts`
- Service worker needs to be updated for Vite
- Some Next.js-specific optimizations are lost (but Vite has its own)

## Next Steps

1. Test all functionality
2. Update deployment scripts
3. Configure PWA properly
4. Optimize bundle size if needed
