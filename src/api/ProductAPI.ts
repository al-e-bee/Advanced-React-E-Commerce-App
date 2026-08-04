// ProductAPI.ts
import type { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com/products";

// 1. Fetch all products
export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// 2. Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

// 3. Fetch products by category
export const fetchProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await fetch(
    `${BASE_URL}/category/${encodeURIComponent(category)}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
  return response.json();
};
