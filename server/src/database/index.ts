import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { userTable } from './schemas/user';
import { addressTable } from './schemas/address';
import { productTable } from './schemas/product';
import { wishListTable, wishListProductTable } from './schemas/wishList';
import { purchaseTable, productOrderTable } from './schemas/purchase';
import { reviewTable } from './schemas/review';

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  // Usuário
  const [user] = await db.insert(userTable).values({
    firstName: 'Alice',
    lastName: 'Silva',
    email: 'alice@example.com',
    password: 'senha123',
    phone: '11999999999',
    role: 'CUSTOMER',
    language: 'BR'
  }).returning();

  // Endereço
  const [address] = await db.insert(addressTable).values({
    street: 'Rua das Flores',
    neighborhood: 'Centro',
    latitude: -23.55052,
    longitude: -46.633308
  }).returning();

  // Produto
  const [product] = await db.insert(productTable).values({
    title: 'Curso de TypeScript',
    price: 99.9,
    salePercentage: 10,
    onSpotlight: true,
    type: 'DIGITAL',
    category: 'COURSE'
  }).returning();

  // Wishlist
  const [wishList] = await db.insert(wishListTable).values({}).returning();

  // Wishlist-Product
  await db.insert(wishListProductTable).values({
    wishListId: wishList!.id,
    productId: product!.id
  });

  // Compra
  const [purchase] = await db.insert(purchaseTable).values({
    totalPrice: 89.91
  }).returning();

  // ProductOrder
  await db.insert(productOrderTable).values({
    quantity: 1,
    priceAtPurchase: 89.91,
    purchaseId: purchase!.id,
    productId: product!.id
  });

  // Review
  await db.insert(reviewTable).values({
    stars: 5,
    content: 'Excelente curso!',
  });

  console.log('Seed concluído!');
}

seed().catch(console.error);