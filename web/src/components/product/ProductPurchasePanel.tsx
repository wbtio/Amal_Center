"use client";

import { CheckCircle2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import {
  formatIQD,
  getProductDescription,
  getProductName,
} from "@/lib/storefront";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

type ProductPurchasePanelProps = {
  product: Product;
  categoryLabel?: string;
};

export function ProductPurchasePanel({
  product,
  categoryLabel,
}: ProductPurchasePanelProps) {
  const { language, messages } = useStorefront();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "details">("description");
  const hasDiscount =
    typeof product.original_price === "number" &&
    product.original_price > product.price_iqd;

  return (
    <div className="space-y-6">
      <div className="text-start">
        <p className="eyebrow">{messages.nav.products}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl">
          {getProductName(product, language)}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8">
          {getProductDescription(product, language)}
        </p>
      </div>

      <div className="soft-panel p-5 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-slate-400">
              {messages.product.price}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-[#1D1D1F] sm:text-4xl">
                {formatIQD(product.price_iqd, language)}
              </span>
              {hasDiscount ? (
                <span className="text-lg text-slate-400 line-through">
                  {formatIQD(product.original_price ?? product.price_iqd, language)}
                </span>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium",
              product.stock_quantity > 0
                ? "bg-primary/8 text-primary"
                : "bg-rose-50 text-danger"
            )}
          >
            <CheckCircle2 size={18} />
            <span>
              {product.stock_quantity > 0
                ? language === "ar"
                  ? `متوفر الآن (${product.stock_quantity})`
                  : `In stock (${product.stock_quantity})`
                : messages.product.outOfStock}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex h-14 items-center rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary"
              aria-label={language === "ar" ? "تقليل الكمية" : "Decrease quantity"}
            >
              <Minus size={16} />
            </button>
            <span className="min-w-12 text-center text-base font-semibold text-[#1D1D1F]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((current) =>
                  Math.min(product.stock_quantity || current, current + 1)
                )
              }
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={language === "ar" ? "زيادة الكمية" : "Increase quantity"}
              disabled={product.stock_quantity <= quantity}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => addItem(product, quantity)}
            disabled={product.stock_quantity <= 0}
            className={cn(
              "pill-button-primary min-h-14 flex-1 gap-2 text-base",
              product.stock_quantity <= 0 &&
                "cursor-not-allowed bg-slate-200 text-slate-500 shadow-none hover:translate-y-0 hover:shadow-none"
            )}
          >
            <ShoppingBag size={18} />
            <span>
              {product.stock_quantity > 0
                ? messages.product.addToCart
                : messages.product.outOfStock}
            </span>
          </button>
        </div>
      </div>

      <div className="soft-panel p-5 sm:p-8">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setTab("description")}
            className={cn(
              "pill-button",
              tab === "description"
                ? "bg-[#1D1D1F] text-white"
                : "border border-slate-200 bg-white text-slate-600"
            )}
          >
            {messages.product.description}
          </button>
          <button
            type="button"
            onClick={() => setTab("details")}
            className={cn(
              "pill-button",
              tab === "details"
                ? "bg-[#1D1D1F] text-white"
                : "border border-slate-200 bg-white text-slate-600"
            )}
          >
            {messages.product.details}
          </button>
        </div>

        {tab === "description" ? (
          <p className="mt-6 text-base leading-8 text-slate-500">
            {getProductDescription(product, language)}
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {language === "ar" ? "القسم" : "Category"}
              </p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {categoryLabel ||
                  (language === "ar" ? "قسم نشط" : "Active category")}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {messages.product.stock}
              </p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {product.stock_quantity}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {language === "ar" ? "المعرف" : "Product ID"}
              </p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {product.id.slice(0, 8)}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {language === "ar" ? "السعر السابق" : "Original price"}
              </p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {hasDiscount
                  ? formatIQD(product.original_price ?? product.price_iqd, language)
                  : language === "ar"
                    ? "لا يوجد"
                    : "None"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
