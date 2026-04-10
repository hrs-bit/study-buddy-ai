import React, { createContext, useContext, useState } from "react";
import { User, getCurrentUser, login as authLogin, signup as authSignup, logout as authLogout, loginWithGoogle as authGoogleLogin } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User | null;
  signup: (name: string, email: string, password: string) => User | null;
  loginWithGoogle: () => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const login = (email: string, password: string) => {
    const u = authLogin(email, password);
    setUser(u);
    return u;
  };

  const signup = (name: string, email: string, password: string) => {
    const u = authSignup(name, email, password);
    setUser(u);
    return u;
  };

  const loginWithGoogle = () => {
    const u = authGoogleLogin();
    setUser(u);
    return u;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
