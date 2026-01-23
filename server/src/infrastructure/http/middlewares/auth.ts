import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';
import { verify, type JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                refreshToken: string;
            }
        }
    }
}

const SECRET = process.env.JWT_SECRET;

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { token, refreshToken } = req.cookies;

    if (!token) return res.status(401).json({ message: 'Token not provided.' });
    if (!refreshToken) return res.status(401).json({ message: 'Refresh Token not provided.' });
    if (!SECRET) return res.status(500).json({ message: 'Server configuration error.' });

    try {
        const decoded = verify(token, SECRET) as JwtPayload;
        req.user = {
            id: decoded.sub as string,
            refreshToken: refreshToken as string
        };
        return next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        return res.status(400).json({ message: 'Unexpected Error.' });
    }
}