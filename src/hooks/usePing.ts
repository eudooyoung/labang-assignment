import type { User } from "@/types/types.ts";
import { useCallback, useEffect, useState } from "react";

export const usePing = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  const fetchUser = async (signal?: AbortSignal) => {
    const response = await fetch("/api/ping", {
      method: "POST",
      credentials: "include",
      signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unathorized error. Check username or password.");
      }
      const data = await response.json();
      throw new Error(data.error?.msg);
    }

    return await response.json();
  };

  const getUser = useCallback(async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const { user } = await fetchUser();
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        setUserError(error);
      }
    } finally {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      try {
        const { user } = await fetchUser();
        setUser(user);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setUserError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setUserLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { user, userLoading, userError, getUser };
};
