// 设计令牌
export const DESIGN_TOKENS = {
  colors: {
    instagram: {
      pink: '#E4405F',
      purple: '#833AB4',
      orange: '#F77737',
      gradient: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    },
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
};

// 应用配置
export const APP_CONFIG = {
  name: 'IGExportGuru',
  version: '1.0.0',
  maxExportCount: 200,
  supportedLanguages: ['en', 'zh-CN', 'zh-TW', 'it', 'es'] as const,
  defaultLanguage: 'en' as const,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
};

// 验证规则
export const VALIDATION_RULES = {
  username: {
    minLength: 1,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9._]{1,30}$/,
  },
  exportCount: {
    min: 1,
    max: 200,
  },
};

// API端点
export const API_ENDPOINTS = {
  health: '/health',
  analyze: '/export/analyze',
  exportFollowers: '/export/followers',
  exportFollowing: '/export/following',
  status: '/export/status',
  download: '/export/download',
} as const; 