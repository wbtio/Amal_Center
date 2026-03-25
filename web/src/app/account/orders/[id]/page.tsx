/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

import { getServerLanguage } from "@/lib/server-language";
import {
  getOrderWithItemsForUser,
  requireAuthenticatedUser,
} from "@/lib/storefront-data";
import {
  formatDateTime,
  formatIQD,
  getMessages,
  getOrderStatusLabel,
  ORDER_STATUS_STEPS,
} from "@/lib/storefront";

export const dynamic = "force-dynamic";

type OrderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const { user } = await requireAuthenticatedUser();
  const order = await getOrderWithItemsForUser(user.id, id);

  if (!order) {
    notFound();
  }

  const subtotal = (order.order_items ?? []).reduce(
    (sum, item) => sum + item.price_iqd * item.quantity,
    0
  );

  return (
    <div className="space-y-10">
      <section className="soft-panel px-5 py-8 sm:px-8 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-start">
            <p className="eyebrow">{messages.orders.details}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl">
              #{order.id.slice(0, 8)}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8">
              {formatDateTime(order.created_at, language)}
            </p>
          </div>
          <Link href="/account/orders" className="pill-button-ghost">
            {language === "ar" ? "العودة إلى الطلبات" : "Back to orders"}
          </Link>
        </div>
      </section>

      <section className="soft-panel p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="text-start">
            <p className="eyebrow">{messages.orders.status}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">
              {getOrderStatusLabel(order.status, language)}
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {ORDER_STATUS_STEPS.map((status, index) => {
            const currentIndex = ORDER_STATUS_STEPS.indexOf(order.status);
            const active = index <= currentIndex;

            return (
              <div key={status} className="flex items-center gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
                      active
                        ? "bg-[#1D1D1F] text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F]">
                      {getOrderStatusLabel(status, language)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-4">
          {(order.order_items ?? []).map((item) => {
            const snapshot = item.product_snapshot as {
              image_url?: string;
              name?: string;
              name_ar?: string;
            };

            return (
              <article
                key={item.id}
                className="soft-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-[2rem] bg-slate-50">
                    {snapshot.image_url ? (
                      <img
                        src={snapshot.image_url}
                        alt={snapshot.name_ar || snapshot.name || "Product"}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : null}
                  </div>
                  <div className="text-start">
                    <p className="text-lg font-semibold text-[#1D1D1F]">
                      {language === "ar"
                        ? snapshot.name_ar || snapshot.name || "منتج"
                        : snapshot.name || snapshot.name_ar || "Product"}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      {item.quantity} × {formatIQD(item.price_iqd, language)}
                    </p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-[#1D1D1F]">
                  {formatIQD(item.price_iqd * item.quantity, language)}
                </p>
              </article>
            );
          })}
        </section>

        <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
          <div className="soft-panel p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(subtotal, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "التوصيل" : "Delivery"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(order.delivery_cost_iqd, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "الخصم" : "Discount"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(order.discount_amount, language)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-base font-medium text-slate-500">
                  {messages.orders.total}
                </span>
                <span className="text-2xl font-semibold text-[#1D1D1F]">
                  {formatIQD(order.total_iqd, language)}
                </span>
              </div>
            </div>
          </div>

          <div className="soft-panel p-6">
            <div className="text-start">
              <p className="eyebrow">{messages.checkout.address}</p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {order.delivery_address}
              </p>
              <p className="mt-3 text-sm text-slate-500">{order.delivery_phone}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
