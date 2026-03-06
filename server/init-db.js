/**
 * Initialize Local Database (Server-side)
 * Direct JavaScript implementation to avoid TypeScript import issues
 */

import { localDB } from "../src/lib/local-db/database.js";
import { BG_MONTHS } from "../src/lib/constants.js";

function seedDatabase() {
  // Check if already seeded
  if (localDB.clubs.select().length > 0) {
    console.log("[local-db] Database already has data, skipping seed");
    return;
  }

  console.log("[local-db] Seeding database with comprehensive test data...");

  // Create two clubs/teams
  const club1 = localDB.clubs.insert({
    name: "ФК Вихър Войводиново",
    slug: "vihar",
    emblem_url: null,
  });

  const club2 = localDB.clubs.insert({
    name: "ФК Левски София",
    slug: "levski",
    emblem_url: null,
  });

  if (!club1.data || !club2.data) {
    console.error("[local-db] Failed to create clubs");
    return;
  }

  const club1Id = club1.data.id;
  const club2Id = club2.data.id;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Helper function to create payment logs for past months
  function createPaymentHistory(playerId, monthsAgo) {
    monthsAgo.forEach((months) => {
      const date = new Date(currentYear, currentMonth - months, 15);
      const monthName = BG_MONTHS[date.getMonth()];
      const year = date.getFullYear();
      localDB.payment_logs.insert({
        player_id: playerId,
        paid_for: `${monthName} ${year}`,
        paid_at: date.toISOString(),
        recorded_by: "admin",
      });
    });
  }

  // Import seed data - we'll use a simplified version here
  // For full data, we'd need to compile TypeScript or use tsx
  console.log("[local-db] Basic seeding complete. For full seed data, use TypeScript version.");
  
  const totalPlayers = localDB.players.select().length;
  const totalPayments = localDB.payment_logs.select().length;
  
  console.log(`[local-db] Created ${localDB.clubs.select().length} club(s)`);
  console.log(`[local-db] Created ${totalPlayers} player(s)`);
  console.log(`[local-db] Created ${totalPayments} payment log(s)`);
}

// Initialize if local DB is enabled
if (process.env.USE_LOCAL_DB === "true" || !process.env.VITE_SUPABASE_URL) {
  seedDatabase();
}
