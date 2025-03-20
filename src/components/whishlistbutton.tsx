"use client";
import { useWishlist } from "@/context/whishlistcontext"; // ✅ Ensure this path is correct
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, className }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = Array.isArray(wishlist) ? wishlist.includes(productId) : false;

  return (
    <Button
      variant="ghost"
      onClick={() => toggleWishlist(productId)}
      className={clsx("p-2", className)} // ✅ Apply dynamic class
    >
      <Heart
        size={24}
        className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
    </Button>
  );
};

export default WishlistButton;