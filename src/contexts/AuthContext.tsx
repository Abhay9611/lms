
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const initialUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: UserRole.STUDENT,
  avatar: '/placeholder.svg',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would verify the token with the backend
    const storedUser = localStorage.getItem('lms-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be the response from your auth API
      const mockUsers = {
        admin: {
          ...initialUser,
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
        },
        teacher: {
          ...initialUser,
          id: 'teacher-1',
          email: 'teacher@example.com',
          name: 'Teacher User',
          role: UserRole.TEACHER,
        },
        student: {
          ...initialUser,
          id: 'student-1',
          email: 'student@example.com',
          name: 'Student User',
          role: UserRole.STUDENT,
        },
        parent: {
          ...initialUser,
          id: 'parent-1',
          email: 'parent@example.com',
          name: 'Parent User',
          role: UserRole.PARENT,
        },
      };
      
      // Get the user based on the selected role
      const loggedInUser = mockUsers[role as keyof typeof mockUsers];
      
      if (email && password) {
        setUser(loggedInUser);
        localStorage.setItem('lms-user', JSON.stringify(loggedInUser));
        setError(null);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
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
