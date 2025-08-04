// pages/provider/[id].js
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales/translations';
import VpsDetail from '../../components/VpsDetail';
import vpsProvidersData from '../../data/vpsProviders.json';

export default function ProviderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    // 在实际应用中，这里可能会从API获取数据
    const foundProvider = vpsProvidersData.find(p => p.id === id);
    
    if (foundProvider) {
      setProvider(foundProvider);
    } else {
      // 如果找不到提供商，重定向到比较页面
      router.push('/comparison');
    }
    
    setLoading(false);
  }, [id, router]);
  
  if (loading || !provider) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{provider.name} - VPS推荐网</title>
        <meta name="description" content={`${provider.name} VPS提供商详细信息、价格、性能评测和用户评价。`} />
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/comparison">
            <a className="text-blue-600 hover:text-blue-800">
              &larr; {t.backToComparison}
            </a>
          </Link>
        </div>
        
        <VpsDetail provider={provider} />
      </main>
    </div>
  );
}