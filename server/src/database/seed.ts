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
  console.log('Seeding database...');

  const [user1] = await db.insert(userTable).values({
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@example.com',
    password: 'senha123',
    phone: '11987654321',
    role: 'CUSTOMER',
    language: 'BR'
  }).returning();

  const [address1] = await db.insert(addressTable).values({
    street: 'Rua das Palmeiras, 123',
    neighborhood: 'Vila Madalena',
    latitude: -23.556,
    longitude: -46.69,
    userId: user1!.id
  }).returning();

  const [user2] = await db.insert(userTable).values({
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@example.com',
    password: 'senha456',
    phone: '21912345678',
    role: 'CUSTOMER',
    language: 'BR'
  }).returning();

  const [address2] = await db.insert(addressTable).values({
    street: 'Avenida Atlântica, 456',
    neighborhood: 'Copacabana',
    latitude: -22.971,
    longitude: -43.182,
    userId: user2!.id
  }).returning();

  console.log('Users and addresses created.');

  const [product1] = await db.insert(productTable).values({
    title: 'Livro de Ficção Científica',
    price: 49.9,
    salePercentage: null,
    onSpotlight: true,
    type: 'PHYSICAL',
    category: 'VIDEO',
    creatorId: user1!.id
  }).returning();

  const [product2] = await db.insert(productTable).values({
    title: 'Curso de Design Gráfico',
    price: 199.9,
    salePercentage: 15,
    onSpotlight: true,
    type: 'DIGITAL',
    category: 'COURSE',
    creatorId: user2!.id
  }).returning();

  const [product3] = await db.insert(productTable).values({
    title: 'Fone de Ouvido Bluetooth',
    price: 299.9,
    salePercentage: 10,
    onSpotlight: false,
    type: 'PHYSICAL',
    category: 'TEMPLATE',
    creatorId: user1!.id
  }).returning();

  console.log('Products created.');

  const [wishList1] = await db.insert(wishListTable).values({ userId: user1!.id }).returning();
  await db.insert(wishListProductTable).values([
    { wishListId: wishList1!.id, productId: product1!.id },
    { wishListId: wishList1!.id, productId: product2!.id }
  ]);

  const [wishList2] = await db.insert(wishListTable).values({ userId: user2!.id }).returning();
  await db.insert(wishListProductTable).values([
    { wishListId: wishList2!.id, productId: product2!.id },
    { wishListId: wishList2!.id, productId: product3!.id }
  ]);

  console.log('Wishlists created.');

  const [purchase1] = await db.insert(purchaseTable).values({
    totalPrice: product1!.price,
    userId: user1!.id,
    addressId: address1!.id
  }).returning();
  await db.insert(productOrderTable).values({
    quantity: 1,
    priceAtPurchase: product1!.price,
    purchaseId: purchase1!.id,
    productId: product1!.id
  });

  const finalPriceP2 = product2!.price * (1 - (product2!.salePercentage ?? 0) / 100);
  const [purchase2] = await db.insert(purchaseTable).values({
    totalPrice: finalPriceP2,
    userId: user2!.id,
    addressId: address2!.id
  }).returning();
  await db.insert(productOrderTable).values({
    quantity: 1,
    priceAtPurchase: finalPriceP2,
    purchaseId: purchase2!.id,
    productId: product2!.id
  });

  console.log('Purchases created.');

  await db.insert(reviewTable).values([
    // User 1 reviews
    { stars: 5, content: 'Ótimo livro, recomendo!', productId: product1!.id, userId: user1!.id },
    { stars: 4, content: 'Leitura agradável.', productId: product1!.id, userId: user1!.id },
    { stars: 4, content: 'Bom curso, mas poderia ser mais aprofundado.', productId: product2!.id, userId: user1!.id },
    { stars: 5, content: 'Didática excelente!', productId: product2!.id, userId: user1!.id },
    { stars: 3, content: 'A bateria dura pouco.', productId: product3!.id, userId: user1!.id },
    { stars: 4, content: 'Qualidade de som muito boa.', productId: product3!.id, userId: user1!.id },
    // User 2 reviews
    { stars: 4, content: 'História envolvente.', productId: product1!.id, userId: user2!.id },
    { stars: 5, content: 'Um dos melhores que já li.', productId: product1!.id, userId: user2!.id },
    { stars: 5, content: 'Transformador! Aprendi muito.', productId: product2!.id, userId: user2!.id },
    { stars: 5, content: 'Superou minhas expectativas.', productId: product2!.id, userId: user2!.id },
    { stars: 5, content: 'Perfeito para o dia a dia.', productId: product3!.id, userId: user2!.id },
    { stars: 4, content: 'Bom custo-benefício.', productId: product3!.id, userId: user2!.id },
  ]);

  console.log('Reviews created.');
  console.log('Seeding finished.');
}

seed().catch(console.error);