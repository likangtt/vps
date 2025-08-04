// utils/contentGenerator.js
import { translateObject } from './translationService';

/**
 * 自动化内容生成器
 * 根据用户语言自动生成内容
 */

/**
 * 自动生成VPS提供商内容
 * @param {Object} provider - 提供商基本数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 生成的提供商内容
 */
export const generateProviderContent = async (provider, locale = 'zh') => {
  // 如果已经有对应语言的内容，直接返回
  if (provider[`description_${locale}`]) {
    return provider;
  }
  
  // 需要翻译的字段
  const fieldsToTranslate = {
    name: provider.name,
    description: provider.description,
    features: provider.features || [],
    pros: provider.pros || [],
    cons: provider.cons || []
  };
  
  // 翻译内容
  const translatedFields = await translateObject(fieldsToTranslate, locale);
  
  // 合并翻译后的内容
  return {
    ...provider,
    [`name_${locale}`]: translatedFields.name,
    [`description_${locale}`]: translatedFields.description,
    [`features_${locale}`]: translatedFields.features,
    [`pros_${locale}`]: translatedFields.pros,
    [`cons_${locale}`]: translatedFields.cons
  };
};

/**
 * 自动生成文章内容
 * @param {Object} article - 文章基本数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 生成的文章内容
 */
export const generateArticleContent = async (article, locale = 'zh') => {
  // 如果已经有对应语言的内容，直接返回
  if (article[`content_${locale}`]) {
    return article;
  }
  
  // 需要翻译的字段
  const fieldsToTranslate = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content
  };
  
  // 翻译内容
  const translatedFields = await translateObject(fieldsToTranslate, locale);
  
  // 合并翻译后的内容
  return {
    ...article,
    [`title_${locale}`]: translatedFields.title,
    [`excerpt_${locale}`]: translatedFields.excerpt,
    [`content_${locale}`]: translatedFields.content
  };
};

/**
 * 自动生成优惠活动内容
 * @param {Object} deal - 优惠活动基本数据
 * @param {string} locale - 语言代码
 * @returns {Object} - 生成的优惠活动内容
 */
export const generateDealContent = async (deal, locale = 'zh') => {
  // 如果已经有对应语言的内容，直接返回
  if (deal[`title_${locale}`]) {
    return deal;
  }
  
  // 需要翻译的字段
  const fieldsToTranslate = {
    title: deal.title,
    description: deal.description,
    terms: deal.terms || ''
  };
  
  // 翻译内容
  const translatedFields = await translateObject(fieldsToTranslate, locale);
  
  // 合并翻译后的内容
  return {
    ...deal,
    [`title_${locale}`]: translatedFields.title,
    [`description_${locale}`]: translatedFields.description,
    [`terms_${locale}`]: translatedFields.terms
  };
};

/**
 * 批量生成内容
 * @param {Array} items - 内容项数组
 * @param {Function} generatorFunction - 生成器函数
 * @param {Array} locales - 语言代码数组
 * @returns {Promise<Array>} - 生成的内容数组
 */
export const batchGenerateContent = async (items, generatorFunction, locales = ['en']) => {
  const results = [...items];
  
  // 为每个内容项生成多语言内容
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // 为每种语言生成内容
    for (const locale of locales) {
      if (locale === 'zh') continue; // 中文是原始内容，跳过
      
      // 生成内容
      const generatedItem = await generatorFunction(item, locale);
      results[i] = generatedItem;
    }
  }
  
  return results;
};

/**
 * 自动生成内容摘要
 * @param {string} content - 完整内容
 * @param {number} maxLength - 最大长度
 * @returns {string} - 生成的摘要
 */
export const generateExcerpt = (content, maxLength = 200) => {
  // 移除HTML标签
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // 截取指定长度
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // 查找最后一个完整句子的位置
  const lastSentence = plainText.substring(0, maxLength).lastIndexOf('。');
  const lastPeriod = plainText.substring(0, maxLength).lastIndexOf('.');
  
  // 使用最后一个句子结束点或者直接截断
  const endPos = Math.max(lastSentence, lastPeriod);
  
  if (endPos > 0) {
    return plainText.substring(0, endPos + 1);
  }
  
  return plainText.substring(0, maxLength) + '...';
};

/**
 * 自动生成相关内容推荐
 * @param {Object} item - 当前内容项
 * @param {Array} allItems - 所有内容项
 * @param {number} count - 推荐数量
 * @returns {Array} - 推荐的内容项
 */
export const generateRelatedItems = (item, allItems, count = 3) => {
  // 如果没有足够的内容项，返回空数组
  if (!allItems || allItems.length <= 1) {
    return [];
  }
  
  // 计算相关度分数
  const scoredItems = allItems
    .filter(other => other.id !== item.id) // 排除当前项
    .map(other => {
      let score = 0;
      
      // 根据标签计算相关度
      if (item.tags && other.tags) {
        const commonTags = item.tags.filter(tag => other.tags.includes(tag));
        score += commonTags.length * 10;
      }
      
      // 根据类别计算相关度
      if (item.category === other.category) {
        score += 5;
      }
      
      // 根据标题相似度计算相关度
      if (item.title && other.title) {
        const words1 = item.title.toLowerCase().split(/\s+/);
        const words2 = other.title.toLowerCase().split(/\s+/);
        const commonWords = words1.filter(word => words2.includes(word));
        score += commonWords.length * 2;
      }
      
      return { item: other, score };
    })
    .sort((a, b) => b.score - a.score) // 按相关度降序排序
    .slice(0, count) // 取前count个
    .map(scored => scored.item); // 只返回内容项
  
  return scoredItems;
};