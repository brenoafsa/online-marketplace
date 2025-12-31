import { text, real, timestamp, pgTable, check } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";
import { productTable } from "./product";

export const reviewTable = pgTable("review", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  stars: real('stars').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
}, (table) => [
    check("valid_stars_check", sql`${table.stars} BETWEEN 0 AND 5`)
])

export const reviewRelations = relations(reviewTable, ({ one }) => ({
  user: one(userTable),
  product: one(productTable)
}))
