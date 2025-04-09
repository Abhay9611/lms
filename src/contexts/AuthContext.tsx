
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { toast } from '@/components/ui/use-toast';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        [UserRole.ADMIN]: {
          ...initialUser,
          id: 'admin-1',
          email: email || 'admin@example.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
        },
        [UserRole.TEACHER]: {
          ...initialUser,
          id: 'teacher-1',
          email: email || 'teacher@example.com',
          name: 'Teacher User',
          role: UserRole.TEACHER,
        },
        [UserRole.STUDENT]: {
          ...initialUser,
          id: 'student-1',
          email: email || 'student@example.com',
          name: 'Student User',
          role: UserRole.STUDENT,
        },
        [UserRole.PARENT]: {
          ...initialUser,
          id: 'parent-1',
          email: email || 'parent@example.com',
          name: 'Parent User',
          role: UserRole.PARENT,
        },
      };
      
      // Get the user based on the selected role
      const loggedInUser = mockUsers[role];
      
      if (email && password) {
        setUser(loggedInUser);
        localStorage.setItem('lms-user', JSON.stringify(loggedInUser));
        setError(null);
        toast({
          title: "Login successful",
          description: `Welcome, ${loggedInUser.name}!`,
        });
        
        return; // Successfully logged in
      } else {
        setError('Please enter email and password');
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
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
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
