import prisma from '../config/prisma';
import { PrismaClient } from '@prisma/client';
import { Image } from '@prisma/client';

class ImageRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async save(image: Omit<Image, 'id'>) {
        return this.prisma.image.create({
            data: image
        });
    }

    async findAll() {
        return this.prisma.image.findMany({
            orderBy: {
                uploadedAt: 'desc'
            }
        });
    }

    async findById(id: number) {
        return this.prisma.image.findUnique({
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        return this.prisma.image.delete({
            where: {
                id
            }
        });
    }

    async update(id: number, data: Image) {
        return this.prisma.image.update({
            where: {
                id
            },
            data
        });
    }

    async findByFilename(filename: string) {
        return this.prisma.image.findFirst({
            where: {
                filename
            }
        });
    }

    async findNImages(count: number) {
        return this.prisma.image.findMany({
            take: count,
            orderBy: {
                uploadedAt: 'desc'
            }
        });
    }
}

export default new ImageRepository();
