import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';  // ✅ Import icons

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">E-Commerce Store</div>
        
        <div className="flex gap-4 items-center">
          {/* 🛒 Cart Link with Icon */}
          <Link href="/cart" className="flex items-center text-white text-lg hover:underline">
            <ShoppingCart className="w-5 h-5 mr-1" /> Cart
          </Link>

          {/* ❤️ Wishlist Link with Heart Icon */}
          <Link href="/whishlist" className="flex items-center text-white text-lg hover:underline">
            <Heart className="w-5 h-5 mr-1" /> Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
