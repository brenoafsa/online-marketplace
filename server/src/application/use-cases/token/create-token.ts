import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { CreateTokenUseCaseDTO } from "@application/dtos/token.dto";
import { inject, injectable } from 'tsyringe';
import { sign } from "jsonwebtoken";

@injectable()
export class CreateTokenUseCase {
    constructor(
        @inject('TokenRepository')
        private TokenRepository: ITokenRepository
    ) { }

    async execute(data: CreateTokenUseCaseDTO): Promise<void> {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }

        const refreshToken = sign({ id: data.userId }, secret, {
            subject: data.userId
        });

        const isToken = await this.TokenRepository.findByUserId(data.userId)

        let expiresAt;

        (data.rememberMe) ? expiresAt = new Date(Date.now() + 8 * 60 * 1000) : expiresAt = new Date(Date.now() + 4 * 60 * 1000)

        const info = {
            token: refreshToken,
            userId: data.userId,
            expiresAt
        }

        if (isToken) {
            return await this.TokenRepository.update(info);
        } else {
            return await this.TokenRepository.create(info);
        }
    }
}