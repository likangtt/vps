// pages/comparison.js
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import VpsComparison from '../components/VpsComparison';
import vpsProvidersData from '../data/vpsProviders.json';

export default function Comparison() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 在实际应用中，这里可能会从API获取数据
    setProviders(vpsProvidersData);
    setLoading(false);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{t.comparison} - VPS推荐网</title>
        <meta name="description" content="比较不同VPS提供商的价格、性能和特性，找到最适合您需求的VPS服务器。" />
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.comparison}</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <VpsComparison providers={providers} />
        )}
      </main>
    </div>
  );
}