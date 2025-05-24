import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import ExportForm from '@/components/features/ExportForm';

function App() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header />
      
      {/* 主页面 */}
      <main>
        {/* 表单首先显示在第一屏 */}
        <ExportForm />
        
        {/* 介绍内容移到下方 */}
        <Hero />
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-neutral-500">
            <p className="mb-2">
              {t('footer.madeWith')} <span className="text-red-500">❤️</span> {t('footer.forCreators')}
            </p>
            <p>
              {t('footer.copyright', { year: currentYear })} | 
              <span className="ml-2">{t('footer.privacyNote')}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
