import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '@infrastructure/persistence/repositories/user.repository';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '@application/use-cases/user';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address';
import { AddressRepository } from '@infrastructure/persistence/repositories/address.repository';

const userRouter = Router();

container.register('UserRepository', {
  useClass: UserRepository,
});
container.register('AddressRepository', {
  useClass: AddressRepository,
});
container.register(CreateUserUseCase, { useClass: CreateUserUseCase });
container.register(FindAllUsersUseCase, { useClass: FindAllUsersUseCase });
container.register(FindUserByIdUseCase, { useClass: FindUserByIdUseCase });
container.register(UpdateUserUseCase, { useClass: UpdateUserUseCase });
container.register(DeleteUserUseCase, { useClass: DeleteUserUseCase });
container.register(CreateAddressUseCase, { useClass: CreateAddressUseCase });

const userController = container.resolve(UserController);

userRouter.post('/signup', (req, res) => userController.create(req, res));
userRouter.get('/users', (req, res) => userController.findAll(req, res));
userRouter.get('/user/:id', (req, res) => userController.findById(req, res));
userRouter.patch('/user/:id', (req, res) => userController.update(req, res));
userRouter.delete('/user/:id', (req, res) => userController.delete(req, res));

export { userRouter };