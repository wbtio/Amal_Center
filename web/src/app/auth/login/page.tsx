"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { useSupabaseSession } from "@/components/providers/SupabaseSessionProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const { language, messages } = useStorefront();
  const { supabase } = useSupabaseSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = z.object({
    email: z.string().email(
      language === "ar" ? "يرجى إدخال بريد صحيح." : "Enter a valid email."
    ),
    password: z.string().min(
      6,
      language === "ar"
        ? "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل."
        : "Password must be at least 6 characters."
    ),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace(next);
    router.refresh();
  });

  return (
    <div className="grid min-h-[calc(100vh-14rem)] gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <section className="hidden overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#ffffff_0%,#f5f7f5_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="text-start">
          <p className="eyebrow">Al-Amal Center</p>
          <h1 className="mt-5 max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#1D1D1F]">
            {language === "ar"
              ? "سجل الدخول لتكمل طلباتك بسرعة ووضوح."
              : "Sign in to continue your orders with clarity and speed."}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            {language === "ar"
              ? "الوصول إلى الطلبات، العناوين، والحساب من نفس الواجهة الهادئة المصممة للتسوق اليومي."
              : "Access orders, addresses, and your account from the same calm interface built for everyday shopping."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white px-5 py-5 shadow-soft">
            <p className="eyebrow">
              {language === "ar" ? "تجربة أسرع" : "Faster flow"}
            </p>
            <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
              {language === "ar" ? "سلة ومتابعة طلبات" : "Cart and order tracking"}
            </p>
          </div>
          <div className="rounded-[2rem] bg-white px-5 py-5 shadow-soft">
            <p className="eyebrow">
              {language === "ar" ? "بياناتك محفوظة" : "Your data"}
            </p>
            <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
              {language === "ar" ? "عناوين وملف شخصي" : "Addresses and profile"}
            </p>
          </div>
        </div>
      </section>

      <section className="soft-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="text-start">
          <p className="eyebrow">{messages.auth.loginTitle}</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F]">
            {messages.auth.loginTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-500">
            {messages.auth.loginSubtitle}
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-600">
              {messages.auth.email}
            </span>
            <input
              type="email"
              {...register("email")}
              className="field-input"
              dir="ltr"
            />
            {errors.email ? (
              <span className="text-sm text-danger">{errors.email.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-600">
              {messages.auth.password}
            </span>
            <input
              type="password"
              {...register("password")}
              className="field-input"
              dir="ltr"
            />
            {errors.password ? (
              <span className="text-sm text-danger">{errors.password.message}</span>
            ) : null}
          </label>

          {errorMessage ? (
            <p className="rounded-[2rem] bg-rose-50 px-5 py-4 text-sm text-danger">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="pill-button-primary mt-2"
          >
            {isSubmitting ? messages.common.loading : messages.auth.submitLogin}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-500">
          <Link
            href={
              next
                ? `/auth/register?next=${encodeURIComponent(next)}`
                : "/auth/register"
            }
            className="font-semibold text-[#1D1D1F] transition hover:text-primary"
          >
            {messages.auth.switchToRegister}
          </Link>
        </div>
      </section>
    </div>
  );
}
