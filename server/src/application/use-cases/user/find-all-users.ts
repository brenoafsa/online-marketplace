import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { User } from "@core/entities/user.entity";

export class FindAllUsersUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(): Promise<User[]>{
        return await this.UserRepository.findAll();
    }
}