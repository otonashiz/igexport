"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("@/config"));
const routes_1 = __importDefault(require("@/routes"));
const middlewares_1 = require("@/middlewares");
const app = (0, express_1.default)();
// 安全中间件
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    },
}));
// CORS配置
app.use((0, cors_1.default)({
    origin: config_1.default.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// 基础中间件
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// 日志中间件
if (config_1.default.nodeEnv === 'development') {
    app.use((0, morgan_1.default)('dev'));
    app.use(middlewares_1.requestLogger);
}
// 请求验证
app.use(middlewares_1.validateRequest);
// API路由
app.use('/api', routes_1.default);
// 根路径
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'IGExportGuru Backend API',
        version: '1.0.0',
        environment: config_1.default.nodeEnv,
        timestamp: new Date().toISOString(),
    });
});
// 错误处理
app.use(middlewares_1.notFoundHandler);
app.use(middlewares_1.errorHandler);
// 启动服务器
const server = app.listen(config_1.default.port, () => {
    console.log(`🚀 Server running on port ${config_1.default.port}`);
    console.log(`📝 Environment: ${config_1.default.nodeEnv}`);
    console.log(`🌐 CORS Origin: ${config_1.default.corsOrigin}`);
    console.log(`📊 Max Export Count: ${config_1.default.maxExportCount}`);
});
// 优雅关闭
process.on('SIGTERM', () => {
    console.log('📋 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
    });
});
process.on('SIGINT', () => {
    console.log('📋 SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
    });
});
exports.default = app;
