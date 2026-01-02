import type { Request, Response } from 'express';
import { FindAllProductsUseCase } from '../../../application/use-cases/product/get-all-products';
import { FindProductByIdUseCase } from '../../../application/use-cases/product/get-product-by-id';
import { CreateProductUseCase } from '../../../application/use-cases/product/create-product';

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private findAllProductsUseCase: FindAllProductsUseCase,
    private findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, price, salePercentage, type, category, creatorId } = req.body;

      if (!title || !price || !type || !category || !creatorId) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields.' });
      }

      await this.createProductUseCase.execute({
        title,
        price,
        salePercentage,
        type,
        category,
        creatorId
      });

      return res.status(201).json({ message: 'Product created successfully.' });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.findAllProductsUseCase.execute();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: 'Bad request'});
      }

      const product = await this.findProductByIdUseCase.execute(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}