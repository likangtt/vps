// utils/multilingual.js
import { translateObject } from './translationService';

/**
 * 为页面生成多语言内容
 * @param {Object} props - 页面props
 * @param {Function} getStaticProps - 原始的getStaticProps函数
 * @returns {Function} - 增强的getStaticProps函数
 */
export const withMultilingualProps = (getStaticProps) => {
  return async (context) => {
    // 获取原始props
    const originalProps = await getStaticProps(context);
    
    // 如果没有props或者出错，直接返回
    if (!originalProps.props || originalProps.notFound || originalProps.redirect) {
      return originalProps;
    }
    
    // 获取请求的语言
    const lang = context.locale || context.params?.lang || 'zh';
    
    // 如果是英文请求，翻译内容
    if (lang === 'en' && originalProps.props.content) {
      const translatedContent = await translateObject(originalProps.props.content, 'zh', 'en');
      return {
        ...originalProps,
        props: {
          ...originalProps.props,
          content: translatedContent,
          // 添加多语言元数据
          multilingual: {
            currentLang: 'en',
            alternateUrls: {
              en: context.resolvedUrl,
              zh: context.resolvedUrl.replace('/en/', '/zh/')
            }
          }
        }
      };
    }
    
    // 如果是中文请求，添加多语言元数据
    return {
      ...originalProps,
      props: {
        ...originalProps.props,
        // 添加多语言元数据
        multilingual: {
          currentLang: 'zh',
          alternateUrls: {
            zh: context.resolvedUrl,
            en: context.resolvedUrl.replace('/zh/', '/en/')
          }
        }
      }
    };
  };
};

/**
 * 生成多语言路径配置
 * @param {Array} paths - 原始路径数组
 * @returns {Array} - 包含多语言路径的数组
 */
export const generateMultilingualPaths = (paths) => {
  const multilingualPaths = [];
  
  paths.forEach(path => {
    // 为中文路径
    multilingualPaths.push({
      ...path,
      locale: 'zh'
    });
    
    // 为英文路径
    multilingualPaths.push({
      ...path,
      locale: 'en'
    });
  });
  
  return multilingualPaths;
};