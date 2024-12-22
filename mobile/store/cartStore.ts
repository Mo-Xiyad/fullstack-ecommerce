import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  resetCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],

  addProduct: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        items: [...state.items, { product, quantity: 1 }]
      };
    }),

  resetCart: () => set({ items: [] })
}));
