import { Request, Response } from 'express';
import activationService from '../services/activationService';

export class ActivationController {
    async getActivationCount(req: Request, res: Response): Promise<void> {
        try {
            const count = await activationService.getActivationCount();
            res.status(200).json(count);
        } catch (error) {
            console.error('Error getting activation count:', error);
            res.status(500).json({ message: 'Failed to get activation count' });
        }
    }

    async getActivations(req: Request, res: Response): Promise<void> {
        try {
            const activations = await activationService.getActivations();
            res.status(200).json(activations);
        } catch (error) {
            console.error('Error getting activations:', error);
            res.status(500).json({ message: 'Failed to get activations' });
        }
    }
}

export default new ActivationController();
