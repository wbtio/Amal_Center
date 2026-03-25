/* eslint-disable @next/next/no-img-element */
"use client";

import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { StorefrontSearchBar } from "@/components/search/StorefrontSearchBar";
import { useCatalogSearch } from "@/components/search/useCatalogSearch";
import { ProductCard } from "@/components/ui/ProductCard";
import type { ProductSortOption } from "@/lib/storefront-data";
import { cn } from "@/lib/utils";
import { getCategoryName } from "@/lib/storefront";
import type { Category, Product } from "@/lib/types";

type ProductsExplorerProps = {
  categories: Category[];
  products: Product[];
  initialQuery: string;
  initialCategory: string;
  initialSort: ProductSortOption;
  initialMinPrice: string;
  initialMaxPrice: string;
  initialInStock: boolean;
  currentPage: number;
  productsPerPage: number;
};

export function ProductsExplorer({
  categories,
  products,
  initialCategory,
  initialSort,
  initialMinPrice,
  initialMaxPrice,
  initialInStock,
  currentPage,
  productsPerPage,
}: ProductsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language, isRTL, messages } = useStorefront();
  const [isPending, startRouteTransition] = useTransition();
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const {
    searchValue: search,
    setSearchValue: setSearch,
    submitSearch,
    clearSearch,
    isSearchPending,
  } = useCatalogSearch({
    pathname,
    router,
    searchParams,
  });

  useEffect(() => {
    setMinPrice(initialMinPrice);
  }, [initialMinPrice]);

  useEffect(() => {
    setMaxPrice(initialMaxPrice);
  }, [initialMaxPrice]);

  function replaceQuery(
    updates: Record<string, string | boolean | null | undefined>,
    options?: { scroll?: boolean }
  ) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        params.delete(key);
        continue;
      }

      params.set(key, String(value));
    }

    const query = params.toString();

    startRouteTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: options?.scroll ?? false,
      });
    });
  }

  function clearFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
      <aside className="space-y-4 sm:space-y-5 lg:sticky lg:top-28 lg:h-fit">
        <div className="soft-panel p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <SlidersHorizontal size={18} />
            </div>
            <div className="text-start">
              <p className="eyebrow">Filters</p>
              <h2 className="text-lg font-semibold text-[#1D1D1F]">
                {language === "ar" ? "تصفية النتائج" : "Refine results"}
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1D1D1F]">
                {language === "ar" ? "الأقسام" : "Categories"}
              </p>
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => replaceQuery({ category: null })}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition",
                    "text-start",
                    !initialCategory
                      ? "border-primary bg-primary/5 text-primary shadow-soft"
                      : "border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-slate-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                      !initialCategory
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-slate-200 bg-slate-100 text-slate-500"
                    )}
                  >
                    <LayoutGrid size={18} />
                  </span>
                  <span className="min-w-0 truncate font-medium">
                    {messages.products.allCategories}
                  </span>
                </button>
                {categories.map((category) => {
                  const selected = initialCategory === category.id;
                  const categoryName = getCategoryName(category, language);
                  const fallbackLabel =
                    category.icon?.trim()?.[0] ||
                    categoryName.trim().charAt(0) ||
                    "•";

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        replaceQuery({
                          category: selected ? null : category.id,
                        })
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition",
                        "text-start",
                        selected
                          ? "border-primary bg-primary/5 text-primary shadow-soft"
                          : "border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-slate-50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border",
                          selected
                            ? "border-primary/20 bg-primary/10"
                            : "border-slate-200 bg-slate-100"
                        )}
                      >
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={categoryName}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span
                            className={cn(
                              "text-base font-semibold",
                              selected ? "text-primary" : "text-slate-500"
                            )}
                          >
                            {fallbackLabel}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 truncate font-medium">
                        {categoryName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1D1D1F]">
                {language === "ar" ? "نطاق السعر" : "Price range"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <input
                  value={minPrice}
                  onChange={(event) => {
                    const next = event.target.value;
                    setMinPrice(next);
                    replaceQuery({ minPrice: next });
                  }}
                  inputMode="numeric"
                  placeholder={language === "ar" ? "الحد الأدنى" : "Minimum"}
                  className="field-input h-12"
                />
                <input
                  value={maxPrice}
                  onChange={(event) => {
                    const next = event.target.value;
                    setMaxPrice(next);
                    replaceQuery({ maxPrice: next });
                  }}
                  inputMode="numeric"
                  placeholder={language === "ar" ? "الحد الأعلى" : "Maximum"}
                  className="field-input h-12"
                />
              </div>
            </div>

            <label
              className="flex cursor-pointer items-center justify-between gap-4 rounded-3xl bg-slate-50 px-4 py-4"
            >
              <span className="text-sm font-medium text-slate-700">
                {language === "ar" ? "المتوفر فقط" : "In stock only"}
              </span>
              <button
                type="button"
                onClick={() => replaceQuery({ inStock: !initialInStock || null })}
                className={cn(
                  "relative h-7 w-12 rounded-full transition",
                  initialInStock ? "bg-primary" : "bg-slate-200"
                )}
                aria-pressed={initialInStock}
              >
                <span
                  className={cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition",
                    initialInStock ? "end-1" : "start-1"
                  )}
                />
              </button>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="pill-button-ghost w-full"
            >
              {language === "ar" ? "مسح الفلاتر" : "Clear filters"}
            </button>
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="soft-panel overflow-hidden p-4 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <StorefrontSearchBar
              value={search}
              isRTL={isRTL}
              placeholder={messages.products.searchPlaceholder}
              helperText={
                search.trim()
                  ? language === "ar"
                    ? "هذا البحث مرتبط بنفس نتائج صفحة المنتجات ويتحدث أثناء الكتابة."
                    : "This search is synced with the products results and updates while typing."
                  : null
              }
              pending={isSearchPending}
              variant="page"
              onChange={setSearch}
              onClear={clearSearch}
              onSubmit={submitSearch}
            />

            <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
              <p
                className="text-sm text-slate-500 text-start"
              >
                {products.length} {messages.products.results}
                {isPending || isSearchPending ? (
                  <span className="ms-2 text-primary">
                    {language === "ar" ? "جارٍ التحديث" : "Updating"}
                  </span>
                ) : null}
              </p>

              <select
                value={initialSort}
                onChange={(event) =>
                  replaceQuery({ sort: event.target.value || null })
                }
                className="field-select"
              >
                <option value="newest">
                  {language === "ar" ? "الأحدث أولاً" : "Newest first"}
                </option>
                <option value="price_low">
                  {language === "ar" ? "السعر: من الأقل" : "Price: low to high"}
                </option>
                <option value="price_high">
                  {language === "ar"
                    ? "السعر: من الأعلى"
                    : "Price: high to low"}
                </option>
                <option value="name_az">
                  {language === "ar" ? "الاسم" : "Name"}
                </option>
              </select>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (currentPage > 1) {
                    replaceQuery({ page: currentPage - 1 > 1 ? String(currentPage - 1) : null });
                  }
                }}
                disabled={currentPage === 1}
                className="pill-button-ghost disabled:cursor-not-allowed disabled:opacity-40"
              >
                {language === "ar" ? "السابق" : "Previous"}
              </button>

              <span className="text-sm text-slate-600">
                {language === "ar" ? `صفحة ${currentPage}` : `Page ${currentPage}`}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (products.length === productsPerPage) {
                    replaceQuery({ page: String(currentPage + 1) });
                  }
                }}
                disabled={products.length < productsPerPage}
                className="pill-button-ghost disabled:cursor-not-allowed disabled:opacity-40"
              >
                {language === "ar" ? "التالي" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="soft-panel px-8 py-16 text-center">
            <p className="text-lg font-semibold text-[#1D1D1F]">
              {messages.products.empty}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              {language === "ar"
                ? "جرّب تغيير كلمات البحث أو توسيع نطاق السعر."
                : "Try adjusting the search terms or widening the price range."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
