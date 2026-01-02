import type { IProductRepository } from "../../../core/repositories/product.repository.interface";
import { Product } from "../../../core/entities/product.entity";

export class GetProductByTitleCreatorIdUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(title: string, creatorId: string): Promise<Product | undefined> {
        const product = await this.productRepository.findByTitleCreatorId(title, creatorId);
        return product;
    }
}