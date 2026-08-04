// cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

// Define a type for items in the cart (extends Product with a quantity count)
export interface CartItem extends Product {
  count: number;
}

interface CartState {
  items: CartItem[];
}

// Helper function to load initial cart state from sessionStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = sessionStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from sessionStorage:", error);
    return [];
  }
};

// Helper function to sync cart state to sessionStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    sessionStorage.setItem("shopping_cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to sessionStorage:", error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; count: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.count = Math.max(1, action.payload.count);
      }
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("shopping_cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
