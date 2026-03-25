/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { resolveBannerHref, type Banner } from "@/lib/storefront";

type HomeBannerCarouselProps = {
  banners: Banner[];
  autoPlayMs?: number;
};

export function HomeBannerCarousel({
  banners,
  autoPlayMs = 3000,
}: HomeBannerCarouselProps) {
  const { language, isRTL } = useStorefront();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
    }, autoPlayMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoPlayMs, banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const currentIndex = activeIndex < banners.length ? activeIndex : 0;
  const activeBanner = banners[currentIndex];
  const activeBannerHref = resolveBannerHref(activeBanner.link);
  const fallbackAlt =
    language === "ar" ? "بانر الأمل سنتر" : "Al Amal Center banner";
  const fallbackTitle = language === "ar" ? "بنر ترويجي" : "Promotional banner";
  const previousLabel = language === "ar" ? "السابق" : "Previous";
  const nextLabel = language === "ar" ? "التالي" : "Next";

  const goNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
  };

  const goPrev = () => {
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + banners.length) % banners.length
    );
  };

  const handleLeftClick = isRTL ? goNext : goPrev;
  const handleRightClick = isRTL ? goPrev : goNext;

  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="relative overflow-hidden rounded-[2.75rem] border border-white/80 bg-white shadow-premium">
        <Link
          href={activeBannerHref}
          className="group block"
        >
          <img
            src={activeBanner.image_url}
            alt={activeBanner.title || fallbackAlt}
            className="h-auto w-full transition duration-700 group-hover:scale-[1.02]"
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </Link>

        {banners.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 pb-4 pt-20 sm:px-6 sm:pb-6">
            <div className="pointer-events-auto min-w-0 rounded-full bg-white/90 px-4 py-2 shadow-soft backdrop-blur">
              <div className="flex items-center gap-3">
                <p className="truncate text-sm font-semibold text-[#1D1D1F]">
                  {activeBanner.title || fallbackTitle}
                </p>
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  {currentIndex + 1} / {banners.length}
                </span>
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/88 p-1.5 shadow-soft backdrop-blur">
              <button
                type="button"
                onClick={handleLeftClick}
                aria-label={previousLabel}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1D1D1F] transition hover:border-primary/30 hover:text-primary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleRightClick}
                aria-label={nextLabel}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1D1D1F] transition hover:border-primary/30 hover:text-primary"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
