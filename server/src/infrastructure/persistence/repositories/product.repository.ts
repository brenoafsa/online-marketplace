import { and, desc, eq } from "drizzle-orm";
import { db } from "../drizzle/index";
import { productTable } from "../drizzle/schemas/product";
import type { IProductRepository } from "../../../core/repositories/product.repository.interface";
import { Product } from "../../../core/entities/product.entity";
import type { CreateProductDTO, UpdateProductDTO } from "../../../application/dtos/product.dto";

export class ProductRepository implements IProductRepository {
    async create(product: CreateProductDTO): Promise<void> {
        await db.insert(productTable).values(product).returning();
    }

    async findAll(): Promise<Product[]> {
        const products = await db.select().from(productTable).orderBy(desc(productTable.createdAt));

        if (!products) {
            throw new Error("Failed to find products. The database did not return records.");
        }

        return products.map(p => new Product(p));
    }

    async findByTitleCreatorId(title: string, creatorId: string): Promise<Product | undefined> {
        const [product] = await db
        .select()
        .from(productTable)
        .where(and(eq(productTable.title, title), eq(productTable.creatorId, creatorId)))
        .limit(1);

        if (!product) {
            return undefined;
        }

        return new Product(product)
    }
    
    async findById(id: string): Promise<Product> {
        const [product] = await db.select().from(productTable).where(eq(productTable.id, id)).limit(1);

        if (!product) {
            throw new Error("Failed to find product. The database did not return record.");
        }

        return new Product(product);
    }

    async update(id: string, changes: UpdateProductDTO): Promise<void> {
        await db.update(productTable).set({
            ...changes,
            updatedAt: new Date()
        }).where(eq(productTable.id, id));
    }

    async delete(id: string): Promise<void> {
        await db.delete(productTable).where(eq(productTable.id, id));
    }
}