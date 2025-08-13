import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Plus } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import QuickViewModal from './QuickViewModal';
import LoginPopup from './LoginPopup';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist } = useAuth();

  const [showQuickView, setShowQuickView] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(0); // Index of selected weight
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginAction, setLoginAction] = useState<string>('');

  const isInWishlist = user?.wishlist?.includes(product.id) || false;
  const selectedVariant = product.variants[selectedWeight];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setLoginAction('add products to cart');
      setShowLoginPopup(true);
      return;
    }
    
    if (selectedVariant.stock === 0) return;
    
    setIsAddingToCart(true);
    
    // Add to cart
    addToCart(product, selectedVariant.weight, 1);
    
    // Show success animation
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowAddedAnimation(true);
      
      // Hide success animation after 2 seconds
      setTimeout(() => {
        setShowAddedAnimation(false);
      }, 2000);
    }, 500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setLoginAction('add products to wishlist');
      setShowLoginPopup(true);
      return;
    }
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    const originalPrice = Math.max(...product.variants.map(v => v.price));
    const currentPrice = selectedVariant.price;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const hasDiscount = product.variants.some(v => v.price < Math.max(...product.variants.map(v => v.price)));

  return (
    <>
      <div className="group bg-gradient-to-b from-amber-50 via-orange-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-orange-100 relative transform hover:scale-105 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden p-6 pb-4">
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
          
          {/* Badges - Positioned horizontally at top with only 2 tags */}
          <div className="absolute top-8 left-8 right-8 flex justify-between">
            {/* Left tag - Show first badge or Bestseller */}
            {product.badges.length > 0 && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${
                product.badges[0] === 'Bestseller' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' :
                product.badges[0] === 'New' ? 'bg-green-500 text-white' :
                product.badges[0] === 'Spicy' ? 'bg-red-500 text-white' :
                product.badges[0] === 'Kids-friendly' ? 'bg-blue-500 text-white' :
                product.badges[0] === 'Traditional' ? 'bg-amber-500 text-white' :
                product.badges[0] === 'Premium' ? 'bg-purple-500 text-white' :
                product.badges[0] === 'Featured' ? 'bg-purple-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {product.badges[0] === 'Featured' ? '★ FEATURED' : product.badges[0]}
              </span>
            )}
            
            {/* Right tag - Show discount or second badge */}
            {hasDiscount ? (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                {calculateDiscount()}% OFF
              </span>
            ) : product.badges.length > 1 ? (
              <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${
                product.badges[1] === 'Bestseller' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' :
                product.badges[1] === 'New' ? 'bg-green-500 text-white' :
                product.badges[1] === 'Spicy' ? 'bg-red-500 text-white' :
                product.badges[1] === 'Kids-friendly' ? 'bg-blue-500 text-white' :
                product.badges[1] === 'Traditional' ? 'bg-amber-500 text-white' :
                product.badges[1] === 'Premium' ? 'bg-purple-500 text-white' :
                product.badges[1] === 'Featured' ? 'bg-purple-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {product.badges[1] === 'Featured' ? '★ FEATURED' : product.badges[1]}
              </span>
            ) : null}
          </div>
          
          {/* Wishlist Button */}
          {user && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute bottom-8 right-8 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isInWishlist 
                  ? 'bg-[#D13F4A] text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-[#D13F4A] hover:text-white shadow-md'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current animate-pulse' : ''}`} />
            </button>
          )}

          {/* Stock Status */}
          {selectedVariant.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="px-6 pb-6 flex-1 flex flex-col">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-bold text-gray-800 mb-2 hover:text-[#D13F4A] transition-colors line-clamp-2 text-xl">
              {product.name}
            </h3>
          </Link>
          


          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2 font-medium">
              ({product.rating})
            </span>
          </div>

          {/* Weight Options */}
          <div className="flex gap-2 mb-4">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedWeight(index)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedWeight === index
                    ? 'bg-[#D13F4A] text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {variant.weight}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-semibold">Starting from</span>
              <span className="text-xl font-bold text-[#D13F4A]">
                ₹{selectedVariant.price}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{Math.max(...product.variants.map(v => v.price))}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={selectedVariant.stock === 0 || isAddingToCart}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                showAddedAnimation
                  ? 'bg-green-500 text-white scale-105 animate-success-pulse'
                  : isAddingToCart
                  ? 'bg-[#D13F4A] text-white scale-105'
                  : selectedVariant.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#D13F4A] hover:bg-[#B8363F] text-white hover:scale-105 hover:shadow-lg'
              }`}
            >
              {showAddedAnimation ? (
                <>
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-green-500" />
                  </div>
                  <span>Added!</span>
                </>
              ) : isAddingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {selectedVariant.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </span>
                </>
              )}
            </button>
            
            <button
              onClick={handleQuickView}
              className="bg-white border-2 border-[#D13F4A] text-[#D13F4A] hover:bg-[#D13F4A] hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        action={loginAction}
      />
    </>
  );
};

export default ProductCard;