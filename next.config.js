/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! 禁用TypeScript检查
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig