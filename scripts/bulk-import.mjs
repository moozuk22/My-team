/**
 * Bulk Player Import Script
 *
 * Usage:
 *   node scripts/bulk-import.mjs
 *
 * Expected files:
 *   scripts/players.csv   — CSV with columns: full_name, team_group, jersey_number, birth_date
 *   scripts/photos/        — Player photos named Full_Name_JerseyNumber.jpg (Cyrillic OK)
 *
 * Output:
 *   scripts/final_import_mapping.csv — Mapping of full_name, jersey_number, nfc_tag_id
 */

import { createReadStream, readFileSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import csvParser from "csv-parser";

// ── Config ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local from project root
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "❌ Missing Supabase URL and key. Set in .env.local: VITE_SUPABASE_URL (or SUPABASE_URL) and VITE_SUPABASE_ANON_KEY (or SUPABASE_ANON_KEY or SERVICE_ROLE_KEY)"
  );
  process.exit(1);
}

// Prefer service role for storage uploads and bulk upserts; anon works if RLS allows
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CLUB_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"; // ФК Вихър Войводиново
const CSV_PATH = join(__dirname, "players.csv");
const PHOTOS_DIR = join(__dirname, "photos");
const OUTPUT_PATH = join(__dirname, "final_import_mapping.csv");
const STORAGE_BUCKET = "avatars";

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Generate nfc_tag_id: vihar-{year}-{jersey} */
function generateTagId(teamGroup, jerseyNumber, suffix = 0) {
  const base = `vihar-${teamGroup}-${jerseyNumber}`;
  return suffix > 0 ? `${base}-${suffix}` : base;
}

/** Build the expected photo filename from player data */
function buildPhotoFilename(fullName, jerseyNumber) {
  const nameWithUnderscores = fullName.replace(/\s+/g, "_");
  return `${nameWithUnderscores}_${jerseyNumber}.jpg`;
}

/** Read CSV into an array of row objects */
function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    createReadStream(filePath, { encoding: "utf-8" })
      .pipe(csvParser({ separator: ",", mapHeaders: ({ header }) => header.trim() }))
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(CSV_PATH)) {
    console.error(`❌ CSV file not found: ${CSV_PATH}`);
    console.error("   Create scripts/players.csv with columns: full_name, team_group, jersey_number, birth_date");
    process.exit(1);
  }

  console.log("📂 Reading players.csv...");
  const rows = await readCsv(CSV_PATH);
  console.log(`   Found ${rows.length} rows\n`);

  if (rows.length === 0) {
    console.error("❌ CSV is empty");
    process.exit(1);
  }

  // Track used tag IDs to detect collisions within this import batch
  const usedTagIds = new Set();
  const mappingRows = [];
  let successCount = 0;
  let photoCount = 0;

  for (const row of rows) {
    const fullName = row.full_name?.trim();
    const teamGroup = parseInt(row.team_group, 10);
    const jerseyNumber = parseInt(row.jersey_number, 10);
    const birthDate = row.birth_date?.trim() || null;

    if (!fullName || isNaN(teamGroup) || isNaN(jerseyNumber)) {
      console.warn(`⚠️  Skipping invalid row: ${JSON.stringify(row)}`);
      continue;
    }

    // 1. Generate unique nfc_tag_id
    let suffix = 0;
    let tagId = generateTagId(teamGroup, jerseyNumber, suffix);
    while (usedTagIds.has(tagId)) {
      suffix++;
      tagId = generateTagId(teamGroup, jerseyNumber, suffix);
    }
    usedTagIds.add(tagId);

    // 2. Find matching photo
    const photoFilename = buildPhotoFilename(fullName, jerseyNumber);
    const photoPath = join(PHOTOS_DIR, photoFilename);
    const hasPhoto = existsSync(photoPath);
    let avatarUrl = null;

    if (hasPhoto) {
      // Upload to Supabase Storage with a safe ASCII filename
      const storagePath = `${tagId}.jpg`;
      const fileBuffer = readFileSync(photoPath);

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.warn(`⚠️  Photo upload failed for ${fullName}: ${uploadError.message}`);
      } else {
        const { data: urlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(storagePath);
        avatarUrl = urlData.publicUrl;
        photoCount++;
      }
    }

    // 3. Upsert player into the database
    // Note: The DB enum is ('paid', 'warning', 'overdue') — no 'unpaid'.
    // Using 'warning' as the initial status for newly imported players.
    const { error: upsertError } = await supabase.from("players").upsert(
      {
        club_id: CLUB_ID,
        full_name: fullName,
        nfc_tag_id: tagId,
        status: "warning",
        jersey_number: `№${jerseyNumber}`,
        birth_date: birthDate,
        team_group: teamGroup,
        avatar_url: avatarUrl,
      },
      { onConflict: "nfc_tag_id" }
    );

    if (upsertError) {
      console.error(`❌ DB upsert failed for ${fullName}: ${upsertError.message}`);
      continue;
    }

    successCount++;
    mappingRows.push({ full_name: fullName, jersey_number: jerseyNumber, nfc_tag_id: tagId });

    const photoLabel = hasPhoto ? "Yes" : "No";
    console.log(`✅ Imported ${fullName} (Photo: ${photoLabel}) -> ${tagId}`);
  }

  // 4. Write the mapping CSV
  const csvHeader = "full_name,jersey_number,nfc_tag_id";
  const csvLines = mappingRows.map(
    (r) => `${r.full_name},${r.jersey_number},${r.nfc_tag_id}`
  );
  writeFileSync(OUTPUT_PATH, [csvHeader, ...csvLines].join("\n"), "utf-8");

  console.log("\n────────────────────────────────────────");
  console.log(`✅ Import complete: ${successCount}/${rows.length} players`);
  console.log(`📸 Photos uploaded: ${photoCount}`);
  console.log(`📄 Mapping exported: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
