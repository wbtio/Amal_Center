'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';
import {
  Save, Plus, Trash2, Loader2, Settings, HelpCircle, FileText,
  Phone, Clock, MapPin, Truck, ChevronUp, ChevronDown,
} from 'lucide-react';

type Tab = 'general' | 'faq' | 'pages';

type WorkingHour = { days_ar: string; days_en: string; time_ar: string; time_en: string };
type Branch = { label_ar: string; label_en: string; href: string };

type Faq = {
  id: string;
  question_ar: string; question_en: string;
  answer_ar: string; answer_en: string;
  sort_order: number; is_active: boolean;
};

type Section = { icon?: string; title_ar: string; title_en: string; content_ar: string; content_en: string };
type Page = { slug: string; title_ar: string; title_en: string; intro_ar: string; intro_en: string; sections: Section[] };

const input = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm';
const label = 'block text-xs font-medium text-gray-600 mb-1';

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>('general');

  return (
    <>
      <Header title="المحتوى والإعدادات" />
      <div className="p-3 sm:p-4 md:p-6 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
          {([
            { id: 'general', label: 'إعدادات عامة', icon: Settings },
            { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
            { id: 'pages', label: 'الصفحات', icon: FileText },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === t.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'general' && <GeneralSettings />}
        {tab === 'faq' && <FaqManager />}
        {tab === 'pages' && <PagesManager />}
      </div>
    </>
  );
}

// ───────────────────────── General Settings ─────────────────────────
function GeneralSettings() {
  const [s, setS] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('app_settings').select('key, value');
    const map: Record<string, any> = {};
    (data || []).forEach((r: any) => { map[r.key] = r.value; });
    if (!Array.isArray(map.working_hours)) map.working_hours = [];
    if (!Array.isArray(map.branches)) map.branches = [];
    setS(map);
    setLoading(false);
  };

  const set = (k: string, v: any) => setS(prev => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg('');
    const rows = Object.entries(s).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from('app_settings').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    setMsg(error ? `خطأ: ${error.message}` : 'تم الحفظ بنجاح ✓');
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <Loading />;

  const wh: WorkingHour[] = s.working_hours || [];
  const branches: Branch[] = s.branches || [];

  return (
    <div className="space-y-4">
      {/* Contact */}
      <Card icon={Phone} title="معلومات التواصل">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="رقم واتساب (دولي بدون +)" v={s.contact_whatsapp_number} onChange={(v) => set('contact_whatsapp_number', v)} />
          <Field label="رابط واتساب" v={s.contact_whatsapp_url} onChange={(v) => set('contact_whatsapp_url', v)} />
          <Field label="بريد الدعم" v={s.contact_support_email} onChange={(v) => set('contact_support_email', v)} />
          <Field label="رابط فيسبوك" v={s.contact_facebook_url} onChange={(v) => set('contact_facebook_url', v)} />
          <Field label="رابط انستغرام" v={s.contact_instagram_url} onChange={(v) => set('contact_instagram_url', v)} />
        </div>
      </Card>

      {/* Address */}
      <Card icon={MapPin} title="عنوان المتجر">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={label}>العنوان (عربي)</label>
            <textarea className={input} rows={2} value={s.store_address_ar || ''} onChange={(e) => set('store_address_ar', e.target.value)} />
          </div>
          <div>
            <label className={label}>العنوان (إنجليزي)</label>
            <textarea className={input} rows={2} value={s.store_address_en || ''} onChange={(e) => set('store_address_en', e.target.value)} />
          </div>
        </div>
      </Card>

      {/* Working hours */}
      <Card icon={Clock} title="ساعات العمل">
        <div className="space-y-2">
          {wh.map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end bg-gray-50 p-2 rounded-lg">
              <Field label="الأيام (ع)" v={row.days_ar} onChange={(v) => { const a = [...wh]; a[i] = { ...a[i], days_ar: v }; set('working_hours', a); }} />
              <Field label="الأيام (إ)" v={row.days_en} onChange={(v) => { const a = [...wh]; a[i] = { ...a[i], days_en: v }; set('working_hours', a); }} />
              <Field label="الوقت (ع)" v={row.time_ar} onChange={(v) => { const a = [...wh]; a[i] = { ...a[i], time_ar: v }; set('working_hours', a); }} />
              <div className="flex gap-2">
                <Field label="الوقت (إ)" v={row.time_en} onChange={(v) => { const a = [...wh]; a[i] = { ...a[i], time_en: v }; set('working_hours', a); }} />
                <button onClick={() => set('working_hours', wh.filter((_, j) => j !== i))} className="p-2 text-red-600 hover:bg-red-50 rounded-lg h-fit"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => set('working_hours', [...wh, { days_ar: '', days_en: '', time_ar: '', time_en: '' }])} className="flex items-center gap-1.5 text-primary text-sm font-bold"><Plus size={16} /> إضافة صف</button>
        </div>
      </Card>

      {/* Branches */}
      <Card icon={MapPin} title="الفروع ومواقعها">
        <div className="space-y-2">
          {branches.map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end bg-gray-50 p-2 rounded-lg">
              <Field label="الاسم (ع)" v={row.label_ar} onChange={(v) => { const a = [...branches]; a[i] = { ...a[i], label_ar: v }; set('branches', a); }} />
              <Field label="الاسم (إ)" v={row.label_en} onChange={(v) => { const a = [...branches]; a[i] = { ...a[i], label_en: v }; set('branches', a); }} />
              <div className="flex gap-2">
                <Field label="رابط الخريطة" v={row.href} onChange={(v) => { const a = [...branches]; a[i] = { ...a[i], href: v }; set('branches', a); }} />
                <button onClick={() => set('branches', branches.filter((_, j) => j !== i))} className="p-2 text-red-600 hover:bg-red-50 rounded-lg h-fit"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => set('branches', [...branches, { label_ar: '', label_en: '', href: '' }])} className="flex items-center gap-1.5 text-primary text-sm font-bold"><Plus size={16} /> إضافة فرع</button>
        </div>
      </Card>

      {/* Delivery */}
      <Card icon={Truck} title="رسوم التوصيل (دينار)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Field label="توصيل عادي" type="number" v={s.delivery_fee_standard} onChange={(v) => set('delivery_fee_standard', Number(v))} />
          <Field label="توصيل سريع" type="number" v={s.delivery_fee_express} onChange={(v) => set('delivery_fee_express', Number(v))} />
          <Field label="أجهزة" type="number" v={s.delivery_fee_electronics} onChange={(v) => set('delivery_fee_electronics', Number(v))} />
          <Field label="حد التوصيل المجاني" type="number" v={s.free_delivery_threshold} onChange={(v) => set('free_delivery_threshold', Number(v))} />
        </div>
      </Card>

      <SaveBar saving={saving} msg={msg} onSave={save} />
    </div>
  );
}

// ───────────────────────── FAQ Manager ─────────────────────────
function FaqManager() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('faq_items').select('*').order('sort_order');
    setItems((data as Faq[]) || []);
    setLoading(false);
  };

  const addNew = () => setItems(prev => [...prev, {
    id: `new-${Date.now()}`, question_ar: '', question_en: '', answer_ar: '', answer_en: '',
    sort_order: prev.length + 1, is_active: true,
  }]);

  const update = (id: string, patch: Partial<Faq>) => setItems(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it));

  const remove = async (id: string) => {
    if (!confirm('حذف هذا السؤال؟')) return;
    if (!id.startsWith('new-')) await supabase.from('faq_items').delete().eq('id', id);
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const a = [...items];
    [a[i], a[j]] = [a[j], a[i]];
    setItems(a.map((it, idx) => ({ ...it, sort_order: idx + 1 })));
  };

  const saveAll = async () => {
    setSaving(true);
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const payload = {
        question_ar: it.question_ar, question_en: it.question_en,
        answer_ar: it.answer_ar, answer_en: it.answer_en,
        sort_order: i + 1, is_active: it.is_active,
      };
      if (it.id.startsWith('new-')) await supabase.from('faq_items').insert(payload);
      else await supabase.from('faq_items').update(payload).eq('id', it.id);
    }
    setSaving(false);
    await load();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">سؤال #{i + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><ChevronUp size={16} /></button>
              <button onClick={() => move(i, 1)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><ChevronDown size={16} /></button>
              <label className="flex items-center gap-1 text-xs mx-2">
                <input type="checkbox" checked={it.is_active} onChange={(e) => update(it.id, { is_active: e.target.checked })} /> نشط
              </label>
              <button onClick={() => remove(it.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Field label="السؤال (ع)" v={it.question_ar} onChange={(v) => update(it.id, { question_ar: v })} />
            <Field label="السؤال (إ)" v={it.question_en} onChange={(v) => update(it.id, { question_en: v })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><label className={label}>الجواب (ع)</label><textarea className={input} rows={2} value={it.answer_ar} onChange={(e) => update(it.id, { answer_ar: e.target.value })} /></div>
            <div><label className={label}>الجواب (إ)</label><textarea className={input} rows={2} value={it.answer_en} onChange={(e) => update(it.id, { answer_en: e.target.value })} /></div>
          </div>
        </div>
      ))}
      <button onClick={addNew} className="flex items-center gap-1.5 text-primary text-sm font-bold"><Plus size={16} /> إضافة سؤال</button>
      <SaveBar saving={saving} msg="" onSave={saveAll} />
    </div>
  );
}

