import { callGoogleAI } from '../../utils/callGoogleAI';
import { encodeImageToBase64 } from './../../utils/encodeImageToBase64';
import { Image } from '@prisma/client';
import imageRepository from '../repositories/imageRepository';
import clientService from './clientService';
import activationService from './activationService';
import path from 'path';

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

    async generateLabelForImage(id: number): Promise<Image> {
        const image = await imageRepository.findById(id);

        if (!image) {
            throw new Error('Image not found');
        }

        const base64Image = encodeImageToBase64(path.join(__dirname, '../../uploads', image.filename));

        const googleAiResponse = await callGoogleAI(base64Image);

        const label = googleAiResponse?.predictions[0];

        if (!label) {
            throw new Error('Label not found');
        }

        return await imageRepository.update(id, { ...image, label: label.charAt(0).toUpperCase() + label.slice(1) });
    }
}

export default new ImageService();
