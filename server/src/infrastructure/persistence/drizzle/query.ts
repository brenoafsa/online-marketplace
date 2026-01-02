import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { productTable } from './schemas/product';
import { reviewTable } from './schemas/review';
import { productOrderTable } from './schemas/purchase';
import { userTable } from './schemas/user';
import { eq, avg, count, sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function query() {
    const spotlightProducts = await db
    .select({
      id: productTable.id,
      title: productTable.title,
      price: productTable.price,
      salePercentage: productTable.salePercentage,
      salePrice: sql<number>`ROUND((${productTable.price} * (1 - COALESCE(${productTable.salePercentage}, 0) / 100.0))::numeric, 2)`,
      reviewsCount: count(reviewTable.id),
      reviewMean: avg(reviewTable.stars),
      purchaseCount: count(productOrderTable.id),
      category: productTable.category,
      creatorName: sql<string>`${userTable.firstName} || ' ' || ${userTable.lastName}`
    })
    .from(productTable)
    .leftJoin(reviewTable, eq(reviewTable.productId, productTable.id))
    .leftJoin(productOrderTable, eq(productOrderTable.productId, productTable.id))
    .leftJoin(userTable, eq(productTable.creatorId, userTable.id))
    .where(eq(productTable.onSpotlight, true))
    .groupBy(productTable.id, productTable.title, productTable.price, productTable.salePercentage, userTable.firstName, userTable.lastName)
    .orderBy(productTable.price);

    console.log('--- Spotlight Products ---');
    console.log(JSON.stringify(spotlightProducts, null, 2));
}

query().catch(console.error);