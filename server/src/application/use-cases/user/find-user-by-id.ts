import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { User } from "@core/entities/user.entity";

export class FindUserByIdUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(id: string): Promise<User | null> {
        return await this.UserRepository.findById(id)
    }
}