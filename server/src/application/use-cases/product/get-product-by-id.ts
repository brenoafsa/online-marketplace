import type { IProductRepository } from '../../../core/repositories/product.repository.interface';
import { Product } from '../../../core/entities/product.entity';

export class FindProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }
}