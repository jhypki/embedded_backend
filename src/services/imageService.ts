import { Image } from '@prisma/client';
import imageRepository from '../repositories/imageRepository';
import clientService from './clientService';
import activationService from './activationService';

class ImageService {
    async saveImage(file: Express.Multer.File): Promise<Image> {
        const image: Omit<Image, 'id'> = {
            filename: file.filename,
            filepath: file.path,
            mimeType: file.mimetype,
            uploadedAt: new Date(),
            label: null
        };

        const savedImage = await imageRepository.save(image);

        await activationService.save({
            deviceID: 'esp32',
            activatedAt: savedImage.uploadedAt
        });

        await clientService.broadcastImage(savedImage);

        return savedImage;
    }

    async getImageById(id: number): Promise<Image | null> {
        return imageRepository.findById(id);
    }

    async getImages(count: number): Promise<Image[]> {
        if (count > 0) {
            return imageRepository.findNImages(count);
        }

        return imageRepository.findAll();
    }
}

export default new ImageService();
