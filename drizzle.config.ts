import { defineConfig } from 'drizzle-kit'
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not set");
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  dialect: 'mysql',
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
})