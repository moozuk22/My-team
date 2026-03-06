# Smart Club - Architecture, Flow & Functionality Summary

## 📋 Overview

**Smart Club** is a Next.js-based Progressive Web App (PWA) for managing football club membership fees with NFC card integration. It provides real-time payment status tracking, push notifications, and digital player cards accessible via NFC tags.

**Tech Stack:**
- **Frontend**: Next.js 16.1.6 (App Router), React 19, TypeScript
- **Backend**: Supabase (PostgreSQL + Realtime + Storage + Edge Functions)
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Push Notifications**: Web Push API (VAPID)
- **PWA**: Service Worker, Web App Manifest

---

## 🏗️ Architecture

### **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser/PWA)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Player View │  │  Admin View  │  │  Home Screen  │      │
│  │   /p/[tagId] │  │  /admin/*    │  │      /        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘             │
│                            │                                  │
│                    ┌───────▼────────┐                        │
│                    │  Service Worker │                        │
│                    │   (Push Handler) │                       │
│                    └───────┬────────┘                        │
└────────────────────────────┼─────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Next.js Server   │
                    │   (App Router)     │
                    └─────────┬──────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌─────────▼─────────┐  ┌───────▼────────┐
│   Supabase    │   │  Server Actions   │  │  Edge Function │
│   Database    │   │  (players.ts,     │  │  (cron-billing)│
│               │   │   notifications.ts)│  │                │
│  - players    │   └────────────────────┘  └────────────────┘
│  - clubs      │
│  - push_      │
│    subscriptions│
│  - payment_   │
│    logs       │
│               │
│  Realtime     │
│  Channels     │
│               │
│  Storage      │
│  (avatars)    │
└───────────────┘
```

### **Database Schema**

#### **Core Tables:**

1. **`clubs`**
   - `id` (UUID, PK)
   - `name` (text)
   - `slug` (text, unique)
   - `emblem_url` (text, nullable)
   - `created_at` (timestamptz)

2. **`players`**
   - `id` (UUID, PK)
   - `club_id` (UUID, FK → clubs)
   - `full_name` (text)
   - `nfc_tag_id` (text, unique) - **Key identifier for NFC cards**
   - `status` (enum: 'paid' | 'warning' | 'overdue')
   - `jersey_number` (text, nullable)
   - `birth_date` (date, nullable)
   - `team_group` (integer, nullable) - Birth year
   - `last_payment_date` (timestamptz, nullable)
   - `avatar_url` (text, nullable)
   - `created_at`, `updated_at` (timestamptz)

3. **`push_subscriptions`**
   - `id` (UUID, PK)
   - `player_id` (UUID, FK → players)
   - `endpoint` (text, unique)
   - `p256dh` (text) - Public key for encryption
   - `auth` (text) - Auth secret
   - `created_at` (timestamptz)

4. **`payment_logs`**
   - `id` (UUID, PK)
   - `player_id` (UUID, FK → players)
   - `paid_for` (text) - e.g., "Януари 2024"
   - `paid_at` (timestamptz)
   - `recorded_by` (text, default: 'admin')

#### **Storage Buckets:**
- **`avatars`** - Public bucket for player photos

#### **Row Level Security (RLS):**
- Currently permissive (allows public read/write)
- Designed for future authentication integration

---

## 🔄 Application Flow

### **1. Player Profile Flow (`/p/[tagId]`)**

```
NFC Card Scan / Direct URL
         │
         ▼
┌────────────────────┐
│  Home Screen       │
│  (home-screen.tsx) │
│  - Checks admin    │
│  - Resolves tagId   │
│  - Redirects       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  SmartRedirect     │
│  - Saves to        │
│    localStorage    │
│  - Saves to cookie │
│  - iOS PWA hint    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Profile Page      │
│  (SSR)             │
│  - Fetches player  │
│  - Fetches payments│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  RealtimeStatusCard│
│  - Subscribes to   │
│    Supabase        │
│    Realtime        │
│  - Updates UI on   │
│    status change   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  ClubCard           │
│  - Displays player  │
│    info             │
│  - Status badge     │
│  - Avatar           │
│  - Payment history  │
└─────────────────────┘
```

**Key Features:**
- **Real-time updates**: Status changes propagate instantly via Supabase Realtime
- **PWA support**: Can be installed to home screen
- **iOS compatibility**: Special handling for Safari vs standalone PWA
- **Payment history**: Expandable accordion with printable receipts

### **2. Admin Flow (`/admin/*`)**

```
Admin Access
    │
    ▼
┌────────────────────┐
│  Admin Guard       │
│  - Checks          │
│    localStorage    │
│    'isAdmin'       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Admin Dashboard   │
│  - Players list    │
│  - Reports         │
│  - Demo actions    │
└─────────┬──────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────────┐
│ Players │ │ NFC Payment  │
│ List    │ │ /admin/[tagId]│
│         │ │              │
│ - Search│ │ - Quick      │
│ - Filter│ │   payment    │
│ - Mark  │ │   action     │
│   paid  │ └──────────────┘
└─────────┘
```

**Admin Features:**
- **Player Management**: Search, filter by team group, mark payments
- **NFC Quick Payment**: Scan card → direct payment page
- **Reports**: Status overview, statistics
- **Bulk Import**: CSV-based player import with photo upload

### **3. Payment Processing Flow**

```
Admin marks player as paid
         │
         ▼
┌────────────────────┐
│  markPlayerPaid()  │
│  (Server Action)   │
└─────────┬──────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────────────┐
│ Update  │ │  Create Payment  │
│ Player  │ │  Log Entry       │
│ Status  │ │                  │
│ to      │ │  - paid_for:     │
│ 'paid'  │ │    "Януари 2024" │
│         │ │  - paid_at: now  │
└─────────┘ └─────────┬────────┘
          │            │
          └─────┬──────┘
                │
                ▼
        ┌───────────────┐
        │ Send Push     │
        │ Notification  │
        │ (if subscribed)│
        └───────────────┘
                │
                ▼
        ┌───────────────┐
        │ Revalidate    │
        │ Cache         │
        │ (Next.js)     │
        └───────────────┘
```

### **4. Push Notification Flow**

```
User enables notifications
         │
         ▼
┌────────────────────┐
│  EnableNotifications│
│  Button            │
│  - Request         │
│    permission      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  subscribeToPush() │
│  - Register SW     │
│  - Get subscription│
│  - Save to DB      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  push_subscriptions│
│  table             │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Payment Event     │
│  or Cron Job       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  sendPushToPlayer()│
│  - Fetch subs      │
│  - Send via        │
│    web-push        │
│  - Clean expired   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Service Worker    │
│  (sw.js)           │
│  - Receives push   │
│  - Shows           │
│    notification    │
│  - Handles click   │
└────────────────────┘
```

### **5. Automated Billing Flow (Cron)**

```
Supabase Cron Trigger
    (Daily at UTC)
         │
         ▼
┌────────────────────┐
│  cron-billing      │
│  Edge Function     │
└─────────┬──────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────────┐
│ Day 25  │ │  Day 29      │
│ Reminder│ │  Last        │
│         │ │  Reminder    │
│ Notify  │ │              │
│ 'warning'│ │  Notify      │
│ players │ │  'warning'   │
│         │ │  players     │
└─────────┘ └──────────────┘
          │
          ▼
┌────────────────────┐
│  Day 1 (1st)       │
│  Status Updates    │
│                    │
│  Rule A:           │
│  paid → warning    │
│                    │
│  Rule B:           │
│  warning → overdue │
│                    │
│  Notify overdue    │
└────────────────────┘
```

**Cron Logic:**
- **Day 25**: Reminder to players with `status='warning'`
- **Day 29**: Last reminder to players with `status='warning'`
- **Day 1**: 
  - Rule A: All `paid` → `warning` (new month, new fee due)
  - Rule B: All `warning` → `overdue` (they now owe two fees)
  - Notify newly `overdue` players

---

## ⚙️ Functionality

### **Core Features**

#### **1. Player Digital Card**
- **Access**: Via NFC tag scan or direct URL (`/p/[tagId]`)
- **Display**:
  - Player name, jersey number, team group (birth year)
  - Club name and emblem
  - Player avatar (from Supabase Storage)
  - Payment status badge (paid/warning/overdue)
  - Last payment date
- **Real-time**: Status updates instantly via Supabase Realtime
- **PWA**: Installable to home screen for quick access

#### **2. Payment Management**
- **Admin Actions**:
  - Mark player as paid (updates status + creates payment log)
  - View payment history
  - Generate printable receipts
- **Payment Logs**:
  - Tracks each payment with period (e.g., "Януари 2024")
  - Timestamp and recorded_by field
  - Accessible in player profile

#### **3. Push Notifications**
- **Web Push API**: Uses VAPID keys for authentication
- **Subscription Management**:
  - One subscription per player (device-specific)
  - Automatic cleanup of expired subscriptions (410 Gone)
- **Notification Types**:
  - Payment confirmation
  - Reminder (day 25)
  - Last reminder (day 29)
  - Overdue alert (day 1)
- **iOS Support**: Requires PWA installation for push notifications

#### **4. Admin Dashboard**
- **Player List**:
  - Search by name or jersey number
  - Filter by team group (birth year)
  - Quick payment action
  - Status badges
- **Reports**: Statistics and overview
- **NFC Quick Payment**: Direct payment page via `/admin/[tagId]`
- **Bulk Import**: CSV import with photo upload

#### **5. Automated Billing**
- **Cron Job**: Runs daily via Supabase Edge Function
- **Status Transitions**:
  - `paid` → `warning` (1st of month)
  - `warning` → `overdue` (1st of month, if not paid)
- **Notifications**: Automated reminders and alerts

### **Technical Features**

#### **Real-time Updates**
- **Supabase Realtime**: Subscribes to `players` table changes
- **Optimistic UI**: Admin actions update UI immediately
- **Cache Revalidation**: Next.js cache invalidation on updates

#### **PWA Capabilities**
- **Service Worker**: Handles push notifications and offline support
- **Web App Manifest**: Configures app metadata and icons
- **Install Prompt**: iOS-specific installation guide

#### **Data Management**
- **Bulk Import Script**: `scripts/bulk-import.mjs`
  - Reads CSV with player data
  - Uploads photos to Supabase Storage
  - Generates unique `nfc_tag_id` (format: `vihar-{year}-{jersey}`)
  - Creates/updates players in database

#### **Security & Access Control**
- **Admin Access**: Simple localStorage-based (for MVP)
  - Access key via URL parameter: `/?access={ADMIN_KEY}`
  - Stored in `localStorage.isAdmin`
- **RLS Policies**: Currently permissive (public read/write)
  - Designed for future authentication integration

---

## 📁 Project Structure

```
smart-club-master/
├── src/
│   ├── actions/              # Server Actions
│   │   ├── notifications.ts  # Push notification sending
│   │   └── players.ts        # Player CRUD operations
│   ├── app/                  # Next.js App Router
│   │   ├── admin/            # Admin routes
│   │   │   ├── [tagId]/      # NFC quick payment
│   │   │   └── players/      # Player list & management
│   │   ├── api/              # API routes
│   │   ├── p/                # Player profile routes
│   │   │   └── [tagId]/      # Player digital card
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── home-screen.tsx   # Landing/redirect logic
│   │   └── manifest.ts       # PWA manifest
│   ├── components/
│   │   ├── shared/           # Shared components
│   │   │   ├── admin-guard.tsx
│   │   │   ├── club-card.tsx
│   │   │   ├── enable-notifications-button.tsx
│   │   │   ├── payment-history.tsx
│   │   │   ├── realtime-status-card.tsx
│   │   │   └── smart-redirect.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── constants.ts      # Bulgarian month names
│   │   ├── push.ts           # Push subscription logic
│   │   ├── web-push.ts       # Web Push configuration
│   │   └── supabase/         # Supabase clients
│   │       ├── client.ts     # Browser client
│   │       └── server.ts     # Server client
│   └── types/
│       └── database.ts        # TypeScript types
├── supabase/
│   ├── functions/
│   │   └── cron-billing/     # Automated billing cron
│   └── migrations/           # Database migrations
├── public/
│   └── sw.js                 # Service Worker
├── scripts/
│   └── bulk-import.mjs       # CSV import script
└── package.json
```

---

## 🔑 Key Design Decisions

1. **NFC Tag ID as Primary Identifier**: Each player has a unique `nfc_tag_id` used for URL routing (`/p/[tagId]`)

2. **Status Enum**: Three-state system (`paid`, `warning`, `overdue`) for payment tracking

3. **Real-time Updates**: Supabase Realtime ensures instant status propagation without polling

4. **PWA-First**: Designed as installable PWA for mobile-first access

5. **Server Actions**: Uses Next.js Server Actions for mutations (no API routes needed)

6. **Optimistic UI**: Admin actions update UI immediately, revert on error

7. **Push Notification Strategy**: One subscription per player, device-specific

8. **Automated Billing**: Cron-based status transitions on 1st of month

---

## 🚀 Deployment Considerations

- **Environment Variables Required**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
  - `VAPID_PRIVATE_KEY`
  - `NEXT_PUBLIC_ADMIN_ACCESS_KEY`
  - `NEXT_PUBLIC_APP_URL`
  - `SERVICE_ROLE_KEY` (for cron function)

- **Supabase Setup**:
  - Run all migrations in order
  - Configure cron trigger for `cron-billing` function
  - Set up VAPID keys for push notifications

- **Storage**: Configure `avatars` bucket as public

---

## 📝 Future Enhancements (Noted in Code)

- **Authentication**: RLS policies are permissive, designed for future auth integration
- **Multi-club Support**: Schema supports multiple clubs, currently single club
- **Payment Methods**: Currently manual admin marking, could integrate payment gateways
- **Analytics**: Reports center is basic, could expand with charts/graphs

---

## 🎯 Summary

Smart Club is a **modern, real-time membership fee management system** that combines:
- **NFC card integration** for instant player profile access
- **Real-time status updates** via Supabase Realtime
- **Push notifications** for payment reminders and confirmations
- **Automated billing** via cron-based status transitions
- **PWA capabilities** for mobile-first experience
- **Admin dashboard** for efficient payment management

The architecture is **scalable**, **real-time**, and **mobile-optimized**, making it ideal for football clubs managing membership fees with modern technology.
