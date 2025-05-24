import dotenv from 'dotenv';
import { Config } from '@/types';

// 加载环境变量
dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  maxExportCount: parseInt(process.env.MAX_EXPORT_COUNT || '200', 10),
  puppeteerTimeout: parseInt(process.env.PUPPETEER_TIMEOUT || '30000', 10),
};

export default config; 