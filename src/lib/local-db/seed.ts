/**
 * Seed Data for Local Database
 * 
 * Creates comprehensive test data for development and testing.
 */

import { localDB } from "./database";
import { BG_MONTHS } from "@/lib/constants";

export function seedDatabase() {
  // Check if already seeded
  if (localDB.clubs.select().length > 0) {
    console.log("[local-db] Database already has data, skipping seed");
    return;
  }

  console.log("[local-db] Seeding database with comprehensive test data...");

  // Create multiple clubs/teams for testing
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

  const club3 = localDB.clubs.insert({
    name: "ФК ЦСКА София",
    slug: "cska",
    emblem_url: null,
  });

  const club4 = localDB.clubs.insert({
    name: "ФК Славия София",
    slug: "slavia",
    emblem_url: null,
  });

  const club5 = localDB.clubs.insert({
    name: "ФК Лудогорец Разград",
    slug: "ludogorets",
    emblem_url: null,
  });

  if (!club1.data || !club2.data || !club3.data || !club4.data || !club5.data) {
    console.error("[local-db] Failed to create clubs");
    return;
  }

  const club1Id = club1.data.id;
  const club2Id = club2.data.id;
  const club3Id = club3.data.id;
  const club4Id = club4.data.id;
  const club5Id = club5.data.id;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Helper function to create payment logs for past months
  function createPaymentHistory(playerId: string, monthsAgo: number[]) {
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

  // Comprehensive player data across multiple team groups
  const players = [
    // Club 1: ФК Вихър Войводиново - Team Group 2014 (U10)
    {
      club_id: club1Id,
      full_name: "Александър Иванов",
      nfc_tag_id: "vihar-2014-1",
      status: "paid" as const,
      jersey_number: "№1",
      birth_date: "2014-01-15",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3], // Paid for last 4 months
    },
    {
      club_id: club1Id,
      full_name: "Николай Петров",
      nfc_tag_id: "vihar-2014-7",
      status: "paid" as const,
      jersey_number: "№7",
      birth_date: "2014-07-22",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club1Id,
      full_name: "Димитър Георгиев",
      nfc_tag_id: "vihar-2014-10",
      status: "warning" as const,
      jersey_number: "№10",
      birth_date: "2014-03-10",
      team_group: 2014,
      last_payment_date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2, 3], // Missing current month
    },
    {
      club_id: club1Id,
      full_name: "Мартин Стоянов",
      nfc_tag_id: "vihar-2014-9",
      status: "overdue" as const,
      jersey_number: "№9",
      birth_date: "2014-11-05",
      team_group: 2014,
      last_payment_date: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2, 3], // Missing last 2 months
    },

    // Team Group 2015 (U9)
    {
      club_id: club1Id,
      full_name: "Мария Георгиева",
      nfc_tag_id: "vihar-2015-7",
      status: "overdue" as const,
      jersey_number: "№7",
      birth_date: "2015-11-20",
      team_group: 2015,
      last_payment_date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2, 3],
    },
    {
      club_id: club1Id,
      full_name: "Виктория Димитрова",
      nfc_tag_id: "vihar-2015-11",
      status: "paid" as const,
      jersey_number: "№11",
      birth_date: "2015-05-14",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3, 4, 5], // Paid for 6 months
    },
    {
      club_id: club1Id,
      full_name: "Теодор Николов",
      nfc_tag_id: "vihar-2015-5",
      status: "warning" as const,
      jersey_number: "№5",
      birth_date: "2015-08-30",
      team_group: 2015,
      last_payment_date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2, 3],
    },
    {
      club_id: club1Id,
      full_name: "Калин Андреев",
      nfc_tag_id: "vihar-2015-3",
      status: "paid" as const,
      jersey_number: "№3",
      birth_date: "2015-02-18",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },

    // Team Group 2016 (U8)
    {
      club_id: club1Id,
      full_name: "Демо Играч",
      nfc_tag_id: "vihar_01",
      status: "paid" as const,
      jersey_number: "№14",
      birth_date: "2016-08-18",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3, 4, 5, 6], // Full payment history
    },
    {
      club_id: club1Id,
      full_name: "Иван Петров",
      nfc_tag_id: "vihar-2016-10",
      status: "warning" as const,
      jersey_number: "№10",
      birth_date: "2016-03-15",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2, 3],
    },
    {
      club_id: club1Id,
      full_name: "Анна Димитрова",
      nfc_tag_id: "vihar-2016-9",
      status: "warning" as const,
      jersey_number: "№9",
      birth_date: "2016-09-05",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },
    {
      club_id: club1Id,
      full_name: "Радослав Тодоров",
      nfc_tag_id: "vihar-2016-6",
      status: "paid" as const,
      jersey_number: "№6",
      birth_date: "2016-12-08",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club1Id,
      full_name: "Борислав Стефанов",
      nfc_tag_id: "vihar-2016-4",
      status: "overdue" as const,
      jersey_number: "№4",
      birth_date: "2016-04-25",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [3, 4],
    },

    // Team Group 2017 (U7)
    {
      club_id: club1Id,
      full_name: "Георги Стоянов",
      nfc_tag_id: "vihar-2017-5",
      status: "paid" as const,
      jersey_number: "№5",
      birth_date: "2017-06-10",
      team_group: 2017,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club1Id,
      full_name: "Стефан Василев",
      nfc_tag_id: "vihar-2017-8",
      status: "paid" as const,
      jersey_number: "№8",
      birth_date: "2017-09-12",
      team_group: 2017,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club1Id,
      full_name: "Янко Кръстев",
      nfc_tag_id: "vihar-2017-2",
      status: "warning" as const,
      jersey_number: "№2",
      birth_date: "2017-01-20",
      team_group: 2017,
      last_payment_date: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },
    {
      club_id: club1Id,
      full_name: "Любомир Павлов",
      nfc_tag_id: "vihar-2017-12",
      status: "overdue" as const,
      jersey_number: "№12",
      birth_date: "2017-10-03",
      team_group: 2017,
      last_payment_date: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2],
    },

    // Team Group 2018 (U6)
    {
      club_id: club1Id,
      full_name: "Даниел Милев",
      nfc_tag_id: "vihar-2018-1",
      status: "paid" as const,
      jersey_number: "№1",
      birth_date: "2018-07-15",
      team_group: 2018,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club1Id,
      full_name: "Емил Цветанов",
      nfc_tag_id: "vihar-2018-13",
      status: "warning" as const,
      jersey_number: "№13",
      birth_date: "2018-03-22",
      team_group: 2018,
      last_payment_date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1],
    },

    // Club 2: ФК Левски София - Team Group 2014 (U10)
    {
      club_id: club2Id,
      full_name: "Стефан Димитров",
      nfc_tag_id: "levski-2014-10",
      status: "paid" as const,
      jersey_number: "№10",
      birth_date: "2014-05-20",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club2Id,
      full_name: "Кристиян Петров",
      nfc_tag_id: "levski-2014-9",
      status: "paid" as const,
      jersey_number: "№9",
      birth_date: "2014-09-12",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club2Id,
      full_name: "Николай Георгиев",
      nfc_tag_id: "levski-2014-7",
      status: "warning" as const,
      jersey_number: "№7",
      birth_date: "2014-12-03",
      team_group: 2014,
      last_payment_date: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },

    // Club 2: Team Group 2015 (U9)
    {
      club_id: club2Id,
      full_name: "Ивайло Стоянов",
      nfc_tag_id: "levski-2015-11",
      status: "paid" as const,
      jersey_number: "№11",
      birth_date: "2015-04-18",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3],
    },
    {
      club_id: club2Id,
      full_name: "Мартин Иванов",
      nfc_tag_id: "levski-2015-8",
      status: "paid" as const,
      jersey_number: "№8",
      birth_date: "2015-07-25",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club2Id,
      full_name: "Давид Николов",
      nfc_tag_id: "levski-2015-6",
      status: "overdue" as const,
      jersey_number: "№6",
      birth_date: "2015-10-14",
      team_group: 2015,
      last_payment_date: new Date(Date.now() - 66 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2, 3],
    },

    // Club 2: Team Group 2016 (U8)
    {
      club_id: club2Id,
      full_name: "Александър Василев",
      nfc_tag_id: "levski-2016-10",
      status: "paid" as const,
      jersey_number: "№10",
      birth_date: "2016-02-28",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3, 4],
    },
    {
      club_id: club2Id,
      full_name: "Борис Тодоров",
      nfc_tag_id: "levski-2016-7",
      status: "warning" as const,
      jersey_number: "№7",
      birth_date: "2016-06-11",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },
    {
      club_id: club2Id,
      full_name: "Виктор Стефанов",
      nfc_tag_id: "levski-2016-5",
      status: "paid" as const,
      jersey_number: "№5",
      birth_date: "2016-11-07",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },

    // Club 2: Team Group 2017 (U7)
    {
      club_id: club2Id,
      full_name: "Петър Кръстев",
      nfc_tag_id: "levski-2017-9",
      status: "paid" as const,
      jersey_number: "№9",
      birth_date: "2017-03-19",
      team_group: 2017,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club2Id,
      full_name: "Димитър Павлов",
      nfc_tag_id: "levski-2017-4",
      status: "warning" as const,
      jersey_number: "№4",
      birth_date: "2017-08-22",
      team_group: 2017,
      last_payment_date: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1],
    },

    // Club 3: ФК ЦСКА София - Team Group 2014 (U10)
    {
      club_id: club3Id,
      full_name: "Ивайло Стоянов",
      nfc_tag_id: "cska-2014-10",
      status: "paid" as const,
      jersey_number: "№10",
      birth_date: "2014-06-15",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club3Id,
      full_name: "Петър Георгиев",
      nfc_tag_id: "cska-2014-7",
      status: "paid" as const,
      jersey_number: "№7",
      birth_date: "2014-09-20",
      team_group: 2014,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club3Id,
      full_name: "Николай Димитров",
      nfc_tag_id: "cska-2014-9",
      status: "warning" as const,
      jersey_number: "№9",
      birth_date: "2014-03-12",
      team_group: 2014,
      last_payment_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },

    // Club 3: Team Group 2015 (U9)
    {
      club_id: club3Id,
      full_name: "Стефан Петров",
      nfc_tag_id: "cska-2015-11",
      status: "paid" as const,
      jersey_number: "№11",
      birth_date: "2015-05-18",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3],
    },
    {
      club_id: club3Id,
      full_name: "Мартин Иванов",
      nfc_tag_id: "cska-2015-8",
      status: "overdue" as const,
      jersey_number: "№8",
      birth_date: "2015-11-25",
      team_group: 2015,
      last_payment_date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2, 3],
    },

    // Club 4: ФК Славия София - Team Group 2016 (U8)
    {
      club_id: club4Id,
      full_name: "Александър Стоянов",
      nfc_tag_id: "slavia-2016-10",
      status: "paid" as const,
      jersey_number: "№10",
      birth_date: "2016-02-14",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club4Id,
      full_name: "Борис Георгиев",
      nfc_tag_id: "slavia-2016-7",
      status: "paid" as const,
      jersey_number: "№7",
      birth_date: "2016-07-22",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club4Id,
      full_name: "Виктор Петров",
      nfc_tag_id: "slavia-2016-5",
      status: "warning" as const,
      jersey_number: "№5",
      birth_date: "2016-10-08",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1],
    },

    // Club 4: Team Group 2017 (U7)
    {
      club_id: club4Id,
      full_name: "Давид Николов",
      nfc_tag_id: "slavia-2017-9",
      status: "paid" as const,
      jersey_number: "№9",
      birth_date: "2017-04-19",
      team_group: 2017,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },

    // Club 5: ФК Лудогорец Разград - Team Group 2015 (U9)
    {
      club_id: club5Id,
      full_name: "Кристиян Василев",
      nfc_tag_id: "ludogorets-2015-10",
      status: "paid" as const,
      jersey_number: "№10",
      birth_date: "2015-08-12",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2, 3, 4],
    },
    {
      club_id: club5Id,
      full_name: "Димитър Тодоров",
      nfc_tag_id: "ludogorets-2015-7",
      status: "paid" as const,
      jersey_number: "№7",
      birth_date: "2015-12-03",
      team_group: 2015,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1, 2],
    },
    {
      club_id: club5Id,
      full_name: "Стефан Кръстев",
      nfc_tag_id: "ludogorets-2015-6",
      status: "warning" as const,
      jersey_number: "№6",
      birth_date: "2015-01-28",
      team_group: 2015,
      last_payment_date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [1, 2],
    },

    // Club 5: Team Group 2016 (U8)
    {
      club_id: club5Id,
      full_name: "Иван Павлов",
      nfc_tag_id: "ludogorets-2016-11",
      status: "paid" as const,
      jersey_number: "№11",
      birth_date: "2016-05-17",
      team_group: 2016,
      last_payment_date: new Date().toISOString(),
      avatar_url: null,
      paymentHistory: [0, 1],
    },
    {
      club_id: club5Id,
      full_name: "Любомир Стефанов",
      nfc_tag_id: "ludogorets-2016-4",
      status: "overdue" as const,
      jersey_number: "№4",
      birth_date: "2016-09-11",
      team_group: 2016,
      last_payment_date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
      avatar_url: null,
      paymentHistory: [2],
    },
  ];

  // Insert players and create payment history
  players.forEach((playerData) => {
    const { paymentHistory, ...playerInsertData } = playerData;
    const result = localDB.players.insert(playerInsertData);
    
    if (result.data && paymentHistory && paymentHistory.length > 0) {
      createPaymentHistory(result.data.id, paymentHistory);
    }
  });

  const totalPlayers = localDB.players.select().length;
  const totalPayments = localDB.payment_logs.select().length;
  const paidCount = localDB.players.select({ status: "paid" }).length;
  const warningCount = localDB.players.select({ status: "warning" }).length;
  const overdueCount = localDB.players.select({ status: "overdue" }).length;

  const club1Players = localDB.players.select({ club_id: club1Id }).length;
  const club2Players = localDB.players.select({ club_id: club2Id }).length;
  const club3Players = localDB.players.select({ club_id: club3Id }).length;
  const club4Players = localDB.players.select({ club_id: club4Id }).length;
  const club5Players = localDB.players.select({ club_id: club5Id }).length;

  console.log("[local-db] Seed complete!");
  console.log(`[local-db] Created ${localDB.clubs.select().length} club(s)`);
  console.log(`[local-db]   - ФК Вихър Войводиново: ${club1Players} players`);
  console.log(`[local-db]   - ФК Левски София: ${club2Players} players`);
  console.log(`[local-db]   - ФК ЦСКА София: ${club3Players} players`);
  console.log(`[local-db]   - ФК Славия София: ${club4Players} players`);
  console.log(`[local-db]   - ФК Лудогорец Разград: ${club5Players} players`);
  console.log(`[local-db] Created ${totalPlayers} player(s) total`);
  console.log(`[local-db]   - Paid: ${paidCount}`);
  console.log(`[local-db]   - Warning: ${warningCount}`);
  console.log(`[local-db]   - Overdue: ${overdueCount}`);
  console.log(`[local-db] Created ${totalPayments} payment log(s)`);
  console.log(`[local-db]`);
  console.log(`[local-db] Test URLs:`);
  console.log(`[local-db]   - Club 1 players: /p/vihar_01, /p/vihar-2016-10, /p/vihar-2015-7`);
  console.log(`[local-db]   - Club 2 players: /p/levski-2016-10, /p/levski-2015-11, /p/levski-2017-9`);
  console.log(`[local-db]   - Club 3 players: /p/cska-2014-10, /p/cska-2015-11`);
  console.log(`[local-db]   - Club 4 players: /p/slavia-2016-10, /p/slavia-2017-9`);
  console.log(`[local-db]   - Club 5 players: /p/ludogorets-2015-10, /p/ludogorets-2016-11`);
  console.log(`[local-db]   - Admin: /admin/players`);
}
