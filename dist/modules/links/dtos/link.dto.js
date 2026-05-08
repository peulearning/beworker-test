"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkSchema = void 0;
const zod_1 = require("zod");
exports.createLinkSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    baseUrl: zod_1.z.string().url(),
    projectId: zod_1.z.string().uuid(),
});
