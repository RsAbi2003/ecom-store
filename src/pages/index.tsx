"use client"
 import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Import } from "lucide-react";

export default function Home() {
  const router=useRouter()
  return (
    <main   className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-12"
    style={{
      backgroundImage: "url('/background.jpg')", // Add your image in public folder
    }}>
    <div>
      {/* Overlay for better readability */}
      <div className="absolute inset-0  bg-opacity-8"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-violet-400">EcomStore</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover the best deals on the latest products. Shop now and enjoy amazing discounts!
        </p>

        {/* CTA Button */}
       
        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-orange-600 transition"
    onClick={()=>router.push('/product')}
    >
      shopping 
    </button>
    
      </div>
    </div>
    </main>
  );
}