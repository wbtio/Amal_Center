"use client";

import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { cn } from "@/lib/utils";

import { APP_CONFIG } from "../../../../constants/app";

const QUICK_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.products" },
  { href: "/cart", key: "nav.cart" },
  { href: "/account", key: "nav.account" },
];

export function Footer() {
  const { isRTL, t } = useStorefront();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 pb-8">
      <div className="page-shell">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-[1.6rem] bg-slate-50 px-3 py-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-lg font-bold text-white shadow-button">
                  أ
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
                  href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-3 transition hover:text-[#1D1D1F]"
                >
                  <Mail size={16} />
                  <span>{APP_CONFIG.SUPPORT_EMAIL}</span>
                </a>

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
