export interface InstagramUser {
    id: string;
    userName: string;
    fullName: string;
    profileUrl: string;
    isVerified: boolean;
    followerCount?: number;
    followingCount?: number;
    profilePicUrl?: string;
}
export interface AccountInfo {
    userName: string;
    fullName: string;
    profileUrl: string;
    isVerified: boolean;
    followerCount: number;
    followingCount: number;
    isPrivate: boolean;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: string;
}
export interface ExportOptions {
    username: string;
    type: 'followers' | 'following';
    maxCount: number;
}
export interface ExportResult {
    data: InstagramUser[];
    totalCount: number;
    exportedCount: number;
    timestamp: Date;
}
export interface ExportTask {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    data?: InstagramUser[];
    error?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export interface Config {
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    maxExportCount: number;
    puppeteerTimeout: number;
}
declare global {
    namespace Express {
        interface Request {
            taskId?: string;
        }
    }
}
