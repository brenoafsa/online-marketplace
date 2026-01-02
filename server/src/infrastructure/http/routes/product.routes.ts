import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductRepository } from '../../persistence/repositories/product.repository';
import { CreateProductUseCase } from '../../../application/use-cases/product/create-product';
import { FindAllProductsUseCase } from '../../../application/use-cases/product/get-all-products';
import { FindProductByIdUseCase } from '../../../application/use-cases/product/get-product-by-id';
import { UpdateProductUseCase } from '../../../application/use-cases/product/update-product';
import { DeleteProductUseCase } from '../../../application/use-cases/product/delete-product';

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