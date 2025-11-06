import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: any;
  count: number;
  original?: number;
  discountPct?: number;
  storeName?: string;
};

type CartStore = {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  updateCount: (id: string, count: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalPrice: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let newItems;

      if (existing) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, count: i.count + item.count } : i
        );
      } else {
        newItems = [...state.items, item];
      }

      // ✅ addItem 할 때마다 totalPrice 재계산
      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.count, 0);
      return { items: newItems, totalPrice: newTotal };
    }),

  updateCount: (id, count) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === id ? { ...i, count } : i
      );
      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.count, 0);
      return { items: newItems, totalPrice: newTotal };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.count, 0);
      return { items: newItems, totalPrice: newTotal };
    }),

  clearCart: () => set({ items: [], totalPrice: 0 }),
}));
