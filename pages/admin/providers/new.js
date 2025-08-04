// pages/admin/providers/new.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function NewProvider() {
  const router = useRouter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  
  // 表单字段
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState(5);
  const [currency, setCurrency] = useState('USD');
  const [website, setWebsite] = useState('');
  const [features, setFeatures] = useState([]);
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [ratings, setRatings] = useState({
    performance: 0,
    reliability: 0,
    support: 0,
    value: 0,
    overall: 0
  });
  const [regions, setRegions] = useState([]);
  const [plans, setPlans] = useState([]);
  
  // 新特性、优点、缺点和区域的临时输入
  const [newFeature, setNewFeature] = useState('');
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newRegion, setNewRegion] = useState('');
  
  // 新计划的临时输入
  const [newPlan, setNewPlan] = useState({
    name: '',
    cpu: 1,
    ram: 1,
    storage: 25,
    bandwidth: 1000,
    price: 5
  });
  
  // 添加特性
  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };
  
  // 删除特性
  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };
  
  // 添加优点
  const addPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };
  
  // 删除优点
  const removePro = (index) => {
    const updatedPros = [...pros];
    updatedPros.splice(index, 1);
    setPros(updatedPros);
  };
  
  // 添加缺点
  const addCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };
  
  // 删除缺点
  const removeCon = (index) => {
    const updatedCons = [...cons];
    updatedCons.splice(index, 1);
    setCons(updatedCons);
  };
  
  // 添加区域
  const addRegion = () => {
    if (newRegion.trim() && !regions.includes(newRegion.trim())) {
      setRegions([...regions, newRegion.trim()]);
      setNewRegion('');
    }
  };
  
  // 删除区域
  const removeRegion = (index) => {
    const updatedRegions = [...regions];
    updatedRegions.splice(index, 1);
    setRegions(updatedRegions);
  };
  
  // 添加计划
  const addPlan = () => {
    if (newPlan.name.trim()) {
      setPlans([...plans, { ...newPlan }]);
      setNewPlan({
        name: '',
        cpu: 1,
        ram: 1,
        storage: 25,
        bandwidth: 1000,
        price: 5
      });
    }
  };
  
  // 更新计划
  const updatePlan = (index, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = field === 'name' ? value : parseFloat(value);
    setPlans(updatedPlans);
  };
  
  // 删除计划
  const removePlan = (index) => {
    const updatedPlans = [...plans];
    updatedPlans.splice(index, 1);
    setPlans(updatedPlans);
  };
  
  // 更新评分
  const updateRating = (field, value) => {
    setRatings({
      ...ratings,
      [field]: parseFloat(value)
    });
  };
  
  // 计算总体评分
  React.useEffect(() => {
    const { performance, reliability, support, value } = ratings;
    const overall = ((performance + reliability + support + value) / 4).toFixed(1);
    setRatings(prev => ({ ...prev, overall: parseFloat(overall) }));
  }, [ratings.performance, ratings.reliability, ratings.support, ratings.value]);
  
  // 保存提供商
  const saveProvider = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // 在实际应用中，这里应该是一个API调用
      // 这里我们只是模拟保存成功
      setTimeout(() => {
        setMessage({ type: 'success', content: '提供商已成功创建' });
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
        <title>创建新提供商 | VPS推荐网管理后台</title>
        <meta name="description" content="创建新VPS提供商" />
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
          <h1 className="text-2xl font-orbitron font-bold text-cyan-400">创建新提供商</h1>
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
        <form onSubmit={saveProvider} className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">基本信息</h2>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">提供商名称</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                <input
                  type="text"
                  id="logo"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">描述</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-400 mb-1">起始价格</label>
                  <input
                    type="number"
                    id="startingPrice"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(parseFloat(e.target.value))}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-400 mb-1">货币</label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="USD">USD</option>
                    <option value="CNY">CNY</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">官方网站</label>
                <input
                  type="url"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
            </div>
            
            {/* 评分 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">评分</h2>
              
              <div className="mb-4">
                <label htmlFor="performance" className="block text-sm font-medium text-gray-400 mb-1">性能评分 ({ratings.performance})</label>
                <input
                  type="range"
                  id="performance"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratings.performance}
                  onChange={(e) => updateRating('performance', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="reliability" className="block text-sm font-medium text-gray-400 mb-1">可靠性评分 ({ratings.reliability})</label>
                <input
                  type="range"
                  id="reliability"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratings.reliability}
                  onChange={(e) => updateRating('reliability', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="support" className="block text-sm font-medium text-gray-400 mb-1">客户支持评分 ({ratings.support})</label>
                <input
                  type="range"
                  id="support"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratings.support}
                  onChange={(e) => updateRating('support', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="value" className="block text-sm font-medium text-gray-400 mb-1">性价比评分 ({ratings.value})</label>
                <input
                  type="range"
                  id="value"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratings.value}
                  onChange={(e) => updateRating('value', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">总体评分</label>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-6 h-6 ${i < Math.floor(ratings.overall) ? 'text-yellow-400' : 'text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white">{ratings.overall.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 特性 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">特性</h2>
            
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="添加新特性"
                  className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center bg-gray-700/30 rounded-md p-2">
                  <span className="flex-grow text-white">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* 优缺点 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 优点 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">优点</h2>
              
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    placeholder="添加优点"
                    className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <button
                    type="button"
                    onClick={addPro}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {pros.map((pro, index) => (
                  <div key={index} className="flex items-center bg-gray-700/30 rounded-md p-2">
                    <span className="flex-grow text-white">{pro}</span>
                    <button
                      type="button"
                      onClick={() => removePro(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 缺点 */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">缺点</h2>
              
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    placeholder="添加缺点"
                    className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <button
                    type="button"
                    onClick={addCon}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {cons.map((con, index) => (
                  <div key={index} className="flex items-center bg-gray-700/30 rounded-md p-2">
                    <span className="flex-grow text-white">{con}</span>
                    <button
                      type="button"
                      onClick={() => removeCon(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 区域 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">可用区域</h2>
            
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="添加区域"
                  className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  type="button"
                  onClick={addRegion}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {regions.map((region, index) => (
                <div key={index} className="flex items-center bg-gray-700/30 rounded-md p-2">
                  <span className="text-white">{region}</span>
                  <button
                    type="button"
                    onClick={() => removeRegion(index)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* 套餐计划 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">套餐计划</h2>
            
            <div className="bg-gray-700/30 rounded-md p-4 mb-4">
              <h3 className="text-lg font-medium text-white mb-3">添加新套餐</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">套餐名称</label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">CPU (核)</label>
                  <input
                    type="number"
                    value={newPlan.cpu}
                    onChange={(e) => setNewPlan({...newPlan, cpu: parseFloat(e.target.value)})}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">内存 (GB)</label>
                  <input
                    type="number"
                    value={newPlan.ram}
                    onChange={(e) => setNewPlan({...newPlan, ram: parseFloat(e.target.value)})}
                    min="0.5"
                    step="0.5"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">存储 (GB)</label>
                  <input
                    type="number"
                    value={newPlan.storage}
                    onChange={(e) => setNewPlan({...newPlan, storage: parseFloat(e.target.value)})}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">带宽 (GB)</label>
                  <input
                    type="number"
                    value={newPlan.bandwidth}
                    onChange={(e) => setNewPlan({...newPlan, bandwidth: parseFloat(e.target.value)})}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">价格 ($/月)</label>
                  <input
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({...newPlan, price: parseFloat(e.target.value)})}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={addPlan}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                添加套餐
              </button>
            </div>
            
            {plans.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="bg-gray-700/50">
                      <th className="px-4 py-2 text-left">套餐名称</th>
                      <th className="px-4 py-2 text-center">CPU</th>
                      <th className="px-4 py-2 text-center">内存</th>
                      <th className="px-4 py-2 text-center">存储</th>
                  <th className="px-4 py-2 text-center">带宽</th>
                  <th className="px-4 py-2 text-center">价格</th>
                  <th className="px-4 py-2 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-4 py-2">{plan.name}</td>
                    <td className="px-4 py-2 text-center">{plan.cpu} 核</td>
                    <td className="px-4 py-2 text-center">{plan.ram} GB</td>
                    <td className="px-4 py-2 text-center">{plan.storage} GB</td>
                    <td className="px-4 py-2 text-center">{plan.bandwidth} GB</td>
                    <td className="px-4 py-2 text-center">${plan.price}/月</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removePlan(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg className="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">尚未添加任何套餐计划</p>
        )}
      </div>
      
      {/* 提交按钮 */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? '创建中...' : '创建提供商'}
        </button>
      </div>
    </form>
  </div>
</div>
);
}
