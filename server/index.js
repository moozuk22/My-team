import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize local database if enabled
if (process.env.USE_LOCAL_DB === "true" || !process.env.VITE_SUPABASE_URL) {
  try {
    // Import the TypeScript init file (tsx handles TS imports)
    const { initLocalDB } = await import("../src/lib/local-db/init.ts");
    initLocalDB();
  } catch (error) {
    console.error("Failed to initialize local database:", error.message);
    // Fallback to JS version
    try {
      await import("./init-db.js");
    } catch (fallbackError) {
      console.error("Fallback initialization also failed:", fallbackError.message);
    }
  }
}

// API Routes
app.use("/api", (await import("./routes/index.js")).default);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
