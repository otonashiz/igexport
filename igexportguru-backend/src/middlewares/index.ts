import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

// 错误处理中间件
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const response: ApiResponse = {
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  };

  res.status(500).json(response);
};

// 404处理中间件
export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  const response: ApiResponse = {
    success: false,
    error: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  };

  res.status(404).json(response);
};

// 请求日志中间件
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

// 基础验证中间件
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 基础请求验证逻辑
  if (req.method === 'POST' && !req.body) {
    const response: ApiResponse = {
      success: false,
      error: 'Request body is required',
      timestamp: new Date().toISOString(),
    };
    
    res.status(400).json(response);
    return;
  }

  next();
}; 