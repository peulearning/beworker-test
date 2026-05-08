"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parameter_controller_1 = require("../controllers/parameter.controller");
const auth_middlewares_1 = require("../../../shared/middlewares/auth.middlewares");
const router = (0, express_1.Router)();
const controller = new parameter_controller_1.ParameterController();
router.post('/', auth_middlewares_1.authMiddleware, controller.create);
router.get('/', auth_middlewares_1.authMiddleware, controller.list);
// associação
router.post('/attach', auth_middlewares_1.authMiddleware, controller.attach);
exports.default = router;
