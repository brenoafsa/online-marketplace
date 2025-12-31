import { text, integer, real, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { userTable } from "./user";
import { addressTable } from "./address";
import { productTable } from "./product";

export const purchaseTable = pgTable("purchase", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  totalPrice: real('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: text('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  addressId: text('address_id').notNull().references(() => addressTable.id)
})

export const purchaseRelations = relations(purchaseTable, ({ one, many }) => ({
  buyer: one(userTable),
  deliverTo: one(addressTable),
  itens: many(productOrderTable)
}))

// Many-to-Many table (product-order)
export const productOrderTable = pgTable("product_order", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: real('price_at_purchase').notNull(),
    purchaseId: text("purchase_id")
        .notNull()
        .references(() => purchaseTable.id),
    productId: text("product_id")
        .notNull()
        .references(() => productTable.id),
});
