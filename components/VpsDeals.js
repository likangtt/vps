import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaTag, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

const VpsDeals = ({ deals }) => {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  
  // 确保deals存在并且是数组
  if (!deals || !Array.isArray(deals) || deals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">VPS优惠</h2>
        <p className="text-gray-500 text-center py-4">暂无优惠信息</p>
      </div>
    );
  }
  
  // 过滤优惠
  const filteredDeals = filter === 'all' 
    ? deals 
    : deals.filter(deal => deal.type === filter);
  
  // 检查优惠是否过期
  const isExpired = (endDate) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };
  
  // 计算剩余天数
  const getRemainingDays = (endDate) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  return (
    <div className="vps-deals bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">VPS优惠</h2>
        <button 
          onClick={() => router.push('/deals')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          查看全部优惠 &rarr;
        </button>
      </div>
      
      {/* 过滤选项 */}
      <div className="flex mb-6 overflow-x-auto">
        <button 
          className={`mr-2 px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button 
          className={`mr-2 px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'discount' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setFilter('discount')}
        >
          折扣
        </button>
        <button 
          className={`mr-2 px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'coupon' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setFilter('coupon')}
        >
          优惠码
        </button>
        <button 
          className={`mr-2 px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'free' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setFilter('free')}
        >
          免费赠品
        </button>
      </div>
      
      {/* 优惠列表 */}
      <div className="space-y-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <div 
              key={deal.id}
              className={`border rounded-lg overflow-hidden ${
                isExpired(deal.endDate) ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row">
                {/* 提供商Logo */}
                <div className="w-full sm:w-1/4 p-4 bg-gray-50 flex items-center justify-center">
                  {deal.providerLogo && (
                    <div className="relative w-24 h-24">
                      <Image 
                        src={deal.providerLogo} 
                        alt={`${deal.providerName} logo`} 
                        layout="fill" 
                        objectFit="contain"
                      />
                    </div>
                  )}
                </div>
                
                {/* 优惠详情 */}
                <div className="w-full sm:w-3/4 p-4">
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-bold">{deal.title}</h3>
                    <div className="flex items-center">
                      <FaTag className="text-blue-600 mr-1" />
                      <span className="text-sm font-medium capitalize">
                        {deal.type === 'discount' && '折扣'}
                        {deal.type === 'coupon' && '优惠码'}
                        {deal.type === 'free' && '免费赠品'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{deal.description}</p>
                  
                  {/* 优惠码 */}
                  {deal.couponCode && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-500 mb-1">优惠码:</div>
                      <div className="inline-block bg-gray-100 border border-dashed border-gray-300 px-3 py-1 font-mono">
                        {deal.couponCode}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-between mt-2">
                    {/* 有效期 */}
                    {deal.endDate && (
                      <div className="flex items-center text-sm text-gray-500 mb-2 sm:mb-0">
                        <FaClock className="mr-1" />
                        {isExpired(deal.endDate) ? (
                          <span>已过期</span>
                        ) : (
                          <span>
                            剩余 {getRemainingDays(deal.endDate)} 天
                            {deal.endDate && ` (${new Date(deal.endDate).toLocaleDateString()})`}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* 操作按钮 */}
                    <div>
                      <a 
                        href={deal.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        获取优惠 <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            没有找到符合条件的优惠
          </p>
        )}
      </div>
    </div>
  );
};

export default VpsDeals;