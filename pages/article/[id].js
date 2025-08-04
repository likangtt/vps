// pages/article/[id].js
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales/translations';
import articlesData from '../../data/articles.json';
import ReactMarkdown from 'react-markdown';

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    // 在实际应用中，这里可能会从API获取数据
    const foundArticle = articlesData.find(a => a.id.toString() === id.toString());
    
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      // 如果找不到文章，重定向到文章列表页面
      router.push('/articles');
    }
    
    setLoading(false);
  }, [id, router]);
  
  if (loading || !article) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    language === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{article.title} - VPS推荐网</title>
        <meta name="description" content={article.excerpt} />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/articles">
            <a className="text-blue-600 hover:text-blue-800">
              &larr; {t.backToArticles}
            </a>
          </Link>
        </div>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
            
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <span className="mr-4">{t.author}: {article.author}</span>
              <span>{t.publishedOn}: {formattedDate}</span>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{t.tags}</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}