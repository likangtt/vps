// components/StructuredData.js
import React from 'react';

/**
 * 结构化数据组件，用于向搜索引擎提供更丰富的信息
 * @param {Object} data - 结构化数据对象
 * @returns {React.Component} - 包含结构化数据的脚本标签
 */
const StructuredData = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

/**
 * 创建VPS提供商的结构化数据
 * @param {Object} provider - VPS提供商对象
 * @param {string} baseUrl - 网站基础URL
 * @returns {Object} - 结构化数据对象
 */
export const createProviderStructuredData = (provider, baseUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: provider.name,
    description: provider.description,
    image: provider.logo,
    url: `${baseUrl}/provider/${provider.id}`,
    brand: {
      '@type': 'Brand',
      name: provider.name,
      logo: provider.logo
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: provider.pricing?.startingPrice || 0,
      highPrice: provider.pricing?.plans?.length > 0 
        ? Math.max(...provider.pricing.plans.map(plan => plan.price)) 
        : 0,
      priceCurrency: provider.pricing?.currency || '$',
      offerCount: provider.pricing?.plans?.length || 0
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: provider.ratings?.overall || 0,
      bestRating: 5,
      worstRating: 0,
      ratingCount: provider.ratings?.count || 0
    }
  };
};

/**
 * 创建文章的结构化数据
 * @param {Object} article - 文章对象
 * @param {string} baseUrl - 网站基础URL
 * @returns {Object} - 结构化数据对象
 */
export const createArticleStructuredData = (article, baseUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishDate,
    dateModified: article.updateDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'VPS推荐网编辑'
    },
    publisher: {
      '@type': 'Organization',
      name: 'VPS推荐网',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/article/${article.id}`
    }
  };
};

/**
 * 创建网站的结构化数据
 * @param {string} baseUrl - 网站基础URL
 * @returns {Object} - 结构化数据对象
 */
export const createWebsiteStructuredData = (baseUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VPS推荐网',
    alternateName: 'VPS Recommendation',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

/**
 * 创建面包屑导航的结构化数据
 * @param {Array} items - 导航项数组，每项包含name和url
 * @param {string} baseUrl - 网站基础URL
 * @returns {Object} - 结构化数据对象
 */
export const createBreadcrumbStructuredData = (items, baseUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  };
};

export default StructuredData;