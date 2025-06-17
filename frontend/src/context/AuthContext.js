import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
      else setUser(null);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:2000/login";
  };

  const logout = () => {
    window.location.href = "http://localhost:2000/logout";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
