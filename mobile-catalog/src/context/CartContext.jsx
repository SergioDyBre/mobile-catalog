import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredCart, saveStoredCart } from '../utils/cartStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getStoredCart());

  useEffect(() => {
    saveStoredCart(cartItems);
  }, [cartItems]);

  const addToCart = (item) => {
    const lineId = `${item.id}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        ...item,
        lineId,
      },
    ]);
  };

  const removeFromCart = (lineId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.lineId !== lineId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}