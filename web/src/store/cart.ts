"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/lib/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalIQD: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

function calculateTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalIQD: items.reduce(
      (sum, item) => sum + item.product.price_iqd * item.quantity,
      0
    ),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalIQD: 0,
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          const nextQuantity = Math.min(
            existingItem.quantity + quantity,
            product.stock_quantity
          );
          const nextItems = items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: nextQuantity }
              : item
          );
          set({ items: nextItems, ...calculateTotals(nextItems) });
          return;
        }

        const nextItems = [
          ...items,
          {
            product,
            quantity: Math.min(quantity, product.stock_quantity || quantity),
          },
        ];

        set({ items: nextItems, ...calculateTotals(nextItems) });
      },
      removeItem: (productId) => {
        const nextItems = get().items.filter(
          (item) => item.product.id !== productId
        );
        set({ items: nextItems, ...calculateTotals(nextItems) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const nextItems = get().items.map((item) => {
          if (item.product.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(quantity, item.product.stock_quantity || quantity),
          };
        });

        set({ items: nextItems, ...calculateTotals(nextItems) });
      },
      clearCart: () => set({ items: [], totalItems: 0, totalIQD: 0 }),
    }),
    {
      name: "storefront-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        Object.assign(state, calculateTotals(state.items));
      },
    }
  )
);
