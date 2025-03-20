import Link from "next/link";
import Layout from "@/components/layout";
import React from 'react';
import ImageCarousel from "@/components/imagecarousel";



export default function Home() {
  return (
    <Layout>
     
      <div className="container mx-auto p-4">
        <ImageCarousel />
      
    </div>
    </Layout>
  );
}