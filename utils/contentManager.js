// utils/contentManager.js
import fs from 'fs';
import path from 'path';
import { generateProviderContent, generateArticleContent, generateDealContent } from './contentGenerator';

/**
 * 自动化内容管理系统
 * 管理多语言内容的存储、更新和检索
 */

/**
 * 读取JSON文件
 * @param {string} filePath - 文件路径
 * @returns {Object} - 文件内容
 */
const readJsonFile = (filePath) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

/**
 * 写入JSON文件
 * @param {string} filePath - 文件路径
 * @param {Object} data - 要写入的数据
 * @returns {boolean} - 是否成功
 */
const writeJsonFile = (filePath, data) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const dirPath = path.dirname(fullPath);
    
    // 确保目录存在
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

/**
 * 获取VPS提供商数据
 * @param {string} locale - 语言代码
 * @returns {Array} - 提供商数据
 */
export const getProviders = async (locale = 'zh') => {
  // 读取提供商数据
  const providers = readJsonFile('data/vpsProviders.json');
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return providers;
  }
  
  // 为每个提供商生成对应语言的内容
  const translatedProviders = await Promise.all(
    providers.map(provider => generateProviderContent(provider, locale))
  );
  
  return translatedProviders;
};

/**
 * 获取单个VPS提供商数据
 * @param {string} id - 提供商ID
 * @param {string} locale - 语言代码
 * @returns {Object} - 提供商数据
 */
export const getProvider = async (id, locale = 'zh') => {
  // 读取提供商数据
  const providers = readJsonFile('data/vpsProviders.json');
  
  // 查找指定ID的提供商
  const provider = providers.find(p => p.id === id);
  
  if (!provider) {
    return null;
  }
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return provider;
  }
  
  // 生成对应语言的内容
  return await generateProviderContent(provider, locale);
};

/**
 * 获取文章数据
 * @param {string} locale - 语言代码
 * @returns {Array} - 文章数据
 */
export const getArticles = async (locale = 'zh') => {
  // 读取文章数据
  const articles = readJsonFile('data/articles.json');
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return articles;
  }
  
  // 为每篇文章生成对应语言的内容
  const translatedArticles = await Promise.all(
    articles.map(article => generateArticleContent(article, locale))
  );
  
  return translatedArticles;
};

/**
 * 获取单篇文章数据
 * @param {string} id - 文章ID
 * @param {string} locale - 语言代码
 * @returns {Object} - 文章数据
 */
export const getArticle = async (id, locale = 'zh') => {
  // 读取文章数据
  const articles = readJsonFile('data/articles.json');
  
  // 查找指定ID的文章
  const article = articles.find(a => a.id === id);
  
  if (!article) {
    return null;
  }
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return article;
  }
  
  // 生成对应语言的内容
  return await generateArticleContent(article, locale);
};

/**
 * 获取优惠活动数据
 * @param {string} locale - 语言代码
 * @returns {Array} - 优惠活动数据
 */
export const getDeals = async (locale = 'zh') => {
  // 读取优惠活动数据
  const deals = readJsonFile('data/vpsDeals.json');
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return deals;
  }
  
  // 为每个优惠活动生成对应语言的内容
  const translatedDeals = await Promise.all(
    deals.map(deal => generateDealContent(deal, locale))
  );
  
  return translatedDeals;
};

/**
 * 获取单个优惠活动数据
 * @param {string} id - 优惠活动ID
 * @param {string} locale - 语言代码
 * @returns {Object} - 优惠活动数据
 */
export const getDeal = async (id, locale = 'zh') => {
  // 读取优惠活动数据
  const deals = readJsonFile('data/vpsDeals.json');
  
  // 查找指定ID的优惠活动
  const deal = deals.find(d => d.id === id);
  
  if (!deal) {
    return null;
  }
  
  // 如果不需要翻译，直接返回
  if (locale === 'zh') {
    return deal;
  }
  
  // 生成对应语言的内容
  return await generateDealContent(deal, locale);
};

/**
 * 更新VPS提供商数据
 * @param {Object} provider - 提供商数据
 * @param {Array} locales - 语言代码数组
 * @returns {boolean} - 是否成功
 */
export const updateProvider = async (provider, locales = ['en']) => {
  // 读取提供商数据
  const providers = readJsonFile('data/vpsProviders.json');
  
  // 查找提供商索引
  const index = providers.findIndex(p => p.id === provider.id);
  
  if (index === -1) {
    // 如果不存在，添加新提供商
    providers.push(provider);
  } else {
    // 如果存在，更新提供商
    providers[index] = provider;
  }
  
  // 为每种语言生成内容
  let updatedProvider = provider;
  for (const locale of locales) {
    if (locale === 'zh') continue; // 中文是原始内容，跳过
    
    updatedProvider = await generateProviderContent(updatedProvider, locale);
  }
  
  // 更新提供商数据
  if (index === -1) {
    providers.push(updatedProvider);
  } else {
    providers[index] = updatedProvider;
  }
  
  // 写入文件
  return writeJsonFile('data/vpsProviders.json', providers);
};

/**
 * 更新文章数据
 * @param {Object} article - 文章数据
 * @param {Array} locales - 语言代码数组
 * @returns {boolean} - 是否成功
 */
export const updateArticle = async (article, locales = ['en']) => {
  // 读取文章数据
  const articles = readJsonFile('data/articles.json');
  
  // 查找文章索引
  const index = articles.findIndex(a => a.id === article.id);
  
  if (index === -1) {
    // 如果不存在，添加新文章
    articles.push(article);
  } else {
    // 如果存在，更新文章
    articles[index] = article;
  }
  
  // 为每种语言生成内容
  let updatedArticle = article;
  for (const locale of locales) {
    if (locale === 'zh') continue; // 中文是原始内容，跳过
    
    updatedArticle = await generateArticleContent(updatedArticle, locale);
  }
  
  // 更新文章数据
  if (index === -1) {
    articles.push(updatedArticle);
  } else {
    articles[index] = updatedArticle;
  }
  
  // 写入文件
  return writeJsonFile('data/articles.json', articles);
};

/**
 * 更新优惠活动数据
 * @param {Object} deal - 优惠活动数据
 * @param {Array} locales - 语言代码数组
 * @returns {boolean} - 是否成功
 */
export const updateDeal = async (deal, locales = ['en']) => {
  // 读取优惠活动数据
  const deals = readJsonFile('data/vpsDeals.json');
  
  // 查找优惠活动索引
  const index = deals.findIndex(d => d.id === deal.id);
  
  if (index === -1) {
    // 如果不存在，添加新优惠活动
    deals.push(deal);
  } else {
    // 如果存在，更新优惠活动
    deals[index] = deal;
  }
  
  // 为每种语言生成内容
  let updatedDeal = deal;
  for (const locale of locales) {
    if (locale === 'zh') continue; // 中文是原始内容，跳过
    
    updatedDeal = await generateDealContent(updatedDeal, locale);
  }
  
  // 更新优惠活动数据
  if (index === -1) {
    deals.push(updatedDeal);
  } else {
    deals[index] = updatedDeal;
  }
  
  // 写入文件
  return writeJsonFile('data/vpsDeals.json', deals);
};
