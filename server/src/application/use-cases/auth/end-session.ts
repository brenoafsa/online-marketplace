import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { ValidateSessionDTO } from "@application/dtos/auth.dto";
import { inject, injectable } from 'tsyringe';
import 'dotenv/config';

@injectable()
export class EndSessionUserCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository,
        @inject('TokenRepository')
        private TokenRepository: ITokenRepository
    ) { }

    async execute(data: ValidateSessionDTO): Promise<void> {
        const user = await this.UserRepository.findById(data.id);

        if (!user) {
            throw new Error("Invalid token id.");
        }

        const token = await this.TokenRepository.findByUserId(data.id);

        if (!token) {
            throw new Error("Invalid or expired token.");
        }

        await this.TokenRepository.delete(data.id)
    }
}