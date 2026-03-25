/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductCard } from "@/components/ui/ProductCard";
import { getServerLanguage } from "@/lib/server-language";
import {
  getActiveCategoryById,
  getActiveProductById,
  getRelatedProducts,
} from "@/lib/storefront-data";
import { getCategoryName, getMessages, getProductName } from "@/lib/storefront";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const product = await getActiveProductById(id);

  if (!product) {
    notFound();
  }

  const [category, relatedProducts] = await Promise.all([
    getActiveCategoryById(product.category_id),
    getRelatedProducts(product.category_id, product.id),
  ]);

  return (
    <div className="space-y-12">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="transition hover:text-[#1D1D1F]">
          {messages.nav.home}
        </Link>
        <span>/</span>
        <Link href="/products" className="transition hover:text-[#1D1D1F]">
          {messages.nav.products}
        </Link>
        {category ? (
          <>
            <span>/</span>
            <Link
              href={`/category/${category.id}`}
              className="transition hover:text-[#1D1D1F]"
            >
              {getCategoryName(category, language)}
            </Link>
          </>
        ) : null}
        <span>/</span>
        <span className="text-[#1D1D1F]">{getProductName(product, language)}</span>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start xl:gap-12">
        <div className="soft-panel overflow-hidden bg-white p-6 sm:p-8">
          <div className="rounded-[2.5rem] bg-slate-50">
            <img
              src={product.image_url}
              alt={getProductName(product, language)}
              className="h-full w-full object-contain p-10 sm:p-14"
            />
          </div>
        </div>

        <ProductPurchasePanel
          product={product}
          categoryLabel={category ? getCategoryName(category, language) : undefined}
        />
      </section>

      <section className="space-y-6">
        <div className="text-start">
          <p className="eyebrow">{messages.product.related}</p>
          <h2 className="section-heading mt-3">{messages.product.related}</h2>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="w-[320px] flex-none">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="soft-panel px-6 py-14 text-center text-slate-500">
            {messages.product.noRelated}
          </div>
        )}
      </section>
    </div>
  );
}
