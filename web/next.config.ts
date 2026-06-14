import type { NextConfig } from "next";
import path from "path";

function getSupabaseImageHostnames() {
  const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // نضيف المشروعين: الجديد (قاعدة البيانات) والقديم (Storage + روابط الصور في DB)
  const hostnames = new Set([
    "ulngcxjaxfpyadwqmukz.supabase.co",
    "asxynodsnmrymmdspprn.supabase.co",
  ]);

  if (configuredUrl) {
    try {
      hostnames.add(new URL(configuredUrl).hostname);
    } catch {
      // Ignore invalid local env values; runtime Supabase validation handles them.
    }
  }

  return [...hostnames];
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(process.cwd(), ".."),
  },
  images: {
    remotePatterns: [
      // ImageKit CDN (المصدر الرئيسي بعد الهجرة)
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/amalcenter/**",
      },
      // Supabase Storage (احتياطي أثناء فترة الهجرة)
      ...getSupabaseImageHostnames().map((hostname) => ({
        protocol: "https" as const,
        hostname,
        port: "",
        pathname: "/storage/v1/object/public/**",
      })),
    ],
    minimumCacheTTL: 2592000,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // إضافة Cache-Control للصفحات العامة — يقلل الاستدعاءات من Supabase بشكل كبير
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        // صفحات المنتجات والفئات: كاش 5 دقائق + stale-while-revalidate
        source: "/(product|category|products)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
