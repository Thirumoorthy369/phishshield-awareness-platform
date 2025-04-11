
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole, AuthContextType } from '../types/auth-types';
import { MOCK_USERS } from './mock-users';
import { storeToken, getToken, removeToken, createMockJwt } from './token-utils';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Initialize userDatabase with mock users and any stored users
  const [userDatabase, setUserDatabase] = useState<any[]>(() => {
    // Try to get stored users from localStorage
    const storedUsers = localStorage.getItem('userDatabase');
    if (storedUsers) {
      try {
        // Create a unique set of users by email to avoid duplicates
        const parsedUsers = JSON.parse(storedUsers);
        const allUsers = [...parsedUsers, ...MOCK_USERS];
        
        // Create a map to deduplicate by email
        const uniqueUsers = new Map();
        allUsers.forEach(user => uniqueUsers.set(user.email, user));
        
        return Array.from(uniqueUsers.values());
      } catch (error) {
        console.error('Error parsing stored users:', error);
        return [...MOCK_USERS];
      }
    }
    return [...MOCK_USERS];
  });

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      
      if (token) {
        // In a real app, this would validate the JWT token with the server
        const userData = JSON.parse(token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login functionality
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in our database
      const foundUser = userDatabase.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const token = createMockJwt(foundUser);
        storeToken(token);
        setUser({
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        });
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registration functionality - now with improved storage
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (userDatabase.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create a new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        role: UserRole.USER
      };
      
      // Store in our database
      const updatedDatabase = [...userDatabase, newUser];
      setUserDatabase(updatedDatabase);
      
      // Save to localStorage - make sure this actually works
      try {
        localStorage.setItem('userDatabase', JSON.stringify(updatedDatabase));
        console.log('User database saved to localStorage:', updatedDatabase);
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
        toast({
          title: "Storage warning",
          description: "Your registration was processed but may not persist between sessions.",
          variant: "destructive"
        });
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
    } catch (error) {
      console.error('Register error:', error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout functionality
  const logout = () => {
    removeToken();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      checkAuth
    }}>
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
