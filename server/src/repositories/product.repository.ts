import { and, eq } from "drizzle-orm";
import { db } from "../database";
import { type Product, type NewProduct, productTable } from "../database/schemas/product";

export const productRepository = {
    async create(product: NewProduct): Promise<Product> {
        const [newProduct] = await db.insert(productTable).values(product).returning();

        if (!newProduct) {
            throw new Error("Failed to create product. The database did not return the new record.");
        }

        return newProduct;
    },

    async get(): Promise<Product[]> {
        const products = await db.select().from(productTable);

        if (!products) {
            throw new Error("Failed to get products. The database did not return records.");
        }

        return products
    },

    async getByTitleCreatorId(title: string, creatorId: string): Promise<Product | undefined> {
        const [product] = await db
            .select()
            .from(productTable)
            .where(
                and(
                    eq(productTable.title, title),
                    eq(productTable.creatorId, creatorId)
                )
            )
            .limit(1);

        return product
    },
    
    async getById(id: string): Promise<Product> {
        const [product] = await db.select().from(productTable).where(eq(productTable.id, id)).limit(1);

        if (!product) {
            throw new Error("Failed to get product. The database did not return record.");
        }

        return product
    }
}