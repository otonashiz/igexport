import React, { forwardRef } from 'react';
import type { BaseComponentProps } from '@/types/common';

export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  label,
  hint,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = true,
  className = '',
}, ref) => {
  const hasError = Boolean(error);
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };
  
  const baseInputClasses = 'w-full border rounded-lg transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateClasses = hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    : 'border-neutral-300 focus:border-instagram-pink focus:ring-2 focus:ring-instagram-pink/20';
  
  const inputClasses = [
    baseInputClasses,
    sizeClasses[size],
    stateClasses,
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    fullWidth ? 'w-full' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={`${hasError ? 'text-red-400' : 'text-neutral-400'}`}>
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className={`${hasError ? 'text-red-400' : 'text-neutral-400'}`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 