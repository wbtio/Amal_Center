import Link from "next/link";

import { getServerLanguage } from "@/lib/server-language";
import { getOrdersForUser, requireAuthenticatedUser } from "@/lib/storefront-data";
import {
  formatDateTime,
  formatIQD,
  getMessages,
  getOrderStatusLabel,
} from "@/lib/storefront";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const { user } = await requireAuthenticatedUser();
  const orders = await getOrdersForUser(user.id);
  const completedOrders = orders.filter((order) => order.status === "delivered");

  return (
    <div className="space-y-10">
      <section className="soft-panel px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="text-start">
          <p className="eyebrow">{messages.orders.title}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
            {messages.orders.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
            {language === "ar"
              ? "سجل كامل للطلبات المرتبطة بحسابك، مع الحالة والقيمة وتاريخ الإنشاء."
              : "A complete record of the orders linked to your account, including status, value, and creation date."}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="soft-panel px-6 py-6">
          <p className="eyebrow">{language === "ar" ? "كل الطلبات" : "All orders"}</p>
          <p className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
            {orders.length}
          </p>
        </div>
        <div className="soft-panel px-6 py-6">
          <p className="eyebrow">
            {language === "ar" ? "مكتملة" : "Delivered"}
          </p>
          <p className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
            {completedOrders.length}
          </p>
        </div>
        <div className="soft-panel px-6 py-6">
          <p className="eyebrow">{language === "ar" ? "الأحدث" : "Latest"}</p>
          <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
            {orders[0]
              ? formatDateTime(orders[0].created_at, language)
              : language === "ar"
                ? "لا يوجد"
                : "None"}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="soft-panel block px-6 py-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-premium"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                <div className="text-start">
                  <p className="text-xl font-semibold text-[#1D1D1F]">
                    #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    {formatDateTime(order.created_at, language)}
                  </p>
                </div>
                <div className="text-start">
                  <span className="inline-flex rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                    {getOrderStatusLabel(order.status, language)}
                  </span>
                </div>
                <div className="text-start">
                  <p className="text-2xl font-semibold text-[#1D1D1F]">
                    {formatIQD(order.total_iqd, language)}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="soft-panel px-6 py-14 text-center text-slate-500">
            {messages.orders.empty}
          </div>
        )}
      </section>
    </div>
  );
}
