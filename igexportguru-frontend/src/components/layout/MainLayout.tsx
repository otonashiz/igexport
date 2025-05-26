import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  /** 是否显示Footer */
  showFooter?: boolean;
  /** 是否显示Header */
  showHeader?: boolean;
  /** 主要内容区域的额外类名 */
  contentClassName?: string;
  /** 整体容器的额外类名 */
  className?: string;
}

export default function MainLayout({
  children,
  showFooter = true,
  showHeader = true,
  contentClassName = '',
  className = ''
}: MainLayoutProps) {
  return (
    <div className={`min-h-screen bg-neutral-50 flex flex-col ${className}`}>
      {/* Header */}
      {showHeader && <Header />}
      
      {/* 主要内容区域 */}
      <main className={`flex-1 ${contentClassName}`}>
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

// 导出一个简化版的布局组件（无Footer）
export function SimpleLayout({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <MainLayout 
      showFooter={false} 
      className={className}
    >
      {children}
    </MainLayout>
  );
}

// 导出一个全屏布局组件（无Header和Footer）
export function FullscreenLayout({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`min-h-screen bg-neutral-50 ${className}`}>
      {children}
    </div>
  );
}

// 导出一个居中内容的布局组件
export function CenteredLayout({ 
  children, 
  maxWidth = 'max-w-4xl',
  className = '' 
}: { 
  children: React.ReactNode; 
  maxWidth?: string;
  className?: string; 
}) {
  return (
    <MainLayout 
      contentClassName={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}
      className={className}
    >
      {children}
    </MainLayout>
  );
} 