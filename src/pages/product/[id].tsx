import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/cartcontext';
import { useWishlist } from '@/context/whishlistcontext';  
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';  

type Review = {
  rating: number;
  comment: string;
  date: string;
};

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  quantity?: number;
};

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: '199.99', imageUrl: '/headphones.jpg', category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: '699.99', imageUrl: '/smartphone.jpg', category: 'Electronics' },
  { id: 3, name: 'Laptop', price: '999.99', imageUrl: '/laptop.jpg', category: 'Electronics' },
  { id: 4, name: 'Smart Watch', price: '149.99', imageUrl: '/smartwatch.jpg', category: 'Accessories' },
];

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find((p) => p.id === Number(id));

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  // ⭐ Load Reviews from Local Storage
  useEffect(() => {
    if (id) {
      const storedReviews = localStorage.getItem(`reviews-${id}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [id]);

  // ⭐ Handle Review Submission
  const handleReviewSubmit = () => {
    if (rating === 0 || !comment.trim()) {
      alert('Please add a rating and a comment.');
      return;
    }

    const newReview: Review = {
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Save reviews in Local Storage
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    // Clear form
    setRating(0);
    setComment('');
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex gap-8">
        {/* Product Image */}
        <div className="w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-xl text-blue-600 mt-2">${product.price}</p>
          <p className="text-gray-600">Category: {product.category}</p>

          <div className="flex items-center gap-4 mt-4">
            {/* Add to Cart */}
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {/* Heart Wishlist Icon */}
            <Heart
              onClick={() => addToWishlist(product.id)}
              className={`w-7 h-7 cursor-pointer ${
                wishlist.includes(product.id) ? 'text-pink-600' : 'text-gray-400'
              }`}
            />
          </div>

          {/* ⭐ Review Form */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 cursor-pointer ${
                    rating >= star ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 border rounded-lg mb-4"
            />

            <button
              onClick={handleReviewSubmit}
              className="py-2 px-6 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Review
            </button>
          </div>

           <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ); {/* ⭐ Display Reviews */}
        
};

export default ProductPage;
