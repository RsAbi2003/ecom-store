
// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">E-Commerce Store</div>
        <Link href="/cart"legacyBehavior>
          <a className="text-white text-lg">Cart</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
