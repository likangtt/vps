// components/VpsComparison.js
import React, { useState, useEffect } from 'react';
import vpsProvidersData from '../data/vpsProviders.json';

const VpsComparison = () => {
  // 使用导入的VPS提供商数据
  const [vpsProviders, setVpsProviders] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('全部');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rating', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  
  // 获取所有可用区域
  const allRegions = ['全部', '北美', '欧洲', '亚洲', '澳洲', '南美', '中国'];
  
  useEffect(() => {
    // 处理数据格式转换
    const formattedProviders = vpsProvidersData.map(provider => ({
      id: provider.id,
      name: provider.name,
      price: `${provider.startingPrice} ${provider.currency}`,
      cpu: `${provider.plans[0].cpu} Core`,
      memory: `${provider.plans[0].ram} GB`,
      storage: `${provider.plans[0].storage} GB SSD`,
      bandwidth: `${provider.plans[0].bandwidth} GB`,
      datacenter: `${provider.regions.length} 个区域`,
      os: "Linux, Windows, BSD",
      features: provider.features.join(', '),
      rating: provider.ratings.overall,
      link: provider.website,
      pros: provider.pros,
      cons: provider.cons,
      regions: provider.regions
    }));
    
    setVpsProviders(formattedProviders);
    
    // 默认选择前两个提供商
    if (formattedProviders.length > 0) {
      const defaultSelected = formattedProviders.slice(0, 2).map(p => p.id);
      setSelectedProviders(defaultSelected);
    }
  }, []);

  // 处理区域选择
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  // 处理提供商选择
  const handleProviderToggle = (providerId) => {
    if (selectedProviders.includes(providerId)) {
      // 如果已选中，则移除
      if (selectedProviders.length > 1) { // 确保至少有一个提供商被选中
        setSelectedProviders(selectedProviders.filter(id => id !== providerId));
      }
    } else {
      // 如果未选中，则添加
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  // 处理排序
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 处理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 获取过滤和排序后的提供商列表
  const getFilteredAndSortedProviders = () => {
    // 先按区域过滤
    let filteredProviders = vpsProviders;
    
    if (selectedRegion !== '全部') {
      filteredProviders = vpsProviders.filter(provider => 
        provider.regions.includes(selectedRegion)
      );
    }
    
    // 再按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProviders = filteredProviders.filter(provider => 
        provider.name.toLowerCase().includes(term) || 
        provider.features.toLowerCase().includes(term)
      );
    }
    
    // 最后按选中的提供商过滤
    filteredProviders = filteredProviders.filter(provider => 
      selectedProviders.includes(provider.id)
    );
    
    if (sortConfig.key) {
      filteredProviders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredProviders;
  };

  // 渲染星级评分
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-gray-300">{rating}</span>
      </div>
    );
  };

  const sortedProviders = getFilteredAndSortedProviders();

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg p-6">
      <h2 className="text-2xl font-orbitron font-bold mb-6 text-center text-cyan-400">VPS提供商对比</h2>
      
      {/* 搜索和筛选区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 搜索框 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-300">搜索提供商：</h3>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="输入关键词搜索..."
              className="w-full px-4 py-2 bg-gray-700/50 border border-cyan-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* 区域筛选 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-300">按区域筛选：</h3>
          <div className="flex flex-wrap gap-2">
            {allRegions.map(region => (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 提供商选择 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-cyan-300">选择要对比的提供商：</h3>
        <div className="flex flex-wrap gap-2">
          {vpsProviders.map(provider => (
            <button
              key={provider.id}
              onClick={() => handleProviderToggle(provider.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors transform hover:scale-105 ${
                selectedProviders.includes(provider.id)
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* 对比表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                特性
              </th>
              {sortedProviders.map(provider => (
                <th key={provider.id} className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                  {provider.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 backdrop-blur-sm divide-y divide-gray-700">
            {/* 价格行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('price')}
                  className="flex items-center"
                >
                  价格
                  {sortConfig.key === 'price' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.price}
                </td>
              ))}
            </tr>
            
            {/* CPU行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('cpu')}
                  className="flex items-center"
                >
                  CPU
                  {sortConfig.key === 'cpu' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.cpu}
                </td>
              ))}
            </tr>
            
            {/* 内存行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('memory')}
                  className="flex items-center"
                >
                  内存
                  {sortConfig.key === 'memory' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.memory}
                </td>
              ))}
            </tr>
            
            {/* 存储行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('storage')}
                  className="flex items-center"
                >
                  存储
                  {sortConfig.key === 'storage' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.storage}
                </td>
              ))}
            </tr>
            
            {/* 带宽行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('bandwidth')}
                  className="flex items-center"
                >
                  带宽
                  {sortConfig.key === 'bandwidth' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.bandwidth}
                </td>
              ))}
            </tr>
            
            {/* 数据中心行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('datacenter')}
                  className="flex items-center"
                >
                  数据中心
                  {sortConfig.key === 'datacenter' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.datacenter}
                </td>
              ))}
            </tr>
            
            {/* 操作系统行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                操作系统
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.os}
                </td>
              ))}
            </tr>
            
            {/* 特性行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                特性
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {provider.features}
                </td>
              ))}
            </tr>
            
            {/* 评分行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                <button 
                  onClick={() => requestSort('rating')}
                  className="flex items-center"
                >
                  评分
                  {sortConfig.key === 'rating' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {renderRating(provider.rating)}
                </td>
              ))}
            </tr>
            
            {/* 优点行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                优点
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 text-sm text-gray-300">
                  <ul className="list-disc pl-5">
                    {provider.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            
            {/* 缺点行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                缺点
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 text-sm text-gray-300">
                  <ul className="list-disc pl-5">
                    {provider.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            
            {/* 链接行 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">
                官网
              </td>
              {sortedProviders.map(provider => (
                <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <a 
                    href={provider.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    访问官网
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VpsComparison;
