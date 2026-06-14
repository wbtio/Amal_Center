'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';
import {
  Save, Loader2, CreditCard, KeyRound, Eye, EyeOff, Info, ExternalLink, ShieldCheck,
} from 'lucide-react';

const input = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm';
const label = 'block text-xs font-medium text-gray-600 mb-1';

type GatewaySettings = {
  enabled: boolean;
  env: 'test' | 'live';
  api_token: string;
  webhook_secret: string;
};

const DEFAULTS: GatewaySettings = { enabled: false, env: 'test', api_token: '', webhook_secret: '' };

export default function PaymentPage() {
  const [s, setS] = useState<GatewaySettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('payment_gateway_settings')
      .select('enabled, env, api_token, webhook_secret')
      .eq('provider', 'wayl')
      .maybeSingle();
    setS({
      enabled: !!data?.enabled,
      env: (data?.env as 'test' | 'live') || 'test',
      api_token: data?.api_token || '',
      webhook_secret: data?.webhook_secret || '',
    });
    setLoading(false);
  };

  const set = <K extends keyof GatewaySettings>(k: K, v: GatewaySettings[K]) =>
    setS(prev => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg('');
    // 1) الأسرار في الجدول الخاص بالأدمن
    const { error: gwError } = await supabase
      .from('payment_gateway_settings')
      .upsert({
        provider: 'wayl',
        enabled: s.enabled,
        env: s.env,
        api_token: s.api_token || null,
        webhook_secret: s.webhook_secret || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'provider' });

    // 2) راية تفعيل عامة يقرأها التطبيق (غير حسّاسة)
    const { error: flagError } = await supabase
      .from('app_settings')
      .upsert({ key: 'payment_wayl_enabled', value: s.enabled }, { onConflict: 'key' });

    setSaving(false);
    const error = gwError || flagError;
    setMsg(error ? `خطأ: ${error.message}` : 'تم الحفظ بنجاح ✓');
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) {
    return (
      <>
        <Header title="الدفع الإلكتروني" />
        <div className="flex items-center justify-center gap-2 p-12 text-gray-500">
          <Loader2 className="animate-spin" size={20} /> جاري التحميل...
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="الدفع الإلكتروني" />
      <div className="p-3 sm:p-4 md:p-6 space-y-4">

        {/* مفتاح التفعيل */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">تفعيل الدفع الإلكتروني (Wayl)</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  عند التفعيل يظهر خيار الدفع بالبطاقة/المحفظة للزبائن داخل التطبيق.
                </p>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={s.enabled}
              onClick={() => set('enabled', !s.enabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${s.enabled ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${s.enabled ? 'translate-x-1' : 'translate-x-6'}`} />
            </button>
          </div>
        </div>

        {/* بيانات البوابة */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><KeyRound size={18} className="text-primary" /></div>
            <h2 className="font-bold text-gray-800">بيانات الربط مع المطوّر</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className={label}>البيئة</label>
              <div className="flex gap-2">
                {(['test', 'live'] as const).map(e => (
                  <button
                    key={e}
                    onClick={() => set('env', e)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border ${s.env === e ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300'}`}
                  >
                    {e === 'test' ? 'تجريبي (test)' : 'مباشر (live)'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">استخدم «تجريبي» أثناء الاختبار، وحوّل إلى «مباشر» عند الإطلاق.</p>
            </div>

            <div>
              <label className={label}>توكن التاجر (X-WAYL-AUTHENTICATION)</label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  className={`${input} pl-10`}
                  dir="ltr"
                  value={s.api_token}
                  onChange={(e) => set('api_token', e.target.value)}
                  placeholder="YOUR_MERCHANT_TOKEN"
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowToken(v => !v)} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">يُخزَّن بأمان ولا يصل لتطبيق الزبون مطلقاً.</p>
            </div>

            <div>
              <label className={label}>سرّ الويبهوك (webhookSecret) — اختياري</label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  className={`${input} pl-10`}
                  dir="ltr"
                  value={s.webhook_secret}
                  onChange={(e) => set('webhook_secret', e.target.value)}
                  placeholder="(اختياري في الوضع المبسّط)"
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowSecret(v => !v)} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary/90 disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            {msg && <span className={`text-sm font-bold ${msg.startsWith('خطأ') ? 'text-red-600' : 'text-green-600'}`}>{msg}</span>}
          </div>
        </div>

        {/* معلومات عن المنصة */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Info size={18} className="text-primary" /></div>
            <h2 className="font-bold text-gray-800">عن بوابة Wayl</h2>
          </div>

          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Wayl بوابة دفع إلكتروني عراقية توفّر صفحة دفع موحّدة بطرق متعددة. كل المبالغ بالدينار العراقي (IQD).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-bold text-gray-800 mb-1">طرق الدفع المدعومة</p>
                <p>Visa / Mastercard، زين كاش (Zain Cash)، FIB وغيرها بعقد واحد.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-bold text-gray-800 mb-1">العمولات</p>
                <p>محلي: 2.5% + 600 د.ع لكل عملية.<br />دولي: 3.5% + 600 د.ع لكل عملية.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-emerald-50 text-emerald-800 rounded-lg p-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0" />
              <p className="text-xs">
                Wayl حاصلة على شهادة PCI DSS من المستوى الأول. توكن التاجر يُستخدم على الخادم فقط (Edge Function) ولا يُكشف للتطبيق.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <p className="text-xs text-gray-500">
                للحصول على توكن التاجر: أرسل بريداً إلى <span className="font-mono text-gray-700" dir="ltr">jisr@wayl.io</span> بعد إنشاء حساب تاجر مُفعّل.
              </p>
              <a href="https://thewayl.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary font-bold text-sm w-fit">
                توثيق واجهة البرمجة (API) <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
