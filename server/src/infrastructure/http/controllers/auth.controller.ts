import {
    AuthenticateUserUseCase,
    ValidateUserSessionUserCase
} from "@application/use-cases/auth/index";
import type { Request, Response } from "express";
import { authSchema } from "@application/dtos/auth.dto";
import { ZodError } from "zod";
import { injectable } from 'tsyringe';

@injectable()
export class AuthController {
    constructor(
        private AuthenticateUserUseCase: AuthenticateUserUseCase,
        private ValidateUserSessionUserCase: ValidateUserSessionUserCase,
    ) { }

    async auth(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password, rememberMe } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Bad Request: Missing required fields.' });
            }

            const credentialsData = authSchema.parse({
                email,
                password,
                rememberMe
            });

            const token = await this.AuthenticateUserUseCase.execute(credentialsData);

            if (rememberMe) {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/api",
                    maxAge: 20 * 60 * 1000,
                });
            } else {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/api",
                    maxAge: 1 * 60 * 1000,
                });
            }

            return res.status(200).json({ message: "Authenticated successfully" });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.flatten().fieldErrors,
                });
            }
            if (error instanceof Error && error.message === "Invalid credentials.") {
                return res.status(403).json({ message: 'Forbidden: Invalid credentials.' });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });

        }
    }

    async validateSession(req: Request, res: Response): Promise<Response> {
        try {
            const tokenDecoded = req.user

            if (!tokenDecoded) {
                return res.status(403).json({ message: 'Forbidden: No token provided' });
            }

            await this.ValidateUserSessionUserCase.execute(tokenDecoded.id)

            return res.status(200).json({ message: "Authorized." });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(403).json({ message: 'Forbidden: Invalid token.' });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
}