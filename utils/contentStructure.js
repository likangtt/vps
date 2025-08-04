// utils/contentStructure.js
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

/**
 * 自动化内容结构系统
 * 根据用户语言和内容类型自动组织和生成内容结构
 */

/**
 * 获取当前语言的内容结构
 * @param {string} contentType - 内容类型 (provider, article, deal)
 * @param {Object} data - 内容数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 结构化的内容
 */
export const getContentStructure = (contentType, data, locale = 'zh') => {
  // 根据内容类型和语言返回适当的结构
  switch (contentType) {
    case 'provider':
      return getProviderStructure(data, locale);
    case 'article':
      return getArticleStructure(data, locale);
    case 'deal':
      return getDealStructure(data, locale);
    default:
      return data;
  }
};

/**
 * 获取VPS提供商的内容结构
 * @param {Object} provider - 提供商数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 结构化的提供商内容
 */
const getProviderStructure = (provider, locale) => {
  // 如果提供商有多语言内容，使用对应语言的内容
  const name = provider[`name_${locale}`] || provider.name;
  const description = provider[`description_${locale}`] || provider.description;
  
  // 构建提供商的内容结构
  return {
    ...provider,
    name,
    description,
    // 自动生成SEO标题和描述
    seo: {
      title: locale === 'zh' 
        ? `${name} - VPS详细评测和推荐 | VPS推荐网` 
        : `${name} - VPS Review and Recommendation | VPS Recommendation`,
      description: locale === 'zh'
        ? `${name}详细评测，包括性能、价格、可靠性分析和用户评价。了解${name}是否适合您的需求。`
        : `Detailed review of ${name}, including performance, pricing, reliability analysis and user reviews. Find out if ${name} is right for your needs.`,
      keywords: locale === 'zh'
        ? `${name},VPS,虚拟专用服务器,${name}评测,${name}价格,${name}优惠`
        : `${name},VPS,Virtual Private Server,${name} review,${name} pricing,${name} deals`
    },
    // 自动生成面包屑导航
    breadcrumbs: [
      {
        name: locale === 'zh' ? '首页' : 'Home',
        url: '/'
      },
      {
        name: locale === 'zh' ? 'VPS提供商' : 'VPS Providers',
        url: '/providers'
      },
      {
        name,
        url: `/provider/${provider.id}`
      }
    ],
    // 自动生成内容结构
    contentSections: [
      {
        id: 'overview',
        title: locale === 'zh' ? '概览' : 'Overview',
        content: description
      },
      {
        id: 'plans',
        title: locale === 'zh' ? '套餐与价格' : 'Plans & Pricing',
        content: provider.pricing?.plans || []
      },
      {
        id: 'datacenters',
        title: locale === 'zh' ? '数据中心' : 'Data Centers',
        content: provider.datacenters || []
      },
      {
        id: 'reviews',
        title: locale === 'zh' ? '用户评价' : 'User Reviews',
        content: provider.reviews || []
      }
    ]
  };
};

/**
 * 获取文章的内容结构
 * @param {Object} article - 文章数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 结构化的文章内容
 */
const getArticleStructure = (article, locale) => {
  // 如果文章有多语言内容，使用对应语言的内容
  const title = article[`title_${locale}`] || article.title;
  const content = article[`content_${locale}`] || article.content;
  const excerpt = article[`excerpt_${locale}`] || article.excerpt;
  
  // 构建文章的内容结构
  return {
    ...article,
    title,
    content,
    excerpt,
    // 自动生成SEO标题和描述
    seo: {
      title: locale === 'zh' 
        ? `${title} | VPS推荐网` 
        : `${title} | VPS Recommendation`,
      description: excerpt,
      keywords: article.tags?.join(',') || ''
    },
    // 自动生成面包屑导航
    breadcrumbs: [
      {
        name: locale === 'zh' ? '首页' : 'Home',
        url: '/'
      },
      {
        name: locale === 'zh' ? '文章' : 'Articles',
        url: '/articles'
      },
      {
        name: title,
        url: `/article/${article.id}`
      }
    ],
    // 自动生成相关文章
    relatedArticles: article.relatedArticles || [],
    // 自动生成目录
    tableOfContents: generateTableOfContents(content)
  };
};

