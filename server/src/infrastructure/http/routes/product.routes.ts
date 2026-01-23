import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController } from '@infrastructure/http/controllers/product.controller';
import { ProductRepository } from '@infrastructure/persistence/repositories/product.repository';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  FindProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  FindCategoryCountUseCase
} from '@application/use-cases/product';

const productRouter = Router();

container.register('ProductRepository', {
  useClass: ProductRepository,
});
container.register(CreateProductUseCase, { useClass: CreateProductUseCase });
container.register(FindAllProductsUseCase, { useClass: FindAllProductsUseCase });
container.register(FindProductByIdUseCase, { useClass: FindProductByIdUseCase });
container.register(UpdateProductUseCase, { useClass: UpdateProductUseCase });
container.register(DeleteProductUseCase, { useClass: DeleteProductUseCase });
container.register(FindCategoryCountUseCase, { useClass: FindCategoryCountUseCase });

const productController = container.resolve(ProductController);

productRouter.post('/product', (req, res) => productController.create(req, res));
productRouter.get('/products', (req, res) => productController.findAll(req, res));
productRouter.get('/products/category', (req, res) => productController.findCategoryCount(req, res));
productRouter.get('/product/:id', (req, res) => productController.findById(req, res));
productRouter.patch('/product/:id', (req, res) => productController.update(req, res));
productRouter.delete('/product/:id', (req, res) => productController.delete(req, res));

export { productRouter };