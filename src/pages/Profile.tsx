import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile, addAddress, updateAddress, deleteAddress } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

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

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setIsEditing(false);
  };

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

  const handleUpdateAddress = (addressId: string) => {
    const address = user?.addresses?.find(addr => addr.id === addressId);
    if (address) {
      updateAddress(addressId, address);
      setEditingAddress(null);
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    // In a real app, you would validate the current password and update it
    alert('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="page-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <User className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sign in to view your profile
            </h2>
            <p className="text-gray-600 mb-8">
              Access your account to manage your profile, orders, and preferences.
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your profile, orders, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#D13F4A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#D13F4A] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-[#D13F4A] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Addresses</span>
                </button>
                <Link
                  to="/account/orders"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/account/wishlist"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 text-[#D13F4A] hover:text-[#B8363F] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 bg-[#D13F4A] hover:bg-[#B8363F] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || ''
                          });
                        }}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                      />
                    ) : (
                      <p className="text-gray-800">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                      />
                    ) : (
                      <p className="text-gray-800">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A]"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-800">{user.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Password Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Password</h3>
                    <button
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="text-[#D13F4A] hover:text-[#B8363F] transition-colors"
                    >
                      Change Password
                    </button>
                  </div>

                  {showPasswordForm && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D13F4A] pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={handlePasswordChange}
                          className="bg-[#D13F4A] hover:bg-[#B8363F] text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: ''
                            });
                          }}
                          className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center space-x-2 bg-[#D13F4A] hover:bg-[#B8363F] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Address</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {user.addresses?.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-800">{address.name}</span>
                            {address.isDefault && (
                              <span className="bg-[#D13F4A] text-white text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                            <br />
                            {address.city}, {address.state} - {address.pincode}
                            <br />
                            Phone: {address.phone}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingAddress(address.id)}
                            className="text-[#D13F4A] hover:text-[#B8363F] p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {user.addresses?.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No addresses saved yet</p>
                    </div>
                  )}
                </div>

                {/* Add Address Form */}
                {showAddAddress && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
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
                        className="bg-[#D13F4A] hover:bg-[#B8363F] text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;