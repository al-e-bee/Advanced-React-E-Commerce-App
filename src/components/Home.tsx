// Home.tsx
import { useState } from "react";
import { useProducts, useCategories } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Row, Container, Form } from "react-bootstrap";

const formatCategoryName = (category: string) => {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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
    <Container className="py-4">
      {/* Category Dropdown */}
      <Form.Select
        className="mb-4 w-auto"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={isCategoriesLoading}
      >
        <option value="all">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {formatCategoryName(cat)}
          </option>
        ))}
      </Form.Select>

      {/* Product List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};
