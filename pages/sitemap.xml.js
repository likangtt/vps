// pages/sitemap.xml.js
import vpsProviders from '../data/vpsProviders.json';
import articles from '../data/articles.json';

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  // 获取网站基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vps-recommendation.com';
  
  // 生成静态页面的URL
  const staticPages = [
    '',
    '/comparison',
    '/deals',
    '/articles',
    '/about',
    '/contact',
  ];
  
  // 生成提供商页面的URL
  const providerPages = vpsProviders.map((provider) => `/provider/${provider.id}`);
  
  // 生成文章页面的URL
  const articlePages = articles.map((article) => `/article/${article.id}`);
  
  // 合并所有页面
  const allPages = [...staticPages, ...providerPages, ...articlePages];
  
  // 生成sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allPages.map(page => {
    const url = `${baseUrl}${page}`;
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh${page}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
  </url>`;
  }).join('')}
</urlset>`;
  
  // 设置响应头
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
};

export default Sitemap;