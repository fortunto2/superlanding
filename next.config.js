// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

// Подключаем next-intl
const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

// Add bundle analyzer if ANALYZE is true
if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const withBundleAnalyzer = require('@next/bundle-analyzer')();
  module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
} else {
  module.exports = withNextIntl(nextConfig);
} 