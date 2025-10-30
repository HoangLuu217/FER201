import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';

const AuthStateContext = createContext(null);
const AuthActionContext = createContext(null);

export const useAuth = () => useContext(AuthStateContext);
export const useAuthActions = () => useContext(AuthActionContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth_user')) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const u = await authApi.login(username, password);
      setUser(u);
      localStorage.setItem('auth_user', JSON.stringify(u));
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  const stateValue = useMemo(() => ({ user, isAuthenticated, loading }), [user, isAuthenticated, loading]);
  const actionValue = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthActionContext.Provider value={actionValue}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};
