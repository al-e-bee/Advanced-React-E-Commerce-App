// Navbar.tsx
import React from "react";
import {
  Navbar as BsNavbar,
  Container,
  Nav,
  Badge,
  Button,
} from "react-bootstrap";
import { useAppSelector } from "../store";

interface NavigationProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavigationProps> = ({ onOpenCart }) => {
  const items = useAppSelector((state) => state.cart.items);

  // Calculate total item count across all quantities
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-4 sticky-top">
      <Container>
        <BsNavbar.Brand href="#">FakeStore App</BsNavbar.Brand>
        <Nav className="ms-auto">
          <Button
            variant="outline-light"
            onClick={onOpenCart}
            className="position-relative"
          >
            Cart
            {totalCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalCount}
              </Badge>
            )}
          </Button>
        </Nav>
      </Container>
    </BsNavbar>
  );
};
