"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
  type FormEvent,
} from "react";

type RouterLike = {
  push: (href: string, options?: { scroll?: boolean }) => void;
  replace: (href: string, options?: { scroll?: boolean }) => void;
};

type SearchParamsLike = {
  get: (name: string) => string | null;
  toString: () => string;
};

type UseCatalogSearchOptions = {
  pathname: string;
  router: RouterLike;
  searchParams: SearchParamsLike;
  autoSyncOnProducts?: boolean;
};

export function useCatalogSearch({
  pathname,
  router,
  searchParams,
  autoSyncOnProducts = true,
}: UseCatalogSearchOptions) {
  const currentQuery = searchParams.get("q") ?? "";
  const [searchValue, setSearchValue] = useState(currentQuery);
  const deferredSearchValue = useDeferredValue(searchValue);
  const [isSearchPending, startSearchTransition] = useTransition();

  useEffect(() => {
    setSearchValue(currentQuery);
  }, [currentQuery]);

  const buildSearchHref = useCallback(
    (value: string) => {
      const normalized = value.trim();
      const params =
        pathname === "/products"
          ? new URLSearchParams(searchParams.toString())
          : new URLSearchParams();

      if (normalized) {
        params.set("q", normalized);
      } else {
        params.delete("q");
      }

      const query = params.toString();
      return query ? `/products?${query}` : "/products";
    },
    [pathname, searchParams]
  );

  useEffect(() => {
    if (!autoSyncOnProducts || pathname !== "/products") {
      return;
    }

    const normalized = deferredSearchValue.trim();

    if (normalized === currentQuery) {
      return;
    }

    startSearchTransition(() => {
      router.replace(buildSearchHref(normalized), { scroll: false });
    });
  }, [
    autoSyncOnProducts,
    buildSearchHref,
    currentQuery,
    deferredSearchValue,
    pathname,
    router,
  ]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startSearchTransition(() => {
      router.push(buildSearchHref(searchValue));
    });
  }

  function clearSearch() {
    setSearchValue("");

    if (pathname === "/products") {
      startSearchTransition(() => {
        router.replace(buildSearchHref(""), { scroll: false });
      });
    }
  }

  return {
    searchValue,
    setSearchValue,
    isSearchPending,
    submitSearch,
    clearSearch,
    buildSearchHref,
  };
}
