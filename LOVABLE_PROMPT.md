# Smart Club - Lovable Prompt

## Application Overview

Build a **Progressive Web App (PWA)** for managing football club membership fees with NFC card integration. The app provides real-time payment status tracking, push notifications, and digital player cards accessible via NFC tags.

**Tech Stack Requirements:**
- Next.js 16+ with App Router
- React 19
- TypeScript
- Supabase (PostgreSQL database, Realtime subscriptions, Storage, Edge Functions)
- Tailwind CSS with shadcn/ui components
- Web Push API (VAPID) for notifications
- PWA capabilities (Service Worker, Web App Manifest)

---

## Database Schema (Supabase)

Create the following tables in Supabase:

### 1. `clubs` table
- `id` (UUID, primary key, auto-generated)
- `name` (text, required)
- `slug` (text, unique, required)
- `emblem_url` (text, nullable)
- `created_at` (timestamptz, default: now())

### 2. `players` table
- `id` (UUID, primary key, auto-generated)
- `club_id` (UUID, foreign key → clubs.id, cascade delete)
- `full_name` (text, required)
- `nfc_tag_id` (text, unique, required) - **This is the key identifier for NFC cards**
- `status` (enum: 'paid' | 'warning' | 'overdue', default: 'paid')
- `jersey_number` (text, nullable) - Format: "№14"
- `birth_date` (date, nullable)
- `team_group` (integer, nullable) - Birth year (e.g., 2014)
- `last_payment_date` (timestamptz, nullable)
- `avatar_url` (text, nullable) - URL to player photo in storage
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now(), auto-update on change)

**Indexes:**
- Index on `nfc_tag_id` for fast lookups
- Index on `club_id` for filtering

**Triggers:**
- Auto-update `updated_at` timestamp on row update

### 3. `push_subscriptions` table
- `id` (UUID, primary key, auto-generated)
- `player_id` (UUID, foreign key → players.id, cascade delete)
- `endpoint` (text, unique, required) - Web Push endpoint URL
- `p256dh` (text, required) - Public key for encryption
- `auth` (text, required) - Auth secret
- `created_at` (timestamptz, default: now())

**Index:**
- Index on `player_id` for fast lookups

### 4. `payment_logs` table
- `id` (UUID, primary key, auto-generated)
- `player_id` (UUID, foreign key → players.id, cascade delete)
- `paid_for` (text, required) - Period name (e.g., "Януари 2024")
- `paid_at` (timestamptz, default: now())
- `recorded_by` (text, default: 'admin')

**Index:**
- Index on `player_id` for fast lookups

### Storage Bucket
- Create a public bucket named `avatars` for storing player photos
- Allow public read access
- Allow uploads via anon key

### Row Level Security (RLS)
- Enable RLS on all tables
- For MVP: Use permissive policies (public read/write)
- Design for future authentication integration

### Realtime
- Enable Realtime on `players` table for live status updates

---

## Pages & Routes

### 1. Home Page (`/`)
**Purpose:** Landing page that handles routing logic

**Functionality:**
- Check if user is admin (via localStorage `isAdmin` flag)
  - If admin → redirect to `/admin/players`
- Check for player context from multiple sources (priority order):
  1. `localStorage.getItem('lastPlayerId')`
  2. URL query parameter `?tag={tagId}`
  3. Cookie `lastPlayerId` (for iOS PWA bridge)
- If player ID found → redirect to `/p/{tagId}`
- If no player ID → show welcome screen with:
  - Shield icon
  - Title: "Добре дошли в Smart Club"
  - Description: "Система за управление на членски внос с NFC профили в реално време."
  - Instruction: "Сканирайте вашата NFC карта, за да видите клубния си профил."
  - Footer: "Smart Club © {year} · Powered by Mozyk"

**Admin Activation:**
- If URL contains `?access={ADMIN_KEY}` (from env var `NEXT_PUBLIC_ADMIN_ACCESS_KEY`):
  - Set `localStorage.setItem('isAdmin', 'true')`
  - Show success toast: "Администраторският достъп е активиран успешно!"
  - Redirect to `/admin/players`

**Design:**
- Dark theme background (`#0d0d0d`)
- Green accent color (`#32cd32`)
- Centered layout
- Minimal, modern UI

---

### 2. Player Profile Page (`/p/[tagId]`)
**Purpose:** Display player's digital card with payment status

**Server-Side Rendering:**
- Fetch player data by `nfc_tag_id`
- Fetch club data (name, emblem_url)
- Fetch payment logs for this player
- If player not found → 404 page

**Components:**

