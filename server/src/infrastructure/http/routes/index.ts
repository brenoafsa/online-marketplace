import { Router } from 'express';
import { productRouter } from './product.routes';
import { userRouter } from './user.routes';

const router = Router();

router.use(productRouter);
router.use(userRouter);

export { router };