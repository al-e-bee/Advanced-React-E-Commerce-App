import { useState } from "react";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutModal } from "./components/CheckoutModal";
import Footer from "./components/Footer";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <main className="flex-grow-1">
        <Home />
      </main>
      <ShoppingCart
        show={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />
      <CheckoutModal
        show={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <Footer />
    </div>
  );
}

export default App;
