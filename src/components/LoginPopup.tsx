import React from 'react';
import { Link } from 'react-router-dom';
import { X, LogIn, User } from 'lucide-react';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  action?: string;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, action = "continue" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D13F4A] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Login Required</h3>
              <p className="text-sm text-gray-600">Please sign in to {action}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D13F4A] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Sign in to your account
            </h4>
            <p className="text-gray-600">
              Login to add products to cart, wishlist, and enjoy a personalized shopping experience.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/login"
              onClick={onClose}
              className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login Now</span>
            </Link>
            
            <Link
              to="/register"
              onClick={onClose}
              className="w-full border-2 border-[#D13F4A] text-[#D13F4A] hover:bg-[#D13F4A] hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Create Account</span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" onClick={onClose} className="text-[#D13F4A] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
