import Image from 'next/image';
import { useRouter } from "next/router";

// Example product data (you can fetch this from an API in real-world scenarios)
const products = [
  { id: 1, name: 'Wireless Headphones', price: '199.99', description: 'High quality wireless headphones with noise-cancelling features.', imageUrl: '/headphones.jpg' },
  { id: 2, name: 'Smartphone', price: '699.99', description: 'Latest smartphone with 5G connectivity and stunning camera.', imageUrl: '/smartphone.jpg' },
  { id: 3, name: 'Laptop', price: '999.99', description: 'Powerful laptop with high-end specs for gaming and productivity.', imageUrl: '/laptop.jpg' },
  { id: 4, name: 'Smart Watch', price: '149.99', description: 'Stylish smartwatch with fitness tracking and heart-rate monitor.', imageUrl: '/smartwatch.jpg' },
];

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from URL

  // Find the product by ID
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Replace <img> with <Image> */}
        <div className="relative w-full h-80">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-blue-600 mt-2">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
