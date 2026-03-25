"use client";

import { ShoppingCart } from "lucide-react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  quantity?: number;
};

export function AddToCartButton({
  product,
  className = "",
  quantity = 1,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useStorefront();

  return (
    <button
      type="button"
      onClick={() => addItem(product, quantity)}
      disabled={product.stock_quantity <= 0}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition",
        product.stock_quantity > 0
          ? "bg-primary text-white shadow-button hover:-translate-y-0.5 hover:shadow-premium"
          : "cursor-not-allowed bg-slate-200 text-slate-500",
        className
      )}
    >
      <ShoppingCart size={16} />
      <span>
        {product.stock_quantity > 0
          ? t("product.addToCart")
          : t("product.outOfStock")}
      </span>
    </button>
  );
}
