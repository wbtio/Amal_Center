"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useStorefront } from "@/components/providers/StorefrontProvider";
import { useSupabaseSession } from "@/components/providers/SupabaseSessionProvider";
import { PHONE_REGEX } from "@/lib/storefront";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const { language, messages } = useStorefront();
  const { supabase } = useSupabaseSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerSchema = z
    .object({
      fullName: z.string().min(
        3,
        language === "ar"
          ? "يرجى إدخال الاسم الكامل."
          : "Please enter your full name."
      ),
      phone: z.string().regex(
        PHONE_REGEX,
        language === "ar"
          ? "يرجى إدخال رقم هاتف عراقي صحيح."
          : "Please enter a valid Iraqi phone number."
      ),
      email: z.string().email(
        language === "ar" ? "يرجى إدخال بريد صحيح." : "Enter a valid email."
      ),
      password: z.string().min(
        6,
        language === "ar"
          ? "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل."
          : "Password must be at least 6 characters."
      ),
      confirmPassword: z.string().min(
        6,
        language === "ar"
          ? "يرجى تأكيد كلمة المرور."
          : "Please confirm the password."
      ),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message:
        language === "ar"
          ? "كلمتا المرور غير متطابقتين."
          : "Passwords do not match.",
      path: ["confirmPassword"],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setConfirmationMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim().toLowerCase(),
      password: values.password,
      options: {
        data: {
          full_name: values.fullName.trim(),
          phone: values.phone.trim(),
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      router.replace(next);
      router.refresh();
      return;
    }

    setConfirmationMessage(
      language === "ar"
        ? "تم إنشاء الحساب. قد تحتاج إلى تأكيد البريد الإلكتروني قبل تسجيل الدخول."
        : "Account created. You may need to confirm your email before signing in."
    );
  });

  return (
    <div className="grid min-h-[calc(100vh-14rem)] gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <section className="hidden overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#ffffff_0%,#f5f7f5_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="text-start">
          <p className="eyebrow">Al-Amal Center</p>
          <h1 className="mt-5 max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#1D1D1F]">
            {language === "ar"
              ? "أنشئ حسابك لتصبح تجربة التسوق أسرع في كل مرة."
              : "Create your account so shopping feels faster every time."}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            {language === "ar"
              ? "احفظ عنوانك، تابع طلباتك، واحتفظ بملف شخصي متصل مباشرة ببيانات المشروع الحية."
              : "Save your address, track orders, and keep a profile connected directly to live project data."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white px-5 py-5 shadow-soft">
            <p className="eyebrow">{language === "ar" ? "للبيت اليومي" : "Daily home"}</p>
            <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
              {language === "ar" ? "بقالة وهايبرماركت" : "Groceries and hypermarket"}
            </p>
          </div>
          <div className="rounded-[2rem] bg-white px-5 py-5 shadow-soft">
            <p className="eyebrow">{language === "ar" ? "عربي أولاً" : "Arabic first"}</p>
            <p className="mt-3 text-base font-semibold text-[#1D1D1F]">
              {language === "ar" ? "واجهة RTL متكاملة" : "Complete RTL-ready interface"}
            </p>
          </div>
        </div>
      </section>

      <section className="soft-panel px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
        <div className="text-start">
          <p className="eyebrow">{messages.auth.registerTitle}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            {messages.auth.registerTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500 sm:mt-5 sm:text-base sm:leading-8">
            {messages.auth.registerSubtitle}
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-600">
              {messages.auth.fullName}
            </span>
            <input {...register("fullName")} className="field-input" />
            {errors.fullName ? (
              <span className="text-sm text-danger">{errors.fullName.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-600">
              {messages.auth.phone}
            </span>
            <input {...register("phone")} className="field-input" dir="ltr" />
            {errors.phone ? (
              <span className="text-sm text-danger">{errors.phone.message}</span>
            ) : null}
          </label>

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

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-600">
              {messages.auth.confirmPassword}
            </span>
            <input
              type="password"
              {...register("confirmPassword")}
              className="field-input"
              dir="ltr"
            />
            {errors.confirmPassword ? (
              <span className="text-sm text-danger">
                {errors.confirmPassword.message}
              </span>
            ) : null}
          </label>

          {errorMessage ? (
            <p className="rounded-[2rem] bg-rose-50 px-5 py-4 text-sm text-danger">
              {errorMessage}
            </p>
          ) : null}
          {confirmationMessage ? (
            <p className="rounded-[2rem] bg-primary/8 px-5 py-4 text-sm text-primary">
              {confirmationMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="pill-button-primary mt-2"
          >
            {isSubmitting
              ? messages.common.loading
              : messages.auth.submitRegister}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-500">
          <Link
            href={
              next ? `/auth/login?next=${encodeURIComponent(next)}` : "/auth/login"
            }
            className="font-semibold text-[#1D1D1F] transition hover:text-primary"
          >
            {messages.auth.switchToLogin}
          </Link>
        </div>
      </section>
    </div>
  );
}
