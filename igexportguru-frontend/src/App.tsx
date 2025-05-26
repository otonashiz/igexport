import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ExportForm from '@/components/features/ExportForm';

function App() {
  return (
    <MainLayout>
      {/* 表单首先显示在第一屏 */}
      <ExportForm />
      
      {/* 介绍内容移到下方 */}
      <Hero />
    </MainLayout>
  );
}

export default App;
