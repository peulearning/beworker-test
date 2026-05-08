"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importando o framework Express para criar o servidor web
const cors_1 = __importDefault(require("cors")); // Importando o middleware CORS para permitir requisições de diferentes origens
const auth_routes_1 = __importDefault(require("./modules/users/routes/auth.routes")); // Importando as rotas de autenticação
const project_routes_1 = __importDefault(require("./modules/projects/routes/project.routes"));
const link_routes_1 = __importDefault(require("./modules/links/routes/link.routes"));
const parameter_routes_1 = __importDefault(require("./modules/parameters/routes/parameter.routes"));
const app = (0, express_1.default)(); // Criando uma instância do aplicativo Express
app.use((0, cors_1.default)()); // Habilitando o CORS para todas as rotas
app.use(express_1.default.json()); // Habilitando o middleware para parsear JSON nas requisições
app.get('/', (req, res) => {
    res.send('API Beworker Funcionando ! 🚀');
});
app.use('/auth', auth_routes_1.default); // Registrando as rotas de autenticação
app.use('/projects', project_routes_1.default);
app.use('/links', link_routes_1.default); // Registrando as rotas de links
app.use('/parameters', parameter_routes_1.default);
exports.default = app;
