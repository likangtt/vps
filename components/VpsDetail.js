import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaServer, FaGlobe, FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';

const VpsDetail = ({ provider }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!provider) {
    return (
      <div className="text-center py-10">
        <p>加载中...</p>
      </div>
    );
  }
  
  const { 
    name, 
    logo, 
    description, 
    longDescription,
    pricing, 
    ratings, 
    features, 
    datacenters = [],
    pros = [],
    cons = [],
    website,
    founded,
    headquarters,
    supportOptions = []
  } = provider;
  
  // 计算数据中心区域
  const regions = new Set();
  datacenters.forEach(dc => {
    if (dc.includes('美国') || dc.includes('加拿大') || dc.includes('墨西哥')) regions.add('北美');
    if (dc.includes('法国') || dc.includes('德国') || dc.includes('英国') || dc.includes('荷兰')) regions.add('欧洲');
    if (dc.includes('日本') || dc.includes('新加坡') || dc.includes('香港') || dc.includes('韩国')) regions.add('亚洲');
    if (dc.includes('澳大利亚') || dc.includes('悉尼') || dc.includes('墨尔本')) regions.add('澳洲');
    if (dc.includes('巴西') || dc.includes('智利') || dc.includes('阿根廷')) regions.add('南美');
    if (dc.includes('中国') || dc.includes('北京') || dc.includes('上海')) regions.add('中国');
  });
  
  return (
    <>
      {/* 提供商头部信息 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {logo && (
              <div className="w-16 h-16 mr-4 relative">
                <Image 
                  src={logo} 
                  alt={`${name} logo`} 
                  layout="fill" 
                  objectFit="contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">{ratings?.overall.toFixed(1) || '?'}</span>
                  <span className="text-xs text-gray-500 ml-1">/5</span>
                </div>
                {founded && (
                  <div className="text-sm text-gray-600">
                    成立于 {founded}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700 transition-colors"
            >
              访问官网
            </a>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
              查看优惠
            </button>
          </div>
        </div>
      </div>
      
      {/* 标签导航 */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            概览
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'plans' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('plans')}
          >
            套餐与价格
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'datacenters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('datacenters')}
          >
            数据中心
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reviews')}
          >
            评价
          </button>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主要内容 */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">提供商概览</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{description}</p>
                {longDescription && (
                  <div dangerouslySetInnerHTML={{ __html: longDescription }} />
                )}
              </div>
              
              {/* 优缺点 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">优势</h3>
                  <ul className="space-y-2">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">劣势</h3>
                  <ul className="space-y-2">
                    {cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* 特性列表 */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">主要特性</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'plans' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">套餐与价格</h2>
              
              {pricing?.plans && pricing.plans.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          套餐名称
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPU
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          内存
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          存储
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          带宽
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          价格
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pricing.plans.map((plan, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {plan.name || `套餐 ${index + 1}`}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {plan.cpu} 核
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {plan.ram} GB
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {plan.storage} GB {plan.storageType || 'SSD'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {plan.bandwidth} {plan.bandwidthUnit || 'TB'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {pricing.currency}{plan.price}/月
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">暂无套餐信息</p>
              )}
              
              {/* 价格说明 */}
              {pricing?.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">价格说明</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    {pricing.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'datacenters' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">数据中心</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">区域分布</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.from(regions).map((region, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
                      <FaGlobe className="mx-auto text-blue-500 mb-1" />
                      <span className="text-sm font-medium">{region}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">所有数据中心</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {datacenters.map((dc, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg">
                      <FaServer className="text-gray-400 mr-2" />
                      <span>{dc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">用户评价</h2>
              
              {/* 评分概览 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {ratings?.overall.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star}
                          className={`${
                            star <= Math.round(ratings?.overall || 0) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          } w-5 h-5`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">基于 {ratings?.count || 0} 条评价</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">详细评分</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">性能</span>
                        <span className="text-sm font-medium">{ratings?.performance.toFixed(1)}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(ratings?.performance / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">可靠性</span>
                        <span className="text-sm font-medium">{ratings?.reliability.toFixed(1)}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(ratings?.reliability / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">支持</span>
                        <span className="text-sm font-medium">{ratings?.support.toFixed(1)}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(ratings?.support / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">性价比</span>
                        <span className="text-sm font-medium">{ratings?.value.toFixed(1)}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(ratings?.value / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 用户评论 - 这里可以添加实际的用户评论组件 */}
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">暂无用户评论</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  添加评论
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          {/* 快速信息卡片 */}
          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <h3 className="text-lg font-semibold mb-4">快速信息</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">起价</span>
                <span className="font-medium">{pricing?.currency}{pricing?.startingPrice}/月</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">数据中心</span>
                <span className="font-medium">{datacenters.length} 个位置</span>
              </div>
              
              {headquarters && (
                <div className="flex justify-between">
                  <span className="text-gray-600">总部</span>
                  <span className="font-medium">{headquarters}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">成立时间</span>
                <span className="font-medium">{founded || '未知'}</span>
              </div>
              
              <div className="pt-3 border-t">
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  访问官网
                </a>
              </div>
            </div>
          </div>
          
          {/* 支持选项 */}
          {supportOptions && supportOptions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-semibold mb-4">客户支持</h3>
              
              <div className="space-y-3">
                {supportOptions.map((option, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2" />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VpsDetail;