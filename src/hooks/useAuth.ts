import { useState, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'team';
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // For demo purposes, return a mock authenticated state
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'pro' as const,
      avatar: null,
      emailVerified: true,
      createdAt: new Date('2024-01-15'),
      lastLoginAt: new Date(),
    });
    
    return {
      user,
      isAuthenticated: true,
      loading,
      login: async (email: string, password: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulate login validation
          if (email === 'demo@example.com' && password === 'password') {
            setUser({
              id: '1',
              name: 'Demo User',
              email: email,
              plan: 'pro',
              avatar: null,
              emailVerified: true,
              createdAt: new Date('2024-01-15'),
              lastLoginAt: new Date(),
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } finally {
          setLoading(false);
        }
      },
      signup: async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          setUser({
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            plan: 'free',
            avatar: null,
            emailVerified: false,
            createdAt: new Date(),
            lastLoginAt: new Date(),
          });
        } finally {
          setLoading(false);
        }
      },
      logout: () => {
        setUser(null);
      },
      forgotPassword: async (email: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('Password reset email sent to:', email);
        } finally {
          setLoading(false);
        }
      },
      resetPassword: async (token: string, password: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('Password reset successful');
        } finally {
          setLoading(false);
        }
      },
      verifyEmail: async (token: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (user) {
            setUser({ ...user, emailVerified: true });
          }
        } finally {
          setLoading(false);
        }
      },
      resendVerification: async () => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('Verification email sent');
        } finally {
          setLoading(false);
        }
      },
      updateProfile: async (data: Partial<User>) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (user) {
            setUser({ ...user, ...data });
          }
        } finally {
          setLoading(false);
        }
      },
      changePassword: async (currentPassword: string, newPassword: string) => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('Password changed successfully');
        } finally {
          setLoading(false);
        }
      },
    };
  }
  return context;
};