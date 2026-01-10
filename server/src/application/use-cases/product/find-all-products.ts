import type { IProductRepository } from '@core/repositories/product.repository.interface';
import type { FindProductsParams, FindProductsResponse } from '@application/dtos/product.dto';

export class FindAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(params: FindProductsParams): Promise<FindProductsResponse> {
    const { products, total } = await this.productRepository.findAll(params);

    const from = total === 0 ? 0 : (params.page - 1) * params.limit + 1;
    const to = total === 0 ? 0 : Math.min(params.page * params.limit, total);

    return {
      page: params.page,
      total: total,
      from: from,
      to: to,
      products: products
    }
  }
}