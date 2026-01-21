import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const refreshTokenTable = pgTable("refresh_token", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  userId: text('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' })
})

export const refreshTokenRelations = relations(refreshTokenTable, ({ one }) => ({
  user: one(userTable)
}))