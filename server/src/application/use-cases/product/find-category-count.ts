import type { IProductRepository } from "@core/repositories/product.repository.interface";
import { inject, injectable } from "tsyringe";
import type { FindCategoryCountResponse } from "@application/dtos/product.dto";

@injectable()
export class FindCategoryCountUseCase {
    constructor (
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}

    async execute(): Promise<FindCategoryCountResponse[]> {
        return await this.productRepository.findCategoryCount();
    }
}