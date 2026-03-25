/* eslint-disable @next/next/no-img-element */
"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { formatIQD, getProductName } from "@/lib/storefront";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { language, isRTL } = useStorefront();
  const hasDiscount =
    typeof product.original_price === "number" &&
    product.original_price > product.price_iqd;
  const discountPercent = hasDiscount
    ? Math.round(
        (((product.original_price ?? product.price_iqd) - product.price_iqd) /
          (product.original_price ?? product.price_iqd)) *
          100
      )
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[10px] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium">
      <Link href={`/product/${product.id}`} className="relative block flex-[7_7_0%] overflow-hidden bg-slate-50">
        <img
          src={product.image_url}
          alt={getProductName(product, language)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {hasDiscount ? (
          <span
            className="absolute top-2.5 start-2.5 rounded-md bg-[#1D1D1F] px-2.5 py-1 text-xs font-semibold text-white"
          >
            {language === "ar" ? `خصم ${discountPercent}%` : `${discountPercent}% off`}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-[3_3_0%] flex-col justify-between gap-1.5 px-3 py-2.5 text-start">
        <div>
          <Link
            href={`/product/${product.id}`}
            className="line-clamp-1 text-sm font-semibold tracking-tight text-[#1D1D1F]"
          >
            {getProductName(product, language)}
          </Link>
          <p className={`mt-0.5 text-[11px] font-medium ${product.stock_quantity > 0 ? "text-primary" : "text-danger"}`}>
            {product.stock_quantity > 0
              ? language === "ar"
                ? "متوفر"
                : "In stock"
              : language === "ar"
                ? "غير متوفر"
                : "Out of stock"}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="text-start">
            <p className="text-sm font-bold text-[#1D1D1F]">
              {formatIQD(product.price_iqd, language)}
            </p>
            {hasDiscount ? (
              <p className="text-[11px] text-slate-400 line-through">
                {formatIQD(product.original_price ?? product.price_iqd, language)}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            disabled={product.stock_quantity <= 0}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              product.stock_quantity > 0
                ? "bg-primary text-white hover:bg-primary/90"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            <ShoppingCart size={13} />
            <span>{language === "ar" ? "أضف إلى السلة" : "Add to cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
