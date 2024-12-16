import { Request, Router, Response } from 'express';
import activationController from '../controllers/activationController';

export const activationsRoutes = Router();

activationsRoutes.get('/count', (req: Request, res: Response) => activationController.getActivationCount(req, res));
activationsRoutes.get('/', (req: Request, res: Response) => activationController.getActivations(req, res));
