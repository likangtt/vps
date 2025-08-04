/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 添加国际化配置
  i18n: {
    // 支持的语言列表
    locales: ['zh', 'en'],
    // 默认语言
    defaultLocale: 'zh',
    // 域名配置（可选）
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'zh',
    //   },
    //   {
    //     domain: 'example.com/en',
    //     defaultLocale: 'en',
    //   },
    // ],
  },
  
  // 图片优化配置
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  
  // 允许所有主机访问
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
