import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ParameterService {
  async create(data: { key: string; value: string }) {
    return prisma.parameter.create({
      data: {
        name: data.key,
        value: data.value,
      },
    });
  }

  async list() {
    return prisma.parameter.findMany();
  }

  async attachToLink(linkId: string, parameterId: string) {
    return prisma.linkParameter.create({
      data: {
        linkId,
        parameterId,
      },
    });
  }
}