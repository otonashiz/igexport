import type { ExportType, InstagramUser } from './instagram';

export interface ExportFormData {
  username: string;
  exportType: ExportType;
  maxCount: number;
}

export interface ExportTask {
  id: string;
  status: ExportStatus;
  progress: number;
  data?: InstagramUser[];
  error?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type ExportStatus = 'pending' | 'analyzing' | 'scraping' | 'processing' | 'completed' | 'failed';

export interface ExportState {
  // 状态
  username: string;
  exportType: ExportType;
  data: InstagramUser[];
  isLoading: boolean;
  progress: number;
  error: string | null;
  currentTask?: ExportTask;
  
  // 动作
  setUsername: (username: string) => void;
  setExportType: (type: ExportType) => void;
  setData: (data: InstagramUser[]) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setCurrentTask: (task: ExportTask | undefined) => void;
  reset: () => void;
} 