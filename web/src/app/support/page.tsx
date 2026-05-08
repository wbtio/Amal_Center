import type { Metadata } from "next";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { getServerLanguage } from "@/lib/server-language";
import { APP_CONFIG } from "../../../../constants/app";

export const metadata: Metadata = {
  title: "الدعم والمساعدة | Support — الأمل سنتر",
  description: "Contact Al-Amal Center support team for help with orders, deliveries, and more.",
};

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const language = await getServerLanguage();
  const isRTL = language === "ar";

  const contactMethods = [
    {
      icon: MessageCircle,
      label: isRTL ? "واتساب" : "WhatsApp",
      value: APP_CONFIG.WHATSAPP_NUMBER,
      href: APP_CONFIG.WHATSAPP_URL,
      color: "#25D366",
    },
    {
      icon: Phone,
      label: isRTL ? "هاتف" : "Phone",
      value: APP_CONFIG.WHATSAPP_NUMBER,
      href: `tel:${APP_CONFIG.WHATSAPP_NUMBER}`,
      color: "#2E7D32",
    },
    {
      icon: Mail,
      label: isRTL ? "بريد إلكتروني" : "Email",
      value: APP_CONFIG.SUPPORT_EMAIL,
      href: `mailto:${APP_CONFIG.SUPPORT_EMAIL}`,
      color: "#EA4335",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Al-Amal Center",
      href: APP_CONFIG.FACEBOOK_URL,
      color: "#1877F2",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@alamalcenter",
      href: APP_CONFIG.INSTAGRAM_URL,
      color: "#E4405F",
    },
  ];

  const faqItems = isRTL
    ? [
        {
          q: "كم تستغرق عملية التوصيل؟",
          a: "التوصيل العادي خلال 24-48 ساعة، والتوصيل السريع خلال ساعتين في المناطق المتاحة.",
        },
        {
          q: "هل يمكنني إلغاء طلبي؟",
          a: "نعم، يمكنك إلغاء طلبك إذا كان في حالة 'قيد الانتظار' أو 'تم التأكيد' فقط.",
        },
        {
          q: "ما هي سياسة الاسترجاع؟",
          a: "يمكنك إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام بشرط أن تكون في حالتها الأصلية.",
        },
        {
          q: "كيف أستخدم كوبون الخصم؟",
          a: "أدخل كود الخصم في صفحة السلة ثم اضغط 'تطبيق'. كل كوبون صالح لمرة واحدة فقط.",
        },
      ]
    : [
        {
          q: "How long does delivery take?",
          a: "Standard delivery within 24-48 hours. Express delivery within 2 hours in available areas.",
        },
        {
          q: "Can I cancel my order?",
          a: "Yes, you can cancel your order if it is in 'Pending' or 'Confirmed' status only.",
        },
        {
          q: "What is the return policy?",
          a: "You can return products within 7 days of receipt provided they are in their original condition.",
        },
        {
          q: "How do I use a discount coupon?",
          a: "Enter the coupon code on the cart page and press 'Apply'. Each coupon is valid for one use only.",
        },
      ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-start">
        <p className="eyebrow">
          {isRTL ? "الأمل سنتر" : "Al-Amal Center"}
        </p>
        <h1 className="section-heading mt-3">
          {isRTL ? "الدعم والمساعدة" : "Support & Help"}
        </h1>
      </div>

      {/* Working Hours */}
      <section className="soft-panel space-y-3 px-6 py-5 sm:px-8 sm:py-6">
        <h2 className="text-base font-semibold text-[#1D1D1F] sm:text-lg">
          {isRTL ? "ساعات العمل" : "Working Hours"}
        </h2>
        <div className="space-y-2 text-sm text-slate-500 sm:text-base">
          <p>
            {isRTL ? "السبت - الخميس: 8:00 صباحاً - 10:00 مساءً" : "Saturday - Thursday: 8:00 AM - 10:00 PM"}
          </p>
          <p>
            {isRTL ? "الجمعة: 2:00 مساءً - 10:00 مساءً" : "Friday: 2:00 PM - 10:00 PM"}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#1D1D1F] sm:text-lg">
          {isRTL ? "طرق التواصل" : "Contact Methods"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noreferrer"
              className="soft-panel group flex items-center gap-4 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-premium"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${method.color}15`, color: method.color }}
              >
                <method.icon size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-400">{method.label}</span>
                <span className="block truncate text-sm font-semibold text-[#1D1D1F]">{method.value}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Branches */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#1D1D1F] sm:text-lg">
          {isRTL ? "فروعنا" : "Our Branches"}
        </h2>
        <div className="grid gap-3">
          {APP_CONFIG.BRANCH_LOCATIONS.map((branch) => (
            <a
              key={branch.href}
              href={branch.href}
              target="_blank"
              rel="noreferrer"
              className="soft-panel group flex items-center gap-4 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-premium"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#1D1D1F]">
                  {isRTL ? branch.label_ar : branch.label_en}
                </span>
                <span className="block text-xs text-slate-400">
                  {isRTL ? "فتح في Google Maps" : "Open in Google Maps"}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#1D1D1F] sm:text-lg">
          {isRTL ? "أسئلة شائعة" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="soft-panel space-y-2 px-6 py-4">
              <p className="text-sm font-semibold text-[#1D1D1F]">{item.q}</p>
              <p className="text-sm leading-6 text-slate-500">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Links */}
      <section className="soft-panel flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/privacy"
          className="text-sm text-primary transition hover:underline"
        >
          {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
        </Link>
        <Link
          href="/terms"
          className="text-sm text-primary transition hover:underline"
        >
          {isRTL ? "شروط الاستخدام" : "Terms of Service"}
        </Link>
      </section>
    </div>
  );
}
