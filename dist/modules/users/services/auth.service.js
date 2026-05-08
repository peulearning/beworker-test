"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../../../config/auth");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(data) {
        const userExists = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
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
            where: {
                email: data.email,
            },
        });
        if (!user || user.password !== data.password) {
            throw new Error("Credenciais inválidas");
        }
        const secret = auth_1.authconfig.jwt.secret;
        const options = {
            expiresIn: "1d",
        };
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, secret, options);
        return { token };
    }
}
exports.AuthService = AuthService;
