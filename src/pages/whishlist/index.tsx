"use client";

import { useWishlist } from "@/context/whishlistcontext";
import Layout from "@/components/layout";
import Image from "next/image";
import products from "@/data/product";

// ✅ Define the Product type to accept string | number
type Product = {
  id: number;
  name: string;
  price: string | number;  // ✅ Allow both string and number
  imageUrl: string;
  category: string;
};

const WishlistPage = () => {
  const { wishlist } = useWishlist() || { wishlist: [] };

  // ✅ Filter and cast price to string
  const wishlistProducts = products
    .map((product) => ({
      ...product,
      price: product.price.toString()  // ✅ Cast price to string
    }))
    .filter((product: Product) => wishlist.includes(product.id));

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-10">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product: Product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
                <p className="text-xl font-semibold mt-2">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
