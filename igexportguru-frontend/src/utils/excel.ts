import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { InstagramUser, ExportType } from '@/types/instagram';

export interface ExcelExportOptions {
  filename?: string;
  maxRows?: number;
  includeHeaders?: boolean;
}

/**
 * 将Instagram用户数据导出为Excel文件
 */
export const exportToExcel = (
  data: InstagramUser[],
  exportType: ExportType,
  options: ExcelExportOptions = {}
): void => {
  const {
    filename,
    maxRows = 200,
    includeHeaders = true,
  } = options;

  // 限制导出数量
  const exportData = data.slice(0, maxRows);

  // 准备Excel数据
  const worksheetData = exportData.map((user, index) => ({
    '序号': index + 1,
    '用户名': user.userName,
    '显示名称': user.fullName || '',
    '认证状态': user.isVerified ? '已认证' : '未认证',
    '个人资料链接': user.profileUrl,
    '用户ID': user.id || '',
  }));

  // 创建工作簿
  const workbook = XLSX.utils.book_new();
  
  // 创建工作表
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // 设置列宽
  const columnWidths = [
    { wch: 8 },   // 序号
    { wch: 20 },  // 用户名
    { wch: 25 },  // 显示名称
    { wch: 12 },  // 认证状态
    { wch: 40 },  // 个人资料链接
    { wch: 15 },  // 用户ID
  ];
  worksheet['!cols'] = columnWidths;

  // 设置表头样式
  if (includeHeaders) {
    const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:F1');
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellAddress]) continue;
      
      worksheet[cellAddress].s = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: 'E4405F' } }, // Instagram pink
        alignment: { horizontal: 'center', vertical: 'center' },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
      };
    }
  }

  // 添加工作表到工作簿
  const sheetName = exportType === 'followers' ? 'Followers' : 'Following';
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 生成文件名
  const finalFilename = filename || generateFilename(exportType);

  // 生成Excel文件
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // 创建Blob并下载
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, finalFilename);
};

/**
 * 生成默认文件名
 */
export const generateFilename = (exportType: ExportType): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  const type = exportType === 'followers' ? 'followers' : 'following';
  return `instagram_${type}_${timestamp}.xlsx`;
};

/**
 * 验证数据是否可以导出
 */
export const validateExportData = (data: InstagramUser[]): {
  isValid: boolean;
  error?: string;
} => {
  if (!data || data.length === 0) {
    return {
      isValid: false,
      error: '没有可导出的数据',
    };
  }

  // 检查数据格式
  const invalidUsers = data.filter(user => 
    !user.userName || typeof user.userName !== 'string'
  );

  if (invalidUsers.length > 0) {
    return {
      isValid: false,
      error: `发现 ${invalidUsers.length} 个无效用户数据`,
    };
  }

  return { isValid: true };
};

/**
 * 获取导出统计信息
 */
export const getExportStats = (data: InstagramUser[], maxRows: number = 200) => {
  const totalUsers = data.length;
  const exportedUsers = Math.min(totalUsers, maxRows);
  const verifiedUsers = data.slice(0, exportedUsers).filter(user => user.isVerified).length;
  const verificationRate = exportedUsers > 0 ? (verifiedUsers / exportedUsers * 100).toFixed(1) : '0';

  return {
    totalUsers,
    exportedUsers,
    verifiedUsers,
    verificationRate: `${verificationRate}%`,
    isLimited: totalUsers > maxRows,
  };
};

/**
 * 预览Excel数据（用于表格显示）
 */
export const previewExcelData = (
  data: InstagramUser[],
  limit: number = 10
): Array<Record<string, any>> => {
  return data.slice(0, limit).map((user, index) => ({
    序号: index + 1,
    用户名: user.userName,
    显示名称: user.fullName || '-',
    认证状态: user.isVerified ? '已认证' : '未认证',
    个人资料链接: user.profileUrl,
  }));
}; 