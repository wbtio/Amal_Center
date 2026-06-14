import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {},
  turbopack: {
    root: path.join(process.cwd(), ".."),
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asxynodsnmrymmdspprn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    minimumCacheTTL: 2592000,
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
