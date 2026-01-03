import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { CreateUserDTO } from "@application/dtos/user.dto";

export class CreateUserUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<string> {
        const existingUser = await this.UserRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        return await this.UserRepository.create(data);
    }
}