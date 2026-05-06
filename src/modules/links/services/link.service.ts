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


  async setRedirect(userId: string, linkId: string, url: string) {
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        project: {
          userId,
        },
      },
    });

    if (!link) {
      throw new Error('Link não encontrado ou não pertence ao usuário');
    }

    return prisma.redirect.upsert({
      where: { linkId },
      update: { url },
      create: {
        linkId,
        url,
      },
    });
  }

  async generate(userId: string, linkId: string) {
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        project: {
          userId,
        },
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

    if (!link) {
      throw new Error('Link não encontrado');
    }

    // 🔗 monta parâmetros
    const params = link.linkParameters
      .map(lp => `${lp.parameter.name}=${lp.parameter.value}`)
      .join('&');

    let finalUrl = link.baseUrl;

    if (params) {
      finalUrl += `?${params}`;
    }

    return {
      finalUrl,
      redirectTo: link.redirect?.url || null,
    };
  }

}

