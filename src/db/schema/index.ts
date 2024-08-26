import { int, varchar, datetime, mysqlTable, date, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  firstname: varchar("firstname", { length: 50 }).notNull(),      
  lastname: varchar("lastname", { length: 50 }).notNull(),      
  middlename: varchar("middlename", { length: 50 }),
  birthday: date("birthday").notNull(),
  age: varchar("age", { length: 3 }).notNull(),
  gender: varchar("gender",  { length: 1, enum: ["M", "F"] }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),    
  password: varchar("password", { length: 256 }).notNull(),
  role: varchar("role",{ length: 11, enum: ["admin", "user"] }).notNull(),
  active: mysqlEnum('active', ['1', '0']).default('1').notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});