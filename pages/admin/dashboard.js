// pages/admin/dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales/translations';
import articlesData from '../../data/articles.json';
import providersData from '../../data/vpsProviders.json';
import dealsData from '../../data/vpsDeals.json';

export default function AdminDashboard() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [stats, setStats] = useState({
    totalProviders: 0,
    totalArticles: 0,
    totalDeals: 0,
    featuredDeals: 0,
    publishedArticles: 0,
    draftArticles: 0
  });
  
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentDeals, setRecentDeals] = useState([]);
  
  useEffect(() => {
    // 计算统计数据
    const publishedArticles = articlesData.filter(article => article.status === 'published').length;
    const draftArticles = articlesData.filter(article => article.status === 'draft').length;
    const featuredDeals = dealsData.filter(deal => deal.featured).length;
    
    setStats({
      totalProviders: providersData.length,
      totalArticles: articlesData.length,
      totalDeals: dealsData.length,
      featuredDeals,
      publishedArticles,
      draftArticles
    });
    
    // 获取最近的文章和优惠
    const sortedArticles = [...articlesData].sort((a, b) => 
      new Date(b.publishDate) - new Date(a.publishDate)
    ).slice(0, 5);
    
    const sortedDeals = [...dealsData].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    ).slice(0, 5);
    
    setRecentArticles(sortedArticles);
    setRecentDeals(sortedDeals);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{t.adminDashboard} - VPS推荐网</title>
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.adminDashboard}</h1>
          <p className="mt-1 text-sm text-gray-500">{t.welcomeAdmin}</p>
        </div>
        
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{t.totalProviders}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalProviders}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/providers">
                  <a className="font-medium text-blue-600 hover:text-blue-500">{t.viewAll} &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{t.totalArticles}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <span className="text-green-600">{stats.publishedArticles} {t.published}</span>
                        <span className="mx-2 text-gray-500">|</span>
                        <span className="text-yellow-600">{stats.draftArticles} {t.draft}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/articles">
                  <a className="font-medium text-blue-600 hover:text-blue-500">{t.viewAll} &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{t.totalDeals}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalDeals}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <span className="text-red-600">{stats.featuredDeals} {t.featured}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/deals">
                  <a className="font-medium text-blue-600 hover:text-blue-500">{t.viewAll} &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* 快速操作 */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/providers/new">
              <a className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{t.addProvider}</h3>
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/admin/articles/new">
              <a className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{t.writeArticle}</h3>
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/admin/deals/new">
              <a className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{t.addDeal}</h3>
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/">
              <a className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 hover:bg-gray-50" target="_blank">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gray-500 rounded-md p-2">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{t.viewWebsite}</h3>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        
        {/* 最近文章 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">{t.recentArticles}</h2>
            <Link href="/admin/articles">
              <a className="text-sm font-medium text-blue-600 hover:text-blue-500">{t.viewAll}</a>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentArticles.length > 0 ? (
                recentArticles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/admin/articles/edit/${article.id}`}>
                      <a className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-blue-600 truncate">{article.title}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {article.status === 'published' ? t.published : t.draft}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {article.author}
                              </p>
                              {article.category && (
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  {article.category}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>
                                {new Date(article.publishDate).toLocaleDateString(
                                  language === 'zh' ? 'zh-CN' : 'en-US',
                                  { year: 'numeric', month: 'short', day: 'numeric' }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 text-center text-gray-500">{t.noArticlesYet}</li>
              )}
            </ul>
          </div>
        </div>
        
        {/* 最近优惠 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">{t.recentDeals}</h2>
            <Link href="/admin/deals">
              <a className="text-sm font-medium text-blue-600 hover:text-blue-500">{t.viewAll}</a>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentDeals.length > 0 ? (
                recentDeals.map((deal) => (
                  <li key={deal.id}>
                    <Link href={`/admin/deals/edit/${deal.id}`}>
                      <a className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-blue-600 truncate">{deal.title}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              {deal.featured && (
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  {t.featured}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {deal.providerName}
                              </p>
                              {deal.discountPercentage && (
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  {deal.discountPercentage}% {t.off}
                                </p>
                              )}
                              {deal.discountAmount && (
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  ${deal.discountAmount} {t.credit}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>
                                {t.expires}: {new Date(deal.expiryDate).toLocaleDateString(
                                  language === 'zh' ? 'zh-CN' : 'en-US',
                                  { year: 'numeric', month: 'short', day: 'numeric' }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 text-center text-gray-500">{t.noDealsYet}</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}