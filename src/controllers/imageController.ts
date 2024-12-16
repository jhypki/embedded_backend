import { Request, Response } from 'express';
import imageService from '../services/imageService';

export class ImageController {
    async getImageById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const image = await imageService.getImageById(Number(id));
            res.status(200).json(image);
        } catch (error) {
            console.error('Error getting image:', error);
            res.status(500).json({ message: 'Failed to get image' });
        }
    }

    async getImages(req: Request, res: Response): Promise<void> {
        const count = Number(req.query.count) || 0;
        try {
            const images = await imageService.getImages(count);
            res.status(200).json(images);
        } catch (error) {
            console.error('Error getting images:', error);
            res.status(500).json({ message: 'Failed to get images' });
        }
    }
}

export default new ImageController();
