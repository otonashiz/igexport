import React from 'react';
import { useTranslation } from 'react-i18next';

// 静态示例数据
const sampleData = [
  {
    id: 1,
    username: '@user_1',
    fullName: 'User 1',
    status: 'verified_private',
    followers: '4,059',
    following: '0'
  },
  {
    id: 2,
    username: '@user_2',
    fullName: 'User 2',
    status: 'normal',
    followers: '7,395',
    following: '1,796'
  },
  {
    id: 3,
    username: '@user_3',
    fullName: 'User 3',
    status: 'normal',
    followers: '8,429',
    following: '873'
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
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Followers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Following
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {sampleData.map((user, index) => (
              <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">
                    {user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700">
                    {user.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {user.status === 'verified_private' ? (
                      <>
                        <i className="fas fa-check-circle text-blue-500" title="Verified"></i>
                        <i className="fas fa-lock text-amber-500" title="Private"></i>
                      </>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900 font-medium">
                    {user.followers}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900 font-medium">
                    {user.following}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 底部说明 */}
      <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>Sample preview showing 3 of 200 users</span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-info-circle"></i>
            <span>Actual export will include complete user data</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataPreview; 