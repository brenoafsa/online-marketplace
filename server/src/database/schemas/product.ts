import { text, integer, real, boolean, pgTable, pgEnum, check } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";
import { reviewTable } from "./review";
import { wishListProductTable } from "./wishList";
import { productOrderTable } from "./purchase";

export const productTypeEnum = pgEnum("PRODUCT_TYPE", ["PHYSICAL", "DIGITAL"]);
export const categoryEnum = pgEnum("CATEGORY", ["GAME", "ASSET", "COURSE", "AUDIO", "TEMPLATE", "SOFTWARE", "E-BOOK", "VIDEO"]);

export const productTable = pgTable("product", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  title: text('title').notNull(),
  price: real('price').notNull(),
  salePercentage: integer('sale_percentage'),
  purchaseCount: integer('purchase_count').default(0),
  onSpotlight: boolean('on_spotlight').default(false).notNull(),
  stars: real('stars').default(0),
  type: productTypeEnum('type').notNull(),
  category: categoryEnum('category').notNull(),
  creatorId: text('creator_id').notNull().references(() => userTable.id)
}, (table) => [
  check("valid_percentage_check", sql`${table.salePercentage} BETWEEN 1 AND 100`),
  check("valid_stars_check", sql`${table.stars} BETWEEN 0 AND 5`)
])

export const productRelations = relations(productTable, ({one, many }) => ({
  creator: one(userTable),
  wishLists: many(wishListProductTable),
  reviews: many(reviewTable),
  itens: many(productOrderTable)
}))
