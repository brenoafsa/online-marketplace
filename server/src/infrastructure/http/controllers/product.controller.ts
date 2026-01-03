import type { Request, Response } from 'express';
import { createProductSchema, updateProductSchema } from '@application/dtos/product.dto';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  FindProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@application/use-cases/product';
import { ZodError } from 'zod';

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private findAllProductsUseCase: FindAllProductsUseCase,
    private findProductByIdUseCase: FindProductByIdUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, price, salePercentage, type, category, creatorId } = req.body;

      if (!title || !price || !type || !category || !creatorId) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields.' });
      }

      const body = {
        title,
        price,
        salePercentage,
        type,
        category,
        creatorId
      }

      const productData = createProductSchema.parse(body);

      await this.createProductUseCase.execute(productData);

      return res.status(201).json({ message: 'Product created successfully.' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.flatten().fieldErrors,
        });
      }
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
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: 'ID was not provided'});
      }

      const product = await this.findProductByIdUseCase.execute(id);

      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) {
        return res.status(400).json({ message: 'ID was not provided'});
      }

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No update data provided.' });
      }

      const changesData = updateProductSchema.parse(data);

      await this.updateProductUseCase.execute(id, changesData);

      return res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.flatten().fieldErrors,
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID was not provided'});
      }

      await this.deleteProductUseCase.execute(id);

      return res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
}