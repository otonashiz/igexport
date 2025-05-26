import React from 'react';

export interface ProgressBarProps {
  /** 进度百分比 (0-100) */
  percent: number;
  /** 进度条类型 */
  type?: 'default' | 'success' | 'warning' | 'error';
  /** 进度条大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示百分比文字 */
  showPercent?: boolean;
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义颜色 */
  color?: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 额外的CSS类名 */
  className?: string;
  /** 状态文字 */
  status?: string;
}

export default function ProgressBar({
  percent = 0,
  type = 'default',
  size = 'md',
  showPercent = false,
  animated = true,
  color,
  backgroundColor,
  className = '',
  status
}: ProgressBarProps) {
  // 限制百分比在0-100之间
  const normalizedPercent = Math.max(0, Math.min(100, percent));

  // 获取类型对应的颜色
  const getTypeColor = () => {
    if (color) return color;
    
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gradient-to-r from-instagram-primary to-instagram-secondary';
    }
  };

  // 获取尺寸类名
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  // 获取背景色
  const getBackgroundColor = () => {
    return backgroundColor || 'bg-neutral-200';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 顶部信息行 */}
      {(showPercent || status) && (
        <div className="flex justify-between items-center mb-1">
          {status && (
            <span className="text-sm text-neutral-600">{status}</span>
          )}
          {showPercent && (
            <span className="text-sm font-medium text-neutral-700">
              {normalizedPercent}%
            </span>
          )}
        </div>
      )}

      {/* 进度条容器 */}
      <div 
        className={`
          relative overflow-hidden rounded-full 
          ${getSizeClass()} 
          ${getBackgroundColor()}
        `}
      >
        {/* 进度条填充 */}
        <div
          className={`
            ${getSizeClass()} 
            ${getTypeColor()}
            transition-all duration-300 ease-out
            ${animated ? 'animate-pulse' : ''}
            relative overflow-hidden
          `}
          style={{ width: `${normalizedPercent}%` }}
        >
          {/* 动画效果 */}
          {animated && normalizedPercent > 0 && (
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_1.5s_infinite]" />
          )}
        </div>

        {/* 条纹动画效果 */}
        {animated && normalizedPercent > 0 && type === 'default' && (
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slide_2s_infinite]"
            style={{ width: '30%', left: `${normalizedPercent}%` }}
          />
        )}
      </div>

      {/* 底部附加信息 */}
      {size === 'lg' && showPercent && (
        <div className="mt-1 text-xs text-neutral-500 text-center">
          {normalizedPercent === 100 ? 'Completed' : 'Processing...'}
        </div>
      )}
    </div>
  );
}

// 导出简化版本组件
export function SimpleProgressBar({ 
  percent, 
  className = '' 
}: { 
  percent: number; 
  className?: string; 
}) {
  return (
    <ProgressBar 
      percent={percent}
      size="sm"
      animated={false}
      className={className}
    />
  );
}

// 导出带状态的进度条组件
export function StatusProgressBar({ 
  percent, 
  status, 
  type = 'default',
  className = '' 
}: { 
  percent: number; 
  status: string;
  type?: ProgressBarProps['type'];
  className?: string; 
}) {
  return (
    <ProgressBar 
      percent={percent}
      status={status}
      type={type}
      showPercent={true}
      size="md"
      className={className}
    />
  );
} 