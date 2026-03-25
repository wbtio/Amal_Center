"use client";

import appIcon from "../../../../assets/icon.svg";

import {
  Globe,
  House,
  LayoutGrid,
  Menu,
  ShoppingBag,
  UserCircle2,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { StorefrontSearchBar } from "@/components/search/StorefrontSearchBar";
import { useCatalogSearch } from "@/components/search/useCatalogSearch";
import { useSupabaseSession } from "@/components/providers/SupabaseSessionProvider";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type NavLinkItem = {
  href: string;
  key: string;
  icon: LucideIcon;
};

const NAV_LINKS: NavLinkItem[] = [
  { href: "/", key: "nav.home", icon: House },
  { href: "/products", key: "nav.products", icon: LayoutGrid },
];

const actionButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border border-slate-200/80 bg-white/95 text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-[#1D1D1F] hover:shadow-soft";

function isNavActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/products") {
    return (
      pathname === "/products" ||
      pathname.startsWith("/product/") ||
      pathname.startsWith("/category/")
    );
  }

  return pathname === href;
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useSupabaseSession();
  const { isRTL, language, t, toggleLanguage } = useStorefront();
  const totalItems = useCartStore((state) => state.totalItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchValue, setSearchValue, submitSearch, clearSearch } =
    useCatalogSearch({
      pathname,
      router,
      searchParams,
    });

  const cartActive = pathname === "/cart";
  const accountActive =
    pathname.startsWith("/account") || pathname.startsWith("/auth");
  const languageTitle = language === "ar" ? "العربية" : "English";
  const languageActionLabel =
    language === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic";
  const accountLabel = user ? t("nav.account") : t("nav.login");

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    setIsMenuOpen(false);
    submitSearch(event);
  }

  function changeLanguage() {
    toggleLanguage();
    setIsMenuOpen(false);
    router.refresh();
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-2 sm:px-6 sm:pt-3 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-white/72 px-3 py-2.5 shadow-soft backdrop-blur-2xl sm:px-4 sm:py-3 lg:px-5">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),rgba(255,179,0,0.06)_42%,transparent_74%)] blur-3xl" />

            <div className="relative space-y-2">
              <div className="flex items-center justify-between gap-2.5">
                <div
                  className="flex min-w-0 items-center gap-2.5"
                >
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((current) => !current)}
                    className={cn(actionButtonClass, "lg:hidden")}
                    aria-label={t("nav.menu")}
                    aria-expanded={isMenuOpen}
                    title={t("nav.menu")}
                  >
                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </button>

                  <Link
                    href="/"
                    aria-label="الأمل سنتر"
                    title="الأمل سنتر"
                    className="inline-flex shrink-0 items-center rounded-[1.2rem] border border-white/80 bg-white/95 p-2 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[0.9rem] border border-slate-200 bg-white shadow-sm sm:h-12 sm:w-12">
                      <Image
                        src={appIcon}
                        alt="الأمل سنتر"
                        fill
                        priority
                        sizes="(min-width: 640px) 48px, 44px"
                        className="object-contain"
                      />
                    </span>
                  </Link>
                </div>

                <div className="hidden min-w-0 flex-1 px-1 lg:block">
                  <div className="mx-auto w-full max-w-[40rem]">
                    <StorefrontSearchBar
                      value={searchValue}
                      isRTL={isRTL}
                      placeholder={t("nav.search")}
                      variant="header"
                      onChange={setSearchValue}
                      onClear={clearSearch}
                      onSubmit={handleSearchSubmit}
                    />
                  </div>
                </div>

                <div
                  className="flex shrink-0 items-center gap-2"
                >
                  <nav
                    className="hidden items-center gap-2 lg:flex"
                  >
                    {NAV_LINKS.map((item) => {
                      const Icon = item.icon;
                      const active = isNavActive(pathname, item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "inline-flex h-11 items-center gap-2 rounded-[1.1rem] border px-3 text-sm font-medium transition",
                            active
                              ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-soft"
                              : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"
                          )}
                          title={t(item.key)}
                        >
                          <Icon size={17} />
                          <span className="hidden xl:inline">{t(item.key)}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  <button
                    type="button"
                    onClick={changeLanguage}
                    className={actionButtonClass}
                    aria-label={languageActionLabel}
                    title={languageTitle}
                  >
                    <Globe size={17} />
                  </button>

                  <Link
                    href={user ? "/account" : "/auth/login"}
                    className={cn(
                      actionButtonClass,
                      user
                        ? "border-primary/25 bg-primary/10 text-primary"
                        : accountActive
                          ? "border-slate-300 bg-slate-100 text-slate-900"
                          : ""
                    )}
                    aria-label={accountLabel}
                    title={t("nav.account")}
                  >
                    <UserCircle2 size={18} />
                  </Link>

                  <Link
                    href="/cart"
                    className={cn(
                      "relative inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border bg-white/95 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft",
                      cartActive
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-slate-200/80 text-slate-700 hover:border-primary/30 hover:text-[#1D1D1F]"
                    )}
                    aria-label={t("nav.cart")}
                    title={t("nav.cart")}
                  >
                    <ShoppingBag size={18} />
                    <span
                      className="absolute -top-1 -end-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-white"
                    >
                      {totalItems}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="lg:hidden">
                <StorefrontSearchBar
                  value={searchValue}
                  isRTL={isRTL}
                  placeholder={t("nav.search")}
                  variant="header"
                  onChange={setSearchValue}
                  onClear={clearSearch}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden",
                  isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="grid gap-2 border-t border-slate-100 pt-3">
                  {NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    const active = isNavActive(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-[1.2rem] border px-4 text-sm font-medium transition",
                          active
                            ? "border-primary/30 bg-primary/5 text-primary"
                            : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"
                        )}
                      >
                        <Icon size={17} />
                        <span>{t(item.key)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div aria-hidden className="h-[6.5rem] sm:h-[7rem] lg:h-[5.75rem]" />
    </>
  );
}
