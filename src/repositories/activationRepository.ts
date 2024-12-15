import prisma from '../config/prisma';
import { PrismaClient } from '@prisma/client';
import { Activation } from '@prisma/client';

class ActivationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async save(activation: Omit<Activation, 'id'>) {
        return this.prisma.activation.create({
            data: activation
        });
    }

    async findAll() {
        return this.prisma.activation.findMany();
    }

    async count() {
        return this.prisma.activation.count();
    }

    async dailyCount() {
        return this.prisma.activation.count({
            where: {
                activatedAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)) // Start of the current day
                }
            }
        });
    }

    async weeklyCount() {
        return this.prisma.activation.count({
            where: {
                activatedAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)) // Start of the week
                }
            }
        });
    }

    async weeklyActivations() {
        return this.prisma.activation.findMany({
            where: {
                activatedAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)) // Start of the week
                }
            }
        });
    }

    async getActivationCountForDay(date: Date) {
        return this.prisma.activation.count({
            where: {
                activatedAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                }
            }
        });
    }
}

export default new ActivationRepository();
