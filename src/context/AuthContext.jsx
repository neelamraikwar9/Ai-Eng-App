import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const [user, setUser] = useState(() => {
  //   const saved = localStorage.getItem("user");
  //   return saved ? JSON.parse(saved) : null;
  // });

  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  if (!saved || saved === "undefined") return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
});

  const login = (t, userInfo) => {
    setToken(t);
    setUser(userInfo);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
