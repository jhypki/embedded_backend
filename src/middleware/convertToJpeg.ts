import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export const convertToJpeg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        return next(new Error('No file uploaded'));
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const outputPath = `./uploads/${req.file.fieldname}-${uniqueSuffix}.jpg`;

    try {
        await sharp(req.file.buffer).jpeg({ quality: 90 }).toFile(outputPath);

        req.file.path = outputPath;
        req.file.filename = path.basename(outputPath);

        next();
    } catch (error) {
        console.error('Error converting image to JPEG:', error);
        next(error);
    }
};
