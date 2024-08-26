import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const formSchema = createInsertSchema(users, {
    firstname: z.string().min(3, {message: "firstname must be at least 3 characters"}).max(50),
    middlename: z.string().max(50).optional(),
    lastname: z.string().min(3).max(50),
    birthday: z.date().min(new Date(1924, 0, 1)).max(new Date()),
    age: z.string().min(1).max(100),
    gender: z.enum(["M", "F"]), 
    email: z.string().email(),
    password: z.string().min(8).max(256),
    role: z.enum(["admin", "user"]),
    active: z.preprocess((val) => (val === true ? 1 : 0), z.number().refine((val) => val === 1 || val === 0)),
  });

  export type typeCreateSchema = z.infer<typeof formSchema>;