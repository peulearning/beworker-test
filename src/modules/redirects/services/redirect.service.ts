import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LinkService {

  async setRedirect(userId: string, linkId: string, url: string) {
    // 🔒 1. Verifica se o link pertence ao usuário
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

    // 🔁 2. Upsert seguro
    return prisma.redirect.upsert({
      where: { linkId },
      update: { url },
      create: {
        linkId,
        url,
      },
    });
  }

  async getRedirect(userId: string, linkId: string) {
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        project: {
          userId,
        },
      },
      include: {
        redirect: true,
      },
    });

    if (!link) {
      throw new Error('Link não encontrado');
    }

    return link.redirect;
  }
}