/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // 禁用TypeScript检查
    ignoreBuildErrors: true,
  },
  // 禁用ESLint检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用严格模式
  strictMode: false,
}

module.exports = nextConfig