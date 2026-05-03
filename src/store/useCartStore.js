import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useCartStore = create(
  devtools(
    persist(
      immer((set) => ({
        cart: [],
        actions: {
          addToCart: (newItem) =>
            set((state) => {
              const index = state.cart.findIndex((i) => i.id === newItem.id);
              if (index !== -1) state.cart[index].quantity += 1;
              else state.cart.push({ ...newItem, quantity: 1 });
            }),
          increment: (id) =>
            set((state) => {
              const item = state.cart.find((i) => i.id === id);
              if (item) item.quantity += 1;
            }),
          descrement: (id) =>
            set((state) => {
              const item = state.cart.find((e) => e.id === id);
              if (item) item.quantity -= 1;
            }),
          removeItem: (id) =>
            set((state) => {
              state.cart = state.cart.filter((i) => i.id !== id);
            }),
          clearCart: () => set({ cart: [] }),
        },
      })),
      {
        name: "canteen-cart",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ cart: state.cart }),
      },
    ),
  ),
);

// HOOKS (Đảm bảo export đúng ở đây)
export const useCart = () => useCartStore((state) => state.cart);
export const useCartActions = () => useCartStore((state) => state.actions);

export default useCartStore;
