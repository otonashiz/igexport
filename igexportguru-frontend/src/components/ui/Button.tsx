import React from 'react';
import Loading from './Loading';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'ig-gradient-bg text-white hover:scale-[1.02] focus:ring-instagram-pink/50 shadow-lg hover:shadow-instagram',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500',
    outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 focus:ring-neutral-500',
    ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loading type="spinner" size="sm" className="text-current" />
          {children && <span>Loading...</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button; 