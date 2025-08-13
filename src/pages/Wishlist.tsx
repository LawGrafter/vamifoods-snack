import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Wishlist: React.FC = () => {
  const { user, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter(product => 
    user?.wishlist?.includes(product.id)
  );

  const handleAddToCart = (product: any) => {
    addToCart(product, product.variants[0].weight, 1);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="page-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sign in to view your wishlist
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite products and access them anytime by signing in to your account.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-[#D13F4A]" />
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-1">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center text-gray-600 hover:text-[#D13F4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist. They'll appear here for easy access.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          badge === 'Bestseller' ? 'bg-[#D13F4A] text-white' :
                          badge === 'New' ? 'bg-green-500 text-white' :
                          badge === 'Spicy' ? 'bg-red-500 text-white' :
                          badge === 'Kids-friendly' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Stock Status */}
                  {product.variants[0].stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 mb-1 hover:text-[#D13F4A] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {product.tagline}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{product.variants[0].price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.variants[0].weight})
                      </span>
                    </div>
                    {product.variants[0].stock < 10 && product.variants[0].stock > 0 && (
                      <span className="text-xs text-orange-600">
                        Only {product.variants[0].stock} left
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.variants[0].stock === 0}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        product.variants[0].stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#D13F4A] hover:bg-[#B8363F] text-white'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>
                        {product.variants[0].stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Products */}
        {wishlistProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => !user?.wishlist?.includes(p.id))
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-800 mb-1 hover:text-[#D13F4A] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.tagline}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">
                          ₹{product.variants[0].price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#D13F4A] hover:bg-[#B8363F] text-white p-2 rounded-lg transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;