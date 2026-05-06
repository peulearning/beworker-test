import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectService {
  async create(userId: string, data: { name : string }) {
   return prisma.project.create({
    data: {
      name: data.name,
      userId: userId,
    },
   });
  }

  async list(userId: string) {
    return prisma.project.findMany({
      where: {
        userId: userId,
      },
    });
  }
}