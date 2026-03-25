"use client";

import appIcon from "../../../../assets/icon.svg";

import {
  Apple,
  ArrowUpRight,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";

import { APP_CONFIG } from "../../../../constants/app";

const QUICK_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.products" },
  { href: "/cart", key: "nav.cart" },
  { href: "/account", key: "nav.account" },
];

const FOOTER_WEBSITE_URL = "https://centeralamal.shop";
const FOOTER_WEBSITE_LABEL = "centeralamal.shop";

type StoreBadgeCardProps = {
  eyebrow: string;
  title: string;
  icon: ReactNode;
  href?: string;
};

function GooglePlayMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M3.2 2.6L13.9 12 3.2 21.4V2.6Z" fill="#34A853" />
      <path d="M13.9 12L17.4 8.8 21 12 17.4 15.2 13.9 12Z" fill="#4285F4" />
      <path d="M3.2 2.6L17.4 8.8 13.9 12 3.2 2.6Z" fill="#FBBC04" />
      <path d="M3.2 21.4L13.9 12 17.4 15.2 3.2 21.4Z" fill="#EA4335" />
    </svg>
  );
}

function StoreBadgeCard({
  eyebrow,
  title,
  icon,
  href,
}: StoreBadgeCardProps) {
  const cardContent = (
    <span className="group relative flex min-h-[4.5rem] items-center gap-3 overflow-hidden rounded-[0.85rem] border border-white/14 bg-[#0B0B0D] px-3.5 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_40px_-28px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-[#111214]">
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_38%)]" />
      <span className="relative flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white"
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.56rem] font-medium uppercase tracking-[0.14em] text-white/72">
            {eyebrow}
          </span>
          <span className="mt-0.5 block text-[1.05rem] font-semibold leading-none tracking-[-0.02em]">
            {title}
          </span>
        </span>
      </span>
    </span>
  );

  if (!href) {
    return (
      <div aria-disabled="true">
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
    >
      {cardContent}
    </a>
  );
}

export function Footer() {
  const { isRTL, t } = useStorefront();
  const year = new Date().getFullYear();
  const appStoreUrl = APP_CONFIG.APP_STORE_URL.trim();

  return (
    <footer className="mt-16 pb-8">
      <div className="page-shell">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.15fr_0.72fr_0.95fr_1fr]">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-[1.6rem] bg-slate-50 px-3 py-3"
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
                <div className="text-start">
                  <p className="text-sm font-semibold text-[#1D1D1F]">
                    {isRTL ? "الأمل سنتر" : "Al Amal Center"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {isRTL ? "Al Amal Center" : "الأمل سنتر"}
                  </p>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-7 text-slate-500 text-start sm:text-base">
                {t("footer.description")}
              </p>
            </div>

            <div className="text-start">
              <p className="eyebrow">{t("footer.quickLinks")}</p>
              <div className="mt-5 grid gap-3">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-[#1D1D1F]"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-start">
              <p className="eyebrow">{isRTL ? "فروعنا" : "Our branches"}</p>
              <div className="mt-5 grid gap-3">
                {APP_CONFIG.BRANCH_LOCATIONS.map((branch) => (
                  <a
                    key={branch.href}
                    href={branch.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-14 items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white/88 px-3 py-3 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-premium"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.16),rgba(255,255,255,0.96))] text-primary shadow-sm">
                      <MapPin size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[#1D1D1F]">
                        {isRTL ? branch.label_ar : branch.label_en}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {isRTL ? "فتح في Google Maps" : "Open in Google Maps"}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-slate-400 transition group-hover:text-primary"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-start">
              <p className="eyebrow">{t("footer.contact")}</p>
              <div className="mt-5 grid gap-4 text-sm text-slate-500">
                <a
                  href={APP_CONFIG.WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 transition hover:text-[#1D1D1F]"
                >
                  <MessageCircle size={16} />
                  <span>{APP_CONFIG.WHATSAPP_NUMBER}</span>
                </a>
                <a
                  href={`tel:${APP_CONFIG.WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-3 transition hover:text-[#1D1D1F]"
                >
                  <Phone size={16} />
                  <span>{APP_CONFIG.WHATSAPP_NUMBER}</span>
                </a>
                <a
                  href={FOOTER_WEBSITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 transition hover:text-[#1D1D1F]"
                >
                  <Globe size={16} />
                  <span>{FOOTER_WEBSITE_LABEL}</span>
                </a>

                <div className="rounded-[1.7rem] border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="grid gap-2.5">
                    <StoreBadgeCard
                      href={APP_CONFIG.PLAY_STORE_URL}
                      eyebrow="ANDROID APP ON"
                      title="Google Play"
                      icon={<GooglePlayMark />}
                    />
                    <StoreBadgeCard
                      href={appStoreUrl || undefined}
                      eyebrow="DOWNLOAD ON THE"
                      title="App Store"
                      icon={<Apple size={22} strokeWidth={2.15} />}
                    />
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 pt-2"
                >
                  <a
                    href={APP_CONFIG.FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]"
                    aria-label="Facebook"
                  >
                    <Facebook size={17} />
                  </a>
                  <a
                    href={APP_CONFIG.INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]"
                    aria-label="Instagram"
                  >
                    <Instagram size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-8 border-t border-slate-100 pt-5 text-sm text-slate-400 text-start"
          >
            {year} © Al Amal Center. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
