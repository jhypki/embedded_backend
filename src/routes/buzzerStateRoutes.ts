import { Router, Request, Response } from 'express';
import buzzerStateController from '../controllers/buzzerStateController';

export const buzzerStateRoutes = Router();

buzzerStateRoutes.get('/', (req: Request, res: Response) => buzzerStateController.getBuzzerState(req, res));
buzzerStateRoutes.post('/', (req: Request, res: Response) => buzzerStateController.setBuzzerState(req, res));
