import type { Categories } from "@/types/types.ts";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<Categories | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      setCategoriesError(null);

      try {
        const response = await fetch("/api/home/gnb", {
          method: "POST",
          signal: abortController.signal,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.msg);
        }

        const { cats } = await response.json();
        setCategories(cats);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setCategoriesError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setCategoriesLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { categories, categoriesLoading, categoriesError };
};
