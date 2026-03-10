/**
 * Mock Supabase Client
 * 
 * This provides a Supabase-like API that uses the local database.
 * The interface matches Supabase's query builder pattern.
 */

import { localDB, dbEvents, type Player, type Club, type PaymentLog, type PushSubscription } from "./database";

// Local DB is now disabled; always use real Supabase.
export const USE_LOCAL_DB = false;

// Mock Supabase query builder
class MockQueryBuilder<T> {
  private table: string;
  private filters: Array<{ field: string; operator: string; value: any }> = [];
  private selects: string[] = [];
  private orderBy?: { field: string; ascending: boolean };
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string) {
    this.selects = columns.split(",").map((c) => c.trim());
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push({ field, operator: "eq", value });
    return this;
  }

  neq(field: string, value: any) {
    this.filters.push({ field, operator: "neq", value });
    return this;
  }

  not(field: string, operator: string, value: any) {
    if (operator === "is" && value === null) {
      this.filters.push({ field, operator: "not_null", value: null });
    }
    return this;
  }

  like(field: string, pattern: string) {
    this.filters.push({ field, operator: "like", value: pattern });
    return this;
  }

  in(field: string, values: any[]) {
    this.filters.push({ field, operator: "in", value: values });
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderBy = {
      field,
      ascending: options?.ascending ?? true,
    };
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  async single() {
    const results = await this.execute();
    if (results.length === 0) {
      return { data: null, error: { message: "No rows found" } };
    }
    return { data: results[0] as T, error: null };
  }

  async then(resolve: Function, reject: Function) {
    try {
      const results = await this.execute();
      resolve({ data: results, error: null });
    } catch (error) {
      reject(error);
    }
  }

  private async execute(): Promise<any[]> {
    let results: any[] = [];

    // Get data from local database
    switch (this.table) {
      case "players": {
        const filters: any = {};
        this.filters.forEach((f) => {
          if (f.operator === "eq") {
            if (f.field === "id") filters.id = f.value;
            if (f.field === "nfc_tag_id") filters.nfc_tag_id = f.value;
            if (f.field === "club_id") filters.club_id = f.value;
            if (f.field === "status") filters.status = f.value;
            if (f.field === "team_group") filters.team_group = f.value;
          }
          if (f.operator === "not_null") {
            // This means team_group IS NOT NULL, so we filter out nulls later
          }
        });
        results = localDB.players.select(filters);
        // Apply "not null" filter if present
        const hasNotNull = this.filters.some((f) => f.operator === "not_null");
        if (hasNotNull) {
          results = results.filter((p) => p.team_group !== null);
        }
        break;
      }
      case "clubs": {
        const filters: any = {};
        this.filters.forEach((f) => {
          if (f.operator === "eq") {
            if (f.field === "id") filters.id = f.value;
            if (f.field === "slug") filters.slug = f.value;
          }
        });
        results = localDB.clubs.select(filters);
        break;
      }
      case "payment_logs": {
        const filters: any = {};
        this.filters.forEach((f) => {
          if (f.operator === "eq") {
            if (f.field === "id") filters.id = f.value;
            if (f.field === "player_id") filters.player_id = f.value;
            if (f.field === "paid_for") filters.paid_for = f.value;
          }
          if (f.operator === "like") {
            if (f.field === "paid_for") filters.paid_for_like = f.value.replace(/%/g, "");
          }
        });
        results = localDB.payment_logs.select(filters);
        break;
      }
      case "push_subscriptions": {
        const filters: any = {};
        let hasNeq = false;
        let neqValue: any;
        let hasIn = false;
        let inValue: any[];
        
        this.filters.forEach((f) => {
          if (f.operator === "eq") {
            if (f.field === "id") filters.id = f.value;
            if (f.field === "player_id") filters.player_id = f.value;
            if (f.field === "endpoint") filters.endpoint = f.value;
          }
          if (f.operator === "neq") {
            hasNeq = true;
            neqValue = f.value;
          }
          if (f.operator === "in") {
            hasIn = true;
            inValue = f.value;
          }
        });
        
        if (hasIn) {
          const existing = localDB.push_subscriptions.select();
          results = existing.filter((s) => inValue.includes(s.id));
        } else if (hasNeq && filters.player_id) {
          const existing = localDB.push_subscriptions.select({ player_id: filters.player_id });
          results = existing.filter((s) => s.endpoint !== neqValue);
        } else {
          results = localDB.push_subscriptions.select(filters);
        }
        break;
      }
    }

    // Handle joins (for players with clubs) - moved after ordering/limit

    // Apply selects (simplified - just return all fields for now)
    // In a real implementation, you'd filter the fields

    // Apply ordering
    if (this.orderBy) {
      results.sort((a, b) => {
        const aVal = a[this.orderBy!.field];
        const bVal = b[this.orderBy!.field];
        if (aVal === bVal) return 0;
        const comparison = aVal < bVal ? -1 : 1;
        return this.orderBy!.ascending ? comparison : -comparison;
      });
    }

    // Apply limit
    if (this.limitCount) {
      results = results.slice(0, this.limitCount);
    }

    // Handle joins (for players with clubs)
    if (this.table === "players" && this.selects.some((s) => s.includes("clubs"))) {
      results = results.map((player) => {
        const club = localDB.clubs.select({ id: player.club_id })[0];
        return {
          ...player,
          clubs: club ? { name: club.name, slug: club.slug, emblem_url: club.emblem_url } : null,
        };
      });
    }

    return results;
  }
}

