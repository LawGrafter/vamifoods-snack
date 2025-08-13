import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Package, Home, ShoppingBag, Info, Phone, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import { searchProducts } from '../data/products';
import SearchSuggestions from './SearchSuggestions';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const [language, setLanguage] = useState<'english' | 'hindi' | 'hyderabadi'>('english');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#204C13] text-white py-2 px-4 text-sm text-center">
        <p>Free Shipping on Orders Above ₹500 | Call Us: +91 9876543210</p>
      </div>

      <div className="page-container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.webp" 
              alt="Vamifoods Logo" 
              className="w-32 h-32 object-contain -my-6"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                // Fallback to text logo if image fails
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-32 h-32 bg-[#D13F4A] rounded-full flex items-center justify-center -my-6';
                fallback.innerHTML = '<span class="text-white font-bold text-4xl">V</span>';
                e.currentTarget.parentNode.insertBefore(fallback, e.currentTarget);
              }}
            />

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            <Link to="/" className="text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <div className="group relative">
              <Link to="/shop" className="text-gray-700 hover:text-[#D13F4A] transition-colors flex items-center space-x-2 font-bold">
                <ShoppingBag className="w-5 h-5" />
                <span>Shop</span>
              </Link>
                             <div className="absolute top-full -left-20 bg-white shadow-2xl rounded-2xl p-8 w-[1200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">

                
                {/* All Categories in One Row */}
                <div className="grid grid-cols-4 gap-4">
                  <Link to="/shop/snacks" className="group/item bg-white rounded-xl p-4 hover:bg-orange-50 transition-all duration-300 border-2 border-transparent hover:border-orange-200 hover:shadow-lg transform hover:-translate-y-1">
                    <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover/item:text-[#D13F4A] transition-colors">Snacks</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Traditional crispy snacks like chekkalu, chips, and namkeen made with authentic recipes.</p>
                    <div className="flex items-center text-[#D13F4A] font-semibold group-hover/item:text-[#B8353F] transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link to="/shop/powders" className="group/item bg-white rounded-xl p-4 hover:bg-green-50 transition-all duration-300 border-2 border-transparent hover:border-green-200 hover:shadow-lg transform hover:-translate-y-1">
                    <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover/item:text-[#D13F4A] transition-colors">Powders</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Aromatic spice powders and masalas that bring authentic Hyderabadi flavors to your dishes.</p>
                    <div className="flex items-center text-[#D13F4A] font-semibold group-hover/item:text-[#B8353F] transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link to="/shop/sweets" className="group/item bg-white rounded-xl p-4 hover:bg-pink-50 transition-all duration-300 border-2 border-transparent hover:border-pink-200 hover:shadow-lg transform hover:-translate-y-1">
                    <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover/item:text-[#D13F4A] transition-colors">Sweets</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Traditional Indian sweets and desserts made with pure ingredients and age-old recipes.</p>
                    <div className="flex items-center text-[#D13F4A] font-semibold group-hover/item:text-[#B8353F] transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link to="/shop/pickles" className="group/item bg-white rounded-xl p-4 hover:bg-purple-50 transition-all duration-300 border-2 border-transparent hover:border-purple-200 hover:shadow-lg transform hover:-translate-y-1">
                    <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover/item:text-[#D13F4A] transition-colors">Pickles</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Tangy and spicy pickles made with fresh vegetables and traditional spices for authentic taste.</p>
                    <div className="flex items-center text-[#D13F4A] font-semibold group-hover/item:text-[#B8353F] transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>
            <Link to="/bulk-orders" className="text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Bulk Orders</span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#D13F4A]"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#D13F4A]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            {showSuggestions && searchQuery && (
              <SearchSuggestions
                query={searchQuery}
                onSelect={() => {
                  setShowSuggestions(false);
                  setSearchQuery('');
                }}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="p-2 text-gray-700 hover:text-[#D13F4A] transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
              
              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-64 py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-800">Hello, {user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      <Link
                        to="/account/orders"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        <Package className="w-4 h-4 mr-3" />
                        My Orders
                      </Link>
                      <Link
                        to="/account/wishlist"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-[#D13F4A] transition-colors rounded-lg hover:bg-gray-50"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium capitalize">{language}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px] z-50">
                  <button
                    onClick={() => handleLanguageChange('english')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      language === 'english' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hindi')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      language === 'hindi' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700'
                    }`}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hyderabadi')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      language === 'hyderabadi' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700'
                    }`}
                  >
                    حیدرآبادی
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/account/wishlist"
                className="p-2 text-gray-700 hover:text-[#D13F4A] transition-colors relative"
              >
                <Heart className="w-6 h-6" />
                {user?.wishlist && user.wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D13F4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {user.wishlist.length}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-[#D13F4A] transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D13F4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-[#D13F4A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-6 relative">
          <form onSubmit={handleSearch} className="relative max-w-sm mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#D13F4A]"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#D13F4A]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          {showSuggestions && searchQuery && (
            <SearchSuggestions
              query={searchQuery}
              onSelect={() => {
                setShowSuggestions(false);
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </div>

              {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="page-container py-6 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop</span>
            </Link>
                          <div className="pl-4 space-y-2">
                <Link
                  to="/shop/snacks"
                  className="block text-gray-600 hover:text-[#D13F4A] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Snacks
                </Link>
                <Link
                  to="/shop/powders"
                  className="block text-gray-600 hover:text-[#D13F4A] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Powders
                </Link>
                <Link
                  to="/shop/sweets"
                  className="block text-gray-600 hover:text-[#D13F4A] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sweets
                </Link>
                <Link
                  to="/shop/pickles"
                  className="block text-gray-600 hover:text-[#D13F4A] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pickles
                </Link>
              </div>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>
            <Link
              to="/bulk-orders"
              className="block text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span>Bulk Orders</span>
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-[#D13F4A] transition-colors font-bold flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </Link>
            
                            {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold">Language</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleLanguageChange('english')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                        language === 'english' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hindi')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                        language === 'hindi' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      हिंदी
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hyderabadi')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                        language === 'hyderabadi' ? 'text-[#D13F4A] font-semibold bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      حیدرآبادی
                    </button>
                  </div>
                </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;