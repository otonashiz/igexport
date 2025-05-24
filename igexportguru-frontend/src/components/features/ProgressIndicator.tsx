import React from 'react';
import Card, { CardContent } from '@/components/ui/Card';
import Loading from '@/components/ui/Loading';
import type { ExportStatus } from '@/types/export';

interface ProgressIndicatorProps {
  status: ExportStatus;
  progress: number;
  currentStep?: string;
  estimatedTime?: string;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  status,
  progress,
  currentStep = '',
  estimatedTime,
  className = '',
}) => {
  // 状态映射
  const statusConfig = {
    pending: {
      icon: 'fas fa-clock',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: '准备中',
      description: '正在初始化导出任务...',
    },
    analyzing: {
      icon: 'fas fa-search',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: '分析账户',
      description: '正在获取账户信息...',
    },
    scraping: {
      icon: 'fas fa-download',
      color: 'text-instagram-orange',
      bgColor: 'bg-orange-50',
      title: '获取数据',
      description: '正在获取关注者列表...',
    },
    processing: {
      icon: 'fas fa-cogs',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: '处理数据',
      description: '正在生成Excel文件...',
    },
    completed: {
      icon: 'fas fa-check-circle',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: '完成',
      description: '导出成功完成！',
    },
    failed: {
      icon: 'fas fa-exclamation-circle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      title: '失败',
      description: '导出过程中出现错误',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  // 步骤列表
  const steps = [
    { key: 'analyzing', label: '分析账户' },
    { key: 'scraping', label: '获取数据' },
    { key: 'processing', label: '处理数据' },
    { key: 'completed', label: '完成导出' },
  ];

  const getCurrentStepIndex = () => {
    const stepIndex = steps.findIndex(step => step.key === status);
    return stepIndex >= 0 ? stepIndex : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <Card className={`${config.bgColor} border-0 ${className}`} padding="none">
      <CardContent className="p-6">
        {/* 状态图标和标题 */}
        <div className="flex items-center mb-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${config.bgColor} border-2 border-white shadow-md mr-4`}>
            {status === 'analyzing' || status === 'scraping' || status === 'processing' ? (
              <Loading type="spinner" size="md" className={config.color} />
            ) : (
              <i className={`${config.icon} text-xl ${config.color}`} />
            )}
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${config.color}`}>
              {config.title}
            </h3>
            <p className="text-sm text-neutral-600">
              {currentStep || config.description}
            </p>
          </div>
        </div>

        {/* 进度条 */}
        {status !== 'pending' && status !== 'failed' && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-700">
                进度: {Math.round(progress)}%
              </span>
              {estimatedTime && (
                <span className="text-sm text-neutral-500">
                  预计剩余时间: {estimatedTime}
                </span>
              )}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div
                className="ig-gradient-bg h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* 步骤指示器 */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    index <= currentStepIndex
                      ? 'ig-gradient-bg text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <i className="fas fa-check text-xs" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= currentStepIndex
                      ? 'text-neutral-700'
                      : 'text-neutral-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-8 transition-all duration-200 ${
                    index < currentStepIndex
                      ? 'ig-gradient-bg'
                      : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* 状态特定信息 */}
        {status === 'completed' && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-green-600 mr-2" />
              <span className="text-sm text-green-700">
                Excel文件已准备就绪，点击下载按钮获取文件
              </span>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-600 mr-2" />
              <span className="text-sm text-red-700">
                请检查用户名是否正确，或稍后重试
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator; 