import { createContext, useState, useContext, FC, ReactNode } from "react";
interface AuthContextType {
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("currentUser"));
  const login = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("currentUser", username);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout, username }}>
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
