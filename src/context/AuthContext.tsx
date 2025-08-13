import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  orders: Order[];
}

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    productName: string;
    variant: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  address: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@vamifoods.com',
    phone: '+91 9876543210',
    addresses: [
      {
        id: '1',
        name: 'Demo User',
        phone: '+91 9876543210',
        addressLine1: '123 Main Street',
        addressLine2: 'Near Charminar',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001',
        isDefault: true
      }
    ],
    wishlist: ['palli-chekkalu', 'mixture', 'mango-pickle'],
    orders: [
      {
        id: 'ORD001',
        date: '2024-01-15',
        status: 'delivered',
        items: [
          {
            productId: 'palli-chekkalu',
            productName: 'PALLI CHEKKALU',
            variant: '250g',
            quantity: 2,
            price: 180
          }
        ],
        total: 360,
        address: {
          id: '1',
          name: 'Demo User',
          phone: '+91 9876543210',
          addressLine1: '123 Main Street',
          addressLine2: 'Near Charminar',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500001',
          isDefault: true
        },
        paymentMethod: 'UPI',
        trackingNumber: 'VF123456789'
      }
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('vamifoods_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'demo123') {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('vamifoods_user', JSON.stringify(user));
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      addresses: [],
      wishlist: [],
      orders: []
    };
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
    localStorage.setItem('vamifoods_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('vamifoods_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...data };
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!authState.user) return;
    
    const newAddress: Address = {
      ...address,
      id: Date.now().toString()
    };
    
    const updatedUser = {
      ...authState.user,
      addresses: [...authState.user.addresses, newAddress]
    };
    
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      addresses: authState.user.addresses.map(addr =>
        addr.id === id ? { ...addr, ...addressData } : addr
      )
    };
    
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  const deleteAddress = (id: string) => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      addresses: authState.user.addresses.filter(addr => addr.id !== id)
    };
    
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  const addToWishlist = (productId: string) => {
    if (!authState.user) return;
    
    if (!authState.user.wishlist.includes(productId)) {
      const updatedUser = {
        ...authState.user,
        wishlist: [...authState.user.wishlist, productId]
      };
      
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      wishlist: authState.user.wishlist.filter(id => id !== productId)
    };
    
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    if (!authState.user) return;
    
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedUser = {
      ...authState.user,
      orders: [newOrder, ...authState.user.orders]
    };
    
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vamifoods_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      login,
      signup,
      logout,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      addToWishlist,
      removeFromWishlist,
      addOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};