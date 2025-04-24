import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  school?: {
    id: number;
    name: string;
    code: string;
  };
  grade?: {
    id: number;
    name: string;
  };
  gradeId: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    try {
      // Check for existing token and user data
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      console.log('Stored data found:', { hasToken: !!storedToken, hasUser: !!storedUser });

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          console.log('Successfully restored auth state:', { user: parsedUser });
        } catch (e) {
          console.error('Error parsing stored user data:', e);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Error during auth initialization:', error);
    } finally {
      setLoading(false);
      console.log('Auth initialization completed');
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log('Starting login process...', { email });
      setLoading(true);
      setError(null);

      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      console.log('Received login response:', response.data);

      // Validate response format
      if (!response.data || typeof response.data !== 'object') {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from server');
      }

      let userData: User;
      let tokenValue: string;

      // Handle both response formats
      if (response.data.status === 'success' && response.data.data) {
        // New format
        const { token, user } = response.data.data;
        userData = user;
        tokenValue = token;
      } else if (response.data.token && response.data.user) {
        // Old format
        const { token, user } = response.data;
        userData = user;
        tokenValue = token;
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response format from server');
      }

      // Normalize role to uppercase
      const normalizedRole = userData.role?.toUpperCase();
      const validRoles = ['ADMIN', 'TEACHER', 'STUDENT'];

      // Validate user role
      if (!normalizedRole || !validRoles.includes(normalizedRole)) {
        console.error('Invalid user role:', userData.role);
        throw new Error('Invalid user role received from server');
      }

      // Update the role to be uppercase
      userData.role = normalizedRole as 'ADMIN' | 'TEACHER' | 'STUDENT';

      console.log('Login successful:', { userId: userData.id, role: userData.role });

      // Store token and user data
      localStorage.setItem('token', tokenValue);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set the token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
      
      // Update state
      setToken(tokenValue);
      setUser(userData);
      console.log('Auth state updated:', { user: userData });

      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
      console.log('Login process completed');
    }
  };

  const logout = () => {
    console.log('Logging out user...');
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear state
    setToken(null);
    setUser(null);
    
    console.log('Logout completed');
    // Navigate to login page
    window.location.href = '/login';
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
