import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICartItem, OrderType } from "@/types";

interface CartState {
  items: ICartItem[];
  orderType: OrderType;
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<ICartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;

  // Computed helper getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getEstimatedTax: () => number;
  getEstimatedDeliveryFee: () => number;
  getEstimatedTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'delivery',
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          const newQty = item.quantity + delta;
          if (newQty <= 0) {
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: newQty } : i
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setOrderType: (orderType) => {
        set({ orderType });
      },

      setOpen: (isOpen) => {
        set({ isOpen });
      },

      toggleOpen: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getEstimatedTax: () => {
        return Math.round(get().getSubtotal() * 0.05);
      },

      getEstimatedDeliveryFee: () => {
        if (get().orderType === 'pickup') return 0;
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 500 ? 0 : 50;
      },

      getEstimatedTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal + get().getEstimatedTax() + get().getEstimatedDeliveryFee();
      },
    }),
    {
      name: "jain-dhaba-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, orderType: state.orderType }),
    }
  )
);
