import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ExportState } from '@/types/export';

const useExportStore = create<ExportState>()(
  devtools(
    (set) => ({
      // 状态
      username: '',
      exportType: 'followers',
      data: [],
      isLoading: false,
      progress: 0,
      error: null,
      currentTask: undefined,

      // 动作
      setUsername: (username: string) => {
        set({ username: username.trim() }, false, 'setUsername');
      },

      setExportType: (type) => {
        set({ exportType: type }, false, 'setExportType');
      },

      setData: (data) => {
        set({ data }, false, 'setData');
      },

      setLoading: (loading) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setProgress: (progress) => {
        set({ progress: Math.min(Math.max(progress, 0), 100) }, false, 'setProgress');
      },

      setError: (error) => {
        set({ error }, false, 'setError');
      },

      setCurrentTask: (task) => {
        set({ currentTask: task }, false, 'setCurrentTask');
      },

      reset: () => {
        set({
          username: '',
          exportType: 'followers',
          data: [],
          isLoading: false,
          progress: 0,
          error: null,
          currentTask: undefined,
        }, false, 'reset');
      },
    }),
    {
      name: 'export-store',
    }
  )
);

export default useExportStore; 