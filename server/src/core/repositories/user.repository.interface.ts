import { User } from "@core/entities/user.entity";
import type { CreateUserDTO, UpdateUserDTO } from "@application/dtos/user.dto";

export interface IUserRepository {
  create(newUser: CreateUserDTO): Promise<string>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | undefined>;
  update(id: string, changes: UpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}