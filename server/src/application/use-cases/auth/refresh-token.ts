import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { ValidateSessionDTO } from "@application/dtos/auth.dto";
import { inject, injectable } from 'tsyringe';
import { compare } from "bcrypt";
import 'dotenv/config';
import { sign } from "jsonwebtoken";

@injectable()
export class RefreshTokenSessionUserCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository,
        @inject('TokenRepository')
        private TokenRepository: ITokenRepository
    ) { }

    async execute(data: ValidateSessionDTO): Promise<string | null> {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }

        const user = await this.UserRepository.findById(data.id);

        if (!user) {
            throw new Error("Invalid token id.");
        }

        const token = await this.TokenRepository.findByUserId(data.id);

        if (!token) {
            throw new Error("Invalid or expired token.");
        }

        const isValid = await compare(data.token, token.token)

        if (Date.now() > new Date(token.expiresAt).getTime()) {
            await this.TokenRepository.delete(data.id);
            throw new Error("Invalid or expired token.");
        }

        if (isValid) {
            const token = sign({ id: user.id }, secret, {
                subject: user.id,
                expiresIn: "1m",
            })

            return token
        }

        return null
    }
}