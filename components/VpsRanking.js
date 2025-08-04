import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaStar, FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const VpsRanking = ({ providers }) => {
  const router = useRouter();
  
  // 确保providers存在并且是数组
  if (!providers || !Array.isArray(providers) || providers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">VPS排名</h2>
        <p className="text-gray-500 text-center py-4">暂无排名数据</p>
      </div>
    );
  }
  
  // 根据评分排序
  const sortedProviders = [...providers]
    .sort((a, b) => (b.ratings?.overall || 0) - (a.ratings?.overall || 0))
    .slice(0, 5); // 只显示前5名
  
  const handleProviderClick = (id) => {
    router.push(`/provider/${id}`);
  };
  
  // 排名图标
  const rankIcons = [
    <FaTrophy className="text-yellow-500" key="1" />, // 金牌
    <FaMedal className="text-gray-400" key="2" />,    // 银牌
    <FaMedal className="text-yellow-700" key="3" />,  // 铜牌
    <FaAward className="text-blue-500" key="4" />,    // 第四名
    <FaAward className="text-green-500" key="5" />    // 第五名
  ];

  return (
    <div className="vps-ranking bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">VPS排名</h2>
        <button 
          onClick={() => router.push('/comparison')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          查看全部比较 &rarr;
        </button>
      </div>
      
      <div className="space-y-4">
        {sortedProviders.map((provider, index) => (
          <div 
            key={provider.id}
            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleProviderClick(provider.id)}
          >
            <div className="flex items-center justify-center w-8 h-8 mr-3">
              {rankIcons[index]}
            </div>
            
            <div className="flex items-center flex-grow">
              {provider.logo && (
                <div className="w-10 h-10 mr-3 relative">
                  <Image 
                    src={provider.logo} 
                    alt={`${provider.name} logo`} 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <div className="font-medium">{provider.name}</div>
                <div className="text-sm text-gray-500 line-clamp-1">
                  {provider.features?.slice(0, 2).join(' • ')}
                </div>
              </div>
              
              <div className="flex flex-col items-end ml-2">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">{provider.ratings?.overall.toFixed(1)}</span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {provider.pricing?.currency || '$'}{provider.pricing?.startingPrice}/月起
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VpsRanking;