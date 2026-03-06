/**
 * Local Database Implementation
 * 
 * This is a temporary in-memory database for testing without Supabase.
 * Data is persisted to a JSON file and can be easily migrated to Supabase later.
 */

// Browser-compatible EventEmitter
class EventEmitter {
  private events: Map<string, Function[]> = new Map();

  on(event: string, listener: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener);
    return this;
  }

  emit(event: string, ...args: any[]) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
    return this;
  }

  removeListener(event: string, listener: Function) {
    const listeners = this.events.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  removeAllListeners(event?: string) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }
}

// Only import fs on server-side
let fs: any = null;
let path: any = null;
if (typeof window === "undefined") {
  try {
    fs = require("fs");
    path = require("path");
  } catch (e) {
    // fs not available
  }
}

// Types matching Supabase schema
export type PlayerStatus = "paid" | "warning" | "overdue";

export interface Club {
  id: string;
  name: string;
  slug: string;
  emblem_url: string | null;
  created_at: string;
}

export interface Player {
  id: string;
  club_id: string;
  full_name: string;
  nfc_tag_id: string;
  status: PlayerStatus;
  jersey_number: string | null;
  birth_date: string | null;
  team_group: number | null;
  last_payment_date: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PushSubscription {
  id: string;
  player_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}

export interface PaymentLog {
  id: string;
  player_id: string;
  paid_for: string;
  paid_at: string;
  recorded_by: string;
}

interface Database {
  clubs: Club[];
  players: Player[];
  push_subscriptions: PushSubscription[];
  payment_logs: PaymentLog[];
}

// Event emitter for Realtime functionality
export const dbEvents = new EventEmitter();

// Database file path (only used server-side)
const getDBFile = () => {
  if (typeof window !== "undefined" || !fs || !path) {
    return null;
  }
  return path.join(process.cwd(), "local-db.json");
};

// In-memory database
let db: Database = {
  clubs: [],
  players: [],
  push_subscriptions: [],
  payment_logs: [],
};

// Load database from file
function loadDatabase(): void {
  if (typeof window !== "undefined") {
    // Client-side: load from localStorage
    try {
      const stored = localStorage.getItem("local-db");
      if (stored) {
        db = JSON.parse(stored);
        console.log("[local-db] Database loaded from localStorage");
      }
    } catch (error) {
      console.error("[local-db] Error loading from localStorage:", error);
    }
    return;
  }

  // Server-side: load from file
  const DB_FILE = getDBFile();
  if (DB_FILE && fs && fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      db = JSON.parse(content);
      console.log("[local-db] Database loaded from file");
    } catch (error) {
      console.error("[local-db] Error loading database:", error);
    }
  } else if (typeof window === "undefined") {
    console.log("[local-db] No database file found, starting fresh");
  }
}

// Save database to file
function saveDatabase(): void {
  if (typeof window !== "undefined") {
    // Client-side: save to localStorage
    try {
      localStorage.setItem("local-db", JSON.stringify(db));
    } catch (error) {
      console.error("[local-db] Error saving to localStorage:", error);
    }
    return;
  }

  // Server-side: save to file
  const DB_FILE = getDBFile();
  if (DB_FILE && fs) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
    } catch (error) {
      console.error("[local-db] Error saving database:", error);
    }
  }
}

// Initialize database
loadDatabase();

