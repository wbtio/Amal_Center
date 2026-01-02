import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {},
  turbopack: {
    // root: path.join(process.cwd(), '..'),
  },
  reactCompiler: true,
};

export default nextConfig;
