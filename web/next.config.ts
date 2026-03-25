import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(process.cwd(), ".."),
  },
};

export default nextConfig;
