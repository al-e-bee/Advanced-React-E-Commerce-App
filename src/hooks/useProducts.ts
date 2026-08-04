// useProducts.ts
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/productAPI";
import type { Product } from "../types/Product";

// Hook to fetch categories
export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

// Hook to fetch products (handles both "all" and category filtering)
export const useProducts = (selectedCategory: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () => {
      if (selectedCategory && selectedCategory !== "all") {
        return fetchProductsByCategory(selectedCategory);
      }
      return fetchAllProducts();
    },
  });
};
