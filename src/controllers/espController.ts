import { Request, Response } from 'express';
import imageService from '../services/imageService';
import activationService from '../services/activationService';

class EspController {
    async uploadImage(req: Request, res: Response): Promise<void> {
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

    async getImage(req: Request, res: Response): Promise<void> {
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

    async getActivationCount(req: Request, res: Response): Promise<void> {
        try {
            const count = await activationService.getActivationCount();
            res.status(200).json(count);
        } catch (error) {
            console.error('Error getting activation count:', error);
            res.status(500).json({ message: 'Failed to get activation count' });
        }
    }

    async getActivations(req: Request, res: Response): Promise<void> {
        try {
            const activations = await activationService.getActivations();
            res.status(200).json(activations);
        } catch (error) {
            console.error('Error getting activations:', error);
            res.status(500).json({ message: 'Failed to get activations' });
        }
    }
}

export default new EspController();
