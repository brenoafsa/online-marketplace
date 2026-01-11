import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteUserUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.UserRepository.findById(id);
        
        return await this.UserRepository.delete(id);
    }
}