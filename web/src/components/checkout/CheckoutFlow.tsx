"use client";

import {
  CheckCircle2,
  CreditCard,
  MapPin,
  ReceiptText,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { useSupabaseSession } from "@/components/providers/SupabaseSessionProvider";
import {
  DEFAULT_DELIVERY_COST_IQD,
  EXCHANGE_RATE,
  formatIQD,
  getAddressTypeLabel,
  getPaymentMethodLabel,
  getProductName,
  PHONE_REGEX,
} from "@/lib/storefront";
import type { Address, PaymentMethod, Product, Profile } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

type CheckoutFlowProps = {
  profile: Profile | null;
  addresses: Address[];
};

type CheckoutAddressState = {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  notes: string;
};

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  icon: typeof Wallet;
  disabled?: boolean;
}[] = [
  { id: "cod", icon: Wallet },
  { id: "card", icon: CreditCard, disabled: true },
];

export function CheckoutFlow({ profile, addresses }: CheckoutFlowProps) {
  const router = useRouter();
  const { language, messages, t } = useStorefront();
  const { supabase, user } = useSupabaseSession();
  // Supabase's client-side typed insert helpers resolve to `never` for this shared schema setup.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { items, totalIQD, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((address) => address.is_default)?.id ?? addresses[0]?.id ?? null
  );
  const [saveAddress, setSaveAddress] = useState(addresses.length === 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const defaultAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    addresses.find((address) => address.is_default) ??
    addresses[0];

  const [address, setAddress] = useState<CheckoutAddressState>({
    fullName: profile?.full_name ?? defaultAddress?.name ?? "",
    phone: profile?.phone ?? defaultAddress?.phone ?? "",
    city: defaultAddress?.city ?? "Baghdad",
    area: defaultAddress?.area ?? "",
    street: defaultAddress?.street ?? "",
    notes: "",
  });

  const steps = [
    { title: messages.checkout.address, icon: MapPin },
    { title: messages.checkout.payment, icon: CreditCard },
    { title: messages.checkout.review, icon: ReceiptText },
  ];

  if (items.length === 0) {
    return (
      <div className="soft-panel flex flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="text-2xl font-semibold text-[#1D1D1F]">
          {t("checkout.emptyCart")}
        </p>
        <Link href="/products" className="pill-button-primary">
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  function updateAddress<K extends keyof CheckoutAddressState>(
    key: K,
    value: CheckoutAddressState[K]
  ) {
    setSelectedAddressId(null);
    setAddress((current) => ({ ...current, [key]: value }));
  }

  function selectSavedAddress(savedAddress: Address) {
    setSelectedAddressId(savedAddress.id);
    setAddress({
      fullName: savedAddress.name,
      phone: savedAddress.phone,
      city: savedAddress.city,
      area: savedAddress.area,
      street: savedAddress.street,
      notes: "",
    });
  }

  function validateAddressStep() {
    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.city.trim() ||
      !address.area.trim() ||
      !address.street.trim()
    ) {
      setError(
        language === "ar"
          ? "يرجى إكمال بيانات العنوان أولاً."
          : "Please complete the delivery address first."
      );
      return false;
    }

    if (!PHONE_REGEX.test(address.phone.trim())) {
      setError(
        language === "ar"
          ? "يرجى إدخال رقم هاتف عراقي صحيح."
          : "Please enter a valid Iraqi phone number."
      );
      return false;
    }

    return true;
  }

  async function rollbackStocks(
    stockRollbackItems: Array<{ id: string; previousQuantity: number }>
  ) {
    for (const item of stockRollbackItems) {
      await db
        .from("products")
        .update({ stock_quantity: item.previousQuantity })
        .eq("id", item.id)
        .eq("is_active", true);
    }
  }

  async function confirmOrder() {
    if (!validateAddressStep()) {
      setStep(0);
      return;
    }

    if (!user) {
      router.replace("/auth/login?next=/checkout");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const productIds = items.map((item) => item.product.id);
    const { data: liveProducts, error: productsError } = await db
      .from("products")
      .select("*")
      .in("id", productIds)
      .eq("is_active", true);

    if (productsError || !liveProducts) {
      setIsSubmitting(false);
      setError(
        language === "ar"
          ? "تعذر تحميل بيانات المنتجات الحالية."
          : "Unable to load the latest product data."
      );
      return;
    }

    const liveProductRows = liveProducts as Product[];
    const productMap = new Map(
      liveProductRows.map((product: Product) => [product.id, product])
    );

    for (const item of items) {
      const liveProduct = productMap.get(item.product.id);

      if (!liveProduct) {
        setIsSubmitting(false);
        setError(
          language === "ar"
            ? "بعض المنتجات لم تعد متاحة."
            : "Some products are no longer available."
        );
        return;
      }

      if (liveProduct.stock_quantity < item.quantity) {
        setIsSubmitting(false);
        setError(
          language === "ar"
            ? `الكمية المطلوبة غير متوفرة للمنتج ${getProductName(liveProduct, language)}.`
            : `The requested quantity is no longer available for ${getProductName(liveProduct, language)}.`
        );
        return;
      }
    }

    const stockRollbackItems: Array<{ id: string; previousQuantity: number }> = [];

    for (const item of items) {
      const liveProduct = productMap.get(item.product.id)!;

      const { data: updatedProduct, error: updateError } = await db
        .from("products")
        .update({ stock_quantity: liveProduct.stock_quantity - item.quantity })
        .eq("id", liveProduct.id)
        .eq("is_active", true)
        .eq("stock_quantity", liveProduct.stock_quantity)
        .select("id, stock_quantity")
        .maybeSingle();

      if (updateError || !updatedProduct) {
        await rollbackStocks(stockRollbackItems);
        setIsSubmitting(false);
        setError(
          language === "ar"
            ? "تعذر تحديث المخزون. يرجى المحاولة مرة أخرى."
            : "Unable to update stock. Please try again."
        );
        return;
      }

      stockRollbackItems.push({
        id: liveProduct.id,
        previousQuantity: liveProduct.stock_quantity,
      });
    }

    const subtotal = items.reduce((sum, item) => {
      const liveProduct = productMap.get(item.product.id)!;
      return sum + liveProduct.price_iqd * item.quantity;
    }, 0);

    const orderTotalIQD = subtotal + DEFAULT_DELIVERY_COST_IQD;
    const deliveryAddress = [address.city, address.area, address.street]
      .filter(Boolean)
      .join("، ");

    const { data: order, error: orderError } = await db
      .from("orders")
      .insert({
        user_id: user.id,
        total_iqd: orderTotalIQD,
        total_usd: orderTotalIQD / EXCHANGE_RATE,
        delivery_cost_iqd: DEFAULT_DELIVERY_COST_IQD,
        coupon_id: null,
        coupon_code: null,
        discount_amount: 0,
        status: "pending",
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cod" ? "pending" : "awaiting_payment",
        delivery_type: "scheduled",
        delivery_address: deliveryAddress,
        delivery_phone: address.phone.trim(),
        customer_name: address.fullName.trim(),
        customer_notes: address.notes.trim() || null,
      })
      .select("*")
      .single();

    if (orderError || !order) {
      await rollbackStocks(stockRollbackItems);
      setIsSubmitting(false);
      setError(
        language === "ar"
          ? "تعذر إنشاء الطلب."
          : "Unable to create the order."
      );
      return;
    }

    const orderItems = items.map((item) => {
      const liveProduct = productMap.get(item.product.id)!;

      return {
        order_id: order.id,
        product_id: liveProduct.id,
        quantity: item.quantity,
        price_iqd: liveProduct.price_iqd,
        price_usd: liveProduct.price_iqd / EXCHANGE_RATE,
        product_snapshot: {
          name: liveProduct.name,
          name_ar: liveProduct.name_ar,
          image_url: liveProduct.image_url,
        },
      };
    });

    const { error: itemsError } = await db
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      await db.from("orders").delete().eq("id", order.id);
      await rollbackStocks(stockRollbackItems);
      setIsSubmitting(false);
      setError(
        language === "ar"
          ? "تم إنشاء الطلب لكن تعذر حفظ عناصره."
          : "The order was created, but its line items could not be saved."
      );
      return;
    }

    if (saveAddress && !selectedAddressId) {
      await db.from("addresses").insert({
        user_id: user.id,
        name: address.fullName.trim(),
        city: address.city.trim(),
        area: address.area.trim(),
        street: address.street.trim(),
        phone: address.phone.trim(),
        type: "home",
        is_default: addresses.length === 0,
      });
    }

    clearCart();
    setIsSubmitting(false);
    router.replace(`/account/orders/${order.id}`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="soft-panel p-5 sm:p-6">
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const active = index === step;
            const complete = index < step;

            return (
              <div
                key={item.title}
                className={cn(
                  "flex items-center gap-3 rounded-[2rem] px-4 py-4 transition",
                  active || complete
                    ? "bg-[#1D1D1F] text-white"
                    : "bg-slate-50 text-slate-500"
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <Icon size={18} />
                </span>
                <div className="text-start">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-white/70">
                    {complete
                      ? language === "ar"
                        ? "مكتمل"
                        : "Completed"
                      : active
                        ? language === "ar"
                          ? "الخطوة الحالية"
                          : "Current step"
                        : language === "ar"
                          ? "لاحقاً"
                          : "Up next"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-6">
          {step === 0 ? (
            <div className="soft-panel p-6 sm:p-8">
              <div className="text-start">
                <p className="eyebrow">{messages.checkout.address}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
                  {language === "ar"
                    ? "اختر عنوان التوصيل"
                    : "Choose the delivery address"}
                </h2>
              </div>

              <div className="mt-8 space-y-4">
                {addresses.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((savedAddress) => {
                      const selected = selectedAddressId === savedAddress.id;

                      return (
                        <button
                          key={savedAddress.id}
                          type="button"
                          onClick={() => selectSavedAddress(savedAddress)}
                          className={cn(
                            "rounded-[2rem] border px-5 py-5 text-sm transition",
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-slate-100 bg-slate-50 hover:border-primary/20",
                            "text-start"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-base font-semibold text-[#1D1D1F]">
                              {savedAddress.name}
                            </p>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                              {getAddressTypeLabel(savedAddress.type, language)}
                            </span>
                          </div>
                          <p className="mt-3 leading-7 text-slate-500">
                            {[savedAddress.city, savedAddress.area, savedAddress.street]
                              .filter(Boolean)
                              .join("، ")}
                          </p>
                          <p className="mt-3 text-slate-500">{savedAddress.phone}</p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[2rem] bg-slate-50 px-5 py-5 text-sm text-slate-500">
                    {messages.checkout.noSavedAddresses}
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <input
                  value={address.fullName}
                  onChange={(event) =>
                    updateAddress("fullName", event.target.value)
                  }
                  placeholder={language === "ar" ? "الاسم الكامل" : "Full name"}
                  className="field-input"
                />
                <input
                  value={address.phone}
                  onChange={(event) => updateAddress("phone", event.target.value)}
                  placeholder={language === "ar" ? "رقم الهاتف" : "Phone number"}
                  className="field-input"
                  dir="ltr"
                />
                <input
                  value={address.city}
                  onChange={(event) => updateAddress("city", event.target.value)}
                  placeholder={language === "ar" ? "المدينة" : "City"}
                  className="field-input"
                />
                <input
                  value={address.area}
                  onChange={(event) => updateAddress("area", event.target.value)}
                  placeholder={language === "ar" ? "المنطقة" : "Area"}
                  className="field-input"
                />
                <input
                  value={address.street}
                  onChange={(event) => updateAddress("street", event.target.value)}
                  placeholder={language === "ar" ? "الشارع" : "Street"}
                  className="field-input md:col-span-2"
                />
                <textarea
                  value={address.notes}
                  onChange={(event) => updateAddress("notes", event.target.value)}
                  placeholder={
                    language === "ar"
                      ? "ملاحظات إضافية للسائق"
                      : "Extra delivery notes"
                  }
                  className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-[#1D1D1F] outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10 md:col-span-2"
                />
              </div>

              <label
                className="mt-6 flex items-center gap-3 text-sm text-slate-500"
              >
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(event) => setSaveAddress(event.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                />
                <span>
                  {language === "ar"
                    ? "احفظ هذا العنوان للاستخدام لاحقاً"
                    : "Save this address for later"}
                </span>
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="soft-panel p-6 sm:p-8">
              <div className="text-start">
                <p className="eyebrow">{messages.checkout.payment}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
                  {language === "ar"
                    ? "اختر طريقة الدفع"
                    : "Select a payment method"}
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {PAYMENT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const active = paymentMethod === option.id;
                  const disabled = option.disabled === true;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        if (!disabled) {
                          setPaymentMethod(option.id);
                        }
                      }}
                      disabled={disabled}
                      className={cn(
                        "rounded-[2rem] border px-5 py-6 transition",
                        active
                          ? "border-primary bg-primary/5"
                          : disabled
                            ? "cursor-not-allowed border-slate-100 bg-slate-50/80 opacity-70"
                            : "border-slate-100 bg-slate-50 hover:border-primary/20",
                        "text-start"
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                          <Icon size={18} className="text-[#1D1D1F]" />
                        </span>
                        {active ? (
                          <CheckCircle2 size={18} className="text-primary" />
                        ) : null}
                      </div>
                      <p className="mt-5 text-base font-semibold text-[#1D1D1F]">
                        {getPaymentMethodLabel(option.id, language)}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {option.id === "card"
                          ? language === "ar"
                            ? "الدفع الإلكتروني قريباً."
                            : "Electronic payment coming soon."
                          : language === "ar"
                            ? "مناسب لطلبات المتجر اليومية."
                            : "Suitable for everyday store orders."}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="soft-panel p-6 sm:p-8">
              <div className="text-start">
                <p className="eyebrow">{messages.checkout.review}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
                  {language === "ar" ? "راجع الطلب" : "Review the order"}
                </h2>
              </div>

              <div className="mt-8 grid gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-4 rounded-[2rem] bg-slate-50 px-5 py-4"
                  >
                    <div className="text-start">
                      <p className="text-base font-semibold text-[#1D1D1F]">
                        {getProductName(item.product, language)}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.quantity} × {formatIQD(item.product.price_iqd, language)}
                      </p>
                    </div>
                    <p className="text-base font-semibold text-[#1D1D1F]">
                      {formatIQD(item.product.price_iqd * item.quantity, language)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-slate-50 px-5 py-5">
                  <p className="eyebrow">{messages.checkout.address}</p>
                  <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                    {address.fullName}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {[address.city, address.area, address.street]
                      .filter(Boolean)
                      .join("، ")}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{address.phone}</p>
                </div>
                <div className="rounded-[2rem] bg-slate-50 px-5 py-5">
                  <p className="eyebrow">{messages.checkout.payment}</p>
                  <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                    {getPaymentMethodLabel(paymentMethod, language)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {address.notes.trim()
                      ? address.notes
                      : language === "ar"
                        ? "لا توجد ملاحظات إضافية."
                        : "No additional notes."}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[2rem] bg-rose-50 px-5 py-4 text-sm text-danger">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 justify-end">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((current) => current - 1)}
                className="pill-button-ghost"
              >
                {messages.checkout.previous}
              </button>
            ) : null}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0 && !validateAddressStep()) {
                    return;
                  }
                  setError("");
                  setStep((current) => current + 1);
                }}
                className="pill-button-primary"
              >
                {messages.checkout.next}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void confirmOrder()}
                disabled={isSubmitting}
                className="pill-button-primary"
              >
                {isSubmitting
                  ? language === "ar"
                    ? "جارٍ تأكيد الطلب"
                    : "Confirming order"
                  : language === "ar"
                    ? "تأكيد الطلب"
                    : "Confirm order"}
              </button>
            )}
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
          <div className="soft-panel p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(totalIQD, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "التوصيل" : "Delivery"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(DEFAULT_DELIVERY_COST_IQD, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{language === "ar" ? "الخصم" : "Discount"}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatIQD(0, language)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-base font-medium text-slate-500">
                  {language === "ar" ? "الإجمالي النهائي" : "Final total"}
                </span>
                <span className="text-2xl font-semibold text-[#1D1D1F]">
                  {formatIQD(totalIQD + DEFAULT_DELIVERY_COST_IQD, language)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
