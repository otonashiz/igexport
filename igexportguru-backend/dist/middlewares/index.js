"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.requestLogger = exports.notFoundHandler = exports.errorHandler = void 0;
// 错误处理中间件
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const response = {
        success: false,
        error: err.message || 'Internal Server Error',
        timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
// 404处理中间件
const notFoundHandler = (req, res) => {
    const response = {
        success: false,
        error: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
    };
    res.status(404).json(response);
};
exports.notFoundHandler = notFoundHandler;
// 请求日志中间件
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    next();
};
exports.requestLogger = requestLogger;
// 基础验证中间件
const validateRequest = (req, res, next) => {
    // 基础请求验证逻辑
    if (req.method === 'POST' && !req.body) {
        const response = {
            success: false,
            error: 'Request body is required',
            timestamp: new Date().toISOString(),
        };
        res.status(400).json(response);
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
