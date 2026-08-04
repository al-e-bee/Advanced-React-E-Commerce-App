// Home.tsx
import { useState } from "react";
import { useProducts, useCategories } from "../hooks/useProducts";
import { Rating } from "@smastrom/react-rating";

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
            <img src={product.image} />
            <p>{product.description}</p>
            <p>
              <strong>${product.price}</strong>
            </p>
            <Rating
              style={{ maxWidth: 100 }}
              value={product.rating.rate}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};
