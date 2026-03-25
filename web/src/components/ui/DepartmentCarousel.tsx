/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { getCategoryName } from "@/lib/storefront";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type DepartmentCarouselProps = {
  categories: Category[];
};

export function DepartmentCarousel({ categories }: DepartmentCarouselProps) {
  const { language, isRTL } = useStorefront();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const [page, setPage] = useState(0);

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const goNext = () => { if (canGoNext) setPage((p) => p + 1); };
  const goPrev = () => { if (canGoPrev) setPage((p) => p - 1); };

  // RTL: left arrow (←) = go to next, right arrow (→) = go to previous
  const handleLeftClick = isRTL ? goNext : goPrev;
  const handleRightClick = isRTL ? goPrev : goNext;
  const canClickLeft = isRTL ? canGoNext : canGoPrev;
  const canClickRight = isRTL ? canGoPrev : canGoNext;


  // Build pages of 3 items
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
              className="grid w-full flex-shrink-0 grid-cols-3 gap-6"
            >
              {group.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="relative">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={getCategoryName(category, language)}
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#f1f8f1_0%,#fbfcfb_100%)] text-6xl text-primary">
                        {category.icon?.slice(0, 1) || "•"}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    <div className="absolute inset-x-3 bottom-3">
                      <div className="rounded-xl bg-white/92 px-3 py-3 shadow-soft backdrop-blur-md">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                            {category.icon?.slice(0, 1) || "•"}
                          </span>
                          <div className="min-w-0 flex-1 text-start">
                            <h3 className="truncate text-base font-semibold text-[#1D1D1F]">
                              {getCategoryName(category, language)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
