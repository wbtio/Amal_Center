'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // The recovery link's tokens arrive in the URL hash and are exchanged
    // for a session client-side before this page can accept a new password.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
            setReady(true);
          }
        });
        return () => subscription.unsubscribe();
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'فشل تحديث كلمة المرور';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">تعيين كلمة مرور جديدة</h1>
          <p className="text-gray-500">أدخل كلمة المرور الجديدة لحسابك</p>
        </div>

        {done ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center gap-2 text-center">
            <CheckCircle2 size={32} />
            <p className="text-sm">تم تحديث كلمة المرور بنجاح، سيتم تحويلك لتسجيل الدخول...</p>
          </div>
        ) : !ready ? (
          <div className="flex flex-col items-center gap-3 text-gray-500 text-sm py-6">
            <Loader2 className="animate-spin" size={28} />
            <p>جاري التحقق من رابط الاستعادة...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'تحديث كلمة المرور'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
