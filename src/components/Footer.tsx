import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© {new Date().getFullYear()} Ecommerce Store. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
