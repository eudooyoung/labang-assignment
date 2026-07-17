import { env } from "@/config/env.ts";
import type { ListResponse, ListType } from "@/types/types.ts";
import { useCallback, useEffect, useState } from "react";

export const useList = () => {
  const [list, setList] = useState<ListResponse | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<Error | null>(null);

  const fetchList = async ({
    type,
    signal,
  }: {
    type: ListType;
    signal?: AbortSignal;
  }) => {
    const response = await fetch(`${env.apiBaseUrl}/assignment/list`, {
      method: "POST",
      credentials: "include",
      signal,
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unathorized error. Check username or password.");
      }
      const { error } = await response.json();
      throw new Error(error.msg);
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

    (async () => {
      try {
        const { list } = await fetchList({
          type: "lb",
          signal: abortController.signal,
        });
        setList(list);
      } catch (error) {
        if (error instanceof Error) {
          setListError(error);
        }
      } finally {
        setListLoading(false);
      }
    })();
  }, []);

  return { list, listLoading, listError, getList };
};
