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
