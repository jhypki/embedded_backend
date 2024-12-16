import { Activation } from '@prisma/client';
import activationRepository from '../repositories/activationRepository';
import clientService from './clientService';

class ActivationService {
    async save(activation: Omit<Activation, 'id'>) {
        const savedActivation = await activationRepository.save(activation);

        clientService.broadcastActivation();

        return savedActivation;
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
