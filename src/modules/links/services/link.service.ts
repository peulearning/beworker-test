import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LinkService {
  async create(userId: string, data: {
    name: string;
    baseUrl: string;
    projectId: string;
  }) {
    
    const project = await prisma.project.findFirst({
      where: {
        id: data.projectId,
        userId,
      },
    });

    if (!project) {
      throw new Error('Projeto não encontrado ou não pertence ao usuário');
    }

    return prisma.link.create({
      data: {
        name: data.name,
        baseUrl: data.baseUrl,
        projectId: data.projectId,
      },
    });
  }

  async list(userId: string, projectId?: string) {
    return prisma.link.findMany({
      where: {
        project: {
          userId,
        },
        ...(projectId && { projectId }),
      },
      include: {
        linkParameters: {
          include: {
            parameter: true,
          },
        },
        redirect: true,
      },
    });
  }
}