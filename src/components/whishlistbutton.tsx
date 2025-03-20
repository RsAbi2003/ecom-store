"use client";

import { useWishlist } from "@/context/whishlistcontext";
import { Heart, HeartOff } from "lucide-react";  // ✅ Added icons
import { useEffect, useState } from "react";

interface WishlistButtonProps {
  productId: number;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist.includes(productId));
  }, [wishlist, productId]);

  const handleToggleWishlist = () => {
    toggleWishlist(productId);
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
    >
      {isWishlisted ? (
        <Heart className="text-red-500" size={24} />
      ) : (
        <HeartOff className="text-gray-500" size={24} />
      )}
    </button>
  );
};

export default WishlistButton;
