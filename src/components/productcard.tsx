import React from 'react';
import { useWishlist } from '@/context/whishlistcontext';
import { Heart } from 'lucide-react';  // ✅ Heart icon for wishlist

interface ProductCardProps {
  id: number;                   // ✅ Change `id` to `number`
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const isInWishlist = wishlist.includes(id);  // ✅ Check if ID exists in the wishlist

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(id);  // ✅ Remove by ID
    } else {
      addToWishlist(id);       // ✅ Add by ID
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-500">${price}</p>

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleWishlist}
          className={`px-4 py-2 text-white rounded ${
            isInWishlist ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>

        {/* Heart Icon for Wishlist */}
        <Heart
          onClick={handleWishlist}
          className={`w-6 h-6 cursor-pointer ${
            isInWishlist ? 'text-red-500' : 'text-gray-400'
          }`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
