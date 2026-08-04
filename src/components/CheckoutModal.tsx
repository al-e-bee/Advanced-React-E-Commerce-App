// CheckoutModal.tsx
import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { clearCart } from "../store/cartSlice";
import { formatCurrency } from "../utitlities/formatCurrency";

interface CheckoutModalProps {
  show: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    setIsSuccess(true);
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {isSuccess ? "Order Confirmation" : "Checkout Summary"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isSuccess ? (
          <div className="py-3 text-center">
            <Alert variant="success" className="mb-4">
              <Alert.Heading className="h5 fw-bold mb-2">
                {" "}
                Purchase Complete!
              </Alert.Heading>
              <p className="mb-0">
                Thank you for your order! Your payment was simulated
                successfully and{" "}
                <strong>your shopping cart has been cleared</strong>.
              </p>
            </Alert>

            <Button
              variant="primary"
              onClick={handleModalClose}
              className="w-100"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h6>
                Order Summary (
                {items.reduce((acc, item) => acc + item.count, 0)} items)
              </h6>
              <div className="d-flex justify-content-between fs-5 fw-bold text-primary my-2">
                <span>Total Amount:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <hr />

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" placeholder="123 Main St" required />
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button variant="success" type="submit" size="lg">
                Complete Purchase ({formatCurrency(subtotal)})
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};
