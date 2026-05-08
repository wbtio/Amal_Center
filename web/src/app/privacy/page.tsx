import type { Metadata } from "next";
import { getServerLanguage } from "@/lib/server-language";
import { APP_CONFIG } from "../../../../constants/app";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Privacy Policy — الأمل سنتر",
  description: "Privacy Policy for Al-Amal Center mobile app and website.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const language = await getServerLanguage();
  const isRTL = language === "ar";

  const sections = isRTL
    ? [
        {
          title: "البيانات التي نجمعها",
          content:
            "الاسم الكامل، رقم الهاتف، البريد الإلكتروني، عنوان التوصيل، صورة الملف الشخصي (اختياري). نحن لا نجمع بيانات موقعك إلا عند استخدامك لميزة تحديد العنوان على الخريطة.",
        },
        {
          title: "كيف نستخدم بياناتك",
          content:
            "معالجة الطلبات وتوصيلها، التواصل معك بخصوص حالة طلباتك، إرسال إشعارات العروض والتخفيضات (يمكنك إيقافها في أي وقت من إعدادات الإشعارات)، تحسين تجربة التسوق والتوصيل.",
        },
        {
          title: "تخزين البيانات وحمايتها",
          content:
            "يتم تخزين بياناتك بشكل آمن على خوادم Supabase المشفرة. نستخدم بروتوكولات HTTPS لجميع الاتصالات. لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية. نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب ما يتطلبه القانون.",
        },
        {
          title: "ملفات تعريف الارتباط (Cookies)",
          content:
            "نستخدم ملفات تعريف الارتباط لتخزين تفضيلات اللغة والعملة وتحسين تجربة التصفح. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح.",
        },
        {
          title: "حقوقك",
          content:
            "يمكنك الوصول إلى بياناتك وتعديلها من إعدادات الملف الشخصي في التطبيق. يمكنك حذف حسابك بالكامل في أي وقت من خلال صفحة 'حذف الحساب'. يمكنك إيقاف الإشعارات في أي وقت. يمكنك طلب نسخة من بياناتك بالتواصل معنا.",
        },
        {
          title: "مشاركة البيانات",
          content:
            "قد نشارك بياناتك مع مقدمي الخدمات الضروريين لتشغيل التطبيق (مثل خدمات التوصيل وبوابات الدفع) وذلك بقدر ما يلزم لتقديم الخدمة. نلتزم بالامتثال لأي طلب قانوني من السلطات المختصة.",
        },
        {
          title: "الاتصال بنا",
          content: `لأي استفسار حول سياسة الخصوصية، تواصل معنا عبر البريد الإلكتروني: ${APP_CONFIG.SUPPORT_EMAIL} أو واتساب: ${APP_CONFIG.WHATSAPP_NUMBER}`,
        },
      ]
    : [
        {
          title: "Data We Collect",
          content:
            "Full name, phone number, email address, delivery address, profile photo (optional). We do not collect your location data unless you use the map address feature.",
        },
        {
          title: "How We Use Your Data",
          content:
            "Processing and delivering orders, contacting you about your order status, sending promotional notifications (you can disable them anytime from notification settings), improving your shopping and delivery experience.",
        },
        {
          title: "Data Storage & Protection",
          content:
            "Your data is securely stored on encrypted Supabase servers. We use HTTPS protocols for all communications. We do not sell or share your personal data with third parties for marketing purposes. We retain your data as long as your account is active or as required by law.",
        },
        {
          title: "Cookies",
          content:
            "We use cookies to store language and currency preferences and improve your browsing experience. You can disable cookies in your browser settings.",
        },
        {
          title: "Your Rights",
          content:
            "You can access and modify your data from the profile settings in the app. You can delete your account completely at any time through the 'Delete Account' page. You can disable notifications at any time. You can request a copy of your data by contacting us.",
        },
        {
          title: "Data Sharing",
          content:
            "We may share your data with service providers necessary to operate the app (such as delivery services and payment gateways) only to the extent required to provide the service. We comply with any lawful request from competent authorities.",
        },
        {
          title: "Contact Us",
          content: `For any privacy-related inquiries, contact us at: ${APP_CONFIG.SUPPORT_EMAIL} or WhatsApp: ${APP_CONFIG.WHATSAPP_NUMBER}`,
        },
      ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-start">
        <p className="eyebrow">
          {isRTL ? "الأمل سنتر" : "Al-Amal Center"}
        </p>
        <h1 className="section-heading mt-3">
          {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          {isRTL
            ? "آخر تحديث: يناير 2026. في الأمل سنتر، نأخذ خصوصيتك على محمل الجد. توضح هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها عند استخدامك لتطبيقنا وموقعنا."
            : "Last updated: January 2026. At Al-Amal Center, we take your privacy seriously. This policy explains how we collect, use, and protect your data when you use our app and website."}
        </p>
      </div>

      {sections.map((section, index) => (
        <section key={index} className="soft-panel space-y-3 px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-base font-semibold text-[#1D1D1F] sm:text-lg">
            {index + 1}. {section.title}
          </h2>
          <p className="text-sm leading-7 text-slate-500 sm:text-base">
            {section.content}
          </p>
        </section>
      ))}
    </div>
  );
}
