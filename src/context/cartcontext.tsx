// context/cartcontext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for products in the cart
type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

type CartContextType = {
  cart: Product[];
  addCart: (product: Product) => void;
  removeCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap the entire app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
