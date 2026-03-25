/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Camera,
  LogOut,
  MapPin,
  Package,
  Star,
  Trash2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { useSupabaseSession } from "@/components/providers/SupabaseSessionProvider";
import {
  formatDateTime,
  formatIQD,
  getAddressTypeLabel,
  getOrderStatusLabel,
} from "@/lib/storefront";
import type { Address, Order, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

type AccountDashboardProps = {
  userId: string;
  userEmail: string;
  initialProfile: Profile | null;
  initialOrders: Order[];
  initialAddresses: Address[];
  initialTab: "profile" | "orders" | "addresses";
};

type AddressFormState = {
  name: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  type: Address["type"];
};

const EMPTY_ADDRESS_FORM: AddressFormState = {
  name: "",
  phone: "",
  city: "",
  area: "",
  street: "",
  type: "home",
};

export function AccountDashboard({
  userId,
  userEmail,
  initialProfile,
  initialOrders,
  initialAddresses,
  initialTab,
}: AccountDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { supabase } = useSupabaseSession();
  // Supabase's client-side typed insert helpers resolve to `never` for this shared schema setup.
  // We keep writes local to this wrapper while preserving runtime behavior.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { language } = useStorefront();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [orders] = useState(initialOrders);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [profileForm, setProfileForm] = useState({
    fullName: initialProfile?.full_name ?? "",
    phone: initialProfile?.phone ?? "",
  });
  const [addressForm, setAddressForm] =
    useState<AddressFormState>(EMPTY_ADDRESS_FORM);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isPending, startRouteTransition] = useTransition();
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  function setTab(tab: "profile" | "orders" | "addresses") {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    setActiveTab(tab);
    startRouteTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function showNotice(message: string) {
    setError("");
    setNotice(message);
  }

  function showError(message: string) {
    setNotice("");
    setError(message);
  }

  async function saveProfile() {
    setIsSavingProfile(true);
    setNotice("");
    setError("");

    const { data, error: updateError } = await db
      .from("profiles")
      .upsert({
        id: userId,
        full_name: profileForm.fullName.trim() || null,
        phone: profileForm.phone.trim() || null,
        avatar_url: profile?.avatar_url ?? null,
      })
      .select("*")
      .single();

    setIsSavingProfile(false);

    if (updateError) {
      showError(
        language === "ar"
          ? "تعذر تحديث الملف الشخصي."
          : "Unable to update the profile."
      );
      return;
    }

    setProfile(data);
    showNotice(
      language === "ar"
        ? "تم تحديث الملف الشخصي بنجاح."
        : "Profile updated successfully."
    );
    router.refresh();
  }

  function extractFileNameFromUrl(url: string) {
    const parts = url.split("/avatars/");
    if (parts.length < 2) {
      return null;
    }

    return parts[1]?.split("?")[0] ?? null;
  }

  async function removeOldAvatar(oldUrl: string | null) {
    if (!oldUrl) {
      return;
    }

    const fileName = extractFileNameFromUrl(oldUrl);
    if (!fileName) {
      return;
    }

    await supabase.storage.from("avatars").remove([fileName]);
  }

  async function uploadAvatar(file: File) {
    setIsUploadingAvatar(true);
    setNotice("");
    setError("");

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${userId}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      setIsUploadingAvatar(false);
      showError(
        language === "ar"
          ? "تعذر رفع الصورة."
          : "Unable to upload the avatar."
      );
      return;
    }

    await removeOldAvatar(profile?.avatar_url ?? null);

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    const { data, error: updateError } = await db
      .from("profiles")
      .upsert({
        id: userId,
        full_name: profileForm.fullName.trim() || null,
        phone: profileForm.phone.trim() || null,
        avatar_url: publicUrl,
      })
      .select("*")
      .single();

    setIsUploadingAvatar(false);

    if (updateError) {
      showError(
        language === "ar"
          ? "تم رفع الصورة لكن تعذر تحديث الملف الشخصي."
          : "Avatar uploaded, but profile update failed."
      );
      return;
    }

    setProfile(data);
    showNotice(
      language === "ar"
        ? "تم تحديث الصورة الشخصية."
        : "Avatar updated successfully."
    );
    router.refresh();
  }

  async function addAddress() {
    setIsSavingAddress(true);
    setNotice("");
    setError("");

    const payload = {
      user_id: userId,
      name: addressForm.name.trim(),
      phone: addressForm.phone.trim(),
      city: addressForm.city.trim(),
      area: addressForm.area.trim(),
      street: addressForm.street.trim(),
      type: addressForm.type,
      is_default: addresses.length === 0,
    };

    const { data, error: insertError } = await db
      .from("addresses")
      .insert(payload)
      .select("*")
      .single();

    setIsSavingAddress(false);

    if (insertError) {
      showError(
        language === "ar"
          ? "تعذر حفظ العنوان."
          : "Unable to save the address."
      );
      return;
    }

    setAddresses((current) =>
      [data, ...current].sort((left, right) =>
        left.is_default === right.is_default ? 0 : left.is_default ? -1 : 1
      )
    );
    setAddressForm(EMPTY_ADDRESS_FORM);
    showNotice(
      language === "ar"
        ? "تمت إضافة العنوان بنجاح."
        : "Address added successfully."
    );
    router.refresh();
  }

  async function setDefaultAddress(addressId: string) {
    setNotice("");
    setError("");

    const unsetResponse = await db
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId);

    if (unsetResponse.error) {
      showError(
        language === "ar"
          ? "تعذر تحديث العنوان الافتراضي."
          : "Unable to update the default address."
      );
      return;
    }

    const setResponse = await db
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId);

    if (setResponse.error) {
      showError(
        language === "ar"
          ? "تعذر تعيين هذا العنوان كافتراضي."
          : "Unable to set this address as default."
      );
      return;
    }

    setAddresses((current) =>
      current
        .map((address) => ({
          ...address,
          is_default: address.id === addressId,
        }))
        .sort((left, right) =>
          left.is_default === right.is_default ? 0 : left.is_default ? -1 : 1
        )
    );
    showNotice(
      language === "ar"
        ? "تم تعيين العنوان الافتراضي."
        : "Default address updated."
    );
    router.refresh();
  }

  async function deleteAddress(addressId: string) {
    setNotice("");
    setError("");

    const { error: deleteError } = await db
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (deleteError) {
      showError(
        language === "ar"
          ? "تعذر حذف العنوان."
          : "Unable to delete the address."
      );
      return;
    }

    setAddresses((current) => current.filter((address) => address.id !== addressId));
    showNotice(
      language === "ar"
        ? "تم حذف العنوان."
        : "Address deleted successfully."
    );
    router.refresh();
  }

  async function signOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
    router.replace("/");
    router.refresh();
  }

  const navItems = [
    {
      id: "profile" as const,
      label: language === "ar" ? "الملف الشخصي" : "Profile",
      icon: UserCircle2,
    },
    {
      id: "orders" as const,
      label: language === "ar" ? "الطلبات" : "Orders",
      icon: Package,
    },
    {
      id: "addresses" as const,
      label: language === "ar" ? "العناوين" : "Addresses",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="soft-panel h-fit p-4 lg:sticky lg:top-28">
        <div className="rounded-[2rem] bg-slate-50 p-5">
          <p className="eyebrow">{language === "ar" ? "حسابك" : "Your account"}</p>
          <p className="mt-3 text-xl font-semibold text-[#1D1D1F]">
            {profile?.full_name ||
              (language === "ar" ? "عميل الأمل سنتر" : "Al-Amal customer")}
          </p>
          <p className="mt-2 text-sm text-slate-500">{userEmail}</p>
        </div>

        <div className="mt-4 grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-[#1D1D1F] text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#1D1D1F]"
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={signOut}
          disabled={isSigningOut}
          className={cn(
            "mt-4 flex min-h-12 w-full items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-danger/40 hover:text-danger"
          )}
        >
          <LogOut size={18} />
          <span>
            {isSigningOut
              ? language === "ar"
                ? "جارٍ تسجيل الخروج"
                : "Signing out"
              : language === "ar"
                ? "تسجيل الخروج"
                : "Sign out"}
          </span>
        </button>
      </aside>

      <div className="space-y-6">
        <section className="soft-panel p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] bg-slate-50 px-5 py-5">
              <p className="eyebrow">{language === "ar" ? "الطلبات" : "Orders"}</p>
              <p className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
                {orders.length}
              </p>
            </div>
            <div className="rounded-[2rem] bg-slate-50 px-5 py-5">
              <p className="eyebrow">{language === "ar" ? "العناوين" : "Addresses"}</p>
              <p className="mt-3 text-3xl font-semibold text-[#1D1D1F]">
                {addresses.length}
              </p>
            </div>
            <div className="rounded-[2rem] bg-slate-50 px-5 py-5">
              <p className="eyebrow">
                {language === "ar" ? "آخر تحديث" : "Last update"}
              </p>
              <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
                {profile?.updated_at
                  ? formatDateTime(profile.updated_at, language)
                  : language === "ar"
                    ? "لا يوجد"
                    : "Not available"}
              </p>
            </div>
          </div>

          {notice ? (
            <p className="mt-5 rounded-3xl bg-primary/8 px-5 py-4 text-sm text-primary">
              {notice}
            </p>
          ) : null}
          {error ? (
            <p className="mt-5 rounded-3xl bg-rose-50 px-5 py-4 text-sm text-danger">
              {error}
            </p>
          ) : null}
        </section>

        {activeTab === "profile" ? (
          <section className="soft-panel p-6 sm:p-8">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
              <div className="rounded-[2.5rem] bg-slate-50 px-8 py-8 text-center xl:w-[320px]">
                <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile?.full_name || "Avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Star size={34} className="text-slate-300" />
                  )}
                </div>
                <label className="pill-button-ghost mt-6 w-full cursor-pointer gap-2">
                  <Camera size={16} />
                  <span>
                    {isUploadingAvatar
                      ? language === "ar"
                        ? "جارٍ الرفع"
                        : "Uploading"
                      : language === "ar"
                        ? "رفع صورة"
                        : "Upload avatar"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void uploadAvatar(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="flex-1 space-y-5">
                <div className="text-start">
                  <p className="eyebrow">
                    {language === "ar" ? "البيانات الشخصية" : "Profile details"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">
                    {language === "ar"
                      ? "حدّث معلومات الحساب"
                      : "Update account information"}
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      {language === "ar" ? "الاسم الكامل" : "Full name"}
                    </span>
                    <input
                      value={profileForm.fullName}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          fullName: event.target.value,
                        }))
                      }
                      className="field-input"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      {language === "ar" ? "رقم الهاتف" : "Phone number"}
                    </span>
                    <input
                      value={profileForm.phone}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      className="field-input"
                      dir="ltr"
                    />
                  </label>

                  <label className="grid gap-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-600">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </span>
                    <input
                      value={userEmail}
                      disabled
                      className="field-input bg-slate-50 text-slate-400"
                      dir="ltr"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={saveProfile}
                  disabled={isSavingProfile}
                  className="pill-button-primary"
                >
                  {isSavingProfile
                    ? language === "ar"
                      ? "جارٍ الحفظ"
                      : "Saving"
                    : language === "ar"
                      ? "حفظ التغييرات"
                      : "Save changes"}
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {activeTab === "orders" ? (
          <section className="soft-panel p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="text-start">
                <p className="eyebrow">{language === "ar" ? "الطلبات" : "Orders"}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">
                  {language === "ar" ? "سجل الطلبات" : "Order history"}
                </h2>
              </div>
              <Link href="/account/orders" className="pill-button-ghost">
                {language === "ar" ? "عرض الكل" : "View all"}
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-start">
                        <p className="text-base font-semibold text-[#1D1D1F]">
                          #{order.id.slice(0, 8)}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {formatDateTime(order.created_at, language)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-start sm:text-end">
                        <span className="inline-flex rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                          {getOrderStatusLabel(order.status, language)}
                        </span>
                        <span className="text-lg font-semibold text-[#1D1D1F]">
                          {formatIQD(order.total_iqd, language)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] bg-slate-50 px-6 py-12 text-center">
                <p className="text-lg font-semibold text-[#1D1D1F]">
                  {language === "ar" ? "لا توجد طلبات بعد." : "No orders yet."}
                </p>
              </div>
            )}
          </section>
        ) : null}

        {activeTab === "addresses" ? (
          <section className="soft-panel p-6 sm:p-8">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="text-start">
                  <p className="eyebrow">
                    {language === "ar" ? "العناوين" : "Addresses"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">
                    {language === "ar"
                      ? "العناوين المحفوظة"
                      : "Saved delivery addresses"}
                  </h2>
                </div>

                <div className="mt-6 grid gap-4">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <article
                        key={address.id}
                        className="rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="text-start">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-base font-semibold text-[#1D1D1F]">
                                {address.name}
                              </p>
                              {address.is_default ? (
                                <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                                  {language === "ar" ? "افتراضي" : "Default"}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-500">
                              {[address.city, address.area, address.street]
                                .filter(Boolean)
                                .join("، ")}
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                              {address.phone}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                              {getAddressTypeLabel(address.type, language)}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {!address.is_default ? (
                              <button
                                type="button"
                                onClick={() => void setDefaultAddress(address.id)}
                                className="pill-button-ghost"
                              >
                                {language === "ar"
                                  ? "تعيين كافتراضي"
                                  : "Set default"}
                              </button>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => void deleteAddress(address.id)}
                              className="inline-flex min-h-11 items-center justify-center rounded-full border border-rose-100 px-4 py-3 text-sm font-semibold text-danger transition hover:bg-rose-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-[2rem] bg-slate-50 px-6 py-12 text-center">
                      <p className="text-lg font-semibold text-[#1D1D1F]">
                        {language === "ar"
                          ? "لا توجد عناوين محفوظة."
                          : "No saved addresses yet."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-slate-50 p-6">
                <div className="text-start">
                  <p className="eyebrow">
                    {language === "ar" ? "عنوان جديد" : "New address"}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[#1D1D1F]">
                    {language === "ar" ? "أضف عنواناً جديداً" : "Add a new address"}
                  </h3>
                </div>

                <div className="mt-6 grid gap-4">
                  <input
                    value={addressForm.name}
                    onChange={(event) =>
                      setAddressForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder={language === "ar" ? "اسم العنوان" : "Address name"}
                    className="field-input"
                  />
                  <input
                    value={addressForm.phone}
                    onChange={(event) =>
                      setAddressForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    placeholder={language === "ar" ? "رقم الهاتف" : "Phone number"}
                    className="field-input"
                    dir="ltr"
                  />
                  <input
                    value={addressForm.city}
                    onChange={(event) =>
                      setAddressForm((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                    placeholder={language === "ar" ? "المدينة" : "City"}
                    className="field-input"
                  />
                  <input
                    value={addressForm.area}
                    onChange={(event) =>
                      setAddressForm((current) => ({
                        ...current,
                        area: event.target.value,
                      }))
                    }
                    placeholder={language === "ar" ? "المنطقة" : "Area"}
                    className="field-input"
                  />
                  <input
                    value={addressForm.street}
                    onChange={(event) =>
                      setAddressForm((current) => ({
                        ...current,
                        street: event.target.value,
                      }))
                    }
                    placeholder={language === "ar" ? "الشارع" : "Street"}
                    className="field-input"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAddressForm((current) => ({
                          ...current,
                          type: "home",
                        }))
                      }
                      className={cn(
                        "pill-button",
                        addressForm.type === "home"
                          ? "bg-[#1D1D1F] text-white"
                          : "border border-slate-200 bg-white text-slate-600"
                      )}
                    >
                      {language === "ar" ? "المنزل" : "Home"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAddressForm((current) => ({
                          ...current,
                          type: "work",
                        }))
                      }
                      className={cn(
                        "pill-button",
                        addressForm.type === "work"
                          ? "bg-[#1D1D1F] text-white"
                          : "border border-slate-200 bg-white text-slate-600"
                      )}
                    >
                      {language === "ar" ? "العمل" : "Work"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={addAddress}
                    disabled={isSavingAddress}
                    className="pill-button-primary"
                  >
                    {isSavingAddress
                      ? language === "ar"
                        ? "جارٍ الحفظ"
                        : "Saving"
                      : language === "ar"
                        ? "حفظ العنوان"
                        : "Save address"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {isPending ? (
          <p className="text-sm text-slate-400">
            {language === "ar" ? "جارٍ تحديث الصفحة" : "Refreshing view"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
