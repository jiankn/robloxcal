import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 暂时跳过 ESLint 和 TypeScript 检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 启用图片优化，设置常用尺寸
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
    formats: ['image/webp'],
  },
  // 使用 Webpack 配置修复 Windows 路径大小写问题
  webpack: (config, { isServer }) => {
    // 确保使用一致的路径解析
    config.resolve.symlinks = false;
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [],
    };
    return config;
  },
  async redirects() {
    return [
      // AFSE 旧链接重定向
      { source: '/codes', destination: '/afse/codes', permanent: true },
      { source: '/dps', destination: '/afse/dps', permanent: true },
      { source: '/calibrate', destination: '/afse/calibrate', permanent: true },
      { source: '/training-areas', destination: '/afse/training-areas', permanent: true },
      { source: '/training-areas/:stat', destination: '/afse/training-areas/:stat', permanent: true },
      { source: '/tier-list', destination: '/afse/tier-list', permanent: true },
      { source: '/guides', destination: '/afse/guides', permanent: true },
      { source: '/guides/:slug', destination: '/afse/guides/:slug', permanent: true },
      { source: '/tracker', destination: '/afse/tracker', permanent: true },
      { source: '/compare', destination: '/afse/compare', permanent: true },
      { source: '/weapons', destination: '/afse/weapons', permanent: true },
      { source: '/weapons/:id', destination: '/afse/weapons/:id', permanent: true },
      { source: '/skills', destination: '/afse/skills', permanent: true },
      { source: '/skills/:id', destination: '/afse/skills/:id', permanent: true },
      { source: '/transformations', destination: '/afse/transformations', permanent: true },
      { source: '/transformations/:id', destination: '/afse/transformations/:id', permanent: true },
      { source: '/faq', destination: '/afse/faq', permanent: true },
      { source: '/changelog', destination: '/afse/changelog', permanent: true },
    ]
  }
};

export default nextConfig;

