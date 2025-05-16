/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
  // Otimização de cache para assets estáticos
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Compressão de resposta para melhor performance
  compress: true,
  // Configurações para resolver problemas de CSS
  experimental: {
    optimizeCss: false, // Desativado para evitar problemas com critters
    optimizePackageImports: ['lucide-react'],
  },
  // Garantir que o CSS seja processado corretamente
  webpack: (config) => {
    // Configuração para garantir que o CSS seja processado corretamente
    const oneOfRule = config.module.rules.find(
      (rule) => typeof rule.oneOf === 'object'
    );

    if (oneOfRule) {
      const cssModuleRules = oneOfRule.oneOf.filter(
        (rule) => rule.test && rule.test.toString().includes('css')
      );

      for (const rule of cssModuleRules) {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((loader) => {
            if (
              loader.loader &&
              loader.loader.includes('css-loader') &&
              typeof loader.options === 'object'
            ) {
              // Garantir que o CSS seja processado corretamente
              loader.options.modules = {
                ...loader.options.modules,
                exportOnlyLocals: false,
              };
            }
          });
        }
      }
    }

    return config;
  },
};

export default nextConfig;