/**
 * 获取优惠活动的内容结构
 * @param {Object} deal - 优惠活动数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 结构化的优惠活动内容
 */
const getDealStructure = (deal, locale) => {
  // 如果优惠活动有多语言内容，使用对应语言的内容
  const title = deal[`title_${locale}`] || deal.title;
  const description = deal[`description_${locale}`] || deal.description;
  
  // 构建优惠活动的内容结构
  return {
    ...deal,
    title,
    description,
    // 自动生成SEO标题和描述
    seo: {
      title: locale === 'zh' 
        ? `${title} - VPS优惠活动 | VPS推荐网` 
        : `${title} - VPS Deal | VPS Recommendation`,
      description: description,
      keywords: locale === 'zh'
        ? `VPS优惠,${deal.provider}优惠,VPS折扣,VPS促销`
        : `VPS deal,${deal.provider} discount,VPS discount,VPS promotion`
    },
    // 自动生成面包屑导航
    breadcrumbs: [
      {
        name: locale === 'zh' ? '首页' : 'Home',
        url: '/'
      },
      {
        name: locale === 'zh' ? '优惠活动' : 'Deals',
        url: '/deals'
      },
      {
        name: title,
        url: `/deal/${deal.id}`
      }
    ]
  };
};

/**
 * 从内容中生成目录
 * @param {string} content - 文章内容
 * @returns {Array} - 目录结构
 */
const generateTableOfContents = (content) => {
  // 简单实现：查找所有h2和h3标签
  const headings = [];
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g;
  
  let match;
  
  // 查找所有h2标签
  while ((match = h2Regex.exec(content)) !== null) {
    const title = match[1].replace(/<[^>]*>/g, ''); // 移除可能的嵌套标签
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    
    headings.push({
      id,
      title,
      level: 2,
      children: []
    });
  }
  
  // 查找所有h3标签并添加为子项
  let currentH2 = null;
  let lastIndex = 0;
  
  while ((match = h3Regex.exec(content)) !== null) {
    const title = match[1].replace(/<[^>]*>/g, '');
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    
    // 找到当前h3所属的h2
    for (let i = headings.length - 1; i >= 0; i--) {
      if (match.index > lastIndex) {
        currentH2 = headings[i];
        break;
      }
    }
    
    if (currentH2) {
      currentH2.children.push({
        id,
        title,
        level: 3
      });
    }
    
    lastIndex = match.index;
  }
  
  return headings;
};

/**
 * React Hook：使用内容结构
 * @param {string} contentType - 内容类型
 * @param {Object} data - 内容数据
 * @returns {Object} - 结构化的内容
 */
export const useContentStructure = (contentType, data) => {
  const router = useRouter();
  const { locale } = router;
  
  return getContentStructure(contentType, data, locale);
};

/**
 * 自动生成多语言内容
 * @param {Object} content - 原始内容
 * @param {Object} translations - 翻译对象
 * @returns {Object} - 多语言内容
 */
export const generateMultilingualContent = (content, translations) => {
  const result = { ...content };
  
  // 遍历所有翻译
  Object.keys(translations).forEach(locale => {
    if (locale === 'zh') return; // 中文是原始内容，跳过
    
    const translation = translations[locale];
    
    // 遍历所有需要翻译的字段
    Object.keys(translation).forEach(field => {
      // 创建多语言字段
      result[`${field}_${locale}`] = translation[field];
    });
  });
  
  return result;
};

/**
 * 自动生成内容的多语言版本
 * @param {Array} contents - 内容数组
 * @param {Function} translationFunction - 翻译函数
 * @param {Array} languages - 语言列表
 * @returns {Promise<Array>} - 多语言内容数组
 */
export const generateMultilingualContents = async (contents, translationFunction, languages = ['en']) => {
  // 为每个内容生成多语言版本
  const multilingualContents = await Promise.all(
    contents.map(async (content) => {
      const translations = {};
      
      // 为每种语言生成翻译
      for (const lang of languages) {
        if (lang === 'zh') continue; // 中文是原始内容，跳过
        
        // 翻译需要翻译的字段
        const translatedFields = await translationFunction(content, lang);
        translations[lang] = translatedFields;
      }
      
      // 生成多语言内容
      return generateMultilingualContent(content, translations);
    })
  );
  
  return multilingualContents;
};