import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Plus, Minus, ArrowLeft, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Check, Award, Clock, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import LoginPopup from '../components/LoginPopup';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { user, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginAction, setLoginAction] = useState<string>('');

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setIsWishlisted(user?.wishlist?.includes(foundProduct.id) || false);
    } else {
      navigate('/shop');
    }
  }, [slug, navigate, user?.wishlist]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D13F4A] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      setLoginAction('add products to cart');
      setShowLoginPopup(true);
      return;
    }
    
    const selectedVariantData = product.variants[selectedVariant];
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: product,
        variant: selectedVariantData.weight,
        quantity
      }
    });
    
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      setLoginAction('add products to wishlist');
      setShowLoginPopup(true);
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
    setIsWishlisted(!isWishlisted);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const selectedVariantData = product.variants[selectedVariant];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="page-container py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#D13F4A] transition-colors">Home</Link>
            <span className="text-orange-300">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-[#D13F4A] transition-colors">Shop</Link>
            <span className="text-orange-300">/</span>
            <Link to={`/shop/${product.category}`} className="text-gray-500 hover:text-[#D13F4A] transition-colors capitalize">
              {product.category}
            </Link>
            <span className="text-orange-300">/</span>
            <span className="text-[#D13F4A] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="page-container py-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnails - Left Side */}
            {product.images.length > 1 && (
              <div className="flex flex-col gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-[#D13F4A] scale-105 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
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

            {/* Main Image */}
            <div className="relative group flex-1">
              <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-[#D13F4A] text-white' 
                    : 'bg-white text-gray-600 hover:bg-[#D13F4A] hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Product Info */}
          <div className="space-y-4">
            {/* Product Title & Description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
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
                <span className="text-gray-700 font-medium ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({product.reviewCount} ratings)</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                selectedVariantData.stock > 0 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {selectedVariantData.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600">Starting from</span>
                  <div className="text-3xl font-bold text-[#D13F4A]">
                    ₹{selectedVariantData.price}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Available in</span>
                  <div className="text-base font-semibold text-gray-800">{product.variants.length} sizes</div>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">Choose Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      selectedVariant === index
                        ? 'border-[#D13F4A] bg-[#D13F4A] text-white'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${selectedVariant === index ? 'text-white' : 'text-gray-800'}`}>
                        {variant.weight}
                      </div>
                      <div className={`text-base font-bold ${selectedVariant === index ? 'text-white' : 'text-[#D13F4A]'}`}>
                        ₹{variant.price}
                      </div>
                      <div className={`text-xs ${selectedVariant === index ? 'text-white/80' : 'text-gray-500'}`}>
                        {variant.stock} left
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Total */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-2 font-medium text-gray-800 bg-white border-x border-gray-300 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-xl font-bold text-[#D13F4A]">
                    ₹{(selectedVariantData.price * quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedVariantData.stock === 0}
                  className={`py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                    showAddedAnimation
                      ? 'bg-green-500 text-white'
                      : selectedVariantData.stock > 0
                      ? 'bg-[#D13F4A] text-white hover:bg-[#B8353E]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {showAddedAnimation ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-5 h-5" />
                      <span>Added!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (!user) {
                      setLoginAction('buy products');
                      setShowLoginPopup(true);
                      return;
                    }
                    navigate('/checkout', { 
                      state: { 
                        product: product, 
                        variant: selectedVariantData.weight, 
                        quantity: quantity 
                      } 
                    });
                  }}
                  disabled={selectedVariantData.stock === 0}
                  className={`py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                    selectedVariantData.stock > 0
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Buy Now</span>
                  </div>
                </button>
              </div>

            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <Leaf className="w-4 h-4 text-green-600" />
                <div>
                  <div className="font-medium text-green-800 text-sm">Vegetarian</div>
                  <div className="text-xs text-green-600">100% Plant-based</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800 text-sm">Shelf Life</div>
                  <div className="text-xs text-blue-600">{product.shelfLife}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Ingredients */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-amber-50 text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition Highlights */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Nutrition Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.nutritionHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best With */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Best Enjoyed With</h3>
                <div className="flex flex-wrap gap-2">
                  {product.bestWith.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-orange-50 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Storage Instructions</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">{product.storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Login Popup */}
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          action={loginAction}
        />
      </div>
    </div>
  );
};

export default ProductDetail;