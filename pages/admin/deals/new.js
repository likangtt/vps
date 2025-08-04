// pages/admin/deals/new.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import vpsProvidersData from '../../../data/vpsProviders.json';

export default function NewDeal() {
  const router = useRouter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  
  // 表单字段
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [providerId, setProviderId] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [dealUrl, setDealUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // 保存优惠活动
  const saveDeal = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // 在实际应用中，这里应该是一个API调用
      // 这里我们只是模拟保存成功
      setTimeout(() => {
        setMessage({ type: 'success', content: '优惠活动已成功创建' });
        setIsSaving(false);
        // 重置表单或跳转到仪表盘
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      }, 1000);
    } catch (error) {
      setMessage({ type: 'error', content: '保存失败，请重试' });
      setIsSaving(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Head>
        <title>创建新优惠活动 | VPS推荐网管理后台</title>
        <meta name="description" content="创建VPS优惠活动" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 导航栏 */}
      <nav className="bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/admin/dashboard">
                  <span className="text-2xl font-orbitron font-bold text-cyan-400">VPS推荐网 - 管理后台</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/">
                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  查看网站
                </span>
              </Link>
              <Link href="/admin/dashboard">
                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  返回仪表盘
                </span>
              </Link>
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-orbitron font-bold text-cyan-400">创建新优惠活动</h1>
          <Link href="/admin/dashboard">
            <span className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors">
              返回
            </span>
          </Link>
        </div>
        
        {/* 消息提示 */}
        {message.content && (
          <div className={`mb-6 p-4 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.content}
          </div>
        )}
        
        {/* 表单 */}
        <form onSubmit={saveDeal} className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">基本信息</h2>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">优惠标题</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">优惠描述</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="providerId" className="block text-sm font-medium text-gray-400 mb-1">VPS提供商</label>
                <select
                  id="providerId"
                  value={providerId}
                  onChange={(e) => setProviderId(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                >
                  <option value="">选择提供商</option>
                  {vpsProvidersData.map(provider => (
                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="dealUrl" className="block text-sm font-medium text-gray-400 mb-1">优惠链接</label>
                <input
                  type="url"
                  id="dealUrl"
                  value={dealUrl}
                  onChange={(e) => setDealUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
            </div>
            
            {/* 优惠详情 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">优惠详情</h2>
              
              <div className="mb-4">
                <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-400 mb-1">折扣百分比</label>
                <input
                  type="number"
                  id="discountPercentage"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  min="0"
                  max="100"
                  placeholder="例如: 20 表示8折"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <p className="text-xs text-gray-400 mt-1">留空表示特别优惠，不以百分比表示</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="couponCode" className="block text-sm font-medium text-gray-400 mb-1">优惠码</label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <p className="text-xs text-gray-400 mt-1">如果没有优惠码可以留空</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">过期日期</label>
                <input
                  type="date"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <p className="text-xs text-gray-400 mt-1">留空表示长期有效</p>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-400">设为精选优惠</span>
                </label>
                <p className="text-xs text-gray-400 mt-1 ml-6">精选优惠将在首页和优惠页面突出显示</p>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? '创建中...' : '创建优惠'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}