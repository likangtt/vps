import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  ogImage,
  ogType = 'website',
  alternateLanguages = {
    en: '',
    zh: ''
  }
}) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vps-recommendation.com';
  
  // 构建完整URL
  const url = `${baseUrl}${currentPath}`;
  const imageUrl = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}/images/default-og.jpg`;
  
  // 构建hreflang URL
  const enUrl = alternateLanguages.en ? `${baseUrl}${alternateLanguages.en}` : `${baseUrl}/en${currentPath}`;
  const zhUrl = alternateLanguages.zh ? `${baseUrl}${alternateLanguages.zh}` : `${baseUrl}/zh${currentPath}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* 规范链接 */}
      <link rel="canonical" href={url} />
      
      {/* 多语言支持 */}
      <link rel="alternate" href={enUrl} hrefLang="en" />
      <link rel="alternate" href={zhUrl} hrefLang="zh" />
      <link rel="alternate" href={url} hrefLang="x-default" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;