import type { NextConfig } from "next";
import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
};

export default withNextIntl('./src/lib/i18n.ts')(nextConfig);
