import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT toklen is missing', 403);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };
        console.log(decoded);
        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token', 403);
    }
}
