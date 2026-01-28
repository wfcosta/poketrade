import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  city: string;
  state: string;
  rating: number;
  totalReviews: number;
  successRate: number;
  averageShippingTime: number;
  bankAccount?: {
    type: 'pix' | 'bank';
    pixKey?: string;
    bank?: string;
    account?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, city: string, state: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'user@example.com': {
    password: '123456',
    user: {
      id: '1',
      email: 'user@example.com',
      name: 'João Silva',
      avatar: '👤',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.8,
      totalReviews: 45,
      successRate: 98,
      averageShippingTime: 2,
      bankAccount: {
        type: 'pix',
        pixKey: '11999999999',
      },
    },
  },
  'seller@example.com': {
    password: '123456',
    user: {
      id: '2',
      email: 'seller@example.com',
      name: 'Maria Santos',
      avatar: '👩',
      city: 'Rio de Janeiro',
      state: 'RJ',
      rating: 4.9,
      totalReviews: 120,
      successRate: 99,
      averageShippingTime: 1,
      bankAccount: {
        type: 'bank',
        bank: 'Banco do Brasil',
        account: '12345-6',
      },
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('poketrade_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to load user from localStorage', e);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Email ou senha inválidos');
    }

    setUser(mockUser.user);
    setIsLoggedIn(true);
    localStorage.setItem('poketrade_user', JSON.stringify(mockUser.user));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('poketrade_user');
  };

  const signup = async (email: string, password: string, name: string, city: string, state: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (MOCK_USERS[email]) {
      throw new Error('Email já cadastrado');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      avatar: '👤',
      city,
      state,
      rating: 5,
      totalReviews: 0,
      successRate: 100,
      averageShippingTime: 0,
    };

    MOCK_USERS[email] = { password, user: newUser };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('poketrade_user', JSON.stringify(newUser));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('poketrade_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
