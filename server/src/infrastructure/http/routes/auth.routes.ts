import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '@infrastructure/http/controllers/auth.controller';
import {
  AuthenticateUserUseCase,
  ValidateUserSessionUserCase,
} from '@application/use-cases/auth/index';
import { authMiddleware } from '../middlewares/auth';

const authRouter = Router();

container.register(AuthenticateUserUseCase, { useClass: AuthenticateUserUseCase });
container.register(ValidateUserSessionUserCase, { useClass: ValidateUserSessionUserCase });

const authController = container.resolve(AuthController);

authRouter.post('/signin', (req, res) => authController.auth(req, res));
authRouter.get('/auth', authMiddleware, (req, res) => authController.validateSession(req, res))

export { authRouter };