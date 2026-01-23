import { Product } from '@core/entities/product.entity';
import type {
  CreateProductDTO,
  UpdateProductDTO,
  FindProductsParams,
  FindProductsRepository,
  FindCategoryCountResponse
} from '@application/dtos/product.dto';

export interface IProductRepository {
  create(newProduct: CreateProductDTO): Promise<void>;
  findAll(params: FindProductsParams): Promise<FindProductsRepository>;
  findByTitleCreatorId(title: string, creatorId: string): Promise<Product | undefined>;
  findCategoryCount(): Promise<FindCategoryCountResponse[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, changes: UpdateProductDTO): Promise<void>;
  delete(id: string): Promise<void>;
}