'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowRight, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'فشل إرسال رابط الاستعادة';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setCodeError(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code.trim(),
        type: 'recovery',
      });

      if (error) throw error;
      router.push('/update-password');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'الرمز غير صحيح أو منتهي الصلاحية';
      setCodeError(message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">استعادة كلمة المرور</h1>
          <p className="text-gray-500">أدخل بريدك الإلكتروني وسنرسل لك رابط تعيين كلمة مرور جديدة</p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center gap-2 text-center">
              <MailCheck size={32} />
              <p className="text-sm">
                وصلك بريد فيه رمز تحقق ورابط. الرمز أضمن — أدخله هنا مباشرة:
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-3">
              {codeError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                  {codeError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رمز التحقق من البريد</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-center text-lg tracking-[0.3em]"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                  placeholder="00000000"
                />
              </div>

              <button
                type="submit"
                disabled={verifying || code.length < 4}
                className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {verifying ? <Loader2 className="animate-spin h-5 w-5" /> : 'تأكيد الرمز'}
              </button>
            </form>

            <Link href="/login" className="block text-center text-sm text-primary hover:underline">
              <ArrowRight size={16} className="inline" /> العودة لتسجيل الدخول
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@alamal.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'إرسال رابط الاستعادة'}
            </button>

            <Link href="/login" className="block text-center text-sm text-gray-500 hover:underline">
              العودة لتسجيل الدخول
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
