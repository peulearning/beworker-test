"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("../services/project.service");
const project_dto_1 = require("../dtos/project.dto");
const service = new project_service_1.ProjectService();
class ProjectController {
    async create(req, res) {
        const userId = req.userId;
        const parsed = project_dto_1.createProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues });
        }
        const project = await service.create(userId, parsed.data);
        res.status(201).json(project);
    }
    async list(req, res) {
        const userId = req.userId;
        const projects = await service.list(userId);
        return res.json(projects);
    }
}
exports.ProjectController = ProjectController;
