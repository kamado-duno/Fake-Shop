import { useOutletContext } from 'react-router';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/cartUtils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = 
    useOutletContext();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-24 h-24 mx-auto text-base-content/30 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-base-content/70 mb-6">
          Start shopping to add some amazing products to your cart!
        </p>
        <a href="/" className="btn btn-primary">
          Continue Shopping
        </a>
      </div>
    );
  }

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-base-content/70 mt-2">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="hover">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold line-clamp-2 max-w-xs">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">
                  {formatPrice(item.price)}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className="btn btn-outline btn-sm btn-circle"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className="btn btn-primary btn-sm btn-circle"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="font-bold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </td>
                <td>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <a href="/" className="btn btn-outline">
          Continue Shopping
        </a>
        
        <div className="text-right">
          <p className="text-lg">
            <span className="font-semibold">Total: </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(getTotalPrice())}
            </span>
          </p>
          <button className="btn btn-primary btn-lg mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}