import { Router } from 'express';
import { productController } from '../controllers/product.controller';

const productRoutes = Router();

productRoutes.get('/products', productController.getAll);
productRoutes.post('/product', productController.create);
productRoutes.get('/product/:id', productController.getById);

export { productRoutes };