// Helper to generate UUID
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Database operations
export const localDB = {
  // Clubs
  clubs: {
    select: (filters?: { id?: string; slug?: string }) => {
      let results = [...db.clubs];
      if (filters?.id) {
        results = results.filter((c) => c.id === filters.id);
      }
      if (filters?.slug) {
        results = results.filter((c) => c.slug === filters.slug);
      }
      return results;
    },
    insert: (data: Omit<Club, "id" | "created_at">) => {
      const club: Club = {
        id: generateUUID(),
        ...data,
        created_at: new Date().toISOString(),
      };
      db.clubs.push(club);
      saveDatabase();
      return { data: club, error: null };
    },
  },

  // Players
  players: {
    select: (filters?: {
      id?: string;
      nfc_tag_id?: string;
      club_id?: string;
      status?: PlayerStatus;
      team_group?: number | null;
    }) => {
      let results = [...db.players];
      if (filters?.id) {
        results = results.filter((p) => p.id === filters.id);
      }
      if (filters?.nfc_tag_id) {
        results = results.filter((p) => p.nfc_tag_id === filters.nfc_tag_id);
      }
      if (filters?.club_id) {
        results = results.filter((p) => p.club_id === filters.club_id);
      }
      if (filters?.status) {
        results = results.filter((p) => p.status === filters.status);
      }
      if (filters?.team_group !== undefined) {
        if (filters.team_group === null) {
          results = results.filter((p) => p.team_group === null);
        } else {
          results = results.filter((p) => p.team_group === filters.team_group);
        }
      }
      return results;
    },
    insert: (data: Omit<Player, "id" | "created_at" | "updated_at">) => {
      const player: Player = {
        id: generateUUID(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      db.players.push(player);
      saveDatabase();
      dbEvents.emit("player_inserted", player);
      return { data: player, error: null };
    },
    update: (
      filters: { id?: string; nfc_tag_id?: string },
      data: Partial<Omit<Player, "id" | "created_at" | "updated_at">>
    ) => {
      const players = db.players.filter((p) => {
        if (filters.id) return p.id === filters.id;
        if (filters.nfc_tag_id) return p.nfc_tag_id === filters.nfc_tag_id;
        return false;
      });

      if (players.length === 0) {
        return { data: null, error: { message: "Player not found" } };
      }

      const updated = players.map((player) => {
        const updated = {
          ...player,
          ...data,
          updated_at: new Date().toISOString(),
        };
        const index = db.players.findIndex((p) => p.id === player.id);
        if (index !== -1) {
          db.players[index] = updated;
        }
        // Emit realtime event
        dbEvents.emit("player_updated", {
          old: player,
          new: updated,
        });
        return updated;
      });

      saveDatabase();
      return { data: updated, error: null };
    },
    delete: (filters: { id?: string; nfc_tag_id?: string }) => {
      const initialLength = db.players.length;
      db.players = db.players.filter((p) => {
        if (filters.id) return p.id !== filters.id;
        if (filters.nfc_tag_id) return p.nfc_tag_id !== filters.nfc_tag_id;
        return true;
      });
      saveDatabase();
      const deleted = initialLength - db.players.length;
      return { data: deleted > 0 ? { count: deleted } : null, error: null };
    },
  },

  // Push Subscriptions
  push_subscriptions: {
    select: (filters?: { id?: string; player_id?: string; endpoint?: string }) => {
      let results = [...db.push_subscriptions];
      if (filters?.id) {
        results = results.filter((s) => s.id === filters.id);
      }
      if (filters?.player_id) {
        results = results.filter((s) => s.player_id === filters.player_id);
      }
      if (filters?.endpoint) {
        results = results.filter((s) => s.endpoint === filters.endpoint);
      }
      return results;
    },
    insert: (data: Omit<PushSubscription, "id" | "created_at">) => {
      const subscription: PushSubscription = {
        id: generateUUID(),
        ...data,
        created_at: new Date().toISOString(),
      };
      db.push_subscriptions.push(subscription);
      saveDatabase();
      return { data: subscription, error: null };
    },
    upsert: (
      data: Omit<PushSubscription, "id" | "created_at">,
      options?: { onConflict?: string }
    ) => {
      // Find existing by endpoint (if onConflict is "endpoint")
      if (options?.onConflict === "endpoint") {
        const existing = db.push_subscriptions.find(
          (s) => s.endpoint === data.endpoint
        );
        if (existing) {
          // Update existing
          const updated = { ...existing, ...data };
          const index = db.push_subscriptions.findIndex(
            (s) => s.id === existing.id
          );
          db.push_subscriptions[index] = updated;
          saveDatabase();
          return { data: updated, error: null };
        }
      }
      // Insert new
      return localDB.push_subscriptions.insert(data);
    },
    delete: (filters?: {
      id?: string;
      player_id?: string;
      endpoint?: string;
      ids?: string[];
    }) => {
      const initialLength = db.push_subscriptions.length;
      if (filters?.ids) {
        db.push_subscriptions = db.push_subscriptions.filter(
          (s) => !filters.ids!.includes(s.id)
        );
      } else {
        db.push_subscriptions = db.push_subscriptions.filter((s) => {
          if (filters?.id && s.id === filters.id) return false;
          if (filters?.player_id && s.player_id === filters.player_id) return false;
          if (filters?.endpoint && s.endpoint === filters.endpoint) return false;
          return true;
        });
      }
      saveDatabase();
      const deleted = initialLength - db.push_subscriptions.length;
      return { data: deleted > 0 ? { count: deleted } : null, error: null };
    },
  },

  // Payment Logs
  payment_logs: {
    select: (filters?: {
      id?: string;
      player_id?: string;
      paid_for?: string;
      paid_for_like?: string;
    }) => {
      let results = [...db.payment_logs];
      if (filters?.id) {
        results = results.filter((l) => l.id === filters.id);
      }
      if (filters?.player_id) {
        results = results.filter((l) => l.player_id === filters.player_id);
      }
      if (filters?.paid_for) {
        results = results.filter((l) => l.paid_for === filters.paid_for);
      }
      if (filters?.paid_for_like) {
        results = results.filter((l) => l.paid_for.includes(filters.paid_for_like!));
      }
      return results;
    },
    insert: (data: Omit<PaymentLog, "id" | "paid_at">) => {
      const log: PaymentLog = {
        id: generateUUID(),
        ...data,
        paid_at: new Date().toISOString(),
      };
      db.payment_logs.push(log);
      saveDatabase();
      return { data: log, error: null };
    },
  },

  // Utility: Get full database (for debugging)
  getDB: () => ({ ...db }),

  // Utility: Reset database
  reset: () => {
    db = {
      clubs: [],
      players: [],
      push_subscriptions: [],
      payment_logs: [],
    };
    saveDatabase();
    console.log("[local-db] Database reset");
  },
};
