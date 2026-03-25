/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ui/ProductCard";
import { getServerLanguage } from "@/lib/server-language";
import {
  getActiveCategoryById,
  getActiveProductsByCategory,
} from "@/lib/storefront-data";
import { getCategoryName, getMessages } from "@/lib/storefront";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const [category, products] = await Promise.all([
    getActiveCategoryById(id),
    getActiveProductsByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="soft-panel overflow-hidden">
        <div className="relative">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={getCategoryName(category, language)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/92 to-white" />
          <div className="relative px-5 py-8 sm:px-8 lg:px-12 lg:py-14">
            <nav
              className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
            >
              <Link href="/" className="transition hover:text-[#1D1D1F]">
                {messages.nav.home}
              </Link>
              <span>/</span>
              <Link href="/products" className="transition hover:text-[#1D1D1F]">
                {messages.nav.products}
              </Link>
              <span>/</span>
              <span className="text-[#1D1D1F]">
                {getCategoryName(category, language)}
              </span>
            </nav>

            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="text-start">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl text-primary">
                  {category.icon?.slice(0, 1) || "•"}
                </div>
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl">
                  {getCategoryName(category, language)}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                  {language === "ar"
                    ? "كل المنتجات النشطة داخل هذا القسم، مع نفس واجهة العرض السريعة والمبسطة."
                    : "All active products inside this category with the same fast, refined browsing experience."}
                </p>
              </div>

              <Link href="/products" className="pill-button-ghost">
                {messages.category.back}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="soft-panel px-6 py-14 text-center text-slate-500">
          {messages.category.empty}
        </div>
      )}
    </div>
  );
}
