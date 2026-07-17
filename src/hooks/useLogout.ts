import { useState } from "react";

export const useLogout = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<Error | null>(null);

  const logout = async () => {
    setLogoutLoading(true);
    setLogoutError(null);

    try {
      const response = await fetch("/api/user/sign_out", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized error. Check username or password.");
        }
        const { error } = await response.json();
        throw new Error(error.msg);
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setLogoutError(error);
      }
      return false;
    } finally {
      setLogoutLoading(false);
    }
  };

  return {
    logout,
    logoutLoading,
    logoutError,
  };
};
