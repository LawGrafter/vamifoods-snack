import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state: cartState, clearCart } = useCart();
  const { user, addAddress, addOrder } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses?.find(addr => addr.isDefault)?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const shipping = cartState.total > 500 ? 0 : 50;
  const tax = Math.round(cartState.total * 0.18);
  const finalTotal = cartState.total + shipping + tax - discount;

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.addressLine1 && 
        newAddress.city && newAddress.state && newAddress.pincode) {
      addAddress(newAddress);
      setShowAddAddress(false);
      setNewAddress({
        name: user?.name || '',
        phone: user?.phone || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
    }
  };

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(Math.round(cartState.total * 0.1));
    } else if (couponCode.toLowerCase() === 'first50') {
      setDiscount(50);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedAddr = user.addresses.find(addr => addr.id === selectedAddress);
      
      const orderData = {
        status: 'confirmed' as const,
        items: cartState.items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price
        })),
        total: finalTotal,
        address: selectedAddr!,
        paymentMethod: paymentMethod === 'upi' ? 'UPI' : 
                      paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking',
        trackingNumber: `VF${Date.now()}`
      };

      addOrder(orderData);
      clearCart();
      navigate('/order-placed', { state: { orderId: orderData.trackingNumber } });
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartState.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
            <p className="text-gray-600 mt-1">Complete your order</p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-[#D13F4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-[#D13F4A] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#D13F4A]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-[#D13F4A] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#D13F4A]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-[#D13F4A] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Address
                </h2>
                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#D13F4A] hover:underline text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  {user?.addresses?.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-[#D13F4A] bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="radio"
                              checked={selectedAddress === address.id}
                              onChange={() => setSelectedAddress(address.id)}
                              className="text-[#D13F4A] focus:ring-[#D13F4A]"
                            />
                            <span className="font-medium text-gray-800">{address.name}</span>
                            {address.isDefault && (
                              <span className="bg-[#D13F4A] text-white text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm ml-6">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                            <br />
                            {address.city}, {address.state} - {address.pincode}
                            <br />
                            Phone: {address.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!showAddAddress ? (
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-[#D13F4A] hover:text-[#D13F4A] transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Address
                    </button>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-800 mb-4">Add New Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] md:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                          value={newAddress.addressLine2}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] md:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        />
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <button
                          onClick={handleAddAddress}
                          className="bg-[#D13F4A] hover:bg-[#B8363F] text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Save Address
                        </button>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="text-gray-600 hover:text-gray-800 px-4 py-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedAddress}
                    className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step > 1 && selectedAddress && (
                <div className="text-sm text-gray-600">
                  {(() => {
                    const addr = user?.addresses?.find(a => a.id === selectedAddress);
                    return addr ? `${addr.name}, ${addr.addressLine1}, ${addr.city}, ${addr.state} - ${addr.pincode}` : '';
                  })()}
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            {step >= 2 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h2>
                  {step > 2 && (
                    <button
                      onClick={() => setStep(2)}
                      className="text-[#D13F4A] hover:underline text-sm"
                    >
                      Change
                    </button>
                  )}
                </div>

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'upi'
                            ? 'border-[#D13F4A] bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="text-[#D13F4A] focus:ring-[#D13F4A]"
                          />
                          <div>
                            <p className="font-medium text-gray-800">UPI</p>
                            <p className="text-sm text-gray-600">Pay using UPI apps</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-[#D13F4A] bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="text-[#D13F4A] focus:ring-[#D13F4A]"
                          />
                          <div>
                            <p className="font-medium text-gray-800">Cards</p>
                            <p className="text-sm text-gray-600">Credit/Debit cards</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'netbanking'
                            ? 'border-[#D13F4A] bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('netbanking')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={paymentMethod === 'netbanking'}
                            onChange={() => setPaymentMethod('netbanking')}
                            className="text-[#D13F4A] focus:ring-[#D13F4A]"
                          />
                          <div>
                            <p className="font-medium text-gray-800">Net Banking</p>
                            <p className="text-sm text-gray-600">Online banking</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any special instructions for delivery..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] resize-none"
                        rows={3}
                      />
                    </div>

                    <button
                      onClick={() => setStep(3)}
                      className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                )}

                {step > 2 && (
                  <div className="text-sm text-gray-600">
                    {paymentMethod === 'upi' ? 'UPI Payment' :
                     paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking'}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {step >= 3 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Review Order
                </h2>

                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.variant} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-green-600 mb-4">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Your order is secured with SSL encryption</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-[#D13F4A] hover:bg-[#B8363F] text-white py-4 rounded-lg font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing Payment...' : `Place Order - ₹${finalTotal}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartState.itemCount} items)</span>
                  <span className="font-medium">₹{cartState.total}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping
                    {cartState.total > 500 && (
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

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-gray-800">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] text-sm"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: WELCOME10 or FIRST50
                </p>
              </div>

              {cartState.total < 500 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-yellow-800">
                    Add ₹{500 - cartState.total} more to get free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;