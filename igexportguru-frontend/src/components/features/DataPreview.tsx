import React from 'react';
import { useTranslation } from 'react-i18next';

// 静态示例数据 - 符合Excel导出字段规范
const sampleData = [
  {
    id: '12345678901',
    userName: 'user_1',
    fullName: 'User 1',
    profileUrl: 'https://instagram.com/user_1',
    isVerified: true
  },
  {
    id: '12345678902',
    userName: 'user_2',
    fullName: 'User 2',
    profileUrl: 'https://instagram.com/user_2',
    isVerified: false
  },
  {
    id: '12345678903',
    userName: 'user_3',
    fullName: 'User 3',
    profileUrl: 'https://instagram.com/user_3',
    isVerified: false
  }
];

const DataPreview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      {/* 表头 */}
      <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900">
          {t('dataPreview.followersTitle')}
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Sample data preview - actual export will contain real user data
        </p>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Profile URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Verified
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {sampleData.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 font-mono">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">
                    {user.userName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700">
                    {user.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={user.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    {user.profileUrl}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.isVerified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <i className="fas fa-check-circle mr-1"></i>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Verified
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 底部说明 */}
      <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-neutral-500">
          <span>Sample preview showing 3 of 200 users</span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-info-circle"></i>
            <span>Excel export includes: ID, Username, Full Name, Profile URL, Verified Status</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataPreview; 