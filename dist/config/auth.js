"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authconfig = void 0;
exports.authconfig = {
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        expireIn: '1d',
    },
};
