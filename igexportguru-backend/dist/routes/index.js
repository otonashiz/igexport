"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("@/config"));
const router = (0, express_1.Router)();
// 健康检查端点
router.get('/health', (req, res) => {
    const response = {
        success: true,
        data: {
            status: 'healthy',
            environment: config_1.default.nodeEnv,
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        },
        timestamp: new Date().toISOString(),
    };
    res.json(response);
});
// 导出路由组
router.use('/export', (req, res) => {
    const response = {
        success: false,
        error: 'Export routes not yet implemented',
        message: 'This will be implemented in Phase 2',
        timestamp: new Date().toISOString(),
    };
    res.status(501).json(response);
});
exports.default = router;
