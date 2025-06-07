import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Tenant {
  id: string;
  name: string;
  subscriptionId: string;
  workspaceId: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Implement actual authentication logic here
      // For now, using mock data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'admin',
      };
      
      const mockTenant: Tenant = {
        id: '1',
        name: 'Demo Tenant',
        subscriptionId: 'sub-123',
        workspaceId: 'ws-456',
      };
      
      setUser(mockUser);
      setTenant(mockTenant);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTenant(null);
    // Implement additional logout logic here
  }, []);

  const value = {
    user,
    setUser,
    tenant,
    setTenant,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;