**a) SmartRedirect Component:**
- Save `tagId` to localStorage (`lastPlayerId`)
- Save `tagId` to cookie (for iOS PWA bridge)
- If admin → redirect to `/admin/{tagId}`
- Detect iOS Safari (not standalone PWA) → show installation hint:
  - "Запазете профила на началния екран"
  - Instructions: "Натиснете Сподели → Към началния екран"
  - Dismissible

**b) RealtimeStatusCard Component:**
- Subscribe to Supabase Realtime channel for this player
- Listen for `UPDATE` events on `players` table where `id = playerId`
- Update status and `last_payment_date` in real-time
- Pass data to ClubCard component

**c) ClubCard Component:**
- Display player avatar (circular, with fallback initials)
- Player name (large, bold)
- Jersey number badge (if available)
- Team group (birth year) - "Набор {year}"
- Club name
- Club emblem (if available)
- **Status badge** with color coding:
  - `paid`: Green (`#32cd32`) - "Платено"
  - `warning`: Yellow/Gold (`#ffd700`) - "Напомняне"
  - `overdue`: Red (`#ff4d4d`) - "Просрочено"
- Last payment date (formatted in Bulgarian)
- Glow effect matching status color

**d) EnableNotificationsButton Component:**
- Check browser support for Push API
- iOS detection: If iOS Safari (not standalone) → show "Add to Home Screen" guide
- Request notification permission
- Register service worker (`/sw.js`)
- Subscribe to push notifications
- Save subscription to `push_subscriptions` table
- Clean up old subscriptions for this player (keep only current device)
- Button states:
  - Idle: "Активиране на известия"
  - Loading: Spinner
  - Subscribed: "Известията са активирани" (green, disabled)
  - Denied: "Известията са блокирани" (red, disabled)
  - Unsupported: "Известията не се поддържат" (gray, disabled)

**e) PaymentHistory Component:**
- Expandable accordion
- Header: "История на плащанията ({count})"
- List all payment logs (newest first)
- Each entry shows:
  - Period (e.g., "Януари 2024")
  - Date (formatted: DD.MM.YYYY)
  - "Разписка" button
- Click "Разписка" → open ReceiptModal

**f) ReceiptModal Component:**
- White background (printable document style)
- Header: Club name, "Разписка за членски внос"
- Body:
  - Player name
  - Period (paid_for)
  - Payment date
- Stamp: Green circular border with "ПОТВЪРДЕНО" text
- Actions:
  - "Принтирай / Запази" button (triggers window.print())
  - "Затвори" button

**Design:**
- Dark background (`#0a0a0a`)
- Centered card layout (max-width: 420px)
- Mobile-responsive
- Smooth animations

---

### 3. Admin Dashboard (`/admin`)
**Purpose:** Admin landing page

**Content:**
- Shield icon
- Title: "Smart Club Admin"
- Description: "Сканирайте NFC карта за директно плащане или потърсете играч ръчно."
- Two action cards:
  1. **"Списък играчи"** → Link to `/admin/players`
     - Icon: Users
     - Description: "Търсене, филтриране и ръчно плащане"
  2. **"NFC Плащане"** (disabled/info)
     - Icon: CreditCard
     - Description: "Сканирайте карта → /admin/[tagId]"

**Design:**
- Dark theme
- Card-based layout
- Hover effects

---

### 4. Admin Players List (`/admin/players`)
**Purpose:** Manage all players, search, filter, mark payments

**Server-Side Rendering:**
- Fetch all players with full details
- Fetch unique team groups
- Order players by name

**Components:**

**a) ReportsCenter Component:**
- Display statistics:
  - Total players
  - Count by status (paid/warning/overdue)
  - Percentage breakdown
- Visual indicators

**b) PlayersListDashboard Component:**
- **Group Filter Buttons:**
  - Show all unique team groups (birth years)
  - Click to toggle filter
  - Active filter: Green background with glow
  - Inactive: Dark with border

- **Search Input:**
  - Placeholder: "Търси по име или номер..."
  - Search icon
  - Minimum 2 characters to activate
  - Search in: `full_name`, `jersey_number`

- **Player List:**
  - Only show when filter or search is active
  - If no filter/search → show placeholder: "Моля, изберете набор или потърсете играч по име/номер."
  - Each player card shows:
    - Avatar (circular, 40px)
    - Player name (bold)
    - Jersey number badge (if available)
    - Status badge (color-coded)
    - Action button:
      - If `status === 'paid'`: Green checkmark icon (disabled)
      - Otherwise: "Платено" button (green, triggers payment)

- **Payment Action:**
  - Optimistic update: Immediately update UI
  - Call server action `markPlayerPaid(playerId, playerName)`
  - On success: Update status to 'paid', show checkmark
  - On error: Revert UI, show alert

