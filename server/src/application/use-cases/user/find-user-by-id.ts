import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { User } from "@core/entities/user.entity";
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindUserByIdUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User | null> {
        return await this.UserRepository.findById(id)
    }
}