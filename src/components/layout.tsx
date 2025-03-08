"use client"; // This file needs to be a client component

import React from "react";
import Link from "next/link";
// import "./styles/globals.css"; // Add global styles for your layout here
import Navbar from "./Navbar";

// Define the layout structure
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      {/* Header Section */}
      
      <Navbar />
      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><Link href="/products" legacyBehavior>Products</Link></li>
            <li><Link href="/about" legacyBehavior>About Us</Link></li>
          </ul>
        </aside>

        {/* Page content goes here */}
        <main className="content">{children}</main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 E-Commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;