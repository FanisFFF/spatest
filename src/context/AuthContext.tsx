import { createContext, useState, useContext, FC, ReactNode } from "react";
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
/* eslint-disable */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Not used in AuthProvider");
  return context;
};
