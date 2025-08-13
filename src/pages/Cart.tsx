import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const shipping = state.total > 500 ? 0 : 50;
  const tax = Math.round(state.total * 0.18);
  const finalTotal = state.total + shipping + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="page-container py-12">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Start Shopping
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
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#D13F4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.product.slug}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="block font-semibold text-gray-800 hover:text-[#D13F4A] mb-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.product.tagline}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Size: {item.variant}</span>
                      <span>₹{item.price} each</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {item.quantity} × ₹{item.price}
                  </span>
                  <span className="font-semibold text-lg text-gray-800">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{state.total}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping
                    {state.total > 500 && (
                      <span className="text-green-600 text-sm ml-1">(Free)</span>
                    )}
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-gray-800">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {state.total < 500 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Add ₹{500 - state.total} more to get free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-[#D13F4A] hover:underline mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;