'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Loader2, Store, TriangleAlert, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError('اكتب البريد وكلمة المرور');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      router.push('/');
      router.refresh();
    } catch (err) {
      const raw = err instanceof Error ? err.message : '';
      // رسائل Supabase إنجليزية وغير مفهومة للموظف
      setError(
        /invalid login/i.test(raw) ? 'البريد أو كلمة المرور غير صحيحة'
        : /email not confirmed/i.test(raw) ? 'الحساب غير مفعّل بعد'
        : /network|fetch/i.test(raw) ? 'تعذّر الاتصال — تحقق من الإنترنت'
        : raw || 'فشل تسجيل الدخول'
      );
    } finally {
      setLoading(false);
    }
  };

  const field = 'w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-gray-400';

  return (
    <div className="min-h-screen flex">
      {/* اللوحة التعريفية — تختفي على الجوال */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#0E1613] flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
            <Store className="text-white" size={22} />
          </div>
          <div>
            <p className="text-[#F1F5F4] font-bold text-[15px]">الأمل سنتر</p>
            <p className="text-[#6B7C74] text-[11px]">لوحة التحكم</p>
          </div>
        </div>

        <div>
          <h2 className="text-[#F1F5F4] text-2xl font-bold leading-snug mb-3">
            إدارة المتجر
            <br />
            من مكان واحد
          </h2>
          <p className="text-[#8FA398] text-sm leading-relaxed max-w-xs">
            المنتجات والطلبات والفروع والمخزون — مع سجل يوثّق كل تعديل باسم صاحبه.
          </p>

          <div className="flex gap-6 mt-8">
            <div>
              <p className="text-[#4ADE80] text-xl font-bold">4</p>
              <p className="text-[#6B7C74] text-[11px]">فروع</p>
            </div>
            <div>
              <p className="text-[#4ADE80] text-xl font-bold">5,619</p>
              <p className="text-[#6B7C74] text-[11px]">منتج</p>
            </div>
            <div>
              <p className="text-[#4ADE80] text-xl font-bold">24/7</p>
              <p className="text-[#6B7C74] text-[11px]">متابعة لحظية</p>
            </div>
          </div>
        </div>

        <p className="text-[#3D4A44] text-[11px]">الأمل سنتر — البصرة</p>
      </div>

      {/* نموذج الدخول */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-5">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 justify-center mb-7">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Store className="text-white" size={20} />
            </div>
            <span className="font-bold text-gray-800">الأمل سنتر</span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1">تسجيل الدخول</h1>
          <p className="text-sm text-gray-500 mb-6">ادخل ببريدك وكلمة المرور الخاصة بك</p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-3.5 py-2.5 mb-4 text-sm">
              <TriangleAlert size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                required
                autoComplete="username"
                dir="ltr"
                className={`${field} text-right`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs text-gray-600">كلمة المرور</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className={`${field} pl-10`}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-[11px] text-gray-400 text-center mt-6">
            الدخول متاح لفريق العمل فقط — كل عملية تُسجَّل باسم صاحبها.
          </p>
        </div>
      </div>
    </div>
  );
}
