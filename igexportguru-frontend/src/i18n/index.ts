import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译文件
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import it from './locales/it.json';
import es from './locales/es.json';

// 语言检测函数
const detectLanguage = (): string => {
  // 1. 检查localStorage中的设置
  const storedLang = localStorage.getItem('language');
  if (storedLang) {
    return storedLang;
  }

  // 2. 检查浏览器语言
  const browserLang = navigator.language || navigator.languages?.[0];
  
  // 语言映射
  const languageMap: Record<string, string> = {
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'zh': 'zh-CN',
    'zh-CN': 'zh-CN',
    'zh-Hans': 'zh-CN',
    'zh-TW': 'zh-TW',
    'zh-Hant': 'zh-TW',
    'it': 'it',
    'it-IT': 'it',
    'es': 'es',
    'es-ES': 'es',
    'es-MX': 'es',
  };

  // 精确匹配
  if (languageMap[browserLang]) {
    return languageMap[browserLang];
  }

  // 模糊匹配（只匹配语言代码）
  const langCode = browserLang.split('-')[0];
  if (languageMap[langCode]) {
    return languageMap[langCode];
  }

  // 默认返回英语
  return 'en';
};

// 配置i18n
i18n
  .use(initReactI18next)
  .init({
    // 翻译资源
    resources: {
      en: {
        translation: en,
      },
      'zh-CN': {
        translation: zhCN,
      },
      'zh-TW': {
        translation: zhTW,
      },
      it: {
        translation: it,
      },
      es: {
        translation: es,
      },
    },

    // 语言设置
    lng: detectLanguage(),
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    // 插值设置
    interpolation: {
      escapeValue: false, // React已经处理了XSS防护
    },

    // 其他配置
    react: {
      useSuspense: false, // 禁用Suspense，避免加载闪烁
    },
  });

// 导出语言更改函数
export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};

// 导出可用语言列表
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default i18n; 