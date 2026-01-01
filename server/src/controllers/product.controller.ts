import { type Request, type Response } from 'express';
import { productService } from '../services/product.service';
import z, { ZodError } from 'zod';

const createProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  salePercentage: z.number().nullable(),
  purchaseCount: z.number(),
  onSpotlight: z.boolean(),
  stars: z.number(),
  type: z.enum(['PHYSICAL', 'DIGITAL']),
  category: z.enum(['GAME', 'ASSET', 'COURSE', 'AUDIO', 'TEMPLATE', 'SOFTWARE', 'E-BOOK', 'VIDEO']),
  creatorId: z.string(),
});

export const productController = {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      // DTO prevent dev from commiting typing mistakes, while zod avoids application from getting wrong data from api calls
      const productData = createProductSchema.parse(req.body);

      const newProduct = await productService.create(productData);
      
      return res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.flatten().fieldErrors });
      }
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.get();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'An unexpected error occurred while fetching products.' });
    }
  },

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Missing required parameter.' });
      }
      const product = await productService.getById(id);
      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: 'An unexpected error occurred while fetching the product.' });
    }
  }
};