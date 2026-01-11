import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@infrastructure/persistence/drizzle/index";
import { productTable } from "@infrastructure/persistence/drizzle/schemas/product";
import type { IProductRepository } from "@core/repositories/product.repository.interface";
import { Product } from "@core/entities/product.entity";
import type { CreateProductDTO, UpdateProductDTO, FindProductsParams, FindProductsRepository } from "@application/dtos/product.dto";
import { injectable } from "tsyringe";

@injectable()
export class ProductRepository implements IProductRepository {
    async create(product: CreateProductDTO): Promise<void> {
        await db.insert(productTable).values(product).returning();
    }

    async findAll(params: FindProductsParams): Promise<FindProductsRepository> {
        const offset = (params.page - 1) * params.limit;
        const limit = params.limit;
        const sort = params.sort;

        const sortTable = {
            'asc': productTable.createdAt,
            'desc': desc(productTable.createdAt),
            'priceAsc': productTable.price,
            'priceDesc': desc(productTable.price)
        }
        
        const products = await db
        .select()
        .from(productTable)
        .orderBy(sortTable[sort])
        .limit(limit)
        .offset(offset);

        if (!products) {
            throw new Error("Failed to find products. The database did not return records.");
        }

        const [result] = await db
        .select({ count: count() })
        .from(productTable);

        const total = result?.count ?? 0;

        return {
            products: products.map(p => new Product(p)),
            total: Number(total)
        }
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