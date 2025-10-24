import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthResponse, LoginData, RegisterData } from '../types';
import { apiService } from '../utils/api';

interface User {
  email: string;
  role: 'LANDLORD' | 'TENANT';
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    
    if (token && email && role) {
      try {
        setUser({ 
          email, 
          role: role as 'LANDLORD' | 'TENANT',
          firstName: email.split('@')[0] // Temporary until we get full user data
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response: AuthResponse = await apiService.login(data.email, data.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('role', response.role);
      setUser({ 
        email: response.email, 
        role: response.role,
        firstName: response.email.split('@')[0] // Temporary until we get full user data
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await apiService.register(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('role', response.role);
      setUser({ 
        email: response.email, 
        role: response.role,
        firstName: data.firstName,
        lastName: data.lastName
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};