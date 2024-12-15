import { Activation } from '@prisma/client';
import activationRepository from '../repositories/activationRepository';

class ActivationService {
    async save(activation: Omit<Activation, 'id'>) {
        return await activationRepository.save(activation);
    }

    async getActivations() {
        return await activationRepository.findAll();
    }

    async getActivationCount() {
        const count = await activationRepository.count();
        const dailyCount = await activationRepository.dailyCount();
        const weeklyCount = await activationRepository.weeklyCount();

        return {
            count: {
                total: count,
                daily: dailyCount,
                weekly: weeklyCount
            }
        };
    }
}

export default new ActivationService();
