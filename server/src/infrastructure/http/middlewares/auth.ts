import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';
import type { ITokenRepository } from '@core/repositories/token.repository.interface';
import { verify, sign, type JwtPayload } from 'jsonwebtoken';
import { container } from 'tsyringe';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            }
        }
    }
}

const tokenRepository = container.resolve<ITokenRepository>('TokenRepository');
const SECRET = process.env.JWT_SECRET || '';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'Token not provided.' });
    if (!SECRET) return res.status(500).json({ message: 'Server configuration error.' });

    try {
        const decoded = verify(token, SECRET) as JwtPayload;
        req.user = { id: decoded.sub as string };
        return next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            const userId = (verify(token, SECRET, { ignoreExpiration: true }) as JwtPayload).sub;
            
            if (userId && await tryRefreshToken(userId, res)) {
                req.user = { id: userId };
                return next();
            }
        }

        return res.status(401).json({ message: 'Unauthorized.' });
    }
}

async function tryRefreshToken(userId: string, res: Response): Promise<boolean> {
    try {
        const refreshToken = await tokenRepository.findByUserId(userId);
        const isValid = refreshToken && new Date(refreshToken.expiresAt) > new Date();

        if (!isValid) {
            await tokenRepository.delete(userId);
            return false;
        }

        const newAccessToken = sign({ id: userId }, SECRET, {
            subject: userId,
            expiresIn: "3m",
        })

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api',
        });

        return true;
    } catch {
        return false;
    }
}