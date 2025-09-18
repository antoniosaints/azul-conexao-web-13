import { useState, useEffect } from "react";

const AUTH_KEY = "admin_logged_in";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const logged = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(logged === "true");
  }, []);

  const login = () => {
    console.log("Setting localStorage and authentication state");
    localStorage.setItem(AUTH_KEY, "true");
    setIsAuthenticated(true);
    console.log("Authentication state updated:", true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};