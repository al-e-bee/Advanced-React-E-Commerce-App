// Home.tsx
import { useState } from "react";
import { useProducts, useCategories } from "../hooks/useProducts";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useProducts(selectedCategory);

  if (isProductsLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products...</div>;

  return (
    <div>
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={isCategoriesLoading}
      >
        <option value="all">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product List */}
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <p>Rating: {product.rating.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
