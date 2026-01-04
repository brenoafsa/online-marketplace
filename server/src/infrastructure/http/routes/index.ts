import { Router } from 'express';
import { productRouter } from './product.routes';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

const router = Router();

router.use(productRouter);
router.use(userRouter);
router.use(authRouter);

export { router };