<<<<<<< HEAD
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
import {} from "drizzle-orm/pg-core"

generator client {
    provider = "prisma-client-js"
    output   = "../app/generated/prisma"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model User {
    id        Int      @id @default(autoincrement())
    name      String
    email     String   @unique
    password  String
    createdAt DateTime @default(now())
    tasks    Task[]
  }
  
  model Task {
    id          Int      @id @default(autoincrement())
    subject     String
    description String
    date        DateTime
    userId      Int
    user        User     @relation(fields: [userId], references: [id])
  }

export const users = pgTable("user", {
    id: uuid
})
=======
// schema.ts
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  date: timestamp("date").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
});


export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
>>>>>>> master
