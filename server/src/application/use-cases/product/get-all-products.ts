import type { IProductRepository } from '../../../core/repositories/product.repository.interface';
import { Product } from '../../../core/entities/product.entity';

export class FindAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}