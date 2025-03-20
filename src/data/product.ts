type Product = {
  id: number;
  name: string;
  price: string | number;  // ✅ Allow both string and number types
  imageUrl: string;
  category: string;
};

  
  
  export const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: '199.99', imageUrl: '/headphones.jpg', category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: '699.99', imageUrl: '/smartphone.jpg', category: 'Electronics' },
    { id: 3, name: 'Laptop', price: '999.99', imageUrl: '/laptop.jpg', category: 'Electronics' },
    { id: 4, name: 'Smart Watch', price: '149.99', imageUrl: '/smartwatch.jpg', category: 'Accessories' },
    { id: 5, name: 'Backpack', price: '59.99', imageUrl: '/backpack.jpg', category: 'Fashion' },

    
  ];

  
  export default products;