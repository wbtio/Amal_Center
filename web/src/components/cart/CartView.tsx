/* eslint-disable @next/next/no-img-element */
"use client";

import { Minus, Plus, ShoppingBag, TicketPercent, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { formatIQD, getProductName } from "@/lib/storefront";
import { useCartStore } from "@/store/cart";

export function CartView() {
  const { language, t } = useStorefront();
  const { items, totalItems, totalIQD, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const [couponCode, setCouponCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="soft-panel overflow-hidden px-6 py-16 text-center sm:px-12">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-50">
          <ShoppingBag size={36} className="text-slate-300" />
        </div>
        <h2 className="mt-8 text-3xl font-semibold tracking-tight text-[#1D1D1F]">
          {t("cart.empty")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500">
          {language === "ar"
            ? "ابدأ بإضافة المنتجات التي تحتاجها ليظهر ملخص الطلب هنا بشكل واضح وسريع."
            : "Start adding the products you need and the order summary will appear here."}
        </p>
        <Link href="/products" className="pill-button-primary mt-8">
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.product.id}
            className="soft-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
          >
            <div className="h-28 w-full rounded-[2rem] bg-slate-50 sm:w-28">
              <img
                src={item.product.image_url}
                alt={getProductName(item.product, language)}
                className="h-full w-full object-contain p-4"
              />
            </div>

            <div className="flex-1">
              <div className="text-start">
                <Link
                  href={`/product/${item.product.id}`}
                  className="text-xl font-semibold tracking-tight text-[#1D1D1F]"
                >
                  {getProductName(item.product, language)}
                </Link>
                <p className="mt-2 text-sm text-slate-500">
                  {formatIQD(item.product.price_iqd, language)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex min-h-12 items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary"
                  aria-label={language === "ar" ? "تقليل الكمية" : "Decrease quantity"}
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold text-[#1D1D1F]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={language === "ar" ? "زيادة الكمية" : "Increase quantity"}
                  disabled={item.quantity >= item.product.stock_quantity}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-rose-100 text-danger transition hover:bg-rose-50"
                aria-label={t("cart.remove")}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
        <div className="soft-panel p-6">
          <div className="text-start">
            <p className="eyebrow">{t("cart.summary")}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">
              {t("cart.summary")}
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{t("cart.totalItems")}</span>
              <span className="font-semibold text-[#1D1D1F]">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{language === "ar" ? "الخصم" : "Discount"}</span>
              <span className="font-semibold text-[#1D1D1F]">
                {formatIQD(0, language)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-base">
              <span className="font-medium text-slate-500">{t("cart.totalAmount")}</span>
              <span className="text-2xl font-semibold text-[#1D1D1F]">
                {formatIQD(totalIQD, language)}
              </span>
            </div>
          </div>
        </div>

        <div className="soft-panel p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50">
              <TicketPercent size={18} className="text-slate-500" />
            </div>
            <div className="text-start">
              <p className="text-sm font-semibold text-[#1D1D1F]">
                {language === "ar" ? "كود الخصم" : "Promo code"}
              </p>
              <p className="text-sm text-slate-500">
                {language === "ar"
                  ? "واجهة جاهزة للتفعيل لاحقاً"
                  : "UI ready for validation later"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder={language === "ar" ? "أدخل الكود" : "Enter code"}
              className="field-input"
            />
            <button type="button" className="pill-button-ghost">
              {language === "ar" ? "تطبيق" : "Apply"}
            </button>
          </div>
        </div>

        <div className="soft-panel p-6">
          <div className="grid gap-3">
            <Link href="/checkout" className="pill-button-primary">
              {t("cart.checkout")}
            </Link>
            <button type="button" onClick={() => clearCart()} className="pill-button-ghost">
              {t("cart.clear")}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
