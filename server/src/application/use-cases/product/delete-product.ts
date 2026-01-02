import type { IProductRepository } from "../../../core/repositories/product.repository.interface";

export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(id: string): Promise<void> {
        await this.productRepository.findById(id);
        
        return await this.productRepository.delete(id);
    }
}