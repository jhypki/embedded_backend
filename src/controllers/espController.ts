import { Request, Response } from 'express';
import imageService from '../services/imageService';

class EspController {
    async uploadImage(req: Request, res: Response): Promise<void> {
        console.log('Handling file upload:', req.file);
        try {
            const file = req.file;

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const savedImage = await imageService.saveImage(file);

            res.status(200).json({
                message: 'File uploaded successfully!',
                image: savedImage
            });
        } catch (error) {
            console.error('Error handling file upload:', error);
            res.status(500).json({
                message: 'Failed to upload file'
            });
        }
    }
}

export default new EspController();
