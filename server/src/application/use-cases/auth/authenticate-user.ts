import type { AuthUserDTO } from "@application/dtos/auth.dto";
import type { IUserRepository } from "@core/repositories/user.repository.interface";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthenticateUserUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(credentials: AuthUserDTO): Promise<string | undefined> {
        const user = await this.UserRepository.findByEmail(credentials.email);

        if (!user) {
            throw new Error("Invalid credentials.");
        }

        const isPasswordMatch = await compare(credentials.password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Invalid credentials.");
        }

        const token = sign({}, "your-jwt-secret", {
            subject: user.id,
            expiresIn: "5m",
        });

        return token;
    }
}