/**
 * Initialize Local Database
 * 
 * This should be called on server startup to seed the database.
 */

import { seedDatabase } from "./seed";

export function initLocalDB() {
  // Only run in local mode (server-side only)
  if (typeof window === "undefined") {
    if (
      process.env.USE_LOCAL_DB === "true" ||
      (!process.env.VITE_SUPABASE_URL && !process.env.SUPABASE_URL)
    ) {
      seedDatabase();
    }
  }
}

// Auto-initialize if called directly (for backward compatibility)
if (typeof window === "undefined") {
  if (
    process.env.USE_LOCAL_DB === "true" ||
    (!process.env.VITE_SUPABASE_URL && !process.env.SUPABASE_URL)
  ) {
    initLocalDB();
  }
}
