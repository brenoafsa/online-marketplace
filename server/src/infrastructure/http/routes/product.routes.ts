import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductRepository } from '../../persistence/repositories/product.repository';
import { CreateProductUseCase } from '../../../application/use-cases/product/create-product';
import { FindAllProductsUseCase } from '../../../application/use-cases/product/get-all-products';
import { FindProductByIdUseCase } from '../../../application/use-cases/product/get-product-by-id';

const productRouter = Router();

// Instanciação direta das dependências
const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getAllProductsUseCase = new FindAllProductsUseCase(productRepository);
const getProductByIdUseCase = new FindProductByIdUseCase(productRepository);
const productController = new ProductController(
  createProductUseCase,
  getAllProductsUseCase,
  getProductByIdUseCase
);

productRouter.post('/product', (req, res) => productController.create(req, res));
productRouter.get('/products', (req, res) => productController.findAll(req, res));
productRouter.get('/product/:id', (req, res) => productController.findById(req, res));

export { productRouter };