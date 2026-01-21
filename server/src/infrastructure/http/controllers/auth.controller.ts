import {
    AuthenticateUserUseCase,
    RefreshTokenSessionUserCase,
    ValidateUserSessionUserCase,
    EndSessionUserCase
} from "@application/use-cases/auth/index";
import { CreateTokenUseCase } from "@application/use-cases/auth/create-token";
import type { Request, Response } from "express";
import { authSchema } from "@application/dtos/auth.dto";
import { ZodError } from "zod";
import { injectable } from 'tsyringe';

@injectable()
export class AuthController {
    constructor(
        private AuthenticateUserUseCase: AuthenticateUserUseCase,
        private ValidateUserSessionUserCase: ValidateUserSessionUserCase,
        private CreateTokenUseCase: CreateTokenUseCase,
        private RefreshTokenUseCase: RefreshTokenSessionUserCase,
        private EndSessionUserCase: EndSessionUserCase
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

            const response = await this.AuthenticateUserUseCase.execute(credentialsData);

            if (!response) {
                throw new Error("Authentication failed to return response.");
            }

            const tokenData = {
                userId: response.userId,
                rememberMe: rememberMe
            }

            const refreshToken = await this.CreateTokenUseCase.execute(tokenData)

            res.cookie("token", response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api",
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api",
            });

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

            const data = {
                id: tokenDecoded.id,
                token: tokenDecoded.refreshToken
            }

            await this.ValidateUserSessionUserCase.execute(data)

            return res.status(200).json({ message: "Authorized." });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(403).json({ message: 'Forbidden: Invalid token.' });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    async refreshAccessToken(req: Request, res: Response): Promise<Response> {
        try {
            const tokenDecoded = req.user

            if (!tokenDecoded) {
                return res.status(403).json({ message: 'Forbidden: No token provided' });
            }

            const data = {
                id: tokenDecoded.id,
                token: tokenDecoded.refreshToken
            }

            const token = await this.RefreshTokenUseCase.execute(data)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api",
            });

            return res.status(201).json({ message: 'Session refreshed.' });
        } catch (error) {
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        try {
            const tokenDecoded = req.user

            if (!tokenDecoded) {
                return res.status(403).json({ message: 'Forbidden: No token provided' });
            }

            const data = {
                id: tokenDecoded.id,
                token: tokenDecoded.refreshToken
            }

            await this.EndSessionUserCase.execute(data)

            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api",
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api",
            });

            return res.status(200).json({ message: "Logout realizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
}