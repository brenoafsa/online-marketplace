import { text, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { productTable } from "./product";

export const wishListTable = pgTable("wish_list", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
})

export const wishListRelations = relations(wishListTable, ({ many }) => ({
  products: many(wishListProductTable)
}))

// Many-to-Many table (product-wishList)
export const wishListProductTable = pgTable("wish_list_product", {
  wishListId: text("wish_list_id")
    .notNull()
    .references(() => wishListTable.id),
  productId: text("product_id")
    .notNull()
    .references(() => productTable.id),
});