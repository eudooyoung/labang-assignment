import { env } from "@/config/env.ts";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState(true);
  const [loginError, setLoginError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const login = async () => {
      setLoginError(null);

      try {
        const response = await fetch(`${env.apiBaseUrl}/user/sign_in`, {
          method: "POST",
          credentials: "include",
          signal: abortController.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: env.username, password: env.password }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized error. Check username or password.");
          }
          const { error } = await response.json();
          throw new Error(error.msg);
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setLoginError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoginLoading(false);
        }
      }
    };

    login();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    loginLoading,
    loginError,
  };
};
