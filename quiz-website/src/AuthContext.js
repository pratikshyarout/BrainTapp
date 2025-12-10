import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

// ✅ Create Context
export const AuthContext = createContext();

// ✅ Create Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook (optional but useful)
export const useAuth = () => useContext(AuthContext);
