import { Request, Router, Response } from 'express';
import imageController from '../controllers/imageController';

export const imagesRoutes = Router();

imagesRoutes.get('/:id', (req: Request, res: Response) => imageController.getImageById(req, res));
imagesRoutes.get('/', (req: Request, res: Response) => imageController.getImages(req, res));
