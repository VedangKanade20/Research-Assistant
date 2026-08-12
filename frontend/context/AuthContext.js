"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Validate stored JWT token on app startup against http://localhost:6968/api/v1/auth/me
  useEffect(() => {
    async function checkAuthStatus() {
      const token = localStorage.getItem("research_ai_token");

      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const json = await res.json();
            const userData = {
              id: json.data.userId || json.data.id,
              email: json.data.email,
              name: json.data.email.split("@")[0],
              role: "Pro Researcher",
              token,
            };
            setUser(userData);
            localStorage.setItem("research_ai_user", JSON.stringify(userData));
          } else {
            // Invalid/expired token -> purge storage
            localStorage.removeItem("research_ai_token");
            localStorage.removeItem("research_ai_user");
            setUser(null);
          }
        } catch (error) {
          // If server is unreachable or offline, reject session for security
          localStorage.removeItem("research_ai_token");
          localStorage.removeItem("research_ai_user");
          setUser(null);
        }
      } else {
        localStorage.removeItem("research_ai_user");
        setUser(null);
      }
      setLoading(false);
    }

    checkAuthStatus();
  }, []);

  // Strict Login handler -> POST /api/v1/auth/login (Port 6968)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        const errorMsg = json.error?.message || json.message || "Invalid email or password";
        setLoading(false);
        return { success: false, error: errorMsg };
      }

      const { user: backendUser, token } = json.data;
      const userData = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.email.split("@")[0],
        role: "Pro Researcher",
        token,
      };

      setUser(userData);
      localStorage.setItem("research_ai_token", token);
      localStorage.setItem("research_ai_user", JSON.stringify(userData));
      setLoading(false);
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: "Unable to connect to Fastify backend on http://localhost:6968. Please ensure backend server is running." 
      };
    }
  };

  // Strict Register handler -> POST /auth/register (Port 6968)
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        const errorMsg = json.error?.message || json.message || "Account creation failed";
        setLoading(false);
        return { success: false, error: errorMsg };
      }

      const { user: backendUser, token } = json.data;
      const userData = {
        id: backendUser.id,
        email: backendUser.email,
        name: name || backendUser.email.split("@")[0],
        role: "Pro Researcher",
        token,
      };

      setUser(userData);
      localStorage.setItem("research_ai_token", token);
      localStorage.setItem("research_ai_user", JSON.stringify(userData));
      setLoading(false);
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: "Unable to connect to Fastify backend on http://localhost:6968. Please ensure backend server is running." 
      };
    }
  };

  // Logout handler
  const logout = async () => {
    const token = localStorage.getItem("research_ai_token");
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        // Ignore network errors on logout
      }
    }
    setUser(null);
    localStorage.removeItem("research_ai_token");
    localStorage.removeItem("research_ai_user");
    router.push("/login");
  };

  const token = user?.token || (typeof window !== "undefined" ? localStorage.getItem("research_ai_token") : null);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
