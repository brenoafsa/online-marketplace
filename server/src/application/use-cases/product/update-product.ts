import type { IProductRepository } from "@core/repositories/product.repository.interface";
import type { UpdateProductDTO } from "@application/dtos/product.dto";

export class UpdateProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(id: string, changes: UpdateProductDTO): Promise<void> {
        await this.productRepository.findById(id);
        await this.productRepository.update(id, changes);
    }
}