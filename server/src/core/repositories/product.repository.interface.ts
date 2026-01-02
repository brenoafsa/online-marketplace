import { Product } from '@core/entities/product.entity';
import type { CreateProductDTO, UpdateProductDTO } from '@application/dtos/product.dto';

export interface IProductRepository {
  create(newProduct: CreateProductDTO): Promise<void>;
  findAll(): Promise<Product[]>;
  findByTitleCreatorId(title: string, creatorId: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | null>;
  update(id: string, changes: UpdateProductDTO): Promise<void>;
  delete(id: string): Promise<void>;
}