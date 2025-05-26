import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('footer.links.usage'),
      items: [
        { label: t('footer.links.howToUse'), href: '#how-to-use' },
        { label: t('footer.links.faq'), href: '#faq' },
        { label: t('footer.links.limitations'), href: '#limitations' }
      ]
    },
    {
      title: t('footer.links.legal'),
      items: [
        { label: t('footer.links.privacy'), href: '#privacy' },
        { label: t('footer.links.terms'), href: '#terms' },
        { label: t('footer.links.disclaimer'), href: '#disclaimer' }
      ]
    },
    {
      title: t('footer.links.support'),
      items: [
        { label: t('footer.links.contact'), href: 'mailto:support@igexportguru.com' },
        { label: t('footer.links.feedback'), href: '#feedback' },
        { label: t('footer.links.bug'), href: '#bug-report' }
      ]
    }
  ];

  return (
    <footer className={`bg-white border-t border-neutral-200 ${className}`}>
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-instagram-primary to-instagram-secondary rounded-lg flex items-center justify-center">
                <i className="fab fa-instagram text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-neutral-900">IGExportGuru</span>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-instagram-primary transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://github.com/otonashiz/igexport" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="mailto:support@igexportguru.com"
                className="text-neutral-400 hover:text-blue-500 transition-colors"
              >
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>

          {/* 链接分组 */}
          {footerLinks.map((group, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-sm text-neutral-600 hover:text-instagram-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 重要提示区域 */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-amber-500 mt-0.5 mr-3"></i>
              <div className="text-sm">
                <p className="text-amber-800 font-medium mb-1">
                  {t('footer.disclaimer.title')}
                </p>
                <p className="text-amber-700">
                  {t('footer.disclaimer.content')}
                </p>
              </div>
            </div>
          </div>

          {/* 使用限制说明 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                <i className="fas fa-users text-blue-600"></i>
              </div>
              <h4 className="text-sm font-medium text-neutral-900 mb-2">
                {t('footer.limits.publicOnly.title')}
              </h4>
              <p className="text-xs text-neutral-600">
                {t('footer.limits.publicOnly.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                <i className="fas fa-download text-green-600"></i>
              </div>
              <h4 className="text-sm font-medium text-neutral-900 mb-2">
                {t('footer.limits.maxCount.title')}
              </h4>
              <p className="text-xs text-neutral-600">
                {t('footer.limits.maxCount.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                <i className="fas fa-shield-alt text-purple-600"></i>
              </div>
              <h4 className="text-sm font-medium text-neutral-900 mb-2">
                {t('footer.limits.privacy.title')}
              </h4>
              <p className="text-xs text-neutral-600">
                {t('footer.limits.privacy.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权区域 */}
      <div className="bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500 mb-2 md:mb-0">
              <p>
                {t('footer.copyright', { year: currentYear })} IGExportGuru. {t('footer.allRightsReserved')}.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs text-neutral-400">
              <span>{t('footer.madeWith')} ❤️ {t('footer.forCreators')}</span>
              <span>•</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 