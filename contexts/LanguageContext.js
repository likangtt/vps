// contexts/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  
  // 从路由中获取当前语言
  const [language, setLanguage] = useState(router.locale || 'zh');
  
  // 当语言改变时，更新i18n实例和路由
  const changeLanguage = (newLanguage) => {
    if (newLanguage === language) return;
    
    // 更新状态
    setLanguage(newLanguage);
    
    // 更新i18n实例
    i18n.changeLanguage(newLanguage);
    
    // 更新路由，保持当前路径但切换语言
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLanguage });
    
    // 保存到本地存储和Cookie
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      
      // 设置Cookie，有效期30天
      document.cookie = `NEXT_LOCALE=${newLanguage};path=/;max-age=${30 * 24 * 60 * 60}`;
    }
  };
  
  // 初始化时，从本地存储或浏览器语言设置中获取语言
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && savedLanguage !== language) {
        changeLanguage(savedLanguage);
      } else if (!savedLanguage) {
        // 如果没有保存的语言设置，尝试检测浏览器语言
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage.startsWith('zh') && language !== 'zh') {
          changeLanguage('zh');
        } else if (!browserLanguage.startsWith('zh') && language !== 'en') {
          changeLanguage('en');
        }
      }
    }
  }, []);
  
  // 当路由变化时，更新语言状态
  useEffect(() => {
    if (router.locale && router.locale !== language) {
      setLanguage(router.locale);
    }
  }, [router.locale]);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
