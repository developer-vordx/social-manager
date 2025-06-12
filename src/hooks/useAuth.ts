import { useState, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'team';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // For demo purposes, return a mock authenticated state
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        plan: 'pro' as const
      },
      isAuthenticated: true,
      login: async () => {},
      signup: async () => {},
      logout: () => {}
    };
  }
  return context;
};