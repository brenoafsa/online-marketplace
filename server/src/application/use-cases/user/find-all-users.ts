import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { User } from "@core/entities/user.entity";
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindAllUsersUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}

    async execute(): Promise<User[]>{
        return await this.UserRepository.findAll();
    }
}