import { Request, Router, Response } from 'express';
import espController from '../controllers/espController';
import { upload } from '../config/imageStorage';

export const espRoutes = Router();

espRoutes.post('/upload', upload.single('file'), (req: Request, res: Response) => espController.uploadImage(req, res));
