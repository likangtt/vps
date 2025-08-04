// components/LanguageSwitcher.js
import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation('common');
  
  const toggleLanguage = () => {
    changeLanguage(language === 'zh' ? 'en' : 'zh');
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      {language === 'zh' ? 'English' : '中文'}
    </button>
  );
};

export default LanguageSwitcher;
