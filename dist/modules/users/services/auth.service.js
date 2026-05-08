"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../../../config/auth");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(data) {
        const userExists = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (userExists) {
            throw new Error("Usuário já existe");
        }
        const user = await prisma.user.create({
            data,
        });
        return user;
    }
    async login(data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user || user.password !== data.password) {
            throw new Error("Credenciais inválidas");
        }
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, auth_1.authconfig.jwt.secret, {
            expiresIn: auth_1.authconfig.jwt.expireIn,
        });
        return { token };
    }
}
exports.AuthService = AuthService;
