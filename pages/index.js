// pages/index.js
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LanguageContext } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import VpsRanking from '../components/VpsRanking';
import VpsDeals from '../components/VpsDeals';
import vpsProvidersData from '../data/vpsProviders.json';
import articlesData from '../data/articles.json';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation('common');
  
  const [topProviders, setTopProviders] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  
  useEffect(() => {
    // 获取评分最高的5个提供商
    const sortedProviders = [...vpsProvidersData].sort((a, b) => 
      b.ratings.overall - a.ratings.overall
    ).slice(0, 5);
    setTopProviders(sortedProviders);
    
    // 获取最新的3篇文章
    const sortedArticles = [...articlesData]
      .filter(article => article.status === 'published')
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 3);
    setFeaturedArticles(sortedArticles);
  }, []);
  
  // SEO配置
  const seoTitle = t('site.title') + ' - ' + t('home.hero.title');
  const seoDescription = t('site.description');
  const seoKeywords = t('site.keywords').split(',');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage="/images/og-home.jpg"
        alternateLanguages={{
          en: '/en',
          zh: '/zh'
        }}
      />
      
      {/* 导航栏 */}
      <nav className="bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-2xl font-orbitron font-bold text-cyan-400">VPS推荐网</a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <a className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.home')}
                    </a>
                  </Link>
                  <Link href="/comparison">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.comparison')}
                    </a>
                  </Link>
                  <Link href="/deals">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.deals')}
                    </a>
                  </Link>
                  <Link href="/articles">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.articles')}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <LanguageSwitcher />
              <Link href="/admin/login">
                <a className="ml-4 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t('common.login', '登录')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 英雄区域 */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/comparison">
                <a className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors">
                  {t('home.hero.cta')}
                </a>
              </Link>
              <Link href="/deals">
                <a className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors">
                  {t('home.latestDeals.title')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 顶级VPS提供商 */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400">{t('home.topProviders.title')}</h2>
            <Link href="/comparison">
              <a className="text-cyan-400 hover:text-cyan-300">
                {t('home.topProviders.viewAll')} &rarr;
              </a>
            </Link>
          </div>
          
          <VpsRanking providers={topProviders} />
        </div>
        
        {/* 最新优惠活动 */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400">{t('home.latestDeals.title')}</h2>
            <Link href="/deals">
              <a className="text-cyan-400 hover:text-cyan-300">
                {t('home.latestDeals.viewAll')} &rarr;
              </a>
            </Link>
          </div>
          
          <VpsDeals />
        </div>
        
        {/* 精选文章 */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400">{t('home.latestArticles.title')}</h2>
            <Link href="/articles">
              <a className="text-cyan-400 hover:text-cyan-300">
                {t('home.latestArticles.viewAll')} &rarr;
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
              >
                {article.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.coverImage || 'https://via.placeholder.com/800x400'} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      {new Date(article.publishDate).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                    </div>
                    
                    <Link href={`/article/${article.id}`}>
                      <a className="text-cyan-400 hover:text-cyan-300 text-sm">
                        {t('articles.readMore')} &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 border-t border-cyan-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-orbitron font-bold text-white mb-4">VPS推荐网</h3>
              <p className="text-gray-400 text-sm">
                比较、评测和选择最佳的VPS提供商，获取最新优惠活动和专业建议。
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">{t('nav.comparison')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/comparison">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('comparison.title')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/providers">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('home.topProviders.title')}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">{t('nav.deals')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/deals">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('home.latestDeals.title')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/deals/featured">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('deals.filters.flash', '精选优惠')}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">{t('nav.about')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('nav.about')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-gray-400 hover:text-cyan-400 text-sm">
                      {t('nav.contact')}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright').replace('2023', new Date().getFullYear())}
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 添加getStaticProps以支持服务端渲染翻译
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', ['common'])),
    },
  };
}
