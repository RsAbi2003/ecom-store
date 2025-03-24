import React from "react";
import { useCart } from "@/context/cartcontext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-md shadow-sm"
              >
                {/* ✅ Smaller Image and Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <h2 className="text-md font-medium">{item.name}</h2>
                    <p className="text-gray-600 text-sm">${item.price}</p>
                  </div>
                </div>

                {/* ✅ Smaller Buttons */}
                <div className="flex gap-2 items-center">
                  <Link href={`/product/${item.id}`}>
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
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

export default CartPage;