**Design:**
- Dark theme
- Card-based list
- Responsive grid
- Loading states

---

### 5. Admin Quick Payment (`/admin/[tagId]`)
**Purpose:** Quick payment page when admin scans NFC card

**Server-Side Rendering:**
- Fetch player by `nfc_tag_id`
- If not found → 404

**Components:**

**a) AdminGuard Component:**
- Check `localStorage.getItem('isAdmin') === 'true'`
- If not admin → redirect to home

**b) PlayerAdminCard Component:**
- Large card layout
- Header:
  - Player name
  - Team group (if available)
  - Jersey number badge (large, prominent)
- Avatar section:
  - Large circular avatar (112px)
  - Status badge below avatar
- Details:
  - Last payment date (formatted in Bulgarian)
- Action button:
  - If `status === 'paid'`:
    - Green success state: "Таксата е платена"
    - If just paid: "Успешно платено!" with pulse animation
  - Otherwise:
    - Large green button: "Маркирай като платено"
    - Loading state with spinner
    - On click → call `markPlayerPaid()`

- Back link: "← Списък играчи" → `/admin/players`

**Design:**
- Centered card (max-width: 420px)
- Status-based glow effect
- Smooth transitions

---

## Server Actions

### 1. `markPlayerPaid(playerId: string, playerName: string)`
**Location:** `src/actions/players.ts`

**Functionality:**
1. Update player:
   - Set `status = 'paid'`
   - Set `last_payment_date = now()`
2. Create payment log entry:
   - `paid_for` = Bulgarian month name + year (e.g., "Януари 2024")
   - `paid_at` = now()
   - `recorded_by` = 'admin'
3. Send push notification (if player has subscriptions):
   - Title: "Smart Club"
   - Body: "Плащането е успешно! Месечната такса за {playerName} е отразена."
   - URL: `/p/{nfc_tag_id}`
4. Revalidate Next.js cache paths:
   - `/admin`
   - `/admin/players`
   - `/admin/{tagId}`
   - `/p/{tagId}`

**Returns:** `{ success: true }` or `{ error: string }`

### 2. `sendPushToPlayer(playerId: string, payload: { title: string, body: string, url?: string })`
**Location:** `src/actions/notifications.ts`

**Functionality:**
1. Fetch all push subscriptions for player
2. Send notification to each subscription using `web-push` library
3. Handle expired subscriptions (410 Gone):
   - Delete from database
4. Use VAPID keys from environment variables

### 3. `subscribeToPush(playerId: string)`
**Location:** `src/lib/push.ts` (client-side)

**Functionality:**
1. Check browser support (Service Worker, PushManager)
2. Request notification permission
3. Register service worker (`/sw.js`)
4. Get or create push subscription
5. Clean up old subscriptions for this player (keep only current device)
6. Save subscription to `push_subscriptions` table
7. Handle iOS detection (requires PWA installation)

**Returns:** `{ ok: boolean, error?: string }`

---

## Service Worker (`/public/sw.js`)

**Functionality:**

1. **Push Event Handler:**
   - Parse notification payload (JSON or text)
   - Show notification with:
     - Title (default: "Smart Club")
     - Body
     - Vibrate pattern: [100, 50, 100]
     - Tag: "smartclub" (replace instead of stack)
     - Data: { url: payload.url || "/" }

2. **Notification Click Handler:**
   - Close notification
   - Open/focus window to notification URL
   - If URL matches current page → navigate
   - Otherwise → open new window

---

## Push Notification System

### Setup Requirements:
- Generate VAPID keys (public + private)
- Store in environment variables:
  - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
  - `VAPID_PRIVATE_KEY`
- Configure `web-push` library with VAPID details

### Notification Types:

1. **Payment Confirmation** (when admin marks paid):
   - Title: "Smart Club"
   - Body: "Плащането е успешно! Месечната такса за {playerName} е отразена."
   - URL: `/p/{nfc_tag_id}`

2. **Reminder (Day 25)**:
   - Title: "Smart Club"
   - Body: "Напомняне: Моля, платете месечната такса до края на месеца."
   - URL: `/p/{nfc_tag_id}`

3. **Last Reminder (Day 29)**:
   - Title: "Smart Club"
   - Body: "Последно напомняне: Месечната такса все още не е платена."
   - URL: `/p/{nfc_tag_id}`

4. **Overdue Alert (Day 1)**:
   - Title: "Smart Club"
   - Body: "Просрочено плащане! Дължите две такси."
   - URL: `/p/{nfc_tag_id}`

---

