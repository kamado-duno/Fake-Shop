import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router";
import { ShoppingCart, Store } from "lucide-react";
import {
  saveCartToStorage,
  getCartFromStorage,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  calculateTotalPrice,
  getItemQuantityInCart,
} from "../utils/cartUtils";

export default function Layout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getCartFromStorage();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => addItemToCart(prevCart, product));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => removeItemFromCart(prevCart, productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => updateItemQuantity(prevCart, productId, quantity));
  };

  const getTotalPrice = () => calculateTotalPrice(cart);

  const getItemQuantity = (productId) => getItemQuantityInCart(cart, productId);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const context = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getItemQuantity,
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <Store className="w-6 h-6 mr-2" />
            Fake Shop
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/cart" className="btn btn-ghost">
            <div className="indicator">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="badge badge-sm badge-primary indicator-item">
                  {totalItems}
                </span>
              )}
            </div>
            Cart
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Outlet context={context} />
      </main>
    </div>
  );
}
