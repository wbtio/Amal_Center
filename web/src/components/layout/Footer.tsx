"use client";

import appIcon from "../../../../assets/icon.svg";

import {
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
      viewBox="30 336.7 120.9 129.2"
      aria-hidden="true"
      className="w-5 sm:w-7"
    >
      <path
        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
        fill="#FFD400"
      />
      <path
        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
        fill="#FF3333"
      />
      <path
        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
        fill="#48FF48"
      />
      <path
        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
        fill="#3BCCFF"
      />
    </svg>
  );
}

function AppStoreMark() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="w-5 sm:w-7">
      <path
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="w-5 sm:w-7">
      <path
        fill="currentColor"
        d="m10.213 1.471l.691-1.26q.069-.124-.048-.192q-.128-.057-.195.058l-.7 1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037 5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0 0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11a.35.35 0 0 1-.263-.11a.37.37 0 0 1-.107-.264a.37.37 0 0 1 .107-.265a.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36 0 0 1 .112.265a.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11a.37.37 0 0 1-.268-.11a.36.36 0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5 11.77q0 .441.311.75q.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288a.97.97 0 0 0 .71-.288a.95.95 0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288a.97.97 0 0 0 .71-.288a.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308q.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98 0 0 0-.702.278a.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0 .293-.69V6.146a.9.9 0 0 0-.293-.685a1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9 0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69a.97.97 0 0 1-.707.284a1 1 0 0 1-.712-.284a.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68"
      />
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
    <span className="flex h-14 w-full items-center justify-start gap-3 rounded-[0.95rem] bg-black px-3.5 text-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.85)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#111]">
      <span className="flex w-7 shrink-0 items-center justify-center text-white">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[0.58rem] uppercase leading-none tracking-[0.08em] text-white/80 sm:text-[0.68rem]">
          {eyebrow}
        </span>
        <span className="mt-1 block font-sans text-base font-semibold leading-none sm:text-[1.1rem]">
          {title}
        </span>
      </span>
    </span>
  );

  if (!href) {
    return (
      <div aria-disabled="true" className="cursor-default">
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
      className="cursor-pointer"
    >
      {cardContent}
    </a>
  );
}

export function Footer() {
  const { isRTL, t } = useStorefront();
  const year = new Date().getFullYear();
  const appStoreUrl = APP_CONFIG.APP_STORE_URL.trim();
  const apkUrl = APP_CONFIG.APK_URL.trim();

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

                <div
                  lang="en"
                  dir="ltr"
                  className="rounded-[1.7rem] border border-slate-200/80 bg-white p-4 shadow-soft text-left"
                >
                  <div className="flex flex-col gap-3">
                    <StoreBadgeCard
                      href={APP_CONFIG.PLAY_STORE_URL}
                      eyebrow="GET IT ON"
                      title="Google Play"
                      icon={<GooglePlayMark />}
                    />
                    <StoreBadgeCard
                      href={appStoreUrl || undefined}
                      eyebrow="DOWNLOAD ON THE"
                      title="App Store"
                      icon={<AppStoreMark />}
                    />
                    <StoreBadgeCard
                      href={apkUrl || undefined}
                      eyebrow="DOWNLOAD"
                      title="Android APK"
                      icon={<AndroidMark />}
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
