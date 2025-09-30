import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-10 w-32"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error mb-8">
        <span>Error loading categories: {error}</span>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <div key={category} className="badge badge-lg badge-outline capitalize p-4">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}