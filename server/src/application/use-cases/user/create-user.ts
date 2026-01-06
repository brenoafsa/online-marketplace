import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { CreateUserDTO, SignUpDTO } from "@application/dtos/user.dto";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class CreateUserUseCase {
    constructor(private UserRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<SignUpDTO> {
        const existingUser = await this.UserRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        if (data.role == "SELLER") {
            throw new Error("Not allowed to create seller via sign up.");
        }

        const salt = await genSalt(10);
        data.password = await hash(data.password, salt);
        data.lastLogIn = new Date();

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }

        const userId = await this.UserRepository.create(data);

        const token = sign({ id: userId }, secret, {
            subject: userId,
            expiresIn: "1m",
        });

        return {
            id: userId,
            token: token
        };
    }
}