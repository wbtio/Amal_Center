import type { Metadata } from "next";
import { getServerLanguage } from "@/lib/server-language";

export const metadata: Metadata = {
  title: "شروط الاستخدام | Terms of Service — الأمل سنتر",
  description: "Terms of Service for Al-Amal Center mobile app and website.",
};

export const dynamic = "force-dynamic";

export default async function TermsOfServicePage() {
  const language = await getServerLanguage();
  const isRTL = language === "ar";

  const sections = isRTL
    ? [
        {
          title: "القبول بالشروط",
          content:
            "باستخدام تطبيق الأمل سنتر أو موقعه الإلكتروني، فإنك توافق على هذه الشروط. إذا لم توافق على أي جزء منها، يرجى عدم استخدام التطبيق.",
        },
        {
          title: "الطلب والدفع",
          content:
            "يمكنك الطلب عبر التطبيق والدفع عند الاستلام أو بالبطاقة البنكية. يجب أن يكون الطلب ضمن الحد الأدنى المحدد للطلب. نحتفظ بحق إلغاء أي طلب مشبوه أو احتيالي. الأسعار المعروضة قابلة للتغيير دون إشعار مسبق.",
        },
        {
          title: "سياسة الاسترجاع والاستبدال",
          content:
            "يمكنك إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام بشرط أن تكون في حالتها الأصلية وغير مفتوحة. المنتجات الغذائية القابلة للتلف غير قابلة للإرجاع. لطلب استرجاع، تواصل مع خدمة العملاء عبر واتساب أو الهاتف.",
        },
        {
          title: "التوصيل والشحن",
          content:
            "التوصيل العادي خلال 24-48 ساعة حسب المنطقة. التوصيل السريع خلال ساعتين (متوفر في مناطق محددة). التوصيل مجاني للطلبات فوق 50,000 دينار عراقي. لسنا مسؤولين عن التأخير الناتج عن ظروف قاهرة.",
        },
        {
          title: "استخدام الكوبونات والعروض",
          content:
            "الكوبونات صالحة للاستخدام مرة واحدة لكل مستخدم ما لم ينص على خلاف ذلك. لا يمكن الجمع بين أكثر من كوبون في طلب واحد. نحتفظ بحق إلغاء أو تعديل العروض في أي وقت.",
        },
        {
          title: "حساب المستخدم",
          content:
            "أنت مسؤول عن الحفاظ على سرية بيانات حسابك. يجب تقديم معلومات صحيحة عند التسجيل. نحتفظ بحق تعليق أو إغلاق أي حساب ينتهك هذه الشروط.",
        },
        {
          title: "المسؤولية",
          content:
            "نسعى لتقديم أفضل خدمة، لكننا غير مسؤولين عن الأضرار غير المباشرة الناتجة عن استخدام التطبيق. مسؤوليتنا القصوى لا تتجاوز قيمة الطلب المعني.",
        },
        {
          title: "التعديلات",
          content:
            "نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية عبر التطبيق. استمرارك في استخدام التطبيق بعد التعديل يعني موافقتك على الشروط المحدثة.",
        },
      ]
    : [
        {
          title: "Acceptance of Terms",
          content:
            "By using the Al-Amal Center app or website, you agree to these terms. If you do not agree with any part, please do not use the app.",
        },
        {
          title: "Ordering & Payment",
          content:
            "You can order through the app and pay on delivery or by card. Orders must meet the minimum amount requirement. We reserve the right to cancel any suspicious or fraudulent orders. Displayed prices are subject to change without prior notice.",
        },
        {
          title: "Return & Exchange Policy",
          content:
            "You can return products within 7 days of receipt provided they are in their original, unopened condition. Perishable food products are non-returnable. To request a return, contact customer service via WhatsApp or phone.",
        },
        {
          title: "Delivery & Shipping",
          content:
            "Standard delivery within 24-48 hours depending on the area. Express delivery within 2 hours (available in select areas). Free delivery for orders over 50,000 IQD. We are not responsible for delays caused by force majeure.",
        },
        {
          title: "Coupons & Offers",
          content:
            "Coupons are valid for one use per user unless otherwise stated. Multiple coupons cannot be combined in a single order. We reserve the right to cancel or modify offers at any time.",
        },
        {
          title: "User Account",
          content:
            "You are responsible for keeping your account credentials confidential. You must provide accurate information when registering. We reserve the right to suspend or close any account that violates these terms.",
        },
        {
          title: "Liability",
          content:
            "We strive to provide the best service, but we are not responsible for indirect damages resulting from the use of the app. Our maximum liability does not exceed the value of the relevant order.",
        },
        {
          title: "Changes",
          content:
            "We reserve the right to modify these terms at any time. You will be notified of significant changes via the app. Continued use of the app after changes means you accept the updated terms.",
        },
      ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-start">
        <p className="eyebrow">
          {isRTL ? "الأمل سنتر" : "Al-Amal Center"}
        </p>
        <h1 className="section-heading mt-3">
          {isRTL ? "شروط الاستخدام" : "Terms of Service"}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          {isRTL
            ? "آخر تحديث: يناير 2026. باستخدام تطبيق الأمل سنتر أو موقعه الإلكتروني، فإنك توافق على الشروط التالية."
            : "Last updated: January 2026. By using the Al-Amal Center app or website, you agree to the following terms."}
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
