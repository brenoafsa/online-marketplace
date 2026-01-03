import { Router } from 'express';
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

// Instanciação direta das dependências
const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const getUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const createAddressUseCase = new CreateAddressUseCase(addressRepository)
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  createAddressUseCase
);

userRouter.post('/user', (req, res) => userController.create(req, res));
userRouter.get('/users', (req, res) => userController.findAll(req, res));
userRouter.get('/user/:id', (req, res) => userController.findById(req, res));
userRouter.patch('/user/:id', (req, res) => userController.update(req, res));
userRouter.delete('/user/:id', (req, res) => userController.delete(req, res));

export { userRouter };