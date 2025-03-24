"use client"; // This file needs to be a client component
import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from '@/components/Footer';  // ✅ Import Footer

// Define the layout structure
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">   {/* ✅ Use flex layout */}
      {/* Header Section */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        {/* <aside className="w-1/4 p-4 bg-gray-100">  ✅ Sidebar styling */}
          {/* <ul> */}
            {/* <li><Link href="/products">Products</Link></li> */}
            {/* <li><Link href="/about">About Us</Link></li> */}
          {/* </ul> */}
        {/* </aside> */}

        {/* Page content goes here */}
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>

      {/* ✅ Footer Section */}
      <Footer />  
    </div>
  );
};

export default Layout;
