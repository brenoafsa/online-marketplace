import type { IProductRepository } from "@core/repositories/product.repository.interface";
import type { UpdateProductDTO } from "@application/dtos/product.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateProductUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}

    async execute(id: string, changes: UpdateProductDTO): Promise<void> {
        await this.productRepository.findById(id);
        return await this.productRepository.update(id, changes);
    }
}