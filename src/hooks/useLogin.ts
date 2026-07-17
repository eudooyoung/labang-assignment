import { env } from "@/config/env.ts";
import { useState } from "react";

export const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<Error | null>(null);

  const login = async () => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/user/sign_in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: env.username, password: env.password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized error. Check username or password.");
        }
        const data = await response.json();
        throw new Error(data.error?.msg);
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error);
      }
      return false;
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    login,
    loginLoading,
    loginError,
  };
};
