import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '@infrastructure/http/controllers/auth.controller';
import {
  AuthenticateUserUseCase,
  ValidateUserSessionUserCase,
  RefreshTokenSessionUserCase,
  EndSessionUserCase
} from '@application/use-cases/auth/index';
import { CreateTokenUseCase } from '@application/use-cases/auth/create-token';
import { authMiddleware, refreshMiddleware } from '../middlewares/index';

const authRouter = Router();

container.register(AuthenticateUserUseCase, { useClass: AuthenticateUserUseCase });
container.register(ValidateUserSessionUserCase, { useClass: ValidateUserSessionUserCase });
container.register(CreateTokenUseCase, { useClass: CreateTokenUseCase });
container.register(RefreshTokenSessionUserCase, { useClass: RefreshTokenSessionUserCase });
container.register(EndSessionUserCase, { useClass: EndSessionUserCase });

const authController = container.resolve(AuthController);

authRouter.post('/signin', (req, res) => authController.auth(req, res));
authRouter.get('/auth', authMiddleware, (req, res) => authController.validateSession(req, res));
authRouter.get('/refresh', refreshMiddleware, (req, res) => authController.refreshAccessToken(req, res));
authRouter.post('/logout', refreshMiddleware, (req, res) => authController.logout(req, res));

export { authRouter };