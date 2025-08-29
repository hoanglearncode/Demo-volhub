import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const contextValue = { user, token, isAuthenticated, setUser, setToken,setIsAuthenticated };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
export default AuthProvider;
