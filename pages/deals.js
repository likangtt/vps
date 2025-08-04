// pages/deals.js
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import VpsDeals from '../components/VpsDeals';
import vpsDealsData from '../data/vpsDeals.json';

export default function Deals() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, expiring, featured
  
  useEffect(() => {
    // 在实际应用中，这里可能会从API获取数据
    let filteredDeals = [...vpsDealsData];
    
    if (filter === 'expiring') {
      // 获取即将过期的优惠（7天内）
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
      
      filteredDeals = filteredDeals.filter(deal => {
        const expiryDate = new Date(deal.expiryDate);
        return expiryDate <= oneWeekFromNow && expiryDate >= new Date();
      });
    } else if (filter === 'featured') {
      // 获取精选优惠
      filteredDeals = filteredDeals.filter(deal => deal.featured);
    }
    
    // 按过期日期排序
    filteredDeals.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    
    setDeals(filteredDeals);
    setLoading(false);
  }, [filter]);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{t.deals} - VPS推荐网</title>
        <meta name="description" content="查看最新的VPS优惠活动、折扣码和特别促销。" />
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">{t.deals}</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.allDeals}
            </button>
            <button
              onClick={() => setFilter('expiring')}
              className={`px-4 py-2 rounded-md ${
                filter === 'expiring' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.expiringDeals}
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-md ${
                filter === 'featured' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.featuredDeals}
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.length > 0 ? (
              <VpsDeals deals={deals} />
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">{t.noDealsFound}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}