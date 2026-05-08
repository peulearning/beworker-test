"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterController = void 0;
const parameter_services_1 = require("../services/parameter.services");
const parameter_dto_1 = require("../dto/parameter.dto");
const service = new parameter_services_1.ParameterService();
class ParameterController {
    async create(req, res) {
        const data = parameter_dto_1.createParameterSchema.parse(req.body);
        const parameter = await service.create(data);
        return res.status(201).json(parameter);
    }
    async list(req, res) {
        const parameters = await service.list();
        return res.json(parameters);
    }
    async attach(req, res) {
        const { linkId, parameterId } = req.body;
        const result = await service.attachToLink(linkId, parameterId);
        return res.status(201).json(result);
    }
}
exports.ParameterController = ParameterController;
