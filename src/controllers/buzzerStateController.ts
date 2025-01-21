import { Request, Response } from 'express';

export class BuzzerStateController {
    buzzerState: boolean = false;

    async getBuzzerState(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({
                state: this.buzzerState
            });
        } catch (error) {
            console.error('Error getting buzzer state:', error);
            res.status(500).json({ message: 'Failed to get buzzer state' });
        }
    }

    async setBuzzerState(req: Request, res: Response): Promise<void> {
        try {
            const state = req.body.state;
            this.buzzerState = state;
            res.status(200).json({ message: 'Buzzer state set successfully', state: this.buzzerState });
        } catch (error) {
            console.error('Error setting buzzer state:', error);
            res.status(500).json({ message: 'Failed to set buzzer state' });
        }
    }
}

export default new BuzzerStateController();
