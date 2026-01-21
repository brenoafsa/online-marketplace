import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { CreateTokenUseCaseDTO } from "@application/dtos/token.dto";
import { inject, injectable } from 'tsyringe';
import { sign } from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";

@injectable()
export class CreateTokenUseCase {
    constructor(
        @inject('TokenRepository')
        private TokenRepository: ITokenRepository
    ) { }

    async execute(data: CreateTokenUseCaseDTO): Promise<string> {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }

        const refreshToken = sign({ id: data.userId }, secret, {
            subject: data.userId
        });

        const salt = await genSalt(10);
        const hashedToken = await hash(refreshToken, salt);

        const isToken = await this.TokenRepository.findByUserId(data.userId)

        let expiresAt;

        (data.rememberMe) ? expiresAt = new Date(Date.now() + 8 * 60 * 1000) : expiresAt = new Date(Date.now() + 4 * 60 * 1000)

        const info = {
            token: hashedToken,
            userId: data.userId,
            expiresAt
        }

        if (isToken) {
            await this.TokenRepository.update(info);
        } else {
            await this.TokenRepository.create(info);
        }

        return refreshToken;
    }
}