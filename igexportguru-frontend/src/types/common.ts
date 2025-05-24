export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  cleanValue?: string;
}

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'it' | 'es';

export interface LanguageOption {
  code: Language;
  name: string;
} 