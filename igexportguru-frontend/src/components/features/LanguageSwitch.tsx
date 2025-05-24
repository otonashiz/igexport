import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, availableLanguages } from '@/i18n';
import Button from '@/components/ui/Button';

interface LanguageSwitchProps {
  className?: string;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  className = '',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = availableLanguages.find(
    lang => lang.code === i18n.language
  ) || availableLanguages[0];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage.name}
        </span>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </Button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-neutral-50 transition-colors ${
                  language.code === i18n.language
                    ? 'bg-instagram-pink/10 text-instagram-pink'
                    : 'text-neutral-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
                {language.code === i18n.language && (
                  <i className="fas fa-check text-xs ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitch; 