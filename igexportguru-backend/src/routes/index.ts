import { Router, Request, Response } from 'express';
import { ApiResponse } from '@/types';
import config from '@/config';

const router = Router();

// 健康检查端点
router.get('/health', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    data: {
      status: 'healthy',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
    timestamp: new Date().toISOString(),
  };

  res.json(response);
});

// 导出路由组
router.use('/export', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    error: 'Export routes not yet implemented',
    message: 'This will be implemented in Phase 2',
    timestamp: new Date().toISOString(),
  };

  res.status(501).json(response);
});

export default router; 