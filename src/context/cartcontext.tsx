"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  // ✅ Ensure cart items are only fetched on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      const updatedCart = existingItem
        ? prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevItems, { ...item, quantity: 1 }];

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });

    router.push("/cart");
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
