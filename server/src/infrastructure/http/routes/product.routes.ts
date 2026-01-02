import { Router } from 'express';
import { ProductController } from '@infrastructure/http/controllers/product.controller';
import { ProductRepository } from '@infrastructure/persistence/repositories/product.repository';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  FindProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@application/use-cases/product';

const productRouter = Router();

// Instanciação direta das dependências
const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getAllProductsUseCase = new FindAllProductsUseCase(productRepository);
const getProductByIdUseCase = new FindProductByIdUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const productController = new ProductController(
  createProductUseCase,
  getAllProductsUseCase,
  getProductByIdUseCase,
  updateProductUseCase,
  deleteProductUseCase,
);

productRouter.post('/product', (req, res) => productController.create(req, res));
productRouter.get('/products', (req, res) => productController.findAll(req, res));
productRouter.get('/product/:id', (req, res) => productController.findById(req, res));
productRouter.patch('/product/:id', (req, res) => productController.update(req, res));
productRouter.delete('/product/:id', (req, res) => productController.delete(req, res));

export { productRouter };