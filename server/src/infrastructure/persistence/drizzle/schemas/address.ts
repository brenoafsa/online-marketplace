import { text, doublePrecision, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const addressTable = pgTable("address", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  street: text('street').notNull(),
  neighborhood: text('neighborhood').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  userId: text('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' })
})

export const addressRelations = relations(addressTable, ({ one }) => ({
  user: one(userTable)
}))