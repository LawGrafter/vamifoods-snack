import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react';

const OrderPlaced: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will start processing your order shortly.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Number</h3>
                <p className="text-gray-600 font-mono">{orderId}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Estimated Delivery</h3>
                <p className="text-gray-600">3-5 business days</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Date</h3>
                <p className="text-gray-600">{new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Payment Status</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-left">
              Order Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Your order has been placed successfully</p>
                </div>
                <span className="text-sm text-gray-500">Just now</span>
              </div>

              <div className="flex items-center space-x-4 opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your order</p>
                </div>
                <span className="text-sm text-gray-500">1-2 days</span>
              </div>

              <div className="flex items-center space-x-4 opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Shipped</p>
                  <p className="text-sm text-gray-600">Your order is on the way</p>
                </div>
                <span className="text-sm text-gray-500">2-3 days</span>
              </div>

              <div className="flex items-center space-x-4 opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Delivered</p>
                  <p className="text-sm text-gray-600">Order delivered to your address</p>
                </div>
                <span className="text-sm text-gray-500">3-5 days</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-2 text-left">
              <li>• You'll receive an order confirmation email shortly</li>
              <li>• We'll send you tracking information once your order ships</li>
              <li>• Your order will be delivered within 3-5 business days</li>
              <li>• You can track your order status in your account</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/account/orders"
              className="inline-flex items-center justify-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Order
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center border-2 border-[#D13F4A] text-[#D13F4A] hover:bg-[#D13F4A] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Need help with your order?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="text-[#D13F4A] hover:underline font-medium"
              >
                Contact Support
              </Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a
                href="tel:+919876543210"
                className="text-[#D13F4A] hover:underline font-medium"
              >
                Call: +91 9876543210
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a
                href="mailto:hello@vamifoods.com"
                className="text-[#D13F4A] hover:underline font-medium"
              >
                Email: hello@vamifoods.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;