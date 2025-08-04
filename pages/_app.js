// pages/_app.js
import React from 'react';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../styles/globals.css';

// 设置默认的环境变量
if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_BASE_URL) {
  process.env.NEXT_PUBLIC_BASE_URL = window.location.origin;
}

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="zh-CN, en-US" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

// 使用next-i18next包装应用
export default appWithTranslation(MyApp);
