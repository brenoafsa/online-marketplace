import { Product } from '../entities/product.entity';
import type { CreateProductDTO } from '../../application/dtos/product.dto';

export interface IProductRepository {
  create(newProduct: CreateProductDTO): Promise<void>
  findAll(): Promise<Product[]>;
  findByTitleCreatorId(title: string, creatorId: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | null>;
}