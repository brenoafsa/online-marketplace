import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { User } from "@core/entities/user.entity";
import 'dotenv/config';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ValidateUserSessionUserCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository,
        @inject('TokenRepository')
        private TokenRepository: ITokenRepository
    ) { }

    async execute(id: string): Promise<User | null> {
        const user = await this.UserRepository.findById(id);

        if (!user) {
            throw new Error("Invalid token id.");
        }

        const token = await this.TokenRepository.findByUserId(id);

        if (!token || Date.now() > new Date(token.expiresAt).getTime()) {
            await this.TokenRepository.delete(id);
            throw new Error("Invalid or expired token.");
        }

        return user;
    }
}