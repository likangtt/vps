// pages/admin/articles/index.js
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { translations } from '../../../locales/translations';
import articlesData from '../../../data/articles.json';

export default function ArticlesAdmin() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setArticles(articlesData);
    setIsLoading(false);
  }, []);
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id) => {
    // 在实际应用中，这里会调用API删除文章
    if (window.confirm(t.confirmDeleteArticle)) {
      setArticles(articles.filter(article => article.id !== id));
      // 实际应用中，这里会显示成功消息
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{t.manageArticles} - VPS推荐网管理后台</title>
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.manageArticles}</h1>
          <Link href="/admin/dashboard">
            <a className="text-blue-600 hover:text-blue-800">
              &larr; {t.backToDashboard}
            </a>
          </Link>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder={t.searchArticles}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/admin/articles/new">
            <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {t.createNewArticle}
            </a>
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredArticles.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <li key={article.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {article.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status === 'published' ? t.published : t.draft}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="text-sm text-gray-500">
                          {new Date(article.publishDate).toLocaleDateString(
                            language === 'zh' ? 'zh-CN' : 'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </span>
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
                        <Link href={`/admin/articles/edit/${article.id}`}>
                          <a className="text-blue-600 hover:text-blue-800 mr-4">
                            {t.edit}
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t.noArticlesFound}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}