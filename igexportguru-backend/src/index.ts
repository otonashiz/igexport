import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import config from '@/config';
import routes from '@/routes';
import { errorHandler, notFoundHandler, requestLogger, validateRequest } from '@/middlewares';

const app = express();

// 安全中间件
app.use(helmet({
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
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 基础中间件
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 日志中间件
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
  app.use(requestLogger);
}

// 请求验证
app.use(validateRequest);

// API路由
app.use('/api', routes);

// 根路径
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'IGExportGuru Backend API',
    version: '1.0.0',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// 错误处理
app.use(notFoundHandler);
app.use(errorHandler);

// 启动服务器
const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🌐 CORS Origin: ${config.corsOrigin}`);
  console.log(`📊 Max Export Count: ${config.maxExportCount}`);
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

export default app; 