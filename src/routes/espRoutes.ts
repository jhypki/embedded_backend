import { Request, Router, Response } from 'express';
import espController from '../controllers/espController';
import { upload } from '../config/imageStorage';

export const espRoutes = Router();

espRoutes.post('/upload', upload.single('file'), (req: Request, res: Response) => espController.uploadImage(req, res));
espRoutes.get('/activations/count', (req: Request, res: Response) => espController.getActivationCount(req, res));
espRoutes.get('/activations', (req: Request, res: Response) => espController.getActivations(req, res));
espRoutes.get('/images/:id', (req: Request, res: Response) => espController.getImage(req, res));
espRoutes.get('/images', (req: Request, res: Response) => espController.getImages(req, res));
