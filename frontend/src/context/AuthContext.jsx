import { createContext, useState, useEffect } from "react";
import { logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      // logout steps can still continue even if backend call fails
      console.warn("Backend logout failed, clearing local auth state", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
