import React, { useState } from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";
import type { Product } from "../types/Product";
import { ProductImage } from "./ProductImage";
import { Rating } from "@smastrom/react-rating";
import { useAppDispatch } from "../store";
import { addToCart } from "../store/cartSlice";
import { formatCurrency } from "../utitlities/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <Col>
      <Card className="h-100 shadow-sm border-0">
        {/* Image Container */}
        <div
          className="p-3 d-flex align-items-center justify-content-center"
          style={{ height: "220px", backgroundColor: "#fff" }}
        >
          <ProductImage
            src={product.image}
            alt={product.title}
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
        {/* Card Content */}
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge bg="secondary" className="text-uppercase">
              {product.category}
            </Badge>
            <Rating
              style={{ maxWidth: 100 }}
              value={product.rating.rate}
              readOnly
            />
          </div>

          <Card.Title
            className="fs-6 fw-bold mb-2"
            title={product.title}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.5rem", // Keeps card heights consistent
            }}
          >
            {product.title}
          </Card.Title>

          <Card.Text
            className="text-muted small mb-3"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Card.Text>

          <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
            <span className="fs-5 fw-bold">
              {formatCurrency(product.price)}
            </span>
            <Button
              variant={isAdded ? "success" : "primary"}
              onClick={handleAddToCart}
              disabled={isAdded}
              className="align-self-center d-flex align-items-center justify-content-center gap-1 mt-auto"
            >
              {isAdded ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                  Added!
                </>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
