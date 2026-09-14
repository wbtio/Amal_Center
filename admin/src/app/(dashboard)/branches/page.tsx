'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';
import {
  Store, Plus, Pencil, Trash2, MapPin, Phone, X, Loader2,
  TriangleAlert, Check, Power
} from 'lucide-react';

interface Branch {
  id: string;
  name_ar: string;
  name_en: string | null;
  phone: string | null;
  address_ar: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = {
  name_ar: '', name_en: '', phone: '', address_ar: '',
  latitude: '', longitude: '',
};

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { void fetchBranches(); }, []);

  const fetchBranches = async () => {
    const { data, error: err } = await supabase
      .from('branches')
      .select('id, name_ar, name_en, phone, address_ar, latitude, longitude, is_active, sort_order')
      .order('sort_order', { ascending: true });

    if (err) {
      setError(
        err.message.includes('does not exist')
          ? 'جدول الفروع غير موجود بعد — شغّل ملف scripts/phase2_branches.sql في Supabase.'
          : 'تعذّر تحميل الفروع.'
      );
    } else {
      setError(null);
      setBranches((data ?? []) as Branch[]);
    }
    setLoading(false);
  };

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setIsOpen(true);
  };

  const openEdit = (branch: Branch) => {
    setEditing(branch);
    setForm({
      name_ar: branch.name_ar ?? '',
      name_en: branch.name_en ?? '',
      phone: branch.phone ?? '',
      address_ar: branch.address_ar ?? '',
      latitude: branch.latitude?.toString() ?? '',
      longitude: branch.longitude?.toString() ?? '',
    });
    setFormError(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name_ar.trim()) {
      setFormError('اسم الفرع بالعربي مطلوب');
      return;
    }

    const lat = form.latitude.trim() ? Number(form.latitude) : null;
    const lng = form.longitude.trim() ? Number(form.longitude) : null;

    if ((lat !== null && isNaN(lat)) || (lng !== null && isNaN(lng))) {
      setFormError('الإحداثيات لازم تكون أرقام — انسخها من خرائط جوجل');
      return;
    }

    setSaving(true);
    setFormError(null);

    const payload = {
      name_ar: form.name_ar.trim(),
      name_en: form.name_en.trim(),
      phone: form.phone.trim() || null,
      address_ar: form.address_ar.trim() || null,
      latitude: lat,
      longitude: lng,
      updated_at: new Date().toISOString(),
    };

    const { error: err } = editing
      ? await supabase.from('branches').update(payload).eq('id', editing.id)
      : await supabase.from('branches').insert({
          ...payload,
          sort_order: branches.length + 1,
        });

    setSaving(false);

    if (err) {
      setFormError('لم يُحفظ — تأكد أن صلاحيتك مدير عام.');
      return;
    }

    setIsOpen(false);
    await fetchBranches();
  };

  const toggleActive = async (branch: Branch) => {
    const { error: err } = await supabase
      .from('branches')
      .update({ is_active: !branch.is_active, updated_at: new Date().toISOString() })
      .eq('id', branch.id);

    if (!err) await fetchBranches();
  };

  const handleDelete = async (branch: Branch) => {
    if (!confirm(`حذف فرع «${branch.name_ar}»؟ الطلبات والموظفين المرتبطين به يبقون بلا فرع.`)) return;
    const { error: err } = await supabase.from('branches').delete().eq('id', branch.id);
    if (err) setError('تعذّر الحذف — تأكد أن صلاحيتك مدير عام.');
    else await fetchBranches();
  };

  const input = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary';
  const label = 'block text-xs text-gray-600 mb-1';

  return (
    <>
      <Header title="الفروع" />
      <div className="p-3 sm:p-4 md:p-6">

        <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">الفروع</h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {branches.length} فرع · تقدر تضيف فرع جديد بأي وقت
            </p>
          </div>
          <button
            onClick={openNew}
            className="px-3 py-2 md:px-4 bg-primary text-white rounded-xl text-xs md:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Plus size={16} /> إضافة فرع
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm mb-4">
            <TriangleAlert size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-gray-500 text-sm">
            <Loader2 size={16} className="animate-spin" /> جاري التحميل...
          </div>
        )}

        {!loading && !error && branches.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
            <Store size={44} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium text-sm">لا يوجد فروع بعد</p>
            <button onClick={openNew} className="mt-3 text-sm text-primary hover:underline">أضف أول فرع</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`bg-white rounded-xl border p-4 transition-colors ${branch.is_active ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${branch.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Store size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">{branch.name_ar}</p>
                    <p className="text-[11px] text-gray-400 truncate">{branch.name_en || '—'}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ${branch.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {branch.is_active ? 'نشط' : 'معطل'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                <p className="flex items-center gap-1.5">
                  <Phone size={13} className="text-gray-400 flex-shrink-0" />
                  {branch.phone || 'بلا رقم'}
                </p>
                <p className="flex items-start gap-1.5">
                  <MapPin size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{branch.address_ar || 'بلا عنوان'}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
                {branch.latitude != null && branch.longitude != null && (
                  <a
                    href={`https://maps.google.com/maps?q=${branch.latitude}%2C${branch.longitude}&z=17`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    الخريطة
                  </a>
                )}
                <button
                  onClick={() => openEdit(branch)}
                  className="px-2 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  title="تعديل"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => toggleActive(branch)}
                  className="px-2 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-colors"
                  title={branch.is_active ? 'تعطيل' : 'تفعيل'}
                >
                  <Power size={14} />
                </button>
                <button
                  onClick={() => handleDelete(branch)}
                  className="px-2 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  title="حذف"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">{editing ? 'تعديل الفرع' : 'إضافة فرع جديد'}</h2>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className={label}>اسم الفرع (عربي) *</label>
                <input className={input} value={form.name_ar}
                  onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
                  placeholder="الأمل 5" />
              </div>

              <div>
                <label className={label}>الاسم بالإنجليزي</label>
                <input className={input} value={form.name_en}
                  onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                  placeholder="Al Amal 5" />
              </div>

              <div>
                <label className={label}>رقم الهاتف</label>
                <input className={input} value={form.phone} dir="ltr"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="07XXXXXXXXX" />
              </div>

              <div>
                <label className={label}>العنوان</label>
                <input className={input} value={form.address_ar}
                  onChange={(e) => setForm({ ...form, address_ar: e.target.value })}
                  placeholder="البصرة — اسم المنطقة والشارع" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>خط العرض</label>
                  <input className={input} value={form.latitude} dir="ltr"
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                    placeholder="30.5241" />
                </div>
                <div>
                  <label className={label}>خط الطول</label>
                  <input className={input} value={form.longitude} dir="ltr"
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    placeholder="47.7568" />
                </div>
              </div>

              <p className="text-[11px] text-gray-400">
                لجلب الإحداثيات: افتح موقع الفرع في خرائط جوجل، اضغط عليه مطولاً، وانسخ الرقمين.
              </p>

              {formError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2 text-xs">
                  <TriangleAlert size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  {editing ? 'حفظ التعديل' : 'إضافة الفرع'}
                </button>
                <button type="button" onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
