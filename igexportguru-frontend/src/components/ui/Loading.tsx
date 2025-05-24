import React from 'react';
import type { BaseComponentProps } from '@/types/common';

export interface LoadingProps extends BaseComponentProps {
  type?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export interface ProgressProps extends BaseComponentProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'instagram';
}

// 旋转加载器
const Spinner: React.FC<{ size: string }> = ({ size }) => (
  <svg className={`animate-spin ${size}`} fill="none" viewBox="0 0 24 24">
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// 点状加载器
const Dots: React.FC<{ size: string }> = ({ size }) => {
  const dotSize = size === 'h-4 w-4' ? 'h-2 w-2' : size === 'h-6 w-6' ? 'h-3 w-3' : 'h-4 w-4';
  
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} bg-current rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
};

// 脉冲加载器
const Pulse: React.FC<{ size: string }> = ({ size }) => (
  <div className={`${size} bg-current rounded-full animate-pulse`} />
);

const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  text,
  fullScreen = false,
  className = '',
  overlay = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
  };

  const SpinnerIcon = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const DotsLoader = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${
            size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
          } bg-current rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div className={`animate-pulse ${className}`}>
      <div className={`${sizeClasses[size]} bg-current rounded opacity-75`} />
    </div>
  );

  const renderLoading = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerIcon />;
    }
  };

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {renderLoading()}
        </div>
      </div>
    );
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {renderLoading()}
      </div>
    );
  }

  return renderLoading();
};

// 进度条组件
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'default',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const bgClasses = {
    default: 'bg-neutral-200',
    instagram: 'bg-neutral-200',
  };
  
  const barClasses = {
    default: 'bg-instagram-pink',
    instagram: 'bg-gradient-to-r from-instagram-orange to-instagram-pink',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-neutral-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full h-2 rounded-full overflow-hidden ${bgClasses[variant]}`}>
        <div
          className={`h-full transition-all duration-300 ease-out ${barClasses[variant]} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Loading; 