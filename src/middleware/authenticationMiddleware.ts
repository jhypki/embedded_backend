import { Request, Response, NextFunction } from 'express';
import { INBOUND_API_KEY } from '../config/env';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log('Authenticating request:', req.path);
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
        res.status(401).json({ message: 'API key is required' });
        return;
    }

    if (apiKey !== INBOUND_API_KEY) {
        res.status(403).json({ message: 'Invalid API key' });
        return;
    }

    next();
};
