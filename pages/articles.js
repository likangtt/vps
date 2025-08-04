// pages/articles.js
import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import articlesData from '../data/articles.json';

export default function Articles() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // 提取所有分类
  const allCategories = [...new Set(articlesData.map(article => article.category))];
  
  // 过滤文章
  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{t.articles} - VPS推荐网</title>
        <meta name="description" content={t.articlesMetaDescription} />
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.articles}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {t.articlesDescription}
          </p>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <input
              type="text"
              placeholder={t.searchArticles}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">{t.allCategories}</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString(
                        language === 'zh' ? 'zh-CN' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </div>
                  </div>
                  <Link href={`/article/${article.id}`}>
                    <a className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{article.title}</p>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">{article.excerpt}</p>
                    </a>
                  </Link>
                  <div className="mt-4">
                    <Link href={`/article/${article.id}`}>
                      <a className="text-base font-semibold text-blue-600 hover:text-blue-500">
                        {t.readMore} &rarr;
                      </a>
                    </Link>
                  </div>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">{t.noArticlesFound}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}