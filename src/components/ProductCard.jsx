import { Link, useOutletContext } from 'react-router';
import { Plus, Minus, ExternalLink } from 'lucide-react';
import { formatPrice } from '../utils/cartUtils';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, updateQuantity, getItemQuantity } = 
    useOutletContext();

  const quantityInCart = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = () => {
    if (quantityInCart > 1) {
      updateQuantity(product.id, quantityInCart - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
      <figure className="px-6 pt-6 h-48">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg object-contain h-full w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base font-semibold line-clamp-2 min-h-[3rem]">
          {product.title}
        </h2>
        
        <div className="flex items-center gap-2 my-2">
          <span className="badge badge-secondary capitalize">
            {product.category}
          </span>
          <Link 
            to={`/category/${product.category}`}
            className="btn btn-xs btn-ghost"
          >
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          
          {quantityInCart === 0 ? (
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="btn btn-outline btn-sm btn-circle"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-semibold min-w-[2rem] text-center">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                className="btn btn-primary btn-sm btn-circle"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}