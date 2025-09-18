import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_KEY = "admin_logged_in";

type AuthContextType = {
  isAuthenticated: boolean;
  initialized: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem(AUTH_KEY) === "true";
    setIsAuthenticated(logged);
    setInitialized(true);
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_KEY, "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, initialized, login, logout }),
    [isAuthenticated, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};