import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, mockValue = null }) => {
  const [user, setUser] = useState(mockValue?.user || null);
  const [loading, setLoading] = useState(!mockValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si hay mockValue (para tests), no hacemos nada
    if (mockValue) {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      const storedUser = authService.getCurrentUser();
      const token = localStorage.getItem('accessToken');
      
      if (storedUser && token) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, [mockValue]);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(username, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      return response;
    } catch (err) {
      setError(err.response?.data || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = mockValue || {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
