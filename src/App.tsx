import { useState } from "react";
import { Home } from "./components/Home";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutModal } from "./components/CheckoutModal";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <Container>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <Home />
      <ShoppingCart
        show={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />
      <CheckoutModal
        show={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </Container>
  );
}

export default App;
