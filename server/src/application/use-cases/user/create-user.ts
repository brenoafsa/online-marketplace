import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { CreateUserDTO } from "@application/dtos/user.dto";
import { genSalt, hash } from "bcrypt";

export class CreateUserUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<string> {
        const existingUser = await this.UserRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        if (data.role == "SELLER") {
            throw new Error("Not allowed to create seller via sign up.");
        }

        const salt = await genSalt(10);
        data.password = await hash(data.password, salt);

        return await this.UserRepository.create(data);
    }
}