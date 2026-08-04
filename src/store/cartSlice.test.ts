// src/store/cartSlice.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./cartSlice";
import type { Product } from "../types/Product";

const sampleProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  category: "electronics",
  description: "A great product",
  image: "https://example.com/image.jpg",
  rating: { rate: 4.5, count: 10 },
};

describe("cartSlice reducers", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  it("should handle addToCart for a new item", () => {
    const actual = cartReducer({ items: [] }, addToCart(sampleProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({ ...sampleProduct, count: 1 });
  });

  it("should increment count when adding an existing item", () => {
    const initialState = { items: [{ ...sampleProduct, count: 1 }] };
    const actual = cartReducer(initialState, addToCart(sampleProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].count).toBe(2);
  });

  it("should handle removeFromCart", () => {
    const initialState = { items: [{ ...sampleProduct, count: 1 }] };
    const actual = cartReducer(initialState, removeFromCart(1));
    expect(actual.items).toHaveLength(0);
  });

  it("should handle updateQuantity", () => {
    const initialState = { items: [{ ...sampleProduct, count: 1 }] };
    const actual = cartReducer(
      initialState,
      updateQuantity({ id: 1, count: 5 }),
    );
    expect(actual.items[0].count).toBe(5);
  });

  it("should do nothing if updateQuantity is called for a non-existent item id", () => {
    const initialState = { items: [{ ...sampleProduct, count: 1 }] };
    const actual = cartReducer(
      initialState,
      updateQuantity({ id: 999, count: 5 }),
    );
    expect(actual.items[0].count).toBe(1);
  });

  it("should handle clearCart", () => {
    const initialState = { items: [{ ...sampleProduct, count: 2 }] };
    const actual = cartReducer(initialState, clearCart());
    expect(actual.items).toHaveLength(0);
  });

  // --- EDGE CASE TESTS FOR 100% COVERAGE ---

  it("should fallback to empty array when loadCartFromStorage throws an error (Lines 21-22)", () => {
    // 1. Suppress console.error during this test
    vi.spyOn(console, "error").mockImplementation(() => {});

    // 2. Mock JSON.parse to throw an error when reading from sessionStorage
    vi.spyOn(JSON, "parse").mockImplementationOnce(() => {
      throw new Error("Invalid JSON");
    });

    // 3. Trigger loadCartFromStorage via initial reducer invocation
    const actual = cartReducer(undefined, { type: "unknown" });
    expect(actual.items).toEqual([]);
  });

  it("should catch error when saveCartToStorage throws an error (Line 31)", () => {
    // 1. Suppress console.error during this test
    vi.spyOn(console, "error").mockImplementation(() => {});

    // 2. Mock setItem to throw an error
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    const actual = cartReducer({ items: [] }, addToCart(sampleProduct));
    expect(actual.items).toHaveLength(1);
  });
});
