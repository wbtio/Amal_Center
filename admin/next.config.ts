import type { NextConfig } from "next";
import path from "path";

function getSupabaseImageHostnames() {
  const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hostnames = new Set([
    "ulngcxjaxfpyadwqmukz.supabase.co",
    "asxynodsnmrymmdspprn.supabase.co",
  ]);

  if (configuredUrl) {
    try {
      hostnames.add(new URL(configuredUrl).hostname);
    } catch {
      // Ignore invalid local env values
    }
  }

  return [...hostnames];
}

const nextConfig: NextConfig = {
  experimental: {},
  turbopack: {
    root: path.join(process.cwd(), ".."),
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      // ImageKit CDN
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/amalcenter/**",
      },
      // Supabase Storage
      ...getSupabaseImageHostnames().map((hostname) => ({
        protocol: "https" as const,
        hostname,
        port: "",
        pathname: "/storage/v1/object/public/**",
      })),
    ],
    minimumCacheTTL: 2592000,
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
