import React from 'react';
import Image from 'next/image';
import { FaStar, FaServer, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const VpsCard = ({ provider, onClick }) => {
  const { 
    id, 
    name, 
    logo, 
    description, 
    pricing, 
    ratings, 
    features, 
    datacenters = [] 
  } = provider;

  // 计算数据中心区域数量
  const regions = new Set();
  datacenters.forEach(dc => {
    if (dc.includes('美国') || dc.includes('加拿大') || dc.includes('墨西哥')) regions.add('北美');
    if (dc.includes('法国') || dc.includes('德国') || dc.includes('英国') || dc.includes('荷兰')) regions.add('欧洲');
    if (dc.includes('日本') || dc.includes('新加坡') || dc.includes('香港') || dc.includes('韩国')) regions.add('亚洲');
    if (dc.includes('澳大利亚') || dc.includes('悉尼') || dc.includes('墨尔本')) regions.add('澳洲');
    if (dc.includes('巴西') || dc.includes('智利') || dc.includes('阿根廷')) regions.add('南美');
    if (dc.includes('中国') || dc.includes('北京') || dc.includes('上海')) regions.add('中国');
  });

  // 获取最低配置计划
  const lowestPlan = pricing?.plans?.sort((a, b) => a.price - b.price)[0];

  return (
    <div 
      className="vps-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {logo && (
              <div className="w-12 h-12 mr-3 relative">
                <Image 
                  src={logo} 
                  alt={`${name} logo`} 
                  layout="fill" 
                  objectFit="contain"
                />
              </div>
            )}
            <h3 className="text-lg font-bold">{name}</h3>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold">{ratings?.overall.toFixed(1) || '?'}</span>
            <span className="text-xs text-gray-500 ml-1">/5</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      
      <div className="p-4">
        {/* 价格信息 */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">起价</span>
            <div>
              <span className="text-2xl font-bold text-green-600">
                {pricing?.currency || '$'}{pricing?.startingPrice}
              </span>
              <span className="text-xs text-gray-500 ml-1">/月</span>
            </div>
          </div>
          
          {lowestPlan && (
            <div className="mt-1 text-xs text-gray-500">
              {lowestPlan.cpu}核CPU • {lowestPlan.ram}GB内存 • {lowestPlan.storage}GB存储
            </div>
          )}
        </div>
        
        {/* 特点标签 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {features?.slice(0, 3).map((feature, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {features?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{features.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* 数据中心信息 */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaGlobe className="mr-2 text-gray-400" />
          <span>{regions.size} 个区域，{datacenters.length} 个数据中心</span>
        </div>
        
        {/* 主要优势 */}
        {provider.pros && provider.pros.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-medium text-gray-700 mb-1">主要优势</div>
            <ul className="text-xs text-gray-600">
              {provider.pros.slice(0, 2).map((pro, index) => (
                <li key={index} className="flex items-start mb-1">
                  <span className="text-green-500 mr-1">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 text-center">
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          查看详情
        </button>
      </div>
    </div>
  );
};

export default VpsCard;