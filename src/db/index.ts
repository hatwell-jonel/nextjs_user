import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const db = drizzle(poolConnection, {
  schema: {...schema},
  mode: "default",
});