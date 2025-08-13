import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, X, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = user?.orders?.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  ) || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="page-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sign in to view your orders
            </h2>
            <p className="text-gray-600 mb-8">
              Track your orders and view order history by signing in to your account.
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
              <Package className="w-8 h-8 mr-3 text-[#D13F4A]" />
              My Orders
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </p>
          </div>
          <Link
            to="/account"
            className="flex items-center text-gray-600 hover:text-[#D13F4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-6 inline-flex">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: 'Pending' },
            { key: 'confirmed', label: 'Confirmed' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === filter.key
                  ? 'bg-[#D13F4A] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
            </h2>
            <p className="text-gray-600 mb-8">
              {filterStatus === 'all' 
                ? "You haven't placed any orders yet. Start shopping to see your orders here."
                : `You don't have any ${filterStatus} orders at the moment.`
              }
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="flex items-center space-x-1 text-[#D13F4A] hover:text-[#B8363F] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium text-gray-800 ml-2">₹{order.total}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium text-gray-800 ml-2">{order.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium text-gray-800 ml-2">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </span>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Tracking Number: {order.trackingNumber}
                          </p>
                          <p className="text-xs text-blue-600">
                            Track your order status and delivery updates
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Track Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                {selectedOrder === order.id && (
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800 text-sm">
                                  {item.productName}
                                </h5>
                                <p className="text-xs text-gray-600">
                                  {item.variant} × {item.quantity}
                                </p>
                              </div>
                              <span className="font-medium text-gray-800 text-sm">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">Delivery Address</h4>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-medium text-gray-800 mb-1">
                            {order.address.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.address.addressLine1}
                            {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                            <br />
                            {order.address.city}, {order.address.state} - {order.address.pincode}
                            <br />
                            Phone: {order.address.phone}
                          </p>
                        </div>

                        {/* Order Actions */}
                        <div className="mt-6 space-y-2">
                          {order.status === 'delivered' && (
                            <button className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                              Reorder Items
                            </button>
                          )}
                          {(order.status === 'pending' || order.status === 'confirmed') && (
                            <button className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                              Cancel Order
                            </button>
                          )}
                          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;