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

    async generateLabelForImage(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const image = await imageService.generateLabelForImage(Number(id));
            res.status(200).json(image);
        } catch (error) {
            console.error('Error generating label:', error);
            res.status(500).json({ message: 'Failed to generate label' });
        }
    }

    async deleteImage(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            await imageService.deleteImage(Number(id));
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ message: 'Failed to delete image' });
        }
    }
}

export default new ImageController();
