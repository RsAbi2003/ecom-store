"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;  // ✅ Add toggleWishlist
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.includes(id) ? prev : [...prev, id];

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }

      return updatedWishlist;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item !== id);

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }

      return updatedWishlist;
    });
  };

  // ✅ Toggle function (add/remove logic combined)
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }

      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
