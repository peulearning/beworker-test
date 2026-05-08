"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ParameterService {
    async create(data) {
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
    async attachToLink(linkId, parameterId) {
        return prisma.linkParameter.create({
            data: {
                linkId,
                parameterId,
            },
        });
    }
}
exports.ParameterService = ParameterService;
