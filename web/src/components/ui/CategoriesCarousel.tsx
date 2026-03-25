/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { getCategoryName } from "@/lib/storefront";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoriesCarouselProps = {
  categories: Category[];
  /** Columns per row — should match the current grid design */
  columns?: number;
};

export function CategoriesCarousel({
  categories,
  columns = 6,
}: CategoriesCarouselProps) {
  const { language, isRTL } = useStorefront();
  const rows = 1;
  const itemsPerPage = columns * rows;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const [page, setPage] = useState(0);

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const goNext = () => {
    if (canGoNext) setPage((p) => p + 1);
  };
  const goPrev = () => {
    if (canGoPrev) setPage((p) => p - 1);
  };

  // RTL: left arrow (←) = go to next, right arrow (→) = go to previous
  const handleLeftClick = isRTL ? goNext : goPrev;
  const handleRightClick = isRTL ? goPrev : goNext;
  const canClickLeft = isRTL ? canGoNext : canGoPrev;
  const canClickRight = isRTL ? canGoPrev : canGoNext;


  // Build pages
  const pages: Category[][] = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    pages.push(categories.slice(i, i + itemsPerPage));
  }

  return (
    <div className="relative">
      {totalPages > 1 && (
        <>
          <button
            type="button"
            onClick={handleLeftClick}
            disabled={!canClickLeft}
            aria-label={isRTL ? "التالي" : "Previous"}
            className="absolute -start-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleRightClick}
            disabled={!canClickRight}
            aria-label={isRTL ? "السابق" : "Next"}
            className="absolute -end-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: isRTL
              ? `translateX(${page * 100}%)`
              : `translateX(-${page * 100}%)`,
          }}
        >
          {pages.map((group, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full flex-shrink-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            >
              {group.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group rounded-xl border border-slate-200 bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-premium"
                >
                  <div className="overflow-hidden rounded-lg bg-slate-100">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={getCategoryName(category, language)}
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#eff7ef_0%,#f8fbf8_100%)] text-4xl text-primary">
                        {category.icon?.slice(0, 1) || "•"}
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#1D1D1F] text-start">
                    {getCategoryName(category, language)}
                  </p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
