"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkController = void 0;
const link_service_1 = require("../services/link.service");
const link_dto_1 = require("../dtos/link.dto");
const service = new link_service_1.LinkService();
class LinkController {
    async create(req, res) {
        const userId = req.userId;
        const data = link_dto_1.createLinkSchema.parse(req.body);
        const link = await service.create(userId, data);
        return res.status(201).json(link);
    }
    async list(req, res) {
        const userId = req.userId;
        const { projectId } = req.query;
        const links = await service.list(userId, projectId);
        return res.json(links);
    }
    async generate(req, res) {
        const userId = req.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { finalUrl, redirectTo } = await service.generate(userId, id);
        // 🎯 AQUI acontece o redirect real
        if (redirectTo) {
            return res.redirect(302, redirectTo);
        }
        return res.json({ url: finalUrl });
    }
}
exports.LinkController = LinkController;