// ───────────────────────── Pages Manager ─────────────────────────
function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [slug, setSlug] = useState('terms');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('content_pages').select('slug, title_ar, title_en, intro_ar, intro_en, sections').order('slug');
    setPages((data as Page[]) || []);
    setLoading(false);
  };

  const page = pages.find(p => p.slug === slug);
  const patch = (patchObj: Partial<Page>) => setPages(prev => prev.map(p => p.slug === slug ? { ...p, ...patchObj } : p));

  const save = async () => {
    if (!page) return;
    setSaving(true);
    setMsg('');
    const { error } = await supabase.from('content_pages')
      .update({ title_ar: page.title_ar, title_en: page.title_en, intro_ar: page.intro_ar, intro_en: page.intro_en, sections: page.sections })
      .eq('slug', slug);
    setSaving(false);
    setMsg(error ? `خطأ: ${error.message}` : 'تم الحفظ ✓');
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <Loading />;
  if (!pages.length) return <div className="text-gray-500 text-sm">لا توجد صفحات.</div>;

  const sections = page?.sections || [];
  const setSec = (i: number, key: keyof Section, v: string) => { const a = [...sections]; a[i] = { ...a[i], [key]: v }; patch({ sections: a }); };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {pages.map(p => (
          <button key={p.slug} onClick={() => setSlug(p.slug)} className={`px-4 py-2 rounded-lg text-sm font-bold ${slug === p.slug ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {p.title_ar || p.slug}
          </button>
        ))}
      </div>

      {page && (
        <>
          <Card icon={FileText} title="العنوان والمقدمة">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="العنوان (ع)" v={page.title_ar} onChange={(v) => patch({ title_ar: v })} />
              <Field label="العنوان (إ)" v={page.title_en} onChange={(v) => patch({ title_en: v })} />
              <div><label className={label}>المقدمة (ع)</label><textarea className={input} rows={2} value={page.intro_ar} onChange={(e) => patch({ intro_ar: e.target.value })} /></div>
              <div><label className={label}>المقدمة (إ)</label><textarea className={input} rows={2} value={page.intro_en} onChange={(e) => patch({ intro_en: e.target.value })} /></div>
            </div>
          </Card>

          <Card icon={FileText} title="الأقسام">
            <div className="space-y-3">
              {sections.map((sec, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">قسم #{i + 1}</span>
                    <button onClick={() => patch({ sections: sections.filter((_, j) => j !== i) })} className="p-1.5 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                  </div>
                  <Field label="الأيقونة (Ionicons، اختياري)" v={sec.icon || ''} onChange={(v) => setSec(i, 'icon', v)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Field label="العنوان (ع)" v={sec.title_ar} onChange={(v) => setSec(i, 'title_ar', v)} />
                    <Field label="العنوان (إ)" v={sec.title_en} onChange={(v) => setSec(i, 'title_en', v)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div><label className={label}>المحتوى (ع)</label><textarea className={input} rows={3} value={sec.content_ar} onChange={(e) => setSec(i, 'content_ar', e.target.value)} /></div>
                    <div><label className={label}>المحتوى (إ)</label><textarea className={input} rows={3} value={sec.content_en} onChange={(e) => setSec(i, 'content_en', e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button onClick={() => patch({ sections: [...sections, { icon: '', title_ar: '', title_en: '', content_ar: '', content_en: '' }] })} className="flex items-center gap-1.5 text-primary text-sm font-bold"><Plus size={16} /> إضافة قسم</button>
            </div>
          </Card>

          <SaveBar saving={saving} msg={msg} onSave={save} />
        </>
      )}
    </div>
  );
}

// ───────────────────────── Shared UI ─────────────────────────
function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Icon size={18} className="text-primary" /></div>
        <h2 className="font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label: lbl, v, onChange, type = 'text' }: { label: string; v: any; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex-1">
      <label className={label}>{lbl}</label>
      <input type={type} className={input} value={v ?? ''} onChange={(e) => onChange(e.target.value)} dir={type === 'number' ? 'ltr' : undefined} />
    </div>
  );
}

function SaveBar({ saving, msg, onSave }: { saving: boolean; msg: string; onSave: () => void }) {
  return (
    <div className="flex items-center gap-3 sticky bottom-3">
      <button onClick={onSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary/90 disabled:opacity-60">
        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
      </button>
      {msg && <span className={`text-sm font-bold ${msg.startsWith('خطأ') ? 'text-red-600' : 'text-green-600'}`}>{msg}</span>}
    </div>
  );
}

function Loading() {
  return <div className="flex items-center justify-center gap-2 p-12 text-gray-500"><Loader2 className="animate-spin" size={20} /> جاري التحميل...</div>;
}
