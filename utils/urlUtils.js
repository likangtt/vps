// utils/urlUtils.js

/**
 * 生成多语言URL
 * @param {string} path - 路径
 * @param {string} lang - 语言代码
 * @returns {string} - 多语言URL
 */
export const getMultilingualUrl = (path, lang) => {
  // 移除开头的斜杠
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // 如果是默认语言（中文），不添加语言前缀
  if (lang === 'zh') {
    return `/${cleanPath}`;
  }
  
  // 其他语言添加语言前缀
  return `/${lang}/${cleanPath}`;
};

/**
 * 获取当前URL的不同语言版本
 * @param {string} currentPath - 当前路径
 * @returns {Object} - 包含不同语言版本URL的对象
 */
export const getAlternateUrls = (currentPath) => {
  // 移除可能存在的语言前缀
  let pathWithoutLang = currentPath;
  
  // 检查是否有语言前缀
  const langPrefixMatch = currentPath.match(/^\/(zh|en)\//);
  if (langPrefixMatch) {
    // 移除语言前缀
    pathWithoutLang = currentPath.substring(langPrefixMatch[0].length - 1);
  }
  
  // 生成不同语言版本的URL
  return {
    zh: getMultilingualUrl(pathWithoutLang, 'zh'),
    en: getMultilingualUrl(pathWithoutLang, 'en')
  };
};