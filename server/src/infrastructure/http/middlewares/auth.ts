import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';
import { verify, type JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            }
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT secret is not defined.');
        return res.status(500).json({ message: 'Internal Server Error: Authentication secret not configured.' });
    }

    try {
        const decoded = verify(token, secret) as JwtPayload;
        
        if (typeof decoded.sub !== 'string') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token payload.' });
        }

        req.user = { id: decoded.sub };

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
}