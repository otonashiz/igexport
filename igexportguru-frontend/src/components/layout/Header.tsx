import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '@/components/features/LanguageSwitch';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  className = '',
}) => {
  const { t } = useTranslation();

  return (
    <header className={`bg-white border-b border-neutral-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold ig-gradient-text">
                {t('header.title')}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('header.subtitle')}
              </p>
            </div>
          </div>

          {/* 右侧导航 */}
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 