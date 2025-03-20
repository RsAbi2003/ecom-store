import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/cartcontext';
import { useWishlist } from '@/context/whishlistcontext';  // ✅ Import wishlist context
import Image from 'next/image';
import { Heart } from 'lucide-react';  // ✅ Import heart icon

// Product type definition
type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  quantity?: number;
};

// Product list
const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: '199.99', imageUrl: '/headphones.jpg', category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: '699.99', imageUrl: '/smartphone.jpg', category: 'Electronics' },
  { id: 3, name: 'Laptop', price: '999.99', imageUrl: '/laptop.jpg', category: 'Electronics' },
  { id: 4, name: 'Smart Watch', price: '149.99', imageUrl: '/smartwatch.jpg', category: 'Accessories' },

];

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>('');  // ✅ Search state

  // Filtering products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDoubleClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our E-Commerce Store</h1>

      {/* 🔎 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onDoubleClick={() => handleDoubleClick(product.id)}
            >
              <div className="relative w-full h-56">
                <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg text-blue-600">${product.price}</p>
                <p className="text-gray-500">Category: {product.category}</p>

                <div className="flex justify-between items-center mt-4">
                  {/* 🛒 Add to Cart Button */}
                  <button
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>

                  {/* ❤️ Heart Wishlist Icon */}
                  <Heart
                    onClick={() => addToWishlist(product.id)}
                    className={`w-7 h-7 cursor-pointer ${
                      wishlist.includes(product.id) ? 'text-pink-600' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
