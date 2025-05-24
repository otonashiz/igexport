import { VALIDATION_RULES } from './constants';
import type { ValidationResult } from '@/types/common';

/**
 * 验证Instagram用户名或URL
 */
export const validateInstagramInput = (input: string): ValidationResult => {
  if (!input || !input.trim()) {
    return {
      isValid: false,
      error: 'Please enter a username or URL',
    };
  }

  const trimmed = input.trim();
  
  // 检查是否是URL格式
  if (trimmed.includes('instagram.com')) {
    return validateInstagramUrl(trimmed);
  }
  
  // 检查是否是用户名格式
  return validateInstagramUsername(trimmed);
};

/**
 * 验证Instagram URL
 */
export const validateInstagramUrl = (url: string): ValidationResult => {
  try {
    const urlObj = new URL(url);
    
    if (!urlObj.hostname.includes('instagram.com')) {
      return {
        isValid: false,
        error: 'Please enter a valid Instagram URL',
      };
    }

    // 提取用户名
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    if (pathParts.length === 0) {
      return {
        isValid: false,
        error: 'Cannot find username in URL',
      };
    }

    const username = pathParts[0];
    const usernameValidation = validateInstagramUsername(username);
    
    if (!usernameValidation.isValid) {
      return usernameValidation;
    }

    return {
      isValid: true,
      cleanValue: username,
    };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL format',
    };
  }
};

/**
 * 验证Instagram用户名
 */
export const validateInstagramUsername = (username: string): ValidationResult => {
  const { minLength, maxLength, pattern } = VALIDATION_RULES.username;
  
  if (username.length < minLength || username.length > maxLength) {
    return {
      isValid: false,
      error: `Username must be ${minLength}-${maxLength} characters long`,
    };
  }

  if (!pattern.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, dots, and underscores',
    };
  }

  return {
    isValid: true,
    cleanValue: username,
  };
};

/**
 * 提取Instagram用户名
 * 支持多种输入格式：username, @username, URL
 */
export const extractUsername = (input: string): string | null => {
  const trimmed = input.trim();
  
  // 移除@符号
  if (trimmed.startsWith('@')) {
    return trimmed.slice(1);
  }
  
  // 如果是URL，提取用户名
  if (trimmed.includes('instagram.com')) {
    try {
      const url = new URL(trimmed);
      const pathParts = url.pathname.split('/').filter(Boolean);
      return pathParts[0] || null;
    } catch {
      return null;
    }
  }
  
  // 直接返回用户名
  return trimmed || null;
};

/**
 * 验证导出数量
 */
export const validateExportCount = (count: number): ValidationResult => {
  const { min, max } = VALIDATION_RULES.exportCount;
  
  if (count < min || count > max) {
    return {
      isValid: false,
      error: `Export count must be between ${min} and ${max}`,
    };
  }

  return {
    isValid: true,
    cleanValue: count.toString(),
  };
};

/**
 * 检查用户名可用性（前端预检）
 */
export const isValidUsernameFormat = (username: string): boolean => {
  if (!username) return false;
  return VALIDATION_RULES.username.pattern.test(username);
}; 