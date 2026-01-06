import { Router } from 'express';
import { AuthController } from '@infrastructure/http/controllers/auth.controller';
import { UserRepository } from '@infrastructure/persistence/repositories/user.repository';
import {
  AuthenticateUserUseCase,
  ValidateUserSessionUserCase,
} from '@application/use-cases/auth/index';
import { authMiddleware } from '../middlewares/auth';

const authRouter = Router();

// Instanciação direta das dependências
const userRepository = new UserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const validateUserSessionUserCase = new ValidateUserSessionUserCase(userRepository);
const authController = new AuthController(
  authenticateUserUseCase,
  validateUserSessionUserCase
);

authRouter.post('/signin', (req, res) => authController.auth(req, res));
authRouter.get('/auth', authMiddleware, (req, res) => authController.validateSession(req, res))

export { authRouter };