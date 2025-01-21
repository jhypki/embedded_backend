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

            // Step 1: Save the uploaded file (DB write, file system, etc.)
            const savedImage = await imageService.saveImage(file);

            // Step 2: Immediately return success response to the client.
            res.status(200).json({
                message: 'File uploaded successfully!',
                image: savedImage
            });

            // Step 3: Trigger label generation in the background, after the response is sent.
            imageService
                .generateLabelForImage(savedImage.id)
                .then(() => {
                    console.log(`Successfully generated label for image ID = ${savedImage.id}`);
                })
                .catch((error) => {
                    console.error(`Error generating label for image ID = ${savedImage.id}:`, error);
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
