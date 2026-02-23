import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../lib/supabase';

// Type definitions
export type CartItem = {
  id: string;
  product_id: string;
  name: string;
  name_ar: string;
  price_iqd: number;
  price_usd: number;
  image_url: string;
  quantity: number;
  stock_quantity: number;
};

export type CartState = {
  items: CartItem[];
  totalItems: number;
  totalIQD: number;
  totalUSD: number;
  addItem: (product: Database['public']['Tables']['products']['Row'], quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
};

// Currency formatter for IQD
export const formatIQD = (amount: number): string => {
  return new Intl.NumberFormat('ar-IQ', {
    style: 'currency',
    currency: 'IQD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Currency formatter for USD
export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalIQD: 0,
      totalUSD: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product_id === product.id);

        if (existingItem) {
          // Check if we have enough stock
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > product.stock_quantity) {
            throw new Error('لا يوجد مخزون كافٍ');
          }

          const updatedItems = items.map(item =>
            item.product_id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );

          const totals = calculateTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        } else {
          // Check if we have enough stock
          if (quantity > product.stock_quantity) {
            throw new Error('لا يوجد مخزون كافٍ');
          }

          const newItem: CartItem = {
            id: `${product.id}_${Date.now()}`,
            product_id: product.id,
            name: product.name,
            name_ar: product.name_ar,
            price_iqd: product.price_iqd,
            price_usd: product.price_usd,
            image_url: product.image_url,
            quantity,
            stock_quantity: product.stock_quantity,
          };

          const updatedItems = [...items, newItem];
          const totals = calculateTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product_id !== productId);
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const item = items.find(item => item.product_id === productId);

        if (!item) return;

        // Check if we have enough stock
        if (quantity > item.stock_quantity) {
          throw new Error('لا يوجد مخزون كافٍ');
        }

        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const updatedItems = items.map(item =>
          item.product_id === productId
            ? { ...item, quantity }
            : item
        );

        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalIQD: 0,
          totalUSD: 0,
        });
      },

      getItemQuantity: (productId) => {
        const { items } = get();
        const item = items.find(item => item.product_id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Recalculate totals when rehydrating from storage
        if (state && state.items) {
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalIQD = totals.totalIQD;
          state.totalUSD = totals.totalUSD;
        }
      },
    }
  )
);

// Helper function to calculate totals
function calculateTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalIQD = items.reduce((sum, item) => sum + (item.price_iqd * item.quantity), 0);
  const totalUSD = items.reduce((sum, item) => sum + (item.price_usd * item.quantity), 0);

  return { totalItems, totalIQD, totalUSD };
}
