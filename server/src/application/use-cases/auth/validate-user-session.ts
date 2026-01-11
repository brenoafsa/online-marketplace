import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { User } from "@core/entities/user.entity";
import 'dotenv/config';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ValidateUserSessionUserCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User | null> {
        const user = await this.UserRepository.findById(id);

        if (!user) {
            throw new Error("Invalid token id.");
        }

        return user;
    }
}