import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '@/utils/constants';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 主标题 */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="ig-gradient-text">
              {t('hero.title')}
            </span>
            <br />
            <span className="text-neutral-700">{t('hero.subtitle')}</span>
          </h2>
          
          {/* 描述 */}
          <p className="text-lg text-neutral-500 mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* 特性标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: 'fas fa-download', text: t('hero.features.oneClick') },
              { icon: 'fas fa-table', text: t('hero.features.excelFormat') },
              { icon: 'fas fa-shield-alt', text: t('hero.features.securePrivate') },
              { icon: 'fas fa-globe', text: t('hero.features.multiLanguage') },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-neutral-200"
              >
                <i className={`${feature.icon} text-instagram-pink`}></i>
                <span className="text-sm font-medium text-neutral-700">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* 使用统计 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: t('hero.stats.users') },
              { number: '50K+', label: t('hero.stats.exports') },
              { number: '99.9%', label: t('hero.stats.successRate') },
              { number: '5 Min', label: t('hero.stats.avgTime') },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1 ig-gradient-text">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 