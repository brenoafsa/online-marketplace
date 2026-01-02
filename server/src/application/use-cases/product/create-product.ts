import type { IProductRepository } from '../../../core/repositories/product.repository.interface';
import type { CreateProductDTO } from '../../dtos/product.dto';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<void> {
    const productExists = await this.productRepository.findByTitleCreatorId(data.title, data.creatorId);
    
    if (productExists) {
        throw new Error("Product with this title already exists for this creator.");
    }

    await this.productRepository.create(data);
  }
}