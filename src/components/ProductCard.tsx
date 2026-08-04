import React from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";
import type { Product } from "../types/Product";
import { ProductImage } from "./ProductImage";
import { Rating } from "@smastrom/react-rating";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <Col>
      <Card className="h-100 shadow-sm border-0">
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
            className="fs-6 fw-bold text-truncate"
            title={product.title}
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
            <span className="fs-5 fw-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAddToCart(product)}
            >
              Add To Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
