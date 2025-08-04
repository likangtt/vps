// pages/admin/articles/edit/[id].js
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { translations } from '../../../../locales/translations';
import articlesData from '../../../../data/articles.json';

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'published',
    author: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!id) return;
    
    // 在实际应用中，这里会从API获取数据
    const article = articlesData.find(a => a.id.toString() === id.toString());
    
    if (article) {
      setFormData({
        ...article,
        tags: Array.isArray(article.tags) ? article.tags.join(', ') : ''
      });
      setIsLoading(false);
    } else {
      // 如果找不到文章，重定向到文章列表页面
      router.push('/admin/articles');
    }
  }, [id, router]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // 验证表单
      if (!formData.title || !formData.content || !formData.excerpt) {
        throw new Error(t.pleaseCompleteAllRequiredFields);
      }
      
      // 处理标签 - 将逗号分隔的字符串转换为数组
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      // 更新文章对象
      const updatedArticle = {
        ...formData,
        tags: tagsArray,
        lastModified: new Date().toISOString()
      };
      
      // 在实际应用中，这里会调用API更新文章
      console.log('更新文章:', updatedArticle);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 成功后重定向到文章管理页面
      router.push('/admin/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
        <title>{t.editArticle} - VPS推荐网管理后台</title>
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.editArticle}</h1>
          <Link href="/admin/articles">
            <a className="text-blue-600 hover:text-blue-800">
              &larr; {t.backToArticles}
            </a>
          </Link>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              {t.title} *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              {t.excerpt} *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">{t.excerptDescription}</p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              {t.content} *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="15"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
              required
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">{t.markdownSupported}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t.category}
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="教程">教程</option>
                <option value="新闻">新闻</option>
                <option value="评测">评测</option>
                <option value="指南">指南</option>
                <option value="比较">比较</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                {t.tags}
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="VPS, 安全, Linux"
              />
              <p className="mt-1 text-xs text-gray-500">{t.tagsDescription}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                {t.author}
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                {t.status}
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">{t.draft}</option>
                <option value="published">{t.published}</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <Link href={`/article/${id}`} target="_blank">
                <a className="text-blue-600 hover:text-blue-800 mr-4">
                  {t.viewArticle} &rarr;
                </a>
              </Link>
            </div>
            
            <div>
              <Link href="/admin/articles">
                <a className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                  {t.cancel}
                </a>
              </Link>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.saving : t.updateArticle}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}