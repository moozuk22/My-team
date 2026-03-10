import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables (.env.local overrides .env for local dev)
dotenv.config();
const { existsSync } = await import("fs");
const rootDir = process.cwd();
const envLocalPath = join(rootDir, ".env.local");
if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
} else {
  const altPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
  if (existsSync(altPath)) dotenv.config({ path: altPath, override: true });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", (await import("./routes/index.js")).default);

app.listen(PORT, () => {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keySet = !!(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  if (url && keySet) {
    console.log(`   Supabase: ${url}`);
  } else {
    console.warn("   Supabase URL or anon key not set – using local DB or API will 500");
  }
});
