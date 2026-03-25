'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, Loader2, Megaphone, Send, Trash2, UserRound, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/lib/supabase';

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  title_ar: string | null;
  message: string;
  message_ar: string | null;
  type: 'general' | 'order' | 'promo' | 'system';
  is_read: boolean;
  created_at: string;
};

const notificationTypes = [
  { value: 'general', label: 'عام' },
  { value: 'promo', label: 'عرض' },
  { value: 'order', label: 'طلب' },
  { value: 'system', label: 'نظام' },
];

export default function NotificationsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    audience: 'all',
    userId: '',
    type: 'general' as NotificationRow['type'],
    title: '',
    title_ar: '',
    message: '',
    message_ar: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const profilesMap = useMemo(
    () => Object.fromEntries(profiles.map(profile => [profile.id, profile])),
    [profiles]
  );

  const fetchData = async () => {
    try {
      setLoading(true);

      const [profilesRes, notificationsRes] = await Promise.all([
        supabase.from('profiles').select('id, full_name, phone').order('created_at', { ascending: false }),
        supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(50),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (notificationsRes.error) throw notificationsRes.error;

      setProfiles(profilesRes.data || []);
      setNotifications((notificationsRes.data || []) as NotificationRow[]);
    } catch (error) {
      console.error('Error fetching notifications data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      alert('يرجى تعبئة العنوان والرسالة بالإنجليزية على الأقل');
      return;
    }

    if (form.audience === 'single' && !form.userId) {
      alert('يرجى اختيار مستخدم');
      return;
    }

    try {
      setSending(true);

      const targetUserIds = form.audience === 'all'
        ? profiles.map(profile => profile.id)
        : [form.userId];

      if (targetUserIds.length === 0) {
        alert('لا يوجد مستخدمون لإرسال الإشعار إليهم');
        return;
      }

      const payload = targetUserIds.map(userId => ({
        user_id: userId,
        type: form.type,
        title: form.title.trim(),
        title_ar: form.title_ar.trim() || form.title.trim(),
        message: form.message.trim(),
        message_ar: form.message_ar.trim() || form.message.trim(),
        is_read: false,
      }));

      const { error } = await supabase.from('notifications').insert(payload);
      if (error) throw error;

      setForm({
        audience: 'all',
        userId: '',
        type: 'general',
        title: '',
        title_ar: '',
        message: '',
        message_ar: '',
      });

      await fetchData();
      alert('تم إرسال الإشعار بنجاح');
    } catch (error: any) {
      console.error('Error sending notification:', error);
      alert(`حدث خطأ أثناء الإرسال: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل تريد حذف هذا الإشعار؟')) return;

    try {
      const { error } = await supabase.from('notifications').delete().eq('id', id);
      if (error) throw error;

      setNotifications(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('تعذر حذف الإشعار');
    }
  };

  return (
    <>
      <Header title="الإشعارات" />
      <div className="p-3 sm:p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Bell className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{notifications.length}</p>
                <p className="text-sm text-gray-500">آخر الإشعارات</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{profiles.length}</p>
                <p className="text-sm text-gray-500">المستخدمون المتاحون</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Megaphone className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{notifications.filter(item => !item.is_read).length}</p>
                <p className="text-sm text-gray-500">غير مقروءة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px,1fr] gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 space-y-4 h-fit">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">إرسال إشعار جديد</h1>
              <p className="text-sm text-gray-500 mt-1">الإشعارات التي تنشئها هنا تظهر مباشرة داخل التطبيق.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setForm(prev => ({ ...prev, audience: 'all', userId: '' }))}
                className={`rounded-lg px-3 py-2 text-sm font-bold border ${form.audience === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                لجميع المستخدمين
              </button>
              <button
                onClick={() => setForm(prev => ({ ...prev, audience: 'single' }))}
                className={`rounded-lg px-3 py-2 text-sm font-bold border ${form.audience === 'single' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                لمستخدم محدد
              </button>
            </div>

            {form.audience === 'single' && (
              <select
                value={form.userId}
                onChange={(e) => setForm(prev => ({ ...prev, userId: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">اختر المستخدم</option>
                {profiles.map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.full_name || profile.phone || profile.id.slice(0, 8)}
                  </option>
                ))}
              </select>
            )}

            <select
              value={form.type}
              onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as NotificationRow['type'] }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {notificationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="العنوان بالإنجليزية"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <input
              type="text"
              value={form.title_ar}
              onChange={(e) => setForm(prev => ({ ...prev, title_ar: e.target.value }))}
              placeholder="العنوان بالعربية"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <textarea
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              placeholder="الرسالة بالإنجليزية"
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />

            <textarea
              value={form.message_ar}
              onChange={(e) => setForm(prev => ({ ...prev, message_ar: e.target.value }))}
              placeholder="الرسالة بالعربية"
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />

            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full rounded-lg bg-primary text-white px-4 py-3 font-bold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              <span>{sending ? 'جاري الإرسال...' : 'إرسال الإشعار'}</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">سجل الإشعارات</h2>
                <p className="text-sm text-gray-500">آخر 50 إشعاراً محفوظاً في قاعدة البيانات</p>
              </div>
            </div>

            {loading ? (
              <div className="p-8 flex items-center justify-center gap-2 text-gray-500">
                <Loader2 size={18} className="animate-spin" />
                جاري التحميل...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">لا توجد إشعارات حتى الآن</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map(item => {
                  const profile = profilesMap[item.user_id];

                  return (
                    <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                            {notificationTypes.find(type => type.value === item.type)?.label || item.type}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.is_read ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-700'}`}>
                            {item.is_read ? 'مقروء' : 'غير مقروء'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <div>
                            <p className="font-bold text-gray-800">{item.title_ar || item.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.message_ar || item.message}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-700">{item.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.message}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><UserRound size={14} /> {profile?.full_name || profile?.phone || item.user_id.slice(0, 8)}</span>
                          <span>{new Date(item.created_at).toLocaleString('ar-IQ')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="self-start p-2 rounded-lg text-red-500 hover:bg-red-50"
                        aria-label="حذف الإشعار"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
