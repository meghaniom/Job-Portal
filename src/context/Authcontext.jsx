import { createContext, useContext, useState } from "react";

// ✅ Correct spelling: AuthContext
const AuthContext = createContext();

// Create Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Use correct context here too
export const useAuth = () => useContext(AuthContext);
