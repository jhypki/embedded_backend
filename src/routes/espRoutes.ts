import { convertToJpeg } from '../middleware/convertToJpeg';
import { Request, Router, Response } from 'express';
import espController from '../controllers/espController';
import { upload } from '../config/imageStorage';

export const espRoutes = Router();

espRoutes.post('/upload', upload, convertToJpeg, (req: Request, res: Response) => espController.uploadImage(req, res));
