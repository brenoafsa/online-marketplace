import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { UpdateUserDTO } from "@application/dtos/user.dto";
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}

    async execute(id: string, changes: UpdateUserDTO): Promise<void> {
        await this.UserRepository.findById(id);
        return await this.UserRepository.update(id, changes);
    }
}