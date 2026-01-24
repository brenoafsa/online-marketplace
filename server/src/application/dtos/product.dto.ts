import { z } from 'zod';
import { isCuid } from '@paralleldrive/cuid2';
import { Product } from '@core/entities/product.entity';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be a positive number'),
  salePercentage: z.number().int().min(1).max(100).nullable(),
  type: z.enum(['PHYSICAL', 'DIGITAL']),
  category: z.enum(['GAME', 'ASSET', 'COURSE', 'AUDIO', 'TEMPLATE', 'SOFTWARE', 'E-BOOK', 'VIDEO']),
  creatorId: z.string().min(1, 'Creator ID is required').min(24).max(24).refine(isCuid, {
    message: "Creator ID must be a valid Cuid2."
  }),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  salePercentage: z.number().int().min(1).max(100).nullable().optional(),
  onSpotlight: z.boolean().optional(),
  type: z.enum(['PHYSICAL', 'DIGITAL']).optional(),
  category: z.enum(['GAME', 'ASSET', 'COURSE', 'AUDIO', 'TEMPLATE', 'SOFTWARE', 'E-BOOK', 'VIDEO']).optional(),
});

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;

export type CategoryTypes = 'GAME' | 'ASSET' | 'COURSE' | 'AUDIO' | 'TEMPLATE' | 'SOFTWARE' | 'E-BOOK' | 'VIDEO';

export interface FindProductsParams {
  category: CategoryTypes;
  page: number;
  limit: number;
  sort_by: SortTypes;
  isSale: boolean;
  isSpotlight: boolean;
  star_avg: number | null;
  price_gte: number | null;
  price_lte: number | null;
}

export type SortTypes = 'created-asc' | 'created-desc' | 'price-asc' | 'price-desc'

export interface FindProductsResponse {
  page: number,
  total: number,
  from: number,
  to: number,
  products: Product[]
}

export interface FindProductsRepository {
  products: Product[],
  total: number
}

export interface FindCategoryCountResponse {
  category: CategoryTypes,
  count: number
}