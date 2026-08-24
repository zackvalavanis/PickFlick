import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../Types/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/users/me",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!res.ok) {
          localStorage.removeItem("access_token");
          setToken(null);
          setUser(null);
          return;
        }

        const userData: User = await res.json();

        setUser(userData);
      } catch (error) {
        console.error("Auth error:", error);

        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);

    const res = await fetch(
      "http://localhost:8000/users/me",
      {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to load user");
    }

    const userData: User = await res.json();

    setUser(userData);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");

    setUser(null);
    setToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}