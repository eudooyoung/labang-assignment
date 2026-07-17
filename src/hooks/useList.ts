import type { List, ListType } from "@/types/types.ts";
import { useCallback, useEffect, useState } from "react";

export const useList = () => {
  const [list, setList] = useState<List | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<Error | null>(null);

  const fetchList = async ({
    type,
    signal,
  }: {
    type: ListType;
    signal?: AbortSignal;
  }) => {
    const response = await fetch("/api/assignment/list", {
      method: "POST",
      credentials: "include",
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
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

  const getList = useCallback(async (type: ListType) => {
    setListLoading(true);
    setListError(null);

    try {
      const { list } = await fetchList({ type });
      setList(list);
    } catch (error) {
      if (error instanceof Error) {
        setListError(error);
      }
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      try {
        const { list } = await fetchList({
          type: "lb",
          signal: abortController.signal,
        });
        setList(list);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setListError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setListLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { list, listLoading, listError, getList };
};
