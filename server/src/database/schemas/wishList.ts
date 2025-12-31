import { text, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { productTable } from "./product";
import { userTable } from "./user";

export const wishListTable = pgTable("wish_list", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  userId: text('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' })
})

export const wishListRelations = relations(wishListTable, ({ many }) => ({
  products: many(wishListProductTable)
}))

// Many-to-Many table (product-wishList)
export const wishListProductTable = pgTable("wish_list_product", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  wishListId: text("wish_list_id")
    .notNull()
    .references(() => wishListTable.id),
  productId: text("product_id")
    .notNull()
    .references(() => productTable.id),
});