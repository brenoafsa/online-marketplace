import type { IProductRepository } from '@core/repositories/product.repository.interface';
import { Product } from '@core/entities/product.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindProductByIdUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }
}