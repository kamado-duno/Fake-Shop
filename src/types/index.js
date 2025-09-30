// Product interface equivalent
export const createProduct = (id, title, price, description, category, image, rating) => ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating
});

// CartItem interface equivalent
export const createCartItem = (id, title, price, image, quantity) => ({
  id,
  title,
  price,
  image,
  quantity
});