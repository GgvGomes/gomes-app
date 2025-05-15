/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gomes-app',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;