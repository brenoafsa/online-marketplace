import { Router } from 'express';
import { AuthController } from '@infrastructure/http/controllers/auth.controller';
import { UserRepository } from '@infrastructure/persistence/repositories/user.repository';
import {
  AuthenticateUserUseCase,
} from '@application/use-cases/auth/authenticate-user';

const authRouter = Router();

// Instanciação direta das dependências
const userRepository = new UserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const authController = new AuthController(
  authenticateUserUseCase,
);

authRouter.post('/auth', (req, res) => authController.auth(req, res));

export { authRouter };