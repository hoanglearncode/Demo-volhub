import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (role, name = "") => {
    const roleName = role === "guest" ? "Khách" : role === "user" ? "Người dùng" : role === "btc" ? "BTC" : "Admin";
    setUser({ role, name: name || roleName });
  };

  const logout = () => setUser({ role: "guest", name: "Khách" });

  const contextValue = { user, isAuthenticated, setIsAuthenticated, login, logout };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
export default AuthProvider;
