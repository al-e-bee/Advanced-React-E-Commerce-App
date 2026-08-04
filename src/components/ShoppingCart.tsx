// ShoppingCart.tsx
import React from "react";
import {
  Offcanvas,
  Button,
  ListGroup,
  Image,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { formatCurrency } from "../utitlities/formatCurrency";

interface ShoppingCartProps {
  show: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  show,
  onClose,
  onProceedToCheckout,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  // Calculate total items in cart
  const totalItemCount = items.reduce((sum, item) => sum + item.count, 0);

  // Calculate cart subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      style={{ width: "420px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">
          Your Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {items.length === 0 ? (
          <div className="text-center my-auto py-5">
            <p className="fs-5 text-muted">Your cart is empty!</p>
            <Button variant="outline-primary" size="sm" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ListGroup
              variant="flush"
              className="flex-grow-1 overflow-auto pe-2"
            >
              {items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="px-0 py-3 border-bottom"
                >
                  <Row className="align-items-center g-2">
                    {/* Item Thumbnail */}
                    <Col xs={3} className="text-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fluid
                        style={{ maxHeight: "60px", objectFit: "contain" }}
                      />
                    </Col>

                    {/* Title & Price */}
                    <Col xs={6}>
                      <h6
                        className="mb-1 fs-6 text-truncate"
                        title={item.title}
                      >
                        {item.title}
                      </h6>
                      <span className="text-muted small">
                        {formatCurrency(item.price)} each
                      </span>

                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center mt-2 gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-2 py-0"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                count: Math.max(1, item.count - 1),
                              }),
                            )
                          }
                          disabled={item.count <= 1}
                        >
                          -
                        </Button>
                        <Badge
                          bg="light"
                          text="dark"
                          className="border px-2 fs-6"
                        >
                          {item.count}
                        </Badge>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-2 py-0"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                count: item.count + 1,
                              }),
                            )
                          }
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </div>
                    </Col>

                    {/* Total & Remove */}
                    <Col xs={3} className="text-end">
                      <div className="fw-bold mb-2">
                        {formatCurrency(item.price * item.count)}
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0 border-0 small"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove Item
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            {/* Cart Footer Summary */}
            <div className="pt-3 border-top mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted">Total Items:</span>
                <span className="fw-bold">{totalItemCount}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 fs-5">
                <span className="fw-bold">Total Price:</span>
                <span className="fw-bold text-dark">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
