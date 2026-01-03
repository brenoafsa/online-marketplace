import type { IUserRepository } from "@core/repositories/user.repository.interface";

export class DeleteUserUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(id: string): Promise<void> {
        await this.UserRepository.findById(id);
        
        return await this.UserRepository.delete(id);
    }
}