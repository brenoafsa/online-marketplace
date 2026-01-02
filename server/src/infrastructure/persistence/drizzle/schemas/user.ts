import { text, timestamp, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { addressTable } from "./address";
import { reviewTable } from "./review";
import { wishListTable } from "./wishList";
import { productTable } from "./product";
import { purchaseTable } from "./purchase";

export const roleEnum = pgEnum("ROLE", ["CUSTOMER", "SELLER", "ADMIN"]);
export const languageEnum = pgEnum("LANGUAGE", ["BR", "EN"]);

export const userTable = pgTable("user", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone: text('phone').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  role: roleEnum('role').default("CUSTOMER"),
  language: languageEnum('language').default("EN")
})

export const usersRelations = relations(userTable, ({ one, many }) => ({
  address: one(addressTable),
  wishList: one(wishListTable),
  purchases: many(purchaseTable),
  sellProducts: many(productTable),
  reviews: many(reviewTable)
}))
