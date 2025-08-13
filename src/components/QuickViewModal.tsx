import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginPopup from './LoginPopup';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].weight);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginAction, setLoginAction] = useState<string>('');

  const currentVariant = product.variants.find(v => v.weight === selectedVariant) || product.variants[0];
  const isInWishlist = user?.wishlist?.includes(product.id) || false;

  const handleAddToCart = async () => {
    if (!user) {
      setLoginAction('add products to cart');
      setShowLoginPopup(true);
      return;
    }
    
    setIsAddingToCart(true);
    try {
      addToCart(product, selectedVariant, quantity);
      // Add success animation
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    } catch (error) {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
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



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-[#D13F4A]' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Badges */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
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
              </div>

              {/* Product Name & Tagline */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">{product.tagline}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium text-gray-800">
                  {product.rating}
                </span>
                <span className="text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>



              {/* Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{currentVariant.price}
                  </span>
                  {currentVariant.stock < 10 && currentVariant.stock > 0 && (
                    <span className="text-sm text-orange-600 font-medium">
                      Only {currentVariant.stock} left
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Price for {selectedVariant} pack
                </p>
              </div>

              {/* Variant Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Choose Size:
                </h3>
                <div className="flex space-x-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.weight}
                      onClick={() => setSelectedVariant(variant.weight)}
                      disabled={variant.stock === 0}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedVariant === variant.weight
                          ? 'border-[#D13F4A] bg-[#D13F4A] text-white transform scale-105'
                          : 'border-gray-300 text-gray-700 hover:border-[#D13F4A] hover:scale-105'
                      } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="font-medium">{variant.weight}</span>
                      <span className="block text-sm">₹{variant.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity >= currentVariant.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={currentVariant.stock === 0 || isAddingToCart}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    currentVariant.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isAddingToCart
                      ? 'bg-green-500 text-white transform scale-105'
                      : 'bg-[#D13F4A] hover:bg-[#B8363F] text-white hover:scale-105'
                  }`}
                >
                  <ShoppingCart className={`w-5 h-5 ${isAddingToCart ? 'animate-bounce' : ''}`} />
                  <span>
                    {isAddingToCart ? 'Added!' : currentVariant.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </span>
                </button>

                {/* Wishlist */}
                {user && (
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                      isInWishlist 
                        ? 'border-[#D13F4A] bg-[#D13F4A] text-white' 
                        : 'border-gray-300 text-gray-600 hover:border-[#D13F4A]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current animate-pulse' : ''}`} />
                  </button>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-[#204C13]" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#204C13]" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Quality Assured</p>
                    <p className="text-xs text-gray-600">Premium ingredients</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Ingredients</h3>
                <p className="text-gray-600 text-sm">
                  {product.ingredients.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        action={loginAction}
      />
    </div>
  );
};

export default QuickViewModal;