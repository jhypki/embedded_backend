import fs from 'fs';
import path from 'path';

export const encodeImageToBase64 = (filePath: string): string => {
    const absolutePath = path.resolve(filePath);
    const imageBuffer = fs.readFileSync(absolutePath);
    return imageBuffer.toString('base64');
};
