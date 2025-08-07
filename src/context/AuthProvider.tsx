// src/context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);
 
  const login = async (email: string, password: string) => {
    try {
      const response = await API.post("/v1/login", { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      console.log("Login successful. Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data.data || error.message);
      throw error;
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await API.post("/v1/signup", {
        name,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
      });
  
      const { token, user } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
  
      console.log("Signup successful. Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signup failed:", error?.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext };