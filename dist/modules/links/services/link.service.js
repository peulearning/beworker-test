"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class LinkService {
    async create(userId, data) {
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
    async list(userId, projectId) {
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
    // ===================  EVOLUINDO AQUI ===========================
    async setRedirect(userId, linkId, url) {
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
    async generate(userId, linkId) {
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
            .map((lp) => `${lp.parameter.name}=${lp.parameter.value}`)
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
exports.LinkService = LinkService;
