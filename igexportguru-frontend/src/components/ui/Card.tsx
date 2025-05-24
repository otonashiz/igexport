import React from 'react';
import type { BaseComponentProps } from '@/types/common';

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick,
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-neutral-200 shadow-sm',
    elevated: 'bg-white shadow-lg border border-neutral-100',
    outline: 'bg-transparent border-2 border-neutral-300',
    ghost: 'bg-neutral-50 border border-neutral-100',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const interactionClasses = [];
  
  if (clickable || onClick) {
    interactionClasses.push('cursor-pointer');
  }
  
  if (hover) {
    interactionClasses.push('hover:shadow-lg hover:-translate-y-0.5');
  }
  
  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    ...interactionClasses,
    className,
  ].filter(Boolean).join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={finalClasses}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </CardComponent>
  );
};

// Card子组件
export const CardHeader: React.FC<BaseComponentProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<BaseComponentProps> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-neutral-900 ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<BaseComponentProps> = ({ children, className = '' }) => (
  <p className={`text-sm text-neutral-600 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<BaseComponentProps> = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter: React.FC<BaseComponentProps> = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-neutral-200 ${className}`}>
    {children}
  </div>
);

export default Card; 