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

export type ExportType = 'followers' | 'following';

export interface AccountInfo {
  userName: string;
  fullName: string;
  profileUrl: string;
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  isPrivate: boolean;
}

export interface ExportOptions {
  username: string;
  type: ExportType;
  maxCount: number;
}

export interface ExportResult {
  data: InstagramUser[];
  totalCount: number;
  exportedCount: number;
  timestamp: Date;
} 