import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="skeleton h-8 w-48 mb-4"></div>
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-10 w-32"></div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="skeleton h-8 w-32 mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-lg">
              <div className="skeleton h-48 mx-6 mt-6"></div>
              <div className="card-body">
                <div className="skeleton h-6 w-full mb-2"></div>
                <div className="skeleton h-4 w-20 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="skeleton h-6 w-16"></div>
                  <div className="skeleton h-8 w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="alert alert-error max-w-md mx-auto">
          <span>Error loading products: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CategoryList />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-base-content/70 mt-2">
          Discover our amazing collection of {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}