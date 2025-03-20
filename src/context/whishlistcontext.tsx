"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";  // ✅ Import toast for notifications

// ✅ Define Wishlist Item Type
export type WishlistItem = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
};

// ✅ Define Wishlist Context Type
interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
}

// ✅ Create Wishlist Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ✅ Provider Component
export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    }
    return [];
  });

  // ✅ Save wishlist to local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Add to Wishlist with Toast Notification
  const addToWishlist = (id: number) => {
    if (!wishlist.includes(id)) {
      setWishlist((prev) => [...prev, id]);
      toast.success("Added to Wishlist! ✅");
    } else {
      toast.info("Already in Wishlist!");
    }
  };

  // ✅ Remove from Wishlist with Toast Notification
  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
    toast.error("Removed from Wishlist ❌");
  };

  // ✅ Toggle Wishlist (Add/Remove)
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom Hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
