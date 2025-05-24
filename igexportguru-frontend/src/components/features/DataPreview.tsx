import React from 'react';
import { useTranslation } from 'react-i18next';
import useExportStore from '@/stores/exportStore';

const DataPreview: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, data, exportType } = useExportStore();

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-instagram-pink mx-auto mb-4"></div>
        <p className="text-neutral-500">Loading data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-neutral-400 mb-4">
          <i className="fas fa-table text-4xl"></i>
        </div>
        <h3 className="text-lg font-medium text-neutral-700 mb-2">
          No Data Available
        </h3>
        <p className="text-neutral-500 text-sm">
          Export data will appear here after processing
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
          {exportType === 'followers' ? 'Followers' : 'Following'} Preview
        </h3>
        <p className="text-sm text-neutral-500">
          Showing {Math.min(data.length, 10)} of {data.length} users
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Verified
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {data.slice(0, 10).map((user, index) => (
              <tr key={user.id || index} className="hover:bg-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-neutral-900">
                      {user.userName}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700">
                    {user.fullName || '-'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700">
                    {user.isVerified ? (
                      <i className="fas fa-check-circle text-blue-500"></i>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length > 10 && (
        <p className="text-xs text-neutral-500 mt-3">
          {data.length - 10} more users will be included in the export
        </p>
      )}
    </div>
  );
};

export default DataPreview; 