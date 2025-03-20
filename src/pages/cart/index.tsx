"use client";

import { useCart } from "@/context/cartcontext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isClient, setIsClient] = useState(false);

  // ✅ Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/" className="text-blue-500 underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6 border rounded-lg shadow-lg"
            >
              <div className="flex items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div className="ml-6">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg text-gray-600">{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
