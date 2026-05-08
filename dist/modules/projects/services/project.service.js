"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProjectService {
    async create(userId, data) {
        return prisma.project.create({
            data: {
                name: data.name,
                userId: userId,
            },
        });
    }
    async list(userId) {
        return prisma.project.findMany({
            where: {
                userId: userId,
            },
        });
    }
}
exports.ProjectService = ProjectService;
