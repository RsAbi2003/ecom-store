import Link from 'next/link';
import Image from 'next/image';

const products = [
  { id: 1, name: 'Wireless Headphones', price: '199.99', imageUrl: '/headphones.jpg' },
  { id: 2, name: 'Smartphone', price: '699.99', imageUrl: '/smartphone.jpg' },
  { id: 3, name: 'Laptop', price: '999.99', imageUrl: '/laptop.jpg' },
  { id: 4, name: 'Smart Watch', price: '149.99', imageUrl: '/smartwatch.jpg' },
];

const Home = () => {
  
  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our E-Commerce Store</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-lg text-blue-600 mt-2">
                ${parseFloat(product.price).toFixed(2)}
              </p>

              {/* Link to Product Details */}
              <Link href={`/product/${product.id}`} legacyBehavior>
                <a className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
