import type { IProductRepository } from "@core/repositories/product.repository.interface";
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteProductUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.productRepository.findById(id);
        
        return await this.productRepository.delete(id);
    }
}