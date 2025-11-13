/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forzar compilador estÃ¡ndar (no Turbopack)
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  // Desactivar Turbopack explÃ­citamente
  experimental: {
    turbopack: false,
  },
  // Forzar modo legacy
  swcMinify: true,
};

module.exports = nextConfig;