// Mock Supabase client
class MockSupabaseClient {
  from(table: string) {
    return new MockQueryBuilder(table);
  }

  // Insert operation
  async insert(data: any) {
    const table = (this as any).__currentTable;
    if (!table) {
      return { data: null, error: { message: "No table specified" } };
    }

    switch (table) {
      case "players": {
        const result = localDB.players.insert(data);
        return { data: result.data, error: result.error };
      }
      case "payment_logs": {
        const result = localDB.payment_logs.insert(data);
        return { data: result.data, error: result.error };
      }
      case "push_subscriptions": {
        const result = localDB.push_subscriptions.insert(data);
        return { data: result.data, error: result.error };
      }
      default:
        return { data: null, error: { message: `Unknown table: ${table}` } };
    }
  }

  // Update operation
  async update(data: any) {
    const table = (this as any).__currentTable;
    const filters = (this as any).__currentFilters || {};
    if (!table) {
      return { data: null, error: { message: "No table specified" } };
    }

    switch (table) {
      case "players": {
        const result = localDB.players.update(filters, data);
        return { data: result.data, error: result.error };
      }
      default:
        return { data: null, error: { message: `Update not supported for table: ${table}` } };
    }
  }

  // Delete operation
  async delete() {
    const table = (this as any).__currentTable;
    const filters = (this as any).__currentFilters || {};
    if (!table) {
      return { data: null, error: { message: "No table specified" } };
    }

    switch (table) {
      case "players": {
        const result = localDB.players.delete(filters);
        return { data: result.data, error: result.error };
      }
      case "push_subscriptions": {
        const result = localDB.push_subscriptions.delete(filters);
        return { data: result.data, error: result.error };
      }
      default:
        return { data: null, error: { message: `Delete not supported for table: ${table}` } };
    }
  }

  // Upsert operation
  async upsert(data: any, options?: { onConflict?: string }) {
    const table = (this as any).__currentTable;
    if (!table) {
      return { data: null, error: { message: "No table specified" } };
    }

    switch (table) {
      case "push_subscriptions": {
        const result = localDB.push_subscriptions.upsert(data, options);
        return { data: result.data, error: result.error };
      }
      case "players": {
        // For players, check if exists by nfc_tag_id
        const existing = localDB.players.select({ nfc_tag_id: data.nfc_tag_id });
        if (existing.length > 0) {
          const result = localDB.players.update({ nfc_tag_id: data.nfc_tag_id }, data);
          return { data: result.data, error: result.error };
        } else {
          const result = localDB.players.insert(data);
          return { data: result.data, error: result.error };
        }
      }
      default:
        return { data: null, error: { message: `Upsert not supported for table: ${table}` } };
    }
  }
}

// Enhanced query builder with chainable methods
class EnhancedQueryBuilder<T> extends MockQueryBuilder<T> {
  private client: MockSupabaseClient;
  private table: string;

  constructor(client: MockSupabaseClient, table: string) {
    super(table);
    this.client = client;
    this.table = table;
    (this.client as any).__currentTable = table;
  }

  insert(data: any) {
    (this.client as any).__currentTable = this.table;
    return Promise.resolve(this.client.insert(data));
  }

  update(data: any) {
    (this.client as any).__currentTable = this.table;
    // Capture filters for update
    const filters: any = {};
    (this as any).filters.forEach((f: any) => {
      if (f.operator === "eq") {
        filters[f.field] = f.value;
      }
    });
    (this.client as any).__currentFilters = filters;
    return Promise.resolve(this.client.update(data));
  }

  delete() {
    (this.client as any).__currentTable = this.table;
    const filters: any = {};
    (this as any).filters.forEach((f: any) => {
      if (f.operator === "eq") {
        filters[f.field] = f.value;
      }
      if (f.operator === "in") {
        filters.ids = f.value;
      }
    });
    (this.client as any).__currentFilters = filters;
    return Promise.resolve(this.client.delete());
  }

  upsert(data: any, options?: { onConflict?: string }) {
    (this.client as any).__currentTable = this.table;
    return Promise.resolve(this.client.upsert(data, options));
  }
}

// Create mock client
export function createMockClient() {
  const client = new MockSupabaseClient();
  return {
    from: (table: string) => new EnhancedQueryBuilder(client, table),
    channel: (name: string) => createMockChannel(name),
    removeChannel: () => {},
  };
}

// Mock Realtime Channel
class MockChannel {
  private name: string;
  private listeners: Map<string, Function[]> = new Map();

  constructor(name: string) {
    this.name = name;
  }

  on(event: string, config: any, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    // Subscribe to database events
    if (event === "postgres_changes" && config.table === "players") {
      dbEvents.on("player_updated", (payload: { old: any; new: any }) => {
        if (config.filter && config.filter.includes(`id=eq.${payload.new.id}`)) {
          callback({
            new: payload.new,
            old: payload.old,
          });
        }
      });
    }

    return this;
  }

  subscribe(callback?: (status: string, err?: any) => void) {
    if (callback) {
      callback("SUBSCRIBED");
    }
    return this;
  }
}

function createMockChannel(name: string) {
  return new MockChannel(name);
}
