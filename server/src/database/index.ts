import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as addressSchema from './schemas/address';
import * as productSchema from './schemas/product';
import * as purchaseSchema from './schemas/purchase';
import * as reviewSchema from './schemas/review';
import * as userSchema from './schemas/user';
import * as wishListSchema from './schemas/wishList';

const schema = {
  ...addressSchema,
  ...productSchema,
  ...purchaseSchema,
  ...reviewSchema,
  ...userSchema,
  ...wishListSchema,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });