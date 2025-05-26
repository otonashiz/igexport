import React, { useState, useMemo } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pageSize?: number;
  showPagination?: boolean;
  emptyText?: string;
  onRowClick?: (record: T, index: number) => void;
  className?: string;
}

type SortOrder = 'asc' | 'desc' | null;

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pageSize = 10,
  showPagination = true,
  emptyText = 'No data available',
  onRowClick,
  className = ''
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // 排序逻辑
  const sortedData = useMemo(() => {
    if (!sortKey || !sortOrder) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortKey, sortOrder]);

  // 分页逻辑
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // 处理排序
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    if (sortKey === column.key) {
      // 切换排序顺序
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc');
      if (sortOrder === 'desc') {
        setSortKey(null);
      }
    } else {
      setSortKey(column.key);
      setSortOrder('asc');
    }
  };

  // 获取排序图标
  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;
    
    if (sortKey !== column.key) {
      return <i className="fas fa-sort text-neutral-400 ml-1"></i>;
    }
    
    if (sortOrder === 'asc') {
      return <i className="fas fa-sort-up text-instagram-primary ml-1"></i>;
    }
    
    if (sortOrder === 'desc') {
      return <i className="fas fa-sort-down text-instagram-primary ml-1"></i>;
    }
    
    return <i className="fas fa-sort text-neutral-400 ml-1"></i>;
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-neutral-200 ${className}`}>
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-instagram-primary"></div>
          <p className="mt-2 text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 overflow-hidden ${className}`}>
      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-neutral-100 select-none' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-neutral-500">
                  <i className="fas fa-inbox text-4xl text-neutral-300 mb-4"></i>
                  <p>{emptyText}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr
                  key={index}
                  className={`hover:bg-neutral-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {column.render 
                        ? column.render(record[column.key], record, index)
                        : String(record[column.key] || '-')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {showPagination && totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, sortedData.length)}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {/* 页码按钮 */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-instagram-primary border-instagram-primary text-white'
                          : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 