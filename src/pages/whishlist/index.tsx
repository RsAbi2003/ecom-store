"use client";
import React from "react";
import { useWishlist } from "@/context/whishlistcontext";
import Link from "next/link";
import Image from "next/image";
import products from "@/data/product";
import { Heart } from "lucide-react";  // ✅ Import Heart icon

// ✅ Product type definition
type Product = {
  id: number;
  name: string;
  price: string | number;
  imageUrl: string;
  category: string;
};

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist() || { wishlist: [] };

  // ✅ Filter wishlist products
  const wishlistProducts = products
    .map((product) => ({
      ...product,
      price: product.price.toString(),
    }))
    .filter((product: Product) => wishlist.includes(product.id));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlistProducts.map((product: Product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border p-3 rounded-md shadow-sm"
              >
                {/* ✅ Smaller Image and Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={48}  // ✅ Smaller image width
                    height={48} // ✅ Smaller image height
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-md font-medium">{product.name}</h2>
                    <p className="text-gray-600 text-sm">₹{product.price}</p>
                  </div>
                </div>

                {/* ✅ Smaller Buttons */}
                <div className="flex gap-2 items-center">
                  {/* View Button */}
                  <Link href={`/product/${product.id}`}>
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                      View
                    </button>
                  </Link>

                  {/* Heart Toggle Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Heart
                      size={20}
                      className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"}
                      fill={wishlist.includes(product.id) ? "red" : "none"}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