## Automated Billing (Supabase Edge Function)

**Location:** `supabase/functions/cron-billing/index.ts`

**Trigger:** Daily cron job (Supabase scheduled function)

**Logic:**

### Day 25 & Day 29:
- Find all players with `status = 'warning'`
- Send reminder notification to each

### Day 1 (1st of month):
**Rule A:** Reset paid players
- Find all players with `status = 'paid'`
- Update to `status = 'warning'` (new month, new fee due)

**Rule B:** Escalate warnings
- Find all players with `status = 'warning'`
- Update to `status = 'overdue'` (they now owe two fees)
- Send overdue notification to each

**Demo Mode:**
- If `isDemo = true`:
  - Day 1: Only notify players already marked `overdue` (don't change statuses)

**Authentication:**
- Require `Authorization: Bearer {SERVICE_ROLE_KEY}` header

**Returns:** JSON with actions performed

---

## PWA Configuration

### Web App Manifest (`/app/manifest.ts`):
```typescript
{
  name: "Smart Club",
  short_name: "Smart Club",
  description: "Система за управление на членски внос с NFC профили",
  start_url: "/",
  display: "standalone",
  background_color: "#0a0a0a",
  theme_color: "#32cd32",
  icons: [/* favicon */]
}
```

### Service Worker Registration:
- Register in `subscribeToPush()` function
- Scope: "/"
- File: `/public/sw.js`

### iOS PWA Support:
- Detect iOS Safari vs standalone PWA
- Show installation guide for iOS users
- Use cookies to bridge Safari ↔ standalone PWA context

---

## UI/UX Design Guidelines

### Color Scheme:
- **Background:** Dark (`#0d0d0d`, `#0a0a0a`, `#1a1a1a`)
- **Primary Accent:** Green (`#32cd32`)
- **Status Colors:**
  - Paid: Green (`#32cd32`)
  - Warning: Gold (`#ffd700`)
  - Overdue: Red (`#ff4d4d`)
- **Text:** White with opacity variations (`white`, `white/80`, `white/40`, `white/20`)
- **Borders:** `white/10`, `white/5`

### Typography:
- Font: Geist Sans (Next.js default)
- Headings: Bold, large
- Body: Regular weight
- Small text: 10px-12px for metadata

### Components:
- Use shadcn/ui components (Button, Badge, Card, Dialog, Input)
- Custom styling with Tailwind CSS
- Smooth animations and transitions
- Loading states with spinners
- Optimistic UI updates

### Responsive Design:
- Mobile-first approach
- Max-width containers for cards (420px)
- Flexible layouts
- Touch-friendly buttons (min 44px height)

---

## Environment Variables

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
NEXT_PUBLIC_ADMIN_ACCESS_KEY=your_secret_admin_key
NEXT_PUBLIC_APP_URL=https://your-app-url.com
SERVICE_ROLE_KEY=your_service_role_key (for cron function)
```

---

## Key Features Summary

1. **NFC Card Integration:** Players access profiles via unique `nfc_tag_id` in URL
2. **Real-time Status Updates:** Supabase Realtime subscriptions for instant UI updates
3. **Push Notifications:** Web Push API for payment reminders and confirmations
4. **Automated Billing:** Cron-based status transitions on 1st of month
5. **PWA Support:** Installable app with offline capabilities
6. **Admin Dashboard:** Search, filter, and mark payments efficiently
7. **Payment History:** Track all payments with printable receipts
8. **Mobile-First:** Optimized for mobile devices and NFC scanning

---

## Implementation Notes

- Use Next.js Server Actions for mutations (no API routes needed)
- Implement optimistic UI updates for better UX
- Handle iOS Safari limitations (requires PWA installation for push)
- Use Supabase Realtime for live updates (no polling)
- Implement proper error handling and loading states
- Support Bulgarian language throughout UI
- Format dates in Bulgarian locale
- Use Bulgarian month names in payment logs

---

## Testing Checklist

- [ ] NFC tag scan redirects to correct player profile
- [ ] Admin access via URL parameter works
- [ ] Real-time status updates work when admin marks payment
- [ ] Push notifications are sent and received correctly
- [ ] Payment history displays correctly
- [ ] Receipt modal is printable
- [ ] iOS PWA installation guide appears correctly
- [ ] Service worker registers and handles push events
- [ ] Cron function runs and updates statuses correctly
- [ ] Search and filter work in admin dashboard
- [ ] Optimistic UI updates work correctly
- [ ] Error states are handled gracefully

---

This prompt provides all the necessary details to build the Smart Club application in Lovable. Follow the structure, implement the features as described, and ensure all user flows work seamlessly.
