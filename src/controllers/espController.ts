import { Request, Response } from 'express';
import imageService from '../services/imageService';
import transporter from '../utils/sendEmail';
import { PrismaClient } from '@prisma/client';


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

            const prisma = new PrismaClient();
            const email = await prisma.email.findFirst();

            if (email) {
                await transporter.sendMail({
                    from: 'tosterton@gmail.com',
                    to: email.email,
                    subject: 'New photo detected!',
                    attachments: [{
                        filename: 'image.png',
                        content: file.buffer.toString("base64"),
                        encoding: 'base64',
                    }],
                });
            }

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

    async updateEmail(req: Request, res: Response): Promise<void> {
        const newEmail = req.body.email;
    
        if (!newEmail) {
            res.json(400).end();
            return;
        }
    
        const prisma = new PrismaClient();
    
        await prisma.email.upsert({
            where: {
                id: 1
            },
            update: {
                email: newEmail
            },
            create: {
                id: 1,
                email: newEmail
            }
        })
    

        res.status(200).end();
        return;
    }
}

export default new EspController();
