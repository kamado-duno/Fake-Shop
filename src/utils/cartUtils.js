export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
};

export const getCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('ecommerce-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addItemToCart = (cart, product) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cart, {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  }];
};

export const removeItemFromCart = (cart, productId) => {
  return cart.filter(item => item.id !== productId);
};

export const updateItemQuantity = (cart, productId, quantity) => {
  if (quantity <= 0) {
    return removeItemFromCart(cart, productId);
  }

  return cart.map(item =>
    item.id === productId
      ? { ...item, quantity }
      : item
  );
};

export const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getItemQuantityInCart = (cart, productId) => {
  const item = cart.find(item => item.id === productId);
  return item ? item.quantity : 0;
};