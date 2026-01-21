import type { AuthUserDTO, AuthResponseDTO } from "@application/dtos/auth.dto";
import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import 'dotenv/config';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) { }

    async execute(credentials: AuthUserDTO): Promise<AuthResponseDTO | undefined> {
        const user = await this.UserRepository.findByEmail(credentials.email);

        if (!user) {
            throw new Error("Invalid credentials.");
        }

        const isPasswordMatch = await compare(credentials.password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Invalid credentials.");
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }

        await this.UserRepository.update(user.id, { lastLogIn: new Date() });

        const token = sign({ id: user.id }, secret, {
            subject: user.id,
            expiresIn: "3m",
        })

        return {
            token,
            userId: user.id
        };
    }
}