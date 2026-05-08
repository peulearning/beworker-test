"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
const service = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        const data = auth_dto_1.registerSchema.parse(req.body);
        const user = await service.register(data);
        return res.status(201).json(user);
    }
    async login(req, res) {
        const data = auth_dto_1.loginSchema.parse(req.body);
        const result = await service.login(data);
        return res.json(result);
    }
}
exports.AuthController = AuthController;
