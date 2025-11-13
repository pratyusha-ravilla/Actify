
//client/src/content/AuthContext/jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const saved = localStorage.getItem("authData");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    } else {
      localStorage.removeItem("authData");
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
