/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { CategoriesCarousel } from "@/components/ui/CategoriesCarousel";
import { DepartmentCarousel } from "@/components/ui/DepartmentCarousel";
import { HomeBannerCarousel } from "@/components/ui/HomeBannerCarousel";
import { ProductCard } from "@/components/ui/ProductCard";
import { getServerLanguage } from "@/lib/server-language";
import {
  getActiveBanners,
  getFeaturedCategories,
  getNewArrivalProducts,
  getOfferProducts,
} from "@/lib/storefront-data";
import { getMessages, getProductName } from "@/lib/storefront";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const [banners, categories, offers, newArrivals] = await Promise.all([
    getActiveBanners(),
    getFeaturedCategories(),
    getOfferProducts(8),
    getNewArrivalProducts(8),
  ]);

  const heroProduct = offers[0] ?? newArrivals[0] ?? null;
  const fallbackCategory = categories.find((category) => category.image_url);
  const bannerVisual =
    fallbackCategory?.image_url ??
    heroProduct?.image_url ??
    null;
  const bannerAlt =
    (heroProduct
      ? getProductName(heroProduct, language)
      : language === "ar"
        ? "بانر الأمل سنتر"
        : "Al Amal Center banner");
  const textAlignClass = "text-start";
  const sectionHeaderClass = "mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between";

  return (
    <div className="space-y-10 lg:space-y-14">
      <section className="section-space pb-2 pt-4 lg:pt-8">
        {banners.length > 0 ? (
          <HomeBannerCarousel banners={banners} />
        ) : (
          <Link
            href="/products"
            className="group block overflow-hidden rounded-[1.9rem] border border-white/80 bg-white shadow-premium sm:rounded-[2.75rem]"
          >
            {bannerVisual ? (
              <img
                src={bannerVisual}
                alt={bannerAlt}
                className="h-auto w-full transition duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
            ) : (
              <div className="h-[11rem] bg-[linear-gradient(135deg,#f8faf8_0%,#edf7ee_45%,#fdf7e7_100%)] sm:h-[18rem] lg:h-[24rem] xl:h-[28rem]" />
            )}
          </Link>
        )}
      </section>

      <section className="section-space py-2">
        <div className={textAlignClass}>
          <p className="eyebrow">{messages.home.quickCategories}</p>
          <h2 className="section-heading mt-3">{messages.home.quickCategories}</h2>
        </div>

        {categories.length > 0 ? (
          <div className="mt-6">
            <CategoriesCarousel categories={categories} />
          </div>
        ) : (
          <div className="soft-panel mt-6 px-6 py-14 text-center text-slate-500">
            {messages.home.noCategories}
          </div>
        )}
      </section>

      {offers.length > 0 ? (
        <section className="section-space py-2">
          <div className={sectionHeaderClass}>
            <div className={textAlignClass}>
              <p className="eyebrow">{messages.home.offers}</p>
              <h2 className="section-heading mt-3">{messages.home.offers}</h2>
            </div>
            <Link href="/products" className="pill-button-ghost w-full sm:w-auto">
              {messages.common.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {offers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-space py-2">
        <div className={textAlignClass}>
          <p className="eyebrow">{messages.home.categories}</p>
          <h2 className="section-heading mt-3">{messages.home.categories}</h2>
        </div>

        {categories.length > 0 ? (
          <div className="mt-6">
            <DepartmentCarousel categories={categories} />
          </div>
        ) : (
          <div className="soft-panel mt-6 px-6 py-14 text-center text-slate-500">
            {messages.home.noCategories}
          </div>
        )}
      </section>

      <section className="section-space pt-2">
        <div className={sectionHeaderClass}>
          <div className={textAlignClass}>
            <p className="eyebrow">{messages.home.newArrivals}</p>
            <h2 className="section-heading mt-3">{messages.home.newArrivals}</h2>
          </div>
          <Link href="/products?sort=newest" className="pill-button-ghost w-full sm:w-auto">
            {messages.common.viewAll}
          </Link>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="soft-panel px-6 py-14 text-center text-slate-500">
            {language === "ar"
              ? "لا توجد منتجات حديثة حالياً."
              : "No recent products are available right now."}
          </div>
        )}
      </section>
    </div>
  );
}
