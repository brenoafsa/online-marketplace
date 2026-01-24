import { isNotNull, and, count, desc, eq, gte, lte, SQL } from "drizzle-orm";
import { db } from "@infrastructure/persistence/drizzle/index";
import { productTable } from "@infrastructure/persistence/drizzle/schemas/product";
import type { IProductRepository } from "@core/repositories/product.repository.interface";
import { Product } from "@core/entities/product.entity";
import type {
    CreateProductDTO,
    UpdateProductDTO,
    FindProductsParams,
    FindProductsRepository,
    FindCategoryCountResponse
} from "@application/dtos/product.dto";
import { injectable } from "tsyringe";

@injectable()
export class ProductRepository implements IProductRepository {
    async create(product: CreateProductDTO): Promise<void> {
        await db.insert(productTable).values(product).returning();
    }

    async findAll(params: FindProductsParams): Promise<FindProductsRepository> {
        const offset = (params.page - 1) * params.limit;
        const limit = params.limit;
        const category = params.category;
        const sort = params.sort_by;
        const isSale = params.isSale;
        const isSpotlight = params.isSpotlight;
        const star_avg = params.star_avg;
        const price_gte = params.price_gte;
        const price_lte = params.price_lte;

        const sortTable = {
            'created-asc': productTable.createdAt,
            'created-desc': desc(productTable.createdAt),
            'price-asc': productTable.price,
            'price-desc': desc(productTable.price),
            'star_avg-asc': productTable.stars,
            'star_avg-desc': desc(productTable.stars),
        }

        const filters: (SQL | undefined)[] = [
            category ? eq(productTable.category, category) : undefined,
            isSale ? isNotNull(productTable.salePercentage) : undefined,
            isSpotlight ? eq(productTable.onSpotlight, true) : undefined,
            star_avg ? gte(productTable.stars, star_avg) : undefined,
            price_gte ? gte(productTable.price, price_gte) : undefined,
            price_lte ? lte(productTable.price, price_lte) : undefined,
        ]

        const products = await db
            .select()
            .from(productTable)
            .orderBy(sortTable[sort])
            .limit(limit)
            .where(and(...filters))
            .offset(offset);

        if (!products) {
            throw new Error("Failed to find products. The database did not return records.");
        }

        const [result] = await db
            .select({ count: count() })
            .from(productTable)
            .where(and(...filters));

        const total = result?.count ?? 0;

        return {
            products: products.map(p => new Product(p)),
            total: Number(total)
        }
    }

    async findCategoryCount(): Promise<FindCategoryCountResponse[]> {
        const result = await db
            .select({
                category: productTable.category,
                count: count()
            })
            .from(productTable)
            .groupBy(productTable.category);

        if (!result) {
            throw Error("Failed to fetch products quantity. The database did not return records required.")
        }

        const data = result.map(row => ({
            category: row.category,
            count: Number(row.count)
        }));

        return data;